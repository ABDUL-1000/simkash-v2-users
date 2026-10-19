import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { RequestSimPayload, RequestSimResponseData } from "../types/api";

type RequestSimResponse = ApiResponse<RequestSimResponseData>;

export const useRequestDeviceSim = (options?: UseMutationOptions<RequestSimResponse, Error, RequestSimPayload>) => {
  const client = useQueryClient();
  return useMutation<RequestSimResponse, Error, RequestSimPayload>({
    ...options,
    mutationFn: async (payload) => {
      const { data } = await authedHttpClient.post<RequestSimResponse>("/user/device-sim/request", payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (...args) => {
      void client.invalidateQueries({ queryKey: ["device-sim-overview"] });
      void client.invalidateQueries({ queryKey: ["device-sim-list"] });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "SIM request failed", description: args[0].message });
      options?.onError?.(...args);
    },
  });
};
