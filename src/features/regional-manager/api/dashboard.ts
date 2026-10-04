import { useRmMutation, useRmQuery, type RmMutationOptions } from "./dashboardClient";
import type { RmCoordinatorDetailData, RmDashboardOverviewData } from "../types/api";
import type { RmActivitiesData, RmApsData, RmCoordinatorParams, RmCoordinatorsData, RmDistributePayload, RmListParams, RmOnboardScPayload, RmPayoutPayload, RmProfilePayload, RmQuickDistributePayload, RmRedistributePayload, RmReminderPayload, RmStockHistoryData, RmStockRequestPayload, RmSuspendPayload } from "../types/dashboard";

export const useGetRmDashboardOverview = () => useRmQuery<RmDashboardOverviewData>("rm-dashboard-overview", "/overview");
export const useGetRmStateCoordinators = (params: RmCoordinatorParams) => useRmQuery<RmCoordinatorsData>("rm-state-coordinators", "/state-coordinators", params);
export const useGetRmRecentActivity = (params: RmListParams) => useRmQuery<RmActivitiesData>("rm-recent-activity", "/recent-activity", params);
export const useGetRmCoordinatorDetail = (id?: number) => useRmQuery<RmCoordinatorDetailData>("rm-coordinator-detail", `/state-coordinators/${id}`, undefined, Boolean(id));
export const useGetRmCoordinatorAps = (id: number, params: RmListParams) => useRmQuery<RmApsData>("rm-coordinator-aps", `/state-coordinators/${id}/agency-partners`, params, Boolean(id));
export const useGetRmCoordinatorStockHistory = (id: number) => useRmQuery<RmStockHistoryData>("rm-coordinator-stock-history", `/state-coordinators/${id}/stock-history`, undefined, Boolean(id));

export const useRmDistributeStock = (options?: RmMutationOptions<RmDistributePayload>) => useRmMutation("/distribute", options);
export const useRmRedistributeStock = (options?: RmMutationOptions<RmRedistributePayload>) => useRmMutation("/redistribute", options);
export const useRmRequestPayout = (options?: RmMutationOptions<RmPayoutPayload>) => useRmMutation("/request-payout", options);
export const useRmOnboardSc = (options?: RmMutationOptions<RmOnboardScPayload>) => useRmMutation("/onboard-sc", options);
export const useRmRequestStockFromAdmin = (options?: RmMutationOptions<RmStockRequestPayload>) => useRmMutation("/request-stock-from-admin", options);
export const useRmSendBonusReminder = (options?: RmMutationOptions<RmReminderPayload>) => useRmMutation("/send-bonus-reminder", options);
export const useRmQuickDistributeToSc = (id: number, options?: RmMutationOptions<RmQuickDistributePayload>) => useRmMutation(`/state-coordinators/${id}/distribute`, options);
export const useRmSuspendSc = (id: number, options?: RmMutationOptions<RmSuspendPayload>) => useRmMutation(`/state-coordinators/${id}/suspend`, options);
export const useRmOnboardApForSc = (id: number, options?: RmMutationOptions<RmProfilePayload>) => useRmMutation(`/state-coordinators/${id}/onboard-ap`, options);
