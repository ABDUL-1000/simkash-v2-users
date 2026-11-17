import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";

/** PND (Post No Debit) state on a coordinator / partner card or detail. */
export interface PndState { is_pnd: boolean; reason: string | null; placed_at: string | null; placed_by_you: boolean; can_lift: boolean }

/**
 * Where a manager manages PND for someone under them:
 * RM → SC: `/regional-manager/my-state-coordinator/:coordinatorId`
 * SC → AP: `/state-coordinator/my-agent/:agentId`
 */
export const pndBase = {
  coordinator: (id: number | string) => `/regional-manager/my-state-coordinator/${id}/pnd`,
  partner: (id: number | string) => `/state-coordinator/my-agent/${id}/pnd`,
};

async function post(url: string, body: object) {
  const { data } = await authedHttpClient.post<ApiResponse<PndState & { name?: string }>>(url, body);
  if (!data?.success) throw new Error(data?.message || "Request failed");
  return data.data;
}

/** GET …/pnd — used where the screen's own data doesn't include PND. */
export const usePndStatus = (url?: string) => useQuery({
  queryKey: ["pnd", url], enabled: Boolean(url),
  queryFn: async ({ signal }) => {
    const { data } = await authedHttpClient.get<ApiResponse<PndState>>(url!, { signal });
    if (!data?.success) throw new Error(data?.message || "Couldn't load PND status");
    return data.data;
  },
});

/** POST …/pnd { reason } and POST …/pnd/lift { reason? }; the RM/SC lists and details are refetched afterwards. */
export function usePndAction() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ url, lift, reason }: { url: string; lift: boolean; reason?: string }) => post(lift ? `${url}/lift` : url, reason ? { reason } : {}),
    onSuccess: (_data, { lift }) => {
      openNotification({ state: "success", title: lift ? "PND lifted" : "Placed on PND", description: lift ? "Payouts are allowed again." : "They can still earn, but can't withdraw to a bank account." });
      return client.invalidateQueries();
    },
    // 409s mean the account changed (already on PND, suspended, not on PND) — refresh so the card is correct.
    onError: (error: Error) => { openNotification({ state: "error", title: "PND not updated", description: error.message }); return client.invalidateQueries(); },
  });
}
