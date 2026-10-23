import { useMutation } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";
import { useRmMutation, useRmQuery, type RmMutationOptions } from "./dashboardClient";
import { useRmCsvExport } from "./exports";
import type { RmMyScOverviewData, RmScComparisonData } from "../types/coordinators";
import type { RmMyScParams, RmNewCoordinatorPayload, RmScReminderPayload, RmVerifiedPerson } from "../types/territory";
import type { RmSuspendPayload } from "../types/dashboard";
const base = "/regional-manager/my-state-coordinator";
export const useGetMyStateCoordinatorsOverview = (params: RmMyScParams) => useRmQuery<RmMyScOverviewData>("rm-my-sc-overview", "/overview", params, true, base);
export const useGetScComparison = () => useRmQuery<RmScComparisonData>("rm-sc-comparison", "/comparison", undefined, true, base);
/** Looks up an account by phone. isRegistered=true → already an SC, add with useAddExistingCoordinator; false → onboard. No toast: the modal shows the outcome. */
export const useVerifyCoordinator = () => useMutation({
  mutationFn: async (payload: { phone: string }) => {
    const { data } = await authedHttpClient.post<ApiResponse<RmVerifiedPerson>>(`${base}/verify-coordinator`, payload);
    if (!data.success) throw new Error(data.message);
    return data.data;
  },
});
export const useAddExistingCoordinator = (options?: RmMutationOptions<{ phone: string }>) => useRmMutation("/add-coordinator", options, base);
export const useOnboardStateCoordinator = (options?: RmMutationOptions<RmNewCoordinatorPayload>) => useRmMutation("/onboard", options, base);
export const useSendScBonusReminder = (options?: RmMutationOptions<RmScReminderPayload>) => useRmMutation("/remind", options, base);
export const useSuspendScAccount = (id: number, options?: RmMutationOptions<RmSuspendPayload>) => useRmMutation(`/${id}/suspend`, options, base);
export const useExportScReport = () => useRmCsvExport(`${base}/export`, "regional-state-coordinators.csv");
