import { keepPreviousData, useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import { QUERY_KEY_AUTH_USER } from "@/features/auth/api/useGetAuthUser";
import type {
  CaPayoutAccountData, CaPayoutAccountPayload, CaPayoutResult, CaPayoutsData, CaPinAmountPayload, CaTransactionParams,
  CaTransactionsData, CaWalletOverview, CaWithdrawProfitResult,
} from "./types";

const base = "/corporate-sales-agent/wallet";
const WALLET_KEYS = ["ca-wallet-overview", "ca-wallet-transactions", "ca-wallet-payouts", "ca-wallet-payout-account", "ca-dashboard-overview"];

function useWalletQuery<T>(key: string, path: string, params?: object, enabled = true) {
  const userId = useAuthStore(s => s.user?.id);
  const token = useAuthStore(s => s.accessToken);
  return useQuery({
    queryKey: [key, userId, params], enabled: Boolean(userId && token && enabled), staleTime: 30_000, placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(base + path, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}

type Options<P, R> = Omit<UseMutationOptions<ApiResponse<R>, Error, P>, "mutationFn">;
function useWalletMutation<P, R>(path: string, options?: Options<P, R>) {
  const client = useQueryClient();
  return useMutation({
    ...options,
    retry: false,
    mutationFn: async (payload: P) => {
      const { data } = await authedHttpClient.post<ApiResponse<R>>(base + path, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      // Balances also show in /user/auth/me, so refresh the wallet keys plus the auth user.
      await Promise.all([...WALLET_KEYS.map(key => client.invalidateQueries({ queryKey: [key] })), client.invalidateQueries({ queryKey: QUERY_KEY_AUTH_USER })]);
      openNotification({ state: "success", title: args[0].message });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}

/** GET /wallet/overview */
export const useGetCaWalletOverview = () => useWalletQuery<CaWalletOverview>("ca-wallet-overview", "/overview");
/** GET /wallet/transactions */
export const useGetCaWalletTransactions = (params: CaTransactionParams) => useWalletQuery<CaTransactionsData>("ca-wallet-transactions", "/transactions", params);
/** GET /wallet/payouts */
export const useGetCaPayouts = (params: { page: number; limit: number }, enabled = true) => useWalletQuery<CaPayoutsData>("ca-wallet-payouts", "/payouts", params, enabled);
/** GET /wallet/payout-account */
export const useGetCaPayoutAccount = (enabled = true) => useWalletQuery<CaPayoutAccountData>("ca-wallet-payout-account", "/payout-account", undefined, enabled);

/** POST /wallet/payout-account */
export const useSaveCaPayoutAccount = (options?: Options<CaPayoutAccountPayload, unknown>) => useWalletMutation<CaPayoutAccountPayload, unknown>("/payout-account", options);
/** POST /wallet/request-payout { amount, pin } */
export const useCaRequestPayout = (options?: Options<CaPinAmountPayload, CaPayoutResult>) => useWalletMutation<CaPinAmountPayload, CaPayoutResult>("/request-payout", options);
/** POST /wallet/withdraw-profit { amount, pin } — moves profit into the main wallet. */
export const useCaWithdrawProfit = (options?: Options<CaPinAmountPayload, CaWithdrawProfitResult>) => useWalletMutation<CaPinAmountPayload, CaWithdrawProfitResult>("/withdraw-profit", options);

/** GET /wallet/transactions/export (CSV) with the current filters. */
export function useExportCaTransactions() {
  return useMutation({
    retry: false,
    mutationFn: async (params: Omit<CaTransactionParams, "page" | "limit">) => {
      const { data } = await authedHttpClient.get<Blob>(base + "/transactions/export", { params, responseType: "blob" });
      if (data.type.includes("json")) {
        const body = JSON.parse(await data.text());
        throw new Error(body.message || "Export failed");
      }
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ca-wallet-transactions.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Export failed", description: error.message }),
  });
}
