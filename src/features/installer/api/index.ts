import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type {
  CompletedData, DashboardData, DisputesData, Dispute, IssueCategory, JobDetail, JobsData, JobsTab, PayoutAccount, PayoutRecord,
  Pagination, ReviewsData, VerificationData, WalletData, WalletTransaction,
} from "./types";

export * from "./types";
const BASE = "/installer";
type Method = "get" | "post" | "patch" | "delete";

async function call<T>(method: Method, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const url = BASE + path;
  const response = method === "get" || method === "delete"
    ? await authedHttpClient[method]<ApiResponse<T>>(url, { params: body, signal })
    : await authedHttpClient[method]<ApiResponse<T>>(url, body ?? {}, body instanceof FormData ? { headers: { "Content-Type": "multipart/form-data" } } : undefined);
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}
const clean = (params: object) => Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== "" && v !== "all"));
const notifyError = (title: string) => (error: Error) => openNotification({ state: "error", title, description: error.message });
const useQ = <T,>(key: readonly unknown[], path: string, params?: object, enabled = true) =>
  // Jobs change on the admin side (reassigned, held, verified), so refetch when the app regains focus.
  useQuery({ queryKey: ["installer", ...key], enabled, placeholderData: keepPreviousData, refetchOnWindowFocus: true, queryFn: ({ signal }) => call<T>("get", path, params && clean(params), signal) });

// ---------------- Reads ----------------
export const useInstallerDashboard = () => useQ<DashboardData>(["dashboard"], "/dashboard");
export const useInstallerJobs = (params: { tab: JobsTab; search?: string; sort?: string; page: number; limit: number }) => useQ<JobsData>(["jobs", params], "/jobs", { ...params, tab: params.tab === "all" ? undefined : params.tab });
export const useInstallerJob = (id?: string | number) => useQ<JobDetail>(["job", String(id)], `/jobs/${id}`, undefined, Boolean(id));
export const useInstallerVerification = (params: { stage: string; page: number; limit: number }) => useQ<VerificationData>(["verification", params], "/verification", params);
export const useInstallerDisputes = (params: { status: string; page: number; limit: number }) => useQ<DisputesData>(["disputes", params], "/disputes", params);
export const useInstallerDispute = (id?: number) => useQ<Dispute>(["dispute", id], `/disputes/${id}`, undefined, Boolean(id));
export const useInstallerCompleted = (params: { period: string; jobTypeId?: number; sort: string; search?: string; page: number; limit: number }) => useQ<CompletedData>(["completed", params], "/completed", params);
export const useInstallerReviews = (params: { rating?: number; sort: string; page: number; limit: number }, enabled = true) => useQ<ReviewsData>(["reviews", params], "/reviews", params, enabled);
export const useInstallerWallet = () => useQ<WalletData>(["wallet"], "/wallet");
export const useInstallerTransactions = (params: { type: string; search?: string; from?: string; to?: string; page: number; limit: number }) =>
  useQ<{ transactions?: WalletTransaction[]; items?: WalletTransaction[]; pagination: Pagination }>(["transactions", params], "/wallet/transactions", params);
export const useInstallerPayouts = (params: { page: number; limit: number }) => useQ<{ summary: { paidOut: number; pending: number; failed: number }; payouts: PayoutRecord[]; pagination: Pagination }>(["payouts", params], "/wallet/payouts", params);
export const useInstallerPayoutAccounts = (enabled = true) => useQ<{ defaultAccount: PayoutAccount | null; accounts: PayoutAccount[] }>(["payout-account"], "/wallet/payout-account", undefined, enabled);

