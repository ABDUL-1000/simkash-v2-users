import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import { invalidateScOperations } from "./cache";

export function useScResource<T>(key: string, url: string, params?: object, enabled = true) {
  const token = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.user?.id);
  return useQuery({
    queryKey: [key, userId, url, params],
    enabled: Boolean(token && userId) && enabled,
    staleTime: 60_000,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(url, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}

export type ScMutationOptions<T> = Omit<UseMutationOptions<ApiResponse<unknown>, Error, T>, "mutationFn">;
export function useScOperation<T>(url: string, method: "post" | "put" = "post", options?: ScMutationOptions<T>) {
  const client = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  return useMutation({
    ...options,
    mutationFn: async (payload: T) => {
      const { data } = await authedHttpClient[method]<ApiResponse<unknown>>(url, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      openNotification({ state: "success", title: args[0].message });
      await invalidateScOperations(client, userId);
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}

export async function downloadScCsv(url: string, filename: string) {
  const { data } = await authedHttpClient.get<Blob>(url, { responseType: "blob" });
  if (data.type.includes("json")) {
    const response = JSON.parse(await data.text()) as { message?: string };
    throw new Error(response.message || "Export failed.");
  }
  const href = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(href), 1000);
}
