import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { authedHttpClient } from "@/utils/http/auth";
import type { PartnerStockOverviewResponse, PartnerAvailableSimsResponse, PartnerCustomerOverviewResponse, PartnerCustomersResponse, PartnerCustomerDetailResponse, PartnerWalletResponse, PartnerTransactionsResponse, PartnerTransactionDetailResponse, PartnerPayoutAccountResponse } from "../types/api";

function usePartnerQuery<T>(key: readonly unknown[], url: string, enabled = true) {
  const token = useAuthStore((state) => state.accessToken);
  return useQuery({ queryKey: key, queryFn: async () => (await authedHttpClient.get<T>(url)).data, enabled: Boolean(token) && enabled, staleTime: 60_000 });
}
export const useGetPartnerStockOverview = () => { const query = usePartnerQuery<PartnerStockOverviewResponse>(["partner-stock-overview"], "/partner/stock"); return { ...query, overview: query.data?.data }; };
export interface StockListParams { type?: string; network?: string; search?: string; page?: number; limit?: number }
export const useGetPartnerAvailableSims = (params: StockListParams = {}) => {
  const { type = "", network = "", search = "", page = 1, limit = 10 } = params;
  const query = usePartnerQuery<PartnerAvailableSimsResponse>(["partner-stock-available", { type, network, search, page, limit }], `/partner/stock/available?type=${encodeURIComponent(type)}&network=${encodeURIComponent(network)}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
  return { ...query, result: query.data?.data, sims: query.data?.data?.sims ?? [] };
};
export const useGetPartnerCustomerOverview = () => { const query = usePartnerQuery<PartnerCustomerOverviewResponse>(["partner-customer-overview"], "/partner/customers/overview"); return { ...query, overview: query.data?.data }; };
export interface PartnerCustomerParams { tab?: string; simType?: string; network?: string; search?: string; sort?: string; page?: number; limit?: number }
export const useGetPartnerCustomers = (params: PartnerCustomerParams = {}) => {
  const { tab = "all", simType = "", network = "", search = "", sort = "newest", page = 1, limit = 10 } = params;
  const query = usePartnerQuery<PartnerCustomersResponse>(["partner-customers", { tab, simType, network, search, sort, page, limit }], `/partner/customers?tab=${encodeURIComponent(tab)}&sim_type=${encodeURIComponent(simType)}&network=${encodeURIComponent(network)}&search=${encodeURIComponent(search)}&sort=${encodeURIComponent(sort)}&page=${page}&limit=${limit}`);
  return { ...query, result: query.data?.data, customers: query.data?.data?.customers ?? [] };
};
export const useGetPartnerCustomerDetail = (id?: number | string) => { const query = usePartnerQuery<PartnerCustomerDetailResponse>(["partner-customer-detail", id], `/partner/customers/${id}`, Boolean(id)); return { ...query, customer: query.data?.data }; };
export const useGetPartnerWallet = () => { const query = usePartnerQuery<PartnerWalletResponse>(["partner-wallet-overview"], "/partner/wallet"); return { ...query, wallet: query.data?.data }; };
export interface PartnerTransactionParams { page?: number; limit?: number; period?: string; category?: string; status?: string; search?: string }
export const useGetPartnerTransactions = (params: PartnerTransactionParams = {}) => {
  const { page = 1, limit = 10, period = "all", category = "all", status = "all", search = "" } = params;
  const query = usePartnerQuery<PartnerTransactionsResponse>(["partner-wallet-transactions", { page, limit, period, category, status, search }], `/partner/wallet/transactions?page=${page}&limit=${limit}&period=${encodeURIComponent(period)}&category=${encodeURIComponent(category)}&status=${encodeURIComponent(status)}&search=${encodeURIComponent(search)}`);
  return { ...query, result: query.data?.data, transactions: query.data?.data?.transactions ?? [] };
};
export const useGetPartnerTransactionDetail = (id?: string) => { const query = usePartnerQuery<PartnerTransactionDetailResponse>(["partner-transaction-detail", id], `/partner/wallet/transactions/${id}`, Boolean(id)); return { ...query, transaction: query.data?.data }; };
export const useGetPartnerPayoutAccount = () => { const query = usePartnerQuery<PartnerPayoutAccountResponse>(["partner-payout-account"], "/partner/wallet/payout-account"); return { ...query, payoutAccount: query.data?.data }; };
