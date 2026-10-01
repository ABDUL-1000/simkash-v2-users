import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { RenewSimPayload } from "../types/api";

type RenewResponse = ApiResponse<{ reference?: string; status?: string }>;

export const useRenewDeviceSim = (options?: UseMutationOptions<RenewResponse, Error, RenewSimPayload>) => {
  const client = useQueryClient();
  return useMutation<RenewResponse, Error, RenewSimPayload>({
    mutationFn: async (payload: RenewSimPayload) => (await authedHttpClient.post<RenewResponse>("/user/device-sim/renew", payload)).data,
    onSuccess: (...args) => {
      openNotification({ state: "success", title: "SIM renewal submitted", description: "Your renewal request was received." });
      void client.invalidateQueries({ queryKey: ["device-sim-overview"] });
      void client.invalidateQueries({ queryKey: ["device-sim-list"] });
      void client.invalidateQueries({ queryKey: ["device-sim-detail"] });
      void client.invalidateQueries({ queryKey: ["user-wallet"] });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Renewal failed", description: args[0].message });
      options?.onError?.(...args);
    },
  });
};
