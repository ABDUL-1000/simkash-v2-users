import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ActivateSimPayload, ActivateSimResponse, VerifyCustomerPayload, VerifyCustomerResponse } from "../types/api";

export const useVerifyCustomerForSim = () => useMutation({
  mutationFn: async (payload: VerifyCustomerPayload) => (await authedHttpClient.post<VerifyCustomerResponse>("/partner/device-sim/verify-user", payload)).data,
  onError: (error: Error) => openNotification({ state: "error", title: "Customer Verification Failed", description: error.message }),
});
export const useActivateDeviceSim = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ActivateSimPayload) => (await authedHttpClient.post<ActivateSimResponse>("/partner/device-sim/activate", payload)).data,
    onSuccess: (response) => {
      const result = response.data;
      openNotification({ state: "success", title: "SIM Activated", description: `Reference ${result.transaction_reference} · Commission earned ₦${result.partner_commission_earned.toLocaleString()}` });
      void client.invalidateQueries({ queryKey: ["ap-dashboard-summary"] });
      void client.invalidateQueries({ queryKey: ["ap-recent-activations"] });
      void client.invalidateQueries({ queryKey: ["ap-sim-stock"] });
      void client.invalidateQueries({ queryKey: ["ap-activated-sims"] });
      void client.invalidateQueries({ queryKey: ["ap-unactivated-sims"] });
      void client.invalidateQueries({ queryKey: ["user-wallet"] });
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Activation Failed", description: error.message }),
  });
};
