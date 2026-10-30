import { keepPreviousData, useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type {
  PartnersOverview, PartnerDetail, PartnerCustomersData, PartnerStockHistoryData, PartnerOverviewParams, PartnerOnboardPayload,
  PartnerOnboardResult, PartnerProfile, PartnerUpdateResult, PartnerReminder, PartnerBulkReminder, PartnerReminderResult,
  PartnerSuspendPayload, PartnerStatusResult, VerifiedPartner,
} from "../types/api";

const base = "/corporate-sales-agent/my-partner";
const partnerResources = ["ca-partners-overview", "ca-partner-detail", "ca-partner-customers", "ca-partner-stock-history", "ca-dashboard-overview", "ca-inventory-overview"];

function usePartnerQuery<T>(key: string, path: string, params?: object, enabled = true, normalize?: (raw: unknown) => T) {
  const userId = useAuthStore((s) => s.user?.id);
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: [key, userId, path, params],
    enabled: Boolean(userId && token && enabled),
    staleTime: 30_000,
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(base + path, { params, signal });
      if (!data.success) throw new Error(data.message);
      return normalize ? normalize(data.data) : data.data;
    },
  });
}

type Options<P, R> = Omit<UseMutationOptions<ApiResponse<R>, Error, P>, "mutationFn">;
function usePartnerMutation<P, R>(path: string, method: "post" | "put", options?: Options<P, R>, { toast = true, invalidate = true } = {}) {
  const client = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);
  return useMutation({
    ...options,
    retry: false,
    mutationFn: async (payload: P) => {
      const { data } = await authedHttpClient[method]<ApiResponse<R>>(base + path, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      if (invalidate) await Promise.all(partnerResources.map((key) => client.invalidateQueries({ queryKey: [key, userId] })));
      if (toast) openNotification({ state: "success", title: args[0].message });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      if (toast) openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}

// --- Detail normalisation: the backend can return the documented shape or the older one
// (role/last_active as objects, performance.histogram/total_activations, timeline as an object). The page renders one shape.
type Loose = Record<string, unknown>;
const obj = (value: unknown): Loose => (value && typeof value === "object" ? (value as Loose) : {});
const num = (value: unknown) => (typeof value === "number" ? value : Number(value) || 0);
/** A display string from a string, number, or an object carrying label/time_ago/status/text. */
const text = (value: unknown): string => {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  const o = obj(value);
  return text(o.label ?? o.time_ago ?? o.status ?? o.text ?? o.value ?? "");
};
const TIMELINE_LABELS: Record<string, [string, string]> = {
  onboarded_by_you: ["Onboarded by You", "onboard"], first_stock_received: ["First Stock Received", "stock"],
  first_activation: ["First Activation", "sim"], last_login: ["Last Login", "login"],
};
function normalizePartnerDetail(raw: unknown): PartnerDetail {
  const d = obj(raw);
  const bar = obj(d.summary_bar), hero = obj(d.hero), profile = obj(d.profile_details), stock = obj(d.stock_details);
  const perf = obj(d.performance_this_month), commission = d.commission ? obj(d.commission) : undefined;
  const barStock = obj(bar.stock);
  const daily = (Array.isArray(perf.daily_activations) ? perf.daily_activations : Array.isArray(perf.histogram) ? perf.histogram : []) as Loose[];
  const activations = num(perf.activations ?? perf.total_activations);
  const timeline = Array.isArray(d.account_timeline)
    ? (d.account_timeline as Loose[]).map((event) => ({ title: text(event.title), subtitle: text(event.subtitle), icon: text(event.icon) })).filter((event) => !/bonus/i.test(event.title))
    : Object.entries(obj(d.timeline)).filter(([key, value]) => value && !key.includes("bonus")).map(([key, value]) => ({ title: TIMELINE_LABELS[key]?.[0] ?? key.replace(/_/g, " "), subtitle: text(value), icon: TIMELINE_LABELS[key]?.[1] ?? "" }));
  return {
    summary_bar: {
      role: text(bar.role) || "Agency Partner",
      stock: { count: num(barStock.count ?? stock.total_stock), label: text(barStock.label), sublabel: text(barStock.sublabel) },
      customers: { count: num(obj(bar.customers).count) },
      activations: { count: num(obj(bar.activations).count ?? activations) },
      last_active: text(bar.last_active),
    },
    hero: {
      id: num(hero.id ?? hero.partner_id), name: text(hero.name), initials: text(hero.initials), phone: text(hero.phone), status: text(hero.status),
      location: text(hero.location) || undefined, is_suspended: typeof hero.is_suspended === "boolean" ? hero.is_suspended : undefined,
    },
    profile_details: {
      fullname: text(profile.fullname), phone: text(profile.phone), email: text(profile.email), state: text(profile.state), lga: text(profile.lga), address: text(profile.address),
      onboarded_by: text(profile.onboarded_by), onboarded_date: text(profile.onboarded_date), kyc_status: text(profile.kyc_status),
      bank_name: text(profile.bank_name), account_number_masked: text(profile.account_number_masked),
    },
    stock_details: {
      total_stock: num(stock.total_stock), total_stock_label: text(stock.total_stock_label), received_all_time_text: text(stock.received_all_time_text),
      last_distribution_text: text(stock.last_distribution_text),
      breakdown: (Array.isArray(stock.breakdown) ? (stock.breakdown as Loose[]) : []).map((item) => ({ label: text(item.label ?? item.type), count: num(item.count), percentage: num(item.percentage) })),
    },
    performance_this_month: {
      activations, customers: num(perf.customers ?? obj(bar.customers).count), avg_per_day: num(perf.avg_per_day ?? (activations / 30).toFixed(1)),
      commission_formatted: text(perf.commission_formatted), daily_activations: daily.map((day, index) => ({ day: num(day.day ?? index + 1), count: num(day.count) })),
    },
    commission: commission && {
      current_month_formatted: text(commission.current_month_formatted), subtitle: text(commission.subtitle), activation_rate: text(commission.activation_rate),
      vs_last_month_formatted: text(commission.vs_last_month_formatted),
      last_month_formatted: text(commission.last_month_formatted), two_months_ago_formatted: text(commission.two_months_ago_formatted),
    },
    account_timeline: timeline,
  } as PartnerDetail;
}

const validId = (id?: number | string) => {
  const value = Number(id);
  return Number.isSafeInteger(value) && value > 0 ? value : undefined;
};

/** GET /my-partner/overview */
export const useGetCaPartnersOverview = (params: PartnerOverviewParams) =>
  usePartnerQuery<PartnersOverview>("ca-partners-overview", "/overview", params);
/** GET /my-partner/{agentId} */
export const useGetCaPartnerDetail = (id?: number | string) =>
  usePartnerQuery<PartnerDetail>("ca-partner-detail", `/${validId(id)}`, undefined, Boolean(validId(id)), normalizePartnerDetail);
/** GET /my-partner/{agentId}/customers */
export const useGetCaPartnerCustomers = (id: number | string | undefined, params: { page: number; limit: number; search?: string }, enabled = true) =>
  usePartnerQuery<PartnerCustomersData>("ca-partner-customers", `/${validId(id)}/customers`, params, enabled && Boolean(validId(id)));
/** GET /my-partner/{agentId}/stock-history */
export const useGetCaPartnerStockHistory = (id: number | string | undefined, enabled = true) =>
  usePartnerQuery<PartnerStockHistoryData>("ca-partner-stock-history", `/${validId(id)}/stock-history`, undefined, enabled && Boolean(validId(id)));

/** PUT /my-partner/{agentId} */
export const useCaUpdatePartner = (id: number | string, options?: Options<PartnerProfile, PartnerUpdateResult>) =>
  usePartnerMutation<PartnerProfile, PartnerUpdateResult>(`/${id}`, "put", options);
/** POST /my-partner/verify-partner — no toast; the modal shows the result inline. */
export const useCaVerifyPartner = () =>
  usePartnerMutation<{ phone: string }, VerifiedPartner>("/verify-partner", "post", undefined, { toast: false, invalidate: false });
/** POST /my-partner/add-partner — an existing Agency Partner joins your network. */
export const useCaAddExistingPartner = (options?: Options<{ phone: string }, unknown>) =>
  usePartnerMutation<{ phone: string }, unknown>("/add-partner", "post", options);
/** POST /my-partner/onboard */
export const useCaOnboardPartner = (options?: Options<PartnerOnboardPayload, PartnerOnboardResult>) =>
  usePartnerMutation<PartnerOnboardPayload, PartnerOnboardResult>("/onboard", "post", options);
/** POST /my-partner/remind — partner_id travels in the body, so one hook serves every partner. */
export const useCaRemindPartner = (options?: Options<PartnerReminder, PartnerReminderResult>) =>
  usePartnerMutation<PartnerReminder, PartnerReminderResult>("/remind", "post", options, { invalidate: false });
/** POST /my-partner/bulk-remind */
export const useCaBulkRemindPartners = (options?: Options<PartnerBulkReminder, PartnerReminderResult>) =>
  usePartnerMutation<PartnerBulkReminder, PartnerReminderResult>("/bulk-remind", "post", options, { invalidate: false });
/** POST /my-partner/{agentId}/suspend — { suspend: false } re-activates. */
export const useCaSuspendPartner = (id: number | string, options?: Options<PartnerSuspendPayload, PartnerStatusResult>) =>
  usePartnerMutation<PartnerSuspendPayload, PartnerStatusResult>(`/${id}/suspend`, "post", options);

/** GET /my-partner/export (CSV) */
export function useExportCaPartners() {
  return useMutation({
    retry: false,
    mutationFn: async () => {
      const { data } = await authedHttpClient.get<Blob>(base + "/export", { responseType: "blob" });
      if (data.type.includes("json")) {
        const body = JSON.parse(await data.text());
        throw new Error(body.message || "Export failed");
      }
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ca-agency-partners.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Export failed", description: error.message }),
  });
}
