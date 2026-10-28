import { useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
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
