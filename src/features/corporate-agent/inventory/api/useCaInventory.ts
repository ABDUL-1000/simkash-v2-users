import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { CaInventoryOverviewData, CaDistributeContextData, CaApPreviewData, CaDistributionPayload, CaDistributePreviewResponseData, CaDistributionResult, CaInventoryHistoryResponseData, CaHistoryParams, CaRequisitionPayload, CaRequisitionResult, CaStockRequestItem } from "../types/inventory";

const base = "/corporate-sales-agent/sim-inventory";
function useInventoryQuery<T>(key: string, path: string, params?: object, enabled = true) {
  const userId = useAuthStore(s => s.user?.id);
  const token = useAuthStore(s => s.accessToken);
  return useQuery({ queryKey: [key, userId, path, params], enabled: Boolean(userId && token && enabled), staleTime: 30_000,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(`${base}${path}`, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}
type Options<T, R> = Omit<UseMutationOptions<ApiResponse<R>, Error, T>, "mutationFn">;
function useInventoryMutation<T, R>(path: string, resources: string[], options?: Options<T, R>) {
  const client = useQueryClient();
  const userId = useAuthStore(s => s.user?.id);
  return useMutation({ ...options,
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
export const useGetCaDistributeContext = () => useInventoryQuery<CaDistributeContextData>("ca-distribute-context", "/distribute-context");
export const useGetCaApPreview = (id?: number) => useInventoryQuery<CaApPreviewData>("ca-ap-preview", `/ap-preview/${id}`, undefined, Boolean(id));
export const useGetCaInventoryHistory = (params: CaHistoryParams) => useInventoryQuery<CaInventoryHistoryResponseData>("ca-inventory-history", "/history", params);
export const useGetCaStockRequests = (params: { page: number; limit: number }) => useInventoryQuery<CaStockRequestItem[]>("ca-inventory-requests", "/requests", params);
export const useExecuteCaDistribution = (options?: Options<CaDistributionPayload, CaDistributionResult>) => useInventoryMutation("/distribute", ["ca-inventory-overview", "ca-distribute-context", "ca-inventory-history", "ca-ap-preview", "ca-dashboard-overview", "ca-managed-partners"], options);
export const useCaRequestStockReplenishment = (options?: Options<CaRequisitionPayload, CaRequisitionResult>) => useInventoryMutation("/request-stock", ["ca-inventory-overview", "ca-inventory-requests", "ca-inventory-history", "ca-dashboard-overview"], options);

// This POST only calculates a preview. A query key per input and abort signal prevent
// an older preview from replacing the current partner/quantities after rapid edits.
export function useCalculateCaDistributePreview(payload: CaDistributionPayload, enabled: boolean) {
  const userId = useAuthStore(s => s.user?.id);
  const token = useAuthStore(s => s.accessToken);
  return useQuery({ queryKey: ["ca-distribution-preview", userId, payload], enabled: Boolean(userId && token && enabled), staleTime: 0,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.post<ApiResponse<CaDistributePreviewResponseData>>(`${base}/distribute/preview`, { partner_id: payload.partner_id, quantities: payload.quantities }, { signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}
