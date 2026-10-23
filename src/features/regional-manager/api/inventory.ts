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
export type RmTypeSims = Record<RmSimType, string[]>;
export const emptyRmSims = (): RmTypeSims => ({ pos: [], cctv: [], gps: [], router: [] });
export const simsToQuantities = (sims: RmTypeSims): RmTypeQuantities => ({ pos: sims.pos.length, cctv: sims.cctv.length, gps: sims.gps.length, router: sims.router.length });

// ---- Redistributable SIMs: unactivated stock sitting with SCs ----
export interface RmRedistributableSim {
  id: number; sim_number: string; type: string; type_label: string; network: string; network_code: string; network_color: string;
  status: string; status_label: string; distributed_at: string;
  current_coordinator: { id: number; user_id: number; name: string; phone: string; state: string };
}
export interface RmRedistributableData {
  sims: RmRedistributableSim[];
  summary: { total: number; pos: number; cctv: number; gps: number; router: number; cctv_device: number; coordinators_count: number };
  coordinators: Array<{ coordinator_id: number; user_id: number; name: string; phone: string; state: string; unactivated_count: number; breakdown: Record<RmSimType | "cctv_device", number> }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
export interface RmRedistributableParams extends RmPage { type?: string; coordinator_id?: number; search?: string }
export const useGetRmRedistributableSims = (params: RmRedistributableParams, enabled = true) => useRmQuery<RmRedistributableData>("rm-redistributable-sims", "/redistributable", params, enabled, base);

export interface RmBatchLine { sim_type: RmSimType; quantity: number; ok: boolean; reference?: string; message: string }
export type RmBatchRequest =
  | { kind: "distribute"; sims: RmTypeSims; coordinator_id: number; phone?: string; notes?: string }
  | { kind: "redistribute"; sims: RmTypeSims; from_coordinator_id: number; from_phone?: string; to_coordinator_id: number; phone?: string; reason: string };
interface RmTransferResponse { reference?: string; message?: string; summary?: Partial<Record<RmSimType, number>> }

const errorMessage = (error: unknown) =>
  (error as { response?: { data?: { message?: string } } }).response?.data?.message ?? (error as Error).message ?? "Request failed";

// POST /distribute and /redistribute take every type at once as { sims: { pos: [...], ... } }.
// The result is returned as one line per SIM type so the existing receipts can show the breakdown.
export function useRmBatchTransfer() {
  const client = useQueryClient();
  const userId = useAuthStore(state => state.user?.id);
  return useMutation({
    mutationFn: async (request: RmBatchRequest): Promise<RmBatchLine[]> => {
      const types = rmSimTypes.filter(type => request.sims[type].length);
      const sims = Object.fromEntries(types.map(type => [type, request.sims[type]]));
      const payload = request.kind === "distribute"
        ? { coordinator_id: request.coordinator_id, phone: request.phone, sims, notes: request.notes }
        : { from_coordinator_id: request.from_coordinator_id, from_phone: request.from_phone, to_coordinator_id: request.to_coordinator_id, phone: request.phone, sims, reason: request.reason, note: request.reason };
      try {
        const { data } = await authedHttpClient.post<ApiResponse<RmTransferResponse>>(`${base}/${request.kind}`, payload);
        if (!data.success) throw new Error(data.message);
        const message = data.data?.message ?? data.message;
        return types.map(sim_type => ({ sim_type, quantity: data.data?.summary?.[sim_type] ?? request.sims[sim_type].length, ok: true, reference: data.data?.reference, message }));
      } catch (error) {
        const total = types.reduce((sum, type) => sum + request.sims[type].length, 0);
        return [{ sim_type: types[0] ?? "pos", quantity: total, ok: false, message: errorMessage(error) }];
      }
    },
    onSettled: async (lines) => {
      if (lines?.some(line => line.ok)) await invalidateRmDashboard(client, userId);
      const failed = lines?.find(line => !line.ok);
      if (failed) openNotification({ state: "error", title: "Request failed", description: failed.message });
      else if (lines?.length) openNotification({ state: "success", title: lines[0].message });
    },
  });
}

// ---- History event detail (GET /history/{id}) ----
export interface RmHistoryDetailData {
  id: string; reference: string; event_type: string; event_label: string; event_badge_color: string;
  quantity: number; quantity_delta: number; quantity_formatted: string; party_info: string;
  recipient?: { id: number; name: string; role: string; phone?: string; state?: string };
  sender?: { id: number; name: string; role: string; phone?: string };
  stock_after?: number; time: string; created_at: string; date_group: string;
  sim_type: string; sim_type_label: string; network: string;
  breakdown: Record<string, number>; total_sims: number; page: number; limit: number; total_pages: number;
  sims: Array<{ id: number; sim_number: string; serial_no?: string; network: string; status: string; sim_type: string; sim_type_label: string; assigned_date?: string }>;
}
export const useGetRmInventoryHistoryDetail = (id: string | undefined, page: number) =>
  useRmQuery<RmHistoryDetailData>("rm-inventory-history-detail", `/history/${encodeURIComponent(id ?? "")}`, { page, limit: 100 }, Boolean(id), base);
