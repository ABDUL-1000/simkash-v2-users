import { keepPreviousData, useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type {
  CaDistributionPayload, CaDistributionResult, CaHistoryDetailData, CaHistoryParams, CaInventoryHistoryData, CaInventoryOverviewData,
  CaRedistributableData, CaRedistributableParams, CaRedistributionPayload, CaRedistributionResult, CaRequisitionPayload, CaRequisitionResult,
  CaSimListData, CaSimListParams, CaStockRequestItem, CaUndistributedData,
} from "../types/inventory";

const base = "/corporate-sales-agent/sim-inventory";
function useInventoryQuery<T>(key: string, path: string, params?: object, enabled = true) {
  const userId = useAuthStore(s => s.user?.id);
  const token = useAuthStore(s => s.accessToken);
  return useQuery({ queryKey: [key, userId, path, params], enabled: Boolean(userId && token && enabled), staleTime: 30_000, placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(`${base}${path}`, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}
type Options<T, R> = Omit<UseMutationOptions<ApiResponse<R>, Error, T>, "mutationFn">;
// Stock moves change every inventory/partner/dashboard figure, so refresh all of them.
const STOCK_KEYS = ["ca-inventory-overview", "ca-undistributed-sims", "ca-available-sims", "ca-redistributable-sims", "ca-inventory-history", "ca-dashboard-overview", "ca-partners-overview", "ca-partner-detail", "ca-partner-stock-history"];
function useInventoryMutation<T, R>(path: string, resources: string[], options?: Options<T, R>) {
  const client = useQueryClient();
  const userId = useAuthStore(s => s.user?.id);
  return useMutation({ ...options, retry: false,
    mutationFn: async (payload: T) => {
      const { data } = await authedHttpClient.post<ApiResponse<R>>(`${base}${path}`, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      await Promise.all(resources.map(key => client.invalidateQueries({ queryKey: [key, userId] })));
      openNotification({ state: "success", title: args[0].message });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}

export const useGetCaInventoryOverview = () => useInventoryQuery<CaInventoryOverviewData>("ca-inventory-overview", "/overview");
/** Your own undistributed SIMs (or a given AP's with agentId). The summary gives per-type stock. */
export const useGetCaUndistributedSims = ({ agentId, ...params }: CaSimListParams & { agentId?: number }, enabled = true) =>
  useInventoryQuery<CaUndistributedData>("ca-undistributed-sims", "/undistributed", { ...params, agent_id: agentId }, enabled);
export const useGetCaAvailableSims = (params: CaSimListParams) => useInventoryQuery<CaSimListData>("ca-available-sims", "/available", params);
export const useGetCaRedistributableSims = ({ partnerId, type = "all", ...params }: CaRedistributableParams, enabled = true) =>
  useInventoryQuery<CaRedistributableData>("ca-redistributable-sims", "/redistributable", { ...params, type, partner_id: partnerId }, enabled);
export const useGetCaInventoryHistory = (params: CaHistoryParams) => useInventoryQuery<CaInventoryHistoryData>("ca-inventory-history", "/history", params);
export const useGetCaInventoryHistoryDetail = (id: string | undefined, page: number) =>
  useInventoryQuery<CaHistoryDetailData>("ca-inventory-history-detail", `/history/${encodeURIComponent(id ?? "")}`, { page, limit: 100 }, Boolean(id));
export const useGetCaStockRequests = () => useInventoryQuery<CaStockRequestItem[]>("ca-inventory-requests", "/requests");

export const useCaDistributeSims = (options?: Options<CaDistributionPayload, CaDistributionResult>) => useInventoryMutation("/distribute", STOCK_KEYS, options);
export const useCaRedistributeSims = (options?: Options<CaRedistributionPayload, CaRedistributionResult>) => useInventoryMutation("/redistribute", STOCK_KEYS, options);
export const useCaRequestStockReplenishment = (options?: Options<CaRequisitionPayload, CaRequisitionResult>) =>
  useInventoryMutation("/request-stock", ["ca-inventory-overview", "ca-inventory-requests", "ca-dashboard-overview"], options);
