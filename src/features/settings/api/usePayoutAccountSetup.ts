import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import { normalizeRole, type CanonicalRole } from "@/utils/auth/roleRouting";
import type { ApiResponse } from "@/features/auth/types/api";
import type { BankAccountDetails } from "@/features/bank-account";

type Endpoint = { path: string; supportsDefault: boolean; body: (details: BankAccountDetails, isDefault: boolean) => object };

const snake = (details: BankAccountDetails) => ({ bank_name: details.bank_name, bank_code: details.bank_code, account_number: details.account_number, account_name: details.account_name });
const snakeWithDefault = (details: BankAccountDetails, isDefault: boolean) => ({ ...snake(details), is_default: isDefault });

/** Each agent role saves its payout account through its own wallet endpoint. */
const PAYOUT_ACCOUNT_ENDPOINTS: Partial<Record<CanonicalRole, Endpoint>> = {
  PARTNER: { path: "/partner/wallet/payout-account", supportsDefault: true, body: snakeWithDefault },
  STATE_COORDINATOR: { path: "/state-coordinator/wallet/payout-account", supportsDefault: true, body: snakeWithDefault },
  REGIONAL_MANAGER: { path: "/regional-manager/wallet/payout-account", supportsDefault: true, body: snakeWithDefault },
  CORPORATE_SALES_AGENT: { path: "/corporate-sales-agent/wallet/payout-account", supportsDefault: false, body: snake },
  ENTERPRISE: { path: "/enterprise/wallet/payout-account", supportsDefault: false, body: snake },
  INSTALLER: { path: "/installer/wallet/payout-account", supportsDefault: false, body: (d) => ({ bankCode: d.bank_code, accountNumber: d.account_number, bankName: d.bank_name }) },
};

/** Every role except a normal customer gets the Bank Account settings tab. */
export function useCanManageBankAccount() {
  const role = normalizeRole(useAuthStore((s) => s.user?.role));
  return role !== null && role !== "USER";
}

/** The current role's payout-account endpoint, or null if there isn't one yet. */
export function usePayoutAccountEndpoint() {
  const role = normalizeRole(useAuthStore((s) => s.user?.role));
  return (role && PAYOUT_ACCOUNT_ENDPOINTS[role]) || null;
}

export function useSavePayoutAccount() {
  const client = useQueryClient();
  const endpoint = usePayoutAccountEndpoint();
  return useMutation({
    retry: false,
    mutationFn: async ({ details, isDefault }: { details: BankAccountDetails; isDefault: boolean }) => {
      if (!endpoint) throw new Error("Bank account setup isn't available for your account yet");
      const { data } = await authedHttpClient.post<ApiResponse<unknown>>(endpoint.path, endpoint.body(details, isDefault));
      if (!data.success) throw new Error(data.message || "Unable to save bank account");
      return data;
    },
    // The account shows up in the profile, every wallet page and every payout modal, so refresh them all.
    onSuccess: async () => {
      await client.invalidateQueries();
      openNotification({ state: "success", title: "Bank account saved", description: "It will now receive your payouts." });
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Could not save bank account", description: error.message }),
  });
}
