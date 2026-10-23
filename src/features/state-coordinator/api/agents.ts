import { useMutation } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";
import { openNotification } from "@/utils/notifications";
import { downloadScCsv, useScOperation, useScResource, type ScMutationOptions } from "./operationsClient";
import type { ScAgencyPartnersOverviewData, ScAgentDetailData } from "../types/agents";
import type { VerifiedPartner } from "../types/operations";
import type { AgentCustomersData, AgentOverviewParams, AgentProfilePayload, AgentReminderPayload, AgentStockHistoryData, BulkReminderPayload, CustomerParams, DistributionPayload, OnboardAgentPayload, SuspendAgentPayload } from "../types/operations";

const base = "/state-coordinator/my-agent";
export const useGetScAgencyPartnersOverview = ({ bonusStatus = "all", ...params }: AgentOverviewParams) =>
  useScResource<ScAgencyPartnersOverviewData>("sc-agency-partners-overview", `${base}/overview`, { ...params, bonus_status: bonusStatus });
export const useGetScAgentDetail = (agentId?: number) => useScResource<ScAgentDetailData>("sc-agent-detail", `${base}/${agentId}`, undefined, Boolean(agentId));
export const useGetAgentCustomers = (agentId: number, params: CustomerParams) => useScResource<AgentCustomersData>("sc-agent-customers", `${base}/${agentId}/customers`, params, Boolean(agentId));
export const useGetAgentStockHistory = (agentId: number) => useScResource<AgentStockHistoryData>("sc-agent-stock-history", `${base}/${agentId}/stock-history`, undefined, Boolean(agentId));
export const useUpdateScAgent = (id: number, options?: ScMutationOptions<AgentProfilePayload>) => useScOperation(`${base}/${id}`, "put", options);
export const useDistributeStockToAgents = (options?: ScMutationOptions<DistributionPayload>) => useScOperation(`${base}/distribute`, "post", options);
/** Looks up an account by phone. isRegistered=true → already a partner, add with useAddExistingPartner; false → onboard. No toast: the modal shows the outcome. */
export const useVerifyPartner = () => useMutation({
  mutationFn: async (payload: { phone: string }) => {
    const { data } = await authedHttpClient.post<ApiResponse<VerifiedPartner>>(`${base}/verify-partner`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
});
export const useAddExistingPartner = (options?: ScMutationOptions<{ phone: string }>) => useScOperation(`${base}/add-partner`, "post", options);
export const useOnboardAgencyPartner = (options?: ScMutationOptions<OnboardAgentPayload>) => useScOperation(`${base}/onboard`, "post", options);
export const useSendAgentReminder = (options?: ScMutationOptions<AgentReminderPayload>) => useScOperation(`${base}/remind`, "post", options);
export const useSendBulkAtRiskReminders = (options?: ScMutationOptions<BulkReminderPayload>) => useScOperation(`${base}/bulk-remind`, "post", options);
export const useSuspendAgencyPartner = (id: number, options?: ScMutationOptions<SuspendAgentPayload>) => useScOperation(`${base}/${id}/suspend`, "post", options);
export const useExportScAgents = () => useMutation({
  mutationFn: () => downloadScCsv(`${base}/export`, "state-coordinator-agency-partners.csv"),
  onSuccess: () => openNotification({ state: "success", title: "Agency partners CSV downloaded" }),
  onError: (error: Error) => openNotification({ state: "error", title: "Export failed", description: error.message }),
});