// ---------------- Job actions (each returns the full updated job) ----------------
function useJobAction<V>(build: (vars: V) => { method: Method; path: string; body?: unknown }, success: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (vars: V & { jobId: number | string }) => { const r = build(vars); return call<JobDetail>(r.method, `/jobs/${vars.jobId}${r.path}`, r.body); },
    onSuccess: (job, vars) => {
      if (job && typeof job === "object" && "id" in job) client.setQueryData(["installer", "job", String(vars.jobId)], job);
      if (success) openNotification({ state: "success", title: success });
      return client.invalidateQueries({ predicate: (query) => query.queryKey[0] === "installer" && query.queryKey[1] !== "job" });
    },
    // 400/409: the job changed (cancelled, reassigned, admin hold) — refetch it.
    onError: (error: Error, vars) => { notifyError("Action failed")(error); void client.invalidateQueries({ queryKey: ["installer", "job", String(vars.jobId)] }); },
  });
}
export const useMarkEnRoute = () => useJobAction<object>(() => ({ method: "patch", path: "/status", body: { status: "en_route" } }), "Marked as on the way");
export const useStartJob = () => useJobAction<object>(() => ({ method: "post", path: "/start" }), "Job started");
export const useUpdateProgress = () => useJobAction<{ step: number }>(({ step }) => ({ method: "patch", path: "/progress", body: { step } }), "");
export const useToggleEquipment = () => useJobAction<{ equipmentId: number; installed: boolean }>(({ equipmentId, installed }) => ({ method: "patch", path: `/equipment/${equipmentId}`, body: { installed } }), "");
export const useToggleChecklist = () => useJobAction<{ itemId: number; checked: boolean }>(({ itemId, checked }) => ({ method: "patch", path: `/checklist/${itemId}`, body: { checked } }), "");
export const useUploadPhotos = () => useJobAction<{ files: File[]; caption?: string }>(({ files, caption }) => {
  const form = new FormData();
  files.forEach((file) => form.append("photos", file));
  if (caption) form.append("caption", caption);
  return { method: "post", path: "/photos", body: form };
}, "Photos uploaded");
export const useDeletePhoto = () => useJobAction<{ photoId: number }>(({ photoId }) => ({ method: "delete", path: `/photos/${photoId}` }), "Photo removed");
export const useSubmitJob = () => useJobAction<{ notes?: string }>(({ notes }) => ({ method: "post", path: "/submit", body: { notes } }), "Submitted for verification");
export const useHoldJob = () => useJobAction<{ onHold: boolean; reason?: string }>(({ onHold, reason }) => ({ method: "patch", path: "/hold", body: onHold ? { onHold, reason } : { onHold } }), "");
export const useReportIssue = () => useJobAction<{ category: IssueCategory; description: string; hold?: boolean }>(({ category, description, hold }) => ({ method: "post", path: "/issues", body: { category, description, hold } }), "Issue reported");
export const useFailJob = () => useJobAction<{ notes: string }>(({ notes }) => ({ method: "patch", path: "/status", body: { status: "failed", notes } }), "Job marked as couldn't complete");

// ---------------- Verification & disputes ----------------
export const useSendReminder = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (jobId: number) => call<{ sentTo: "customer" | "simkash" }>("post", `/verification/${jobId}/remind`),
    onSuccess: (data) => { openNotification({ state: "success", title: "Reminder sent", description: data?.sentTo === "simkash" ? "Simkash has been reminded." : "The customer has been reminded." }); return client.invalidateQueries({ queryKey: ["installer"] }); },
    onError: notifyError("Reminder not sent"), // 429 message says when the next one is allowed
  });
};
export const useRespondDispute = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, response }: { id: number; response: string }) => call<Dispute>("post", `/disputes/${id}/respond`, { response }),
    onSuccess: () => { openNotification({ state: "success", title: "Response sent" }); return client.invalidateQueries({ queryKey: ["installer"] }); },
    onError: notifyError("Couldn't send response"),
  });
};

// ---------------- Wallet ----------------
export const useSavePayoutAccount = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: { bankCode: string; accountNumber: string; bankName: string }) => call<PayoutAccount>("post", "/wallet/payout-account", body),
    onSuccess: () => client.invalidateQueries({ queryKey: ["installer"] }),
    onError: notifyError("Couldn't verify this account"),
  });
};
export const useRequestInstallerPayout = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (body: { amount: number; pin: string; bankAccountId?: number }) => call<{ payoutId: number; reference: string; amount: number; fee: number; totalDebited: number; status: string; balanceAfter: number; bankAccount: PayoutAccount | null }>("post", "/wallet/payouts", body),
    onSuccess: () => Promise.all([client.invalidateQueries({ queryKey: ["installer"] }), client.invalidateQueries({ queryKey: ["auth-me"] })]),
    onError: notifyError("Payout failed"),
  });
};
export const useRefreshPayout = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: (id: number) => call("post", `/wallet/payouts/${id}/refresh`), onSuccess: () => client.invalidateQueries({ queryKey: ["installer"] }), onError: notifyError("Couldn't refresh payout") });
};
/** GET /wallet/statement → CSV blob (needs the auth header, so no plain link). */
export const useDownloadStatement = () => useMutation({
  mutationFn: async (params: { from?: string; to?: string; type?: string }) => {
    const { data } = await authedHttpClient.get<Blob>(`${BASE}/wallet/statement`, { params: clean(params), responseType: "blob" });
    if (data.type.includes("json")) throw new Error((JSON.parse(await data.text()) as { message?: string }).message || "Statement unavailable");
    const url = URL.createObjectURL(data);
    const link = Object.assign(document.createElement("a"), { href: url, download: `installer-statement-${params.from ?? "all"}-${params.to ?? "now"}.csv` });
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  },
  onError: notifyError("Statement download failed"),
});
