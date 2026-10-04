import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";
import type { ScDashboardOverviewData, ScWalletOverviewData } from "../types/api";
import type { ScActivationParams, ScActivationsData, ScPartnerParams, ScPartnersData, ScTransactionParams, ScTransactionsData } from "../types/requests";
import { scEndpoints } from "./endpoints";

export const scQueryKeys = {
  all: ["state-coordinator"] as const,
  account: (userId: number | undefined) => ["state-coordinator", userId] as const,
};

function useScQuery<T>(resource: string, url: string, params?: object, enabled = true) {
  const token = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.user?.id);
  return useQuery({
    queryKey: [...scQueryKeys.account(userId), resource, params],
    queryFn: async ({ signal }) => {
      const response = await authedHttpClient.get<ApiResponse<T>>(url, { params, signal });
      if (!response.data.success) throw new Error(response.data.message);
      return response.data.data;
    },
    enabled: Boolean(token && userId) && enabled,
    staleTime: 60_000,
  });
}

export const useScDashboard = () => useScQuery<ScDashboardOverviewData>("dashboard", scEndpoints.dashboard);
export const useScWallet = () => useScQuery<ScWalletOverviewData>("wallet", scEndpoints.wallet);
export const useScPartners = (params: ScPartnerParams) => useScQuery<ScPartnersData>("partners", scEndpoints.partners, params);
export const useScActivations = (params: ScActivationParams) => useScQuery<ScActivationsData>("activations", scEndpoints.activations, params);
export const useScTransactions = (params: ScTransactionParams, enabled = true) => useScQuery<ScTransactionsData>("transactions", scEndpoints.transactions, params, enabled);

// GET payout-account is not consumed: its supplied response documents payout history
// instead of a bank account. The overview's payout_account is the documented read model.
