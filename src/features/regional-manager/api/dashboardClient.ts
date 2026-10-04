import { useMutation, useQuery, useQueryClient, type QueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";

export const rmDashboardBase = "/regional-manager/dashboard";
export function invalidateRmDashboard(client: QueryClient, userId?: number) {
  return client.invalidateQueries({ predicate: ({ queryKey }) =>
    typeof queryKey[0] === "string" && queryKey[0].startsWith("rm-") && queryKey[1] === userId });
}

export function useRmQuery<T>(resource: string, path: string, params?: object, enabled = true, base = rmDashboardBase) {
  const token = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.user?.id);
  return useQuery({
    queryKey: [resource, userId, path, params],
    enabled: Boolean(token && userId) && enabled,
    staleTime: 60_000,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(`${base}${path}`, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}

export type RmMutationOptions<T> = Omit<UseMutationOptions<ApiResponse<unknown>, Error, T>, "mutationFn">;
export function useRmMutation<T>(path: string, options?: RmMutationOptions<T>, base = rmDashboardBase) {
  const client = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  return useMutation({
    ...options,
    mutationFn: async (payload: T) => {
      const { data } = await authedHttpClient.post<ApiResponse<unknown>>(`${base}${path}`, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      openNotification({ state: "success", title: args[0].message });
      await invalidateRmDashboard(client, userId);
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}
