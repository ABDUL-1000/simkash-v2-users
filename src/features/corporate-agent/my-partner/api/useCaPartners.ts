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

function usePartnerQuery<T>(key: string, path: string, params?: object, enabled = true) {
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
      return data.data;
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

const validId = (id?: number | string) => {
  const value = Number(id);
  return Number.isSafeInteger(value) && value > 0 ? value : undefined;
};

/** GET /my-partner/overview */
export const useGetCaPartnersOverview = (params: PartnerOverviewParams) =>
  usePartnerQuery<PartnersOverview>("ca-partners-overview", "/overview", params);
/** GET /my-partner/{agentId} */
export const useGetCaPartnerDetail = (id?: number | string) =>
  usePartnerQuery<PartnerDetail>("ca-partner-detail", `/${validId(id)}`, undefined, Boolean(validId(id)));
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
