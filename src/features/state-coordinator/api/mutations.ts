import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type { ScDistributionPayload, ScOnboardPayload, ScPayoutAccountPayload, ScTransactionFilters } from "../types/requests";
import { scEndpoints } from "./endpoints";
import { invalidateScOperations } from "./cache";

function useScMutation<T>(endpoint: string) {
  const client = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  return useMutation({
    mutationFn: async (payload: T) => {
      const { data } = await authedHttpClient.post<ApiResponse<unknown>>(endpoint, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: () => invalidateScOperations(client, userId),
  });
}
export const useScDistribute = () => useScMutation<ScDistributionPayload>(scEndpoints.distribute);
export const useScOnboardPartner = () => useScMutation<ScOnboardPayload>(scEndpoints.onboardPartner);
export const useScSavePayoutAccount = () => useScMutation<ScPayoutAccountPayload>(scEndpoints.payoutAccount);
export const useScRequestPayout = (source: "dashboard" | "wallet") =>
  useScMutation<{ amount: number }>(source === "dashboard" ? scEndpoints.dashboardPayout : scEndpoints.walletPayout);

export const useScExportStatement = () => useMutation({
  mutationFn: async (params: ScTransactionFilters) => {
    const { data } = await authedHttpClient.get<Blob>(scEndpoints.exportStatement, { params, responseType: "blob" });
    if (data.type.includes("json")) {
      const error = JSON.parse(await data.text()) as { message?: string };
      throw new Error(error.message || "Statement download failed.");
    }
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "state-coordinator-statement.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
});
