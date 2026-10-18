import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import { invalidateRmDashboard, useRmMutation, useRmQuery, type RmMutationOptions } from "./dashboardClient";
import { rmPaginated } from "./normalize";
import type { RmInventoryOverviewData, RmStockRequestItem, RmUndistributedSimsData } from "../types/inventory";
import type { RmBulkStockPayload, RmHistoryData, RmHistoryParams, RmInventoryDistribution, RmInventoryParams, RmPage } from "../types/territory";
import type { RmPagination, RmRedistributePayload, RmSimType } from "../types/dashboard";
const base = "/regional-manager/sim-inventory";
export const useGetRmSimInventoryOverview = () => useRmQuery<RmInventoryOverviewData>("rm-sim-inventory-overview", "/overview", undefined, true, base);
export const useGetRmUndistributedSims = (params: RmInventoryParams, enabled = true) => useRmQuery<RmUndistributedSimsData>("rm-undistributed-sims", "/undistributed", params, enabled, base);
export const useGetRmInventoryHistory = (params: RmHistoryParams, enabled = true) => useRmQuery<RmHistoryData>("rm-inventory-history", "/history", params, enabled, base);
export const useRmDistributeSimStock = (options?: RmMutationOptions<RmInventoryDistribution>) => useRmMutation("/distribute", options, base);
export const useRmRedistributeSimStock = (options?: RmMutationOptions<RmRedistributePayload>) => useRmMutation("/redistribute", options, base);
export const useRmRequestStockFromSuperAdmin = (options?: RmMutationOptions<RmBulkStockPayload>) => useRmMutation("/request-stock", options, base);
export type RmStockRequestsData = RmPagination & { items: RmStockRequestItem[] };
export const useGetRmStockRequests = (params: RmPage) => useRmQuery<RmStockRequestsData>("rm-stock-requests", "/requests", params, true, base,
  raw => rmPaginated<RmStockRequestItem>(raw, ["requests"], "requests"));

// There is no inventory export endpoint, so the header Export builds a CSV from the history endpoint's own records.
export function useExportRmInventoryHistory() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await authedHttpClient.get<ApiResponse<RmHistoryData>>(`${base}/history`, { params: { page: 1, limit: 500, sortBy: "newest" } });
      if (!data.success) throw new Error(data.message);
      const rows = data.data.grouped_history.flatMap(group => group.items);
      if (!rows.length) throw new Error("There is no inventory history to export yet.");
      const cell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
      const csv = [["Reference", "Event", "SIM type", "Network", "Quantity", "From / To", "Stock after", "Time"], ...rows.map(row => [row.reference, row.event_type, row.sim_type, row.network, row.quantity_formatted, row.party_info, row.stock_after, row.time])]
        .map(line => line.map(cell).join(",")).join("\n");
      const href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
      const link = document.createElement("a"); link.href = href; link.download = "regional-inventory-history.csv";
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(href), 1000);
    },
    onSuccess: () => openNotification({ state: "success", title: "CSV download started" }),
    onError: (error: Error) => openNotification({ state: "error", title: "Export failed", description: error.message }),
  });
}

export const rmSimTypes = ["pos", "cctv", "gps", "router"] as const;
export type RmTypeQuantities = Record<RmSimType, number>;
export const emptyRmQuantities = (): RmTypeQuantities => ({ pos: 0, cctv: 0, gps: 0, router: 0 });
export interface RmBatchLine { sim_type: RmSimType; quantity: number; ok: boolean; reference?: string; message: string }
export type RmBatchRequest =
  | { kind: "distribute"; quantities: RmTypeQuantities; coordinator_id: number; network?: string; notes?: string }
  | { kind: "redistribute"; quantities: RmTypeQuantities; from_coordinator_id: number; to_coordinator_id: number; reason: string };

const errorMessage = (error: unknown) =>
  (error as { response?: { data?: { message?: string } } }).response?.data?.message ?? (error as Error).message ?? "Request failed";

// distribute/redistribute accept one sim_type per request, so multi-type flows post one request per non-zero type.
// Requests run in order and stop at the first failure, so the receipt shows exactly which types moved.
export function useRmBatchTransfer() {
  const client = useQueryClient();
  const userId = useAuthStore(state => state.user?.id);
  return useMutation({
    mutationFn: async (request: RmBatchRequest): Promise<RmBatchLine[]> => {
      const lines: RmBatchLine[] = [];
      for (const sim_type of rmSimTypes) {
        const quantity = request.quantities[sim_type];
        if (!quantity) continue;
        const payload = request.kind === "distribute"
          ? { coordinator_id: request.coordinator_id, sim_type, quantity, network: request.network, notes: request.notes }
          : { from_coordinator_id: request.from_coordinator_id, to_coordinator_id: request.to_coordinator_id, sim_type, quantity, reason: request.reason };
        try {
          const { data } = await authedHttpClient.post<ApiResponse<{ reference?: string; message?: string }>>(`${base}/${request.kind}`, payload);
          if (!data.success) throw new Error(data.message);
          lines.push({ sim_type, quantity, ok: true, reference: data.data?.reference, message: data.data?.message ?? data.message });
        } catch (error) {
          lines.push({ sim_type, quantity, ok: false, message: errorMessage(error) });
          break;
        }
      }
      return lines;
    },
    onSettled: async (lines) => {
      if (lines?.some(line => line.ok)) await invalidateRmDashboard(client, userId);
      const failed = lines?.find(line => !line.ok);
      if (failed) openNotification({ state: "error", title: "Request failed", description: failed.message });
      else if (lines?.length) openNotification({ state: "success", title: lines.length > 1 ? `${lines.length} SIM types sent successfully` : lines[0].message });
    },
  });
}
