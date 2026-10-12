import { useQuery } from '@tanstack/react-query';
import { walletGet } from './client';
import type { EnterpriseTransactionsResponseData, WalletCategory, WalletTimeframe } from '../types/api';
export interface WalletTransactionsParams { category?: WalletCategory; timeframe?: WalletTimeframe; search?: string; page?: number; limit?: number; }
export function useGetEnterpriseWalletTransactions({ category = 'all', timeframe = 'this_month', search = '', page = 1, limit = 14 }: WalletTransactionsParams = {}, enabled = true) {
 return useQuery({ queryKey: ['enterprise-wallet-transactions', { category, timeframe, search, page, limit }], queryFn: ({ signal }) => walletGet<EnterpriseTransactionsResponseData>('transactions', { category, timeframe, search, page, limit }, signal), enabled });
}
