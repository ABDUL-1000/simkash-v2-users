import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
const base = "/corporate-sales-agent/dashboard";
export function useCaQuery<T>(key: string, path: string, params?: object) {
  const userId = useAuthStore(state => state.user?.id);
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: [key, userId, params], enabled: Boolean(userId && token), staleTime: 30_000,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(`${base}${path}`, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}
export type CaMutationOptions<T, R> = Omit<UseMutationOptions<ApiResponse<R>, Error, T>, "mutationFn">;
export function useCaMutation<T, R>(path: string, resources: string[], options?: CaMutationOptions<T, R>) {
  const client = useQueryClient();
  const userId = useAuthStore(state => state.user?.id);
  return useMutation({
    ...options,
    mutationFn: async (payload: T) => {
      const { data } = await authedHttpClient.post<ApiResponse<R>>(`${base}${path}`, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      await Promise.all(resources.map(resource => client.invalidateQueries({ queryKey: [resource, userId] })));
      openNotification({ state: "success", title: args[0].message });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}

