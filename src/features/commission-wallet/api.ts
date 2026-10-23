import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";

export type CommissionRole = "partner" | "state-coordinator" | "regional-manager";

const WITHDRAW_PATHS: Record<CommissionRole, string> = {
  partner: "/partner/wallet/withdraw-commission",
  "state-coordinator": "/state-coordinator/wallet/withdraw-commission",
  "regional-manager": "/regional-manager/wallet/withdraw-commission",
};

export interface WithdrawCommissionPayload { amount: number; pin: string }
export interface WithdrawCommissionResult { withdrawn_amount: number; commission_balance: number; wallet_balance: number; reference: string }

/** POST /{role}/wallet/withdraw-commission: moves commission into the main wallet balance. */
export function useWithdrawCommission(role: CommissionRole) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (payload: WithdrawCommissionPayload) => {
      const { data } = await authedHttpClient.post<ApiResponse<WithdrawCommissionResult>>(WITHDRAW_PATHS[role], payload);
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
    // Both balances appear in /me and in each role's wallet/dashboard queries, so refresh everything that's mounted.
    onSuccess: () => client.invalidateQueries(),
  });
}
