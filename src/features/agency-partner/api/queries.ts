import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApDashboardSummaryResponse, ApRecentActivationsResponse, ApSimStockResponse, ApMonthlyCommissionResponse, ApRecentCustomersResponse, ApRecentActivityResponse, ActivatedSimsResponse, UnactivatedSimsResponse } from "../types/api";

function useApQuery<T>(key: readonly unknown[], path: string) {
  const token = useAuthStore((state) => state.accessToken);
  return useQuery({ queryKey: key, queryFn: async () => (await authedHttpClient.get<T>(path)).data, enabled: Boolean(token), staleTime: 60_000 });
}
export const useGetApDashboardSummary = () => {
  const query = useApQuery<ApDashboardSummaryResponse>(["ap-dashboard-summary"], "/partner/dashboard");
  return { ...query, summary: query.data?.data };
};
export const useGetApRecentActivations = () => {
  const query = useApQuery<ApRecentActivationsResponse>(["ap-recent-activations"], "/partner/dashboard/recent-activations");
  return { ...query, activations: query.data?.data ?? [] };
};
export const useGetApSimStock = () => {
  const query = useApQuery<ApSimStockResponse>(["ap-sim-stock"], "/partner/dashboard/sim-stock");
  return { ...query, stock: query.data?.data };
};
export const useGetApMonthlyCommission = () => {
  const query = useApQuery<ApMonthlyCommissionResponse>(["ap-commission-month"], "/partner/dashboard/commission-month");
  return { ...query, commission: query.data?.data };
};
export const useGetApRecentCustomers = (limit = 4) => {
  const query = useApQuery<ApRecentCustomersResponse>(["ap-recent-customers", limit], `/partner/dashboard/recent-customers?limit=${limit}`);
  return { ...query, customers: query.data?.data?.customers ?? [], total: query.data?.data?.total_customers ?? 0 };
};
export const useGetApRecentActivity = (limit = 10) => {
  const query = useApQuery<ApRecentActivityResponse>(["ap-recent-activity", limit], `/partner/dashboard/recent-activity?limit=${limit}`);
  return { ...query, activities: query.data?.data ?? [] };
};
export interface ApSimListParams { type?: string; network?: string; search?: string; page?: number; limit?: number }
export const useGetActivatedSims = (params: ApSimListParams = {}) => {
  const { type = "", search = "", page = 1, limit = 10 } = params;
  const query = useApQuery<ActivatedSimsResponse>(["ap-activated-sims", { type, search, page, limit }], `/partner/device-sim/activated?type=${encodeURIComponent(type)}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
  return { ...query, result: query.data?.data, sims: query.data?.data?.sims ?? [] };
};
export const useGetUnactivatedSims = (params: ApSimListParams = {}) => {
  const { type = "", network = "", search = "", page = 1, limit = 10 } = params;
  const query = useApQuery<UnactivatedSimsResponse>(["ap-unactivated-sims", { type, network, search, page, limit }], `/partner/device-sim/unactivated?type=${encodeURIComponent(type)}&network=${encodeURIComponent(network)}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
  return { ...query, result: query.data?.data, sims: query.data?.data?.sims ?? [] };
};
