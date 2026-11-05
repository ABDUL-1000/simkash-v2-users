import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import { QUERY_KEY_USER_PROFILE } from "@/features/settings/api/useGetUserProfile";

/** OPay transfer charge added on top of every payout. */
export const PAYOUT_FEE = 20;

export interface RequestWalletPayoutPayload { amount: number; bank_account_id: number; pin: string; narration?: string }
export interface WalletPayoutBankAccount { id: number; bank_code: string; bank_name: string; account_number: string; account_name: string }
export interface WalletPayoutResult {
  reference: string; opay_order_no?: string; amount: number; fee: number; total_debited: number; status: string;
  payout_type?: string; wallet_field?: string; balance_before?: number; balance_after?: number;
  withdrawal_id?: number; transaction_id?: number; bank_account?: WalletPayoutBankAccount;
}
export interface PayoutStatusData {
  id: number; transaction_type?: string; amount: string | number; transaction_reference: string; status: string;
  description?: string; processed_at?: string | null; balanceBefore?: string | number; balanceAfter?: string | number; createdAt?: string;
}

export type PayoutState = "pending" | "success" | "failed";
export function payoutState(status?: string): PayoutState {
  const value = (status ?? "").toLowerCase();
  if (/success|complete|paid/.test(value)) return "success";
  if (/fail|revers|refund|cancel|declin/.test(value)) return "failed";
  return "pending";
}

const PAYOUT_STATUS_KEY = "opay-payout-status";

/** POST /user/wallet/request-payout — one endpoint for every role; debits amount + ₦20 from the main wallet. */
export function useRequestWalletPayout() {
  const client = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: async (payload: RequestWalletPayoutPayload) => {
      const { data } = await authedHttpClient.post<ApiResponse<WalletPayoutResult>>("/user/wallet/request-payout", payload);
      if (!data.success || !data.data?.reference) throw new Error(data.message || "Unable to request payout");
      return data.data;
    },
    // Balances and wallet histories change everywhere, so refresh every active query.
    onSuccess: () => client.invalidateQueries(),
    onError: (error: Error) => openNotification({ state: "error", title: "Payout failed", description: error.message }),
  });
}

/**
 * GET /user/payment/opay/payout/status/{merchantOrderNo} — the backend asks OPay while the payout is pending.
 * Polls every 5s while pending (up to ~3 minutes); refreshes balances once it settles.
 */
export function usePayoutStatus(reference?: string) {
  const client = useQueryClient();
  return useQuery({
    queryKey: [PAYOUT_STATUS_KEY, reference],
    enabled: Boolean(reference),
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<PayoutStatusData>>(`/user/payment/opay/payout/status/${encodeURIComponent(reference!)}`, { signal });
      if (!data.success) throw new Error(data.message || "Unable to check payout status");
      if (payoutState(data.data?.status) !== "pending") void client.invalidateQueries({ predicate: (query) => query.queryKey[0] !== PAYOUT_STATUS_KEY });
      return data.data;
    },
    refetchInterval: (query) => payoutState(query.state.data?.status) === "pending" && query.state.dataUpdateCount < 36 ? 5000 : false,
  });
}

/** DELETE /user/wallet/bank-accounts/{id} */
export function useDeleteBankAccount() {
  const client = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: async (id: number) => {
      const { data } = await authedHttpClient.delete<ApiResponse<unknown>>(`/user/wallet/bank-accounts/${id}`);
      if (!data.success) throw new Error(data.message || "Unable to remove bank account");
      return data;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: QUERY_KEY_USER_PROFILE });
      openNotification({ state: "success", title: "Bank account removed" });
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Could not remove account", description: error.message }),
  });
}
