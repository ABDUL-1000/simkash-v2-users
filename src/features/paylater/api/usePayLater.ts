import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type {
  PayLaterAccount, PayLaterDashboard, PayLaterEligibilityResult, PayLaterPurchaseKind, PayLaterPurchaseResult, PayLaterRepayPayload,
  PayLaterRepayResult, PayLaterSchedule, PayLaterTransactionDetail, PayLaterTransactionStatus, PayLaterTransactionsData,
} from "../types/api";

const base = "/user/billpayment/paylater";
export const payLaterKeys = { all: ["paylater"] as const };

async function get<T>(path: string, params?: object, signal?: AbortSignal) {
  const { data } = await authedHttpClient.get<ApiResponse<T>>(`${base}${path}`, { params, signal });
  if (!data.success) throw new Error(data.message);
  return data.data;
}
async function post<T>(path: string, body?: object) {
  const { data } = await authedHttpClient.post<ApiResponse<T>>(`${base}${path}`, body);
  if (!data.success) throw new Error(data.message);
  return data;
}

function usePayLaterQuery<T>(key: unknown[], path: string, params?: object, enabled = true) {
  const token = useAuthStore(state => state.accessToken);
  return useQuery({
    queryKey: [...payLaterKeys.all, ...key],
    queryFn: ({ signal }) => get<T>(path, params, signal),
    enabled: Boolean(token) && enabled,
    staleTime: 1000 * 30,
  });
}

/** Refreshes every PayLater view plus wallet balances after a credit purchase, repayment or limit change. */
function useInvalidatePayLater() {
  const client = useQueryClient();
  return () => Promise.all([
    client.invalidateQueries({ queryKey: payLaterKeys.all }),
    client.invalidateQueries({ queryKey: ["user-wallet"] }),
    client.invalidateQueries({ queryKey: ["user-wallet-summary"] }),
    client.invalidateQueries({ queryKey: ["user-wallet-transactions"] }),
  ]);
}

export const useGetPayLaterDashboard = () => usePayLaterQuery<PayLaterDashboard>(["dashboard"], "/dashboard");
export const useGetPayLaterAccount = () => usePayLaterQuery<PayLaterAccount>(["account"], "/account");
export const useGetPayLaterSchedule = () => usePayLaterQuery<PayLaterSchedule>(["schedule"], "/schedule");
export const useGetPayLaterTransactions = (params: { status: PayLaterTransactionStatus; billType?: string; page: number; limit: number }, enabled = true) =>
  usePayLaterQuery<PayLaterTransactionsData>(["transactions", params], "/transactions", params, enabled);
export const useGetPayLaterTransaction = (id?: number | null) => usePayLaterQuery<PayLaterTransactionDetail>(["transaction", id], `/transactions/${id}`, undefined, Boolean(id));

/** "Check Eligibility": GET without a requested limit, POST when the user asks for a specific limit. */
export function useCheckPayLaterEligibility() {
  const invalidate = useInvalidatePayLater();
  return useMutation({
    mutationFn: async (requestedLimit?: number) => {
      if (requestedLimit) return (await post<PayLaterEligibilityResult>("/check-eligibility", { requestedLimit })).data;
      const { data } = await authedHttpClient.get<ApiResponse<PayLaterEligibilityResult>>(`${base}/check-eligibility`);
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
    onSuccess: () => void invalidate(),
    onError: (error: Error) => openNotification({ state: "error", title: "Eligibility check failed", description: error.message }),
  });
}

/** Apply for PayLater or request a limit review. */
export function useApplyPayLater() {
  const invalidate = useInvalidatePayLater();
  return useMutation({
    mutationFn: async (requestedLimit: number) => (await post<PayLaterEligibilityResult>("/apply", { requestedLimit })).data,
    onSuccess: () => void invalidate(),
    onError: (error: Error) => openNotification({ state: "error", title: "Request failed", description: error.message }),
  });
}

/** Repay the overall balance (no creditTransactionId) or a single bill. */
export function useRepayPayLater() {
  const invalidate = useInvalidatePayLater();
  return useMutation({
    mutationFn: async (payload: PayLaterRepayPayload) => (await post<PayLaterRepayResult>("/repay", payload)).data,
    onSuccess: () => void invalidate(),
  });
}

const PURCHASE_PATHS: Record<PayLaterPurchaseKind, string> = {
  airtime: "/airtime", data: "/data", electricity: "/electricity", cable: "/cable", waec: "/education/waec", jamb: "/education/jamb",
};
/** Bill purchase charged to PayLater credit. */
export function usePayLaterPurchase(kind: PayLaterPurchaseKind) {
  const invalidate = useInvalidatePayLater();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => (await post<PayLaterPurchaseResult>(PURCHASE_PATHS[kind], payload)).data,
    onSuccess: () => void invalidate(),
  });
}
