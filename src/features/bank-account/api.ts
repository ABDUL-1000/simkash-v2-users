import { useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type { Bank, VerifiedBankAccount, VerifyBankAccountPayload } from "./types";

// Shared OPay bank endpoints, used by every dashboard that sets up a payout account.
export const getBanksApi = async (countryCode = "NG"): Promise<Bank[]> => {
  const { data } = await authedHttpClient.get<ApiResponse<Bank[]>>("/user/payment/banks", { params: { countryCode } });
  if (!data.success) throw new Error(data.message);
  return data.data ?? [];
};

export const verifyBankAccountApi = async (payload: VerifyBankAccountPayload): Promise<VerifiedBankAccount> => {
  const { data } = await authedHttpClient.post<ApiResponse<VerifiedBankAccount>>("/user/payment/verify-account", payload);
  if (!data.success) throw new Error(data.message);
  return data.data;
};

/** Supported banks, sorted by name. Cached for the session — the list rarely changes. */
export function useGetBanks(countryCode = "NG") {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: ["payment-banks", countryCode],
    queryFn: () => getBanksApi(countryCode),
    select: banks => [...banks].sort((a, b) => a.name.localeCompare(b.name)),
    enabled: Boolean(token),
    staleTime: 24 * 60 * 60 * 1000,
  });
}

/**
 * Resolves the account holder name once a bank and a 10-digit account number are supplied.
 * Modelled as a query so each bank/number pair is verified once and stale responses can't overwrite newer input.
 */
export function useVerifyBankAccount(payload: Partial<VerifyBankAccountPayload>) {
  const ready = Boolean(payload.bank_code && /^\d{10}$/.test(payload.account_number ?? ""));
  return useQuery({
    queryKey: ["payment-verify-account", payload.bank_code, payload.account_number],
    queryFn: () => verifyBankAccountApi({ bank_code: payload.bank_code!, account_number: payload.account_number! }),
    enabled: ready,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
}
