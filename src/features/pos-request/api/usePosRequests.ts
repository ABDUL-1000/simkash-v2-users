import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { CreatePosRequestPayload, PosRequestDetail, PosRequestListItem, PosRequestOptions, PosRequestStatusFilter } from "../types/api";

const base = "/user/pos-machine";
export const posRequestKeys = { all: ["pos-requests"] as const };

async function getData<T>(url: string, params?: object, signal?: AbortSignal): Promise<T> {
  const { data } = await authedHttpClient.get<ApiResponse<T>>(url, { params, signal });
  if (!data.success) throw new Error(data.message);
  return data.data;
}

/** Form options: business types, monthly volumes, providers and the process steps. */
export const useGetPosRequestOptions = () => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: [...posRequestKeys.all, "options"],
    queryFn: ({ signal }) => getData<PosRequestOptions>(`${base}/options`, undefined, signal),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 30,
  });
};

/** "My POS Requests", filtered by status and searched server-side. The endpoint returns the full list (no pagination). */
export const useGetPosRequests = ({ status, search }: { status: PosRequestStatusFilter; search?: string }) => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: [...posRequestKeys.all, "list", { status, search }],
    queryFn: ({ signal }) => getData<PosRequestListItem[]>(`${base}/requests`, { status, ...(search ? { search } : {}) }, signal),
    enabled: Boolean(token),
    staleTime: 1000 * 60,
  });
};

export const useGetPosRequestDetail = (id?: number | null) => {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: [...posRequestKeys.all, "detail", id],
    queryFn: ({ signal }) => getData<PosRequestDetail>(`${base}/requests/${id}`, undefined, signal),
    enabled: Boolean(token && id),
  });
};

type CreateResponse = ApiResponse<PosRequestDetail>;
export const useCreatePosRequest = (options?: UseMutationOptions<CreateResponse, Error, CreatePosRequestPayload>) => {
  const client = useQueryClient();
  return useMutation<CreateResponse, Error, CreatePosRequestPayload>({
    ...options,
    mutationFn: async (payload) => {
      const { data } = await authedHttpClient.post<CreateResponse>(`${base}/request`, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (...args) => {
      openNotification({ state: "success", title: "POS request submitted", description: args[0].message });
      void client.invalidateQueries({ queryKey: posRequestKeys.all });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "POS request failed", description: args[0].message });
      options?.onError?.(...args);
    },
  });
};
