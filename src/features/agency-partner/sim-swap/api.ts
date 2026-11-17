import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";

// Partner SIM swap — /partner/sim-swap
export type SwapReason = "NETWORK_CHANGE" | "LOST" | "DAMAGED";
export type SwapPayer = "AGENT" | "CUSTOMER";
export type SwapStatus = "PENDING" | "COMPLETED" | "REJECTED" | "CANCELLED";
export type SwapTab = "all" | "pending" | "completed" | "rejected" | "cancelled";

export interface SwapRequest {
  id: number; reference: string; status: SwapStatus; sim_type: string; sim_type_label: string;
  swap_type: "SAME_NETWORK" | "CROSS_NETWORK"; reason: SwapReason; reason_label: string; initiated_by: "PARTNER" | "ADMIN";
  customer: { id: number; name: string; phone: string } | null;
  old_sim: { sim_number: string; network: string }; new_sim: { sim_number: string; network: string };
  fee: number; fee_formatted: string; payer: "AGENT" | "CUSTOMER" | "WAIVED" | null;
  agent_note: string | null; rejection_reason: string | null; reviewed_at: string | null; created_at: string; time_ago: string;
}
export interface CustomerSim {
  sim_number: string; network: string; sim_type: string; sim_type_label: string; activation_status: string;
  activated_at: string | null; expires_at: string | null; pending_swap_reference: string | null; can_swap: boolean;
}
export interface ReplacementSim { id: number; sim_number: string; network: string; sim_type: string; sim_type_label: string }
export interface SwapQuote {
  old_sim: { sim_number: string; network: string; sim_type: string; sim_type_label: string; activated_at: string | null; expires_at: string | null };
  new_sim: { sim_number: string; network: string; sim_type: string; sim_type_label: string };
  customer: { id: number; name: string; phone: string; wallet_balance: number };
  agent_wallet_balance: number; reason: SwapReason; reason_label: string; swap_type: "SAME_NETWORK" | "CROSS_NETWORK";
  fee: number; fee_formatted: string; is_free: boolean; payer_options: SwapPayer[]; customer_can_pay: boolean; agent_can_pay: boolean;
}
export interface SwapSubmitPayload { old_sim_number: string; new_sim_number: string; reason: SwapReason; payer?: SwapPayer; pin?: string; note?: string }
interface Pagination { page: number; limit: number; total: number; total_pages: number }

const BASE = "/partner/sim-swap";
async function call<T>(method: "get" | "post", url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const { data } = method === "get"
    ? await authedHttpClient.get<ApiResponse<T>>(url, { params: body, signal })
    : await authedHttpClient.post<ApiResponse<T>>(url, body ?? {});
  if (!data?.success) throw new Error(data?.message || "Request failed");
  return data.data;
}

/** GET /customer-sims?phone= — enabled once an 11-digit phone is entered. */
export const useSwapCustomerSims = (phone: string) => useQuery({
  queryKey: ["sim-swap", "customer-sims", phone], enabled: /^\d{11}$/.test(phone), retry: false,
  queryFn: ({ signal }) => call<{ customer: { id: number; name: string; phone: string }; sims: CustomerSim[]; total: number }>("get", `${BASE}/customer-sims`, { phone }, signal),
});
/** GET /replacement-sims?sim_type= (+ network, search). */
export const useSwapReplacementSims = (params: { sim_type?: string; network?: string; search?: string }) => useQuery({
  queryKey: ["sim-swap", "replacement-sims", params], enabled: Boolean(params.sim_type), placeholderData: keepPreviousData,
  queryFn: ({ signal }) => call<{ items: ReplacementSim[]; pagination: Pagination }>("get", `${BASE}/replacement-sims`, { ...params, page: 1, limit: 100 }, signal),
});
/** POST /quote — runs every submit validation; its message is shown as-is on failure. */
export const useSwapQuote = () => useMutation({ mutationFn: (body: { old_sim_number: string; new_sim_number: string; reason: SwapReason }) => call<SwapQuote>("post", `${BASE}/quote`, body) });
export const useSubmitSwap = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: SwapSubmitPayload) => call<SwapRequest>("post", BASE, body),
    onSuccess: () => Promise.all([client.invalidateQueries({ queryKey: ["sim-swap"] }), client.invalidateQueries({ queryKey: ["auth-me"] })]),
  });
};
export const useSwapRequests = (params: { status: SwapTab; search?: string; page: number; limit: number }) => useQuery({
  queryKey: ["sim-swap", "requests", params], placeholderData: keepPreviousData,
  queryFn: ({ signal }) => call<{ tabs: Record<SwapTab, number>; items: SwapRequest[]; pagination: Pagination }>("get", BASE, { ...params, search: params.search || undefined }, signal),
});
export const useCancelSwap = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => call<SwapRequest>("post", `${BASE}/${id}/cancel`),
    onSuccess: (swap) => { openNotification({ state: "success", title: "Swap cancelled", description: swap?.fee ? "The fee has been refunded to the wallet it came from." : undefined }); return Promise.all([client.invalidateQueries({ queryKey: ["sim-swap"] }), client.invalidateQueries({ queryKey: ["auth-me"] })]); },
    onError: (error: Error) => { openNotification({ state: "error", title: "Couldn't cancel", description: error.message }); return client.invalidateQueries({ queryKey: ["sim-swap"] }); },
  });
};
