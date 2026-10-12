import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type {
  PartnersOverview,
  PartnerDetail,
  PartnerCustomer,
  PartnerStockEvent,
  PartnerPagination,
  PartnerOverviewParams,
  PartnerOnboardPayload,
  PartnerProfile,
  PartnerQuantities,
  PartnerDistributionResult,
  PartnerBatchResult,
  PartnerReminder,
  PartnerReminderResult,
  PartnerRecall,
  PartnerRecallResult,
  PartnerStatusResult,
} from "../types/api";

const base = "/corporate-sales-agent/my-partner";
export const partnerResources = [
  "ca-partners-overview",
  "ca-partner-detail",
  "ca-partner-customers",
  "ca-partner-stock-history",
  "ca-dashboard-overview",
  "ca-managed-partners",
  "ca-inventory-overview",
  "ca-distribute-context",
  "ca-ap-preview",
  "ca-inventory-history",
];

function usePartnerQuery<T>(key: string, path: string, params?: object, enabled = true) {
  const userId = useAuthStore((s) => s.user?.id);
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({
    queryKey: [key, userId, path, params],
    enabled: Boolean(userId && token && enabled),
    staleTime: 30_000,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<T>>(base + path, { params, signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}

type Options<P, R> = Omit<UseMutationOptions<ApiResponse<R>, Error, P>, "mutationFn">;

function usePartnerMutation<P, R>(
  path: string,
  method: "post" | "patch",
  options?: Options<P, R>,
  extraInvalidateKeys?: string[]
) {
  const client = useQueryClient();
  const userId = useAuthStore((s) => s.user?.id);

  return useMutation({
    ...options,
    retry: false,
    mutationFn: async (payload: P) => {
      const { data } = await authedHttpClient[method]<ApiResponse<R>>(
        base + path,
        payload && Object.keys(payload as object).length > 0 ? payload : undefined
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (...args) => {
      const allKeys = [...new Set([...partnerResources, ...(extraInvalidateKeys || [])])];
      await Promise.all([
        ...allKeys.map((key) => client.invalidateQueries({ queryKey: [key] })),
        ...allKeys.map((key) => client.invalidateQueries({ queryKey: [key, userId] })),
      ]);
      openNotification({ state: "success", title: args[0].message });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: "error", title: "Request failed", description: args[0].message });
      return options?.onError?.(...args);
    },
  });
}

export const useGetCaPartners = (params: PartnerOverviewParams) =>
  usePartnerQuery<PartnersOverview>("ca-partners-overview", "/overview", params);

export const useGetCaPartner = (id?: number | string) => {
  const numericId = typeof id === "string" ? Number(id) : id;
  const isValid = Number.isSafeInteger(numericId) && Number(numericId) > 0;
  return usePartnerQuery<PartnerDetail>("ca-partner-detail", `/${numericId}`, undefined, Boolean(isValid));
};

export const useGetCaPartnerCustomers = (id: number | string, params: { page: number; limit: number }) => {
  const numericId = typeof id === "string" ? Number(id) : id;
  return usePartnerQuery<{ customers: PartnerCustomer[]; pagination: PartnerPagination }>(
    "ca-partner-customers",
    `/${numericId}/customers`,
    params,
    Boolean(numericId && numericId > 0)
  );
};

export const useGetCaPartnerStockHistory = (id: number | string, params: { page: number; limit: number }) => {
  const numericId = typeof id === "string" ? Number(id) : id;
  return usePartnerQuery<{ history: PartnerStockEvent[]; pagination: PartnerPagination }>(
    "ca-partner-stock-history",
    `/${numericId}/stock-history`,
    params,
    Boolean(numericId && numericId > 0)
  );
};

export const useOnboardCaPartner = () =>
  usePartnerMutation<
    PartnerOnboardPayload,
    { partner_id: number; agent_id: number; fullname: string; email: string; phone: string; state: string; status: string; message: string }
  >("/onboard", "post", undefined, ["ca-partners-overview"]);

export const useEditCaPartner = (id: number | string) =>
  usePartnerMutation<
    PartnerProfile,
    { partner_id: number; fullname: string; phone: string; location: string; message: string }
  >(`/${id}`, "patch", undefined, ["ca-partner-detail", "ca-partners-overview"]);

export const useDistributeCaPartner = (id: number | string) =>
  usePartnerMutation<PartnerQuantities & { notes?: string }, PartnerDistributionResult>(
    `/${id}/distribute`,
    "post",
    undefined,
    ["ca-partner-detail", "ca-partners-overview", "ca-inventory-overview"]
  );

export const useDistributeCaPartners = () =>
  usePartnerMutation<
    { distributions: (PartnerQuantities & { partner_id: number })[]; notes?: string },
    PartnerBatchResult | unknown
  >("/distribute-multiple", "post", undefined, ["ca-partners-overview", "ca-inventory-overview"]);

export const useDistributeAllLowCaPartners = () =>
  usePartnerMutation<{ quantity_per_partner: number }, PartnerBatchResult>(
    "/distribute-all-low",
    "post",
    undefined,
    ["ca-partners-overview", "ca-inventory-overview"]
  );

export const useRemindCaPartner = (id: number | string) =>
  usePartnerMutation<PartnerReminder, PartnerReminderResult>(`/${id}/remind`, "post");

export const useBulkRemindCaPartners = () =>
  usePartnerMutation<PartnerReminder & { partner_ids: number[] }, PartnerReminderResult>("/bulk-reminder", "post");

export const useToggleCaPartner = (id: number | string) =>
  usePartnerMutation<{ reason: string }, PartnerStatusResult>(
    `/${id}/toggle-status`,
    "patch",
    undefined,
    ["ca-partner-detail", "ca-partners-overview"]
  );

export const useRecallCaPartner = (id: number | string) =>
  usePartnerMutation<PartnerRecall, PartnerRecallResult>(
    `/${id}/recall`,
    "post",
    undefined,
    ["ca-partner-detail", "ca-partners-overview", "ca-inventory-overview"]
  );

export const useCaRecallGeneralStock = () =>
  usePartnerMutation<Record<string, unknown> | void, PartnerRecallResult>(
    "/recall-stock",
    "post",
    undefined,
    ["ca-partners-overview", "ca-inventory-overview"]
  );

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
    onError: (error: Error) =>
      openNotification({ state: "error", title: "Export failed", description: error.message }),
  });
}

// -------------------------------------------------------------
// Aliases matching specific requirement names in the spec
// -------------------------------------------------------------
export const useGetCaPartnersOverview = useGetCaPartners;
export const useGetCaPartnerDetail = useGetCaPartner;
export const useCaOnboardPartner = useOnboardCaPartner;
export const useCaDistributeMultiple = useDistributeCaPartners;
export const useCaDistributeAllLow = useDistributeAllLowCaPartners;
export const useCaSendBulkReminder = useBulkRemindCaPartners;
export const useCaDistributeToPartner = useDistributeCaPartner;
export const useCaRemindPartner = useRemindCaPartner;
export const useCaTogglePartnerStatus = useToggleCaPartner;
export const useCaRecallPartnerStock = useRecallCaPartner;
export const useCaUpdatePartner = useEditCaPartner;
export const exportCaPartnersCsv = useExportCaPartners;

