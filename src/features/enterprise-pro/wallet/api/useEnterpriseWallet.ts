import { keepPreviousData, useMutation, useQuery, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
import { QUERY_KEY_AUTH_USER } from '@/features/auth/api/useGetAuthUser';
import type {
  EnterprisePayoutAccount, EnterprisePayoutItem, EnterprisePayoutResult, EnterpriseTransactionsResponseData, EnterpriseWalletOverviewData, EnterpriseWithdrawProfitResult,
  RequestEnterprisePayoutPayload, SaveEnterprisePayoutAccountPayload, WalletCategory, WalletResponse,
} from '../types/api';

const BASE = '/enterprise/wallet/';
const walletRefreshKeys = ['enterprise-wallet-overview', 'enterprise-wallet-transactions', 'enterprise-payouts', 'enterprise-payout-account', 'enterprise-overview'];

async function walletGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
  const { data } = await authedHttpClient.get<WalletResponse<T>>(BASE + path, { params, signal });
  if (!data.success) throw new Error(data.message || 'Unable to retrieve enterprise wallet data');
  return data.data;
}
function useWalletMutation<T, V>(path: string, options?: UseMutationOptions<T, Error, V>) {
  const client = useQueryClient();
  return useMutation<T, Error, V>({
    ...options,
    retry: false,
    mutationFn: async (payload) => {
      const { data } = await authedHttpClient.post<WalletResponse<T>>(BASE + path, payload);
      if (!data.success) throw new Error(data.message || 'Enterprise wallet action failed');
      return data.data;
    },
    onSuccess: async (...args) => {
      await Promise.all([...walletRefreshKeys.map((key) => client.invalidateQueries({ queryKey: [key] })), client.invalidateQueries({ queryKey: QUERY_KEY_AUTH_USER })]);
      openNotification({ state: 'success', title: 'Enterprise Wallet', description: 'Your request completed successfully.' });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => { openNotification({ state: 'error', title: 'Enterprise Wallet', description: args[0].message }); return options?.onError?.(...args); },
    onSettled: (...args) => options?.onSettled?.(...args),
  });
}

/** GET /wallet/overview */
export const useGetEnterpriseWalletOverview = () => useQuery({ queryKey: ['enterprise-wallet-overview'], queryFn: ({ signal }) => walletGet<EnterpriseWalletOverviewData>('overview', undefined, signal) });
/** GET /wallet/transactions */
export const useGetEnterpriseWalletTransactions = (params: { category: WalletCategory; search?: string; page: number; limit: number }) => useQuery({ queryKey: ['enterprise-wallet-transactions', params], placeholderData: keepPreviousData, queryFn: ({ signal }) => walletGet<EnterpriseTransactionsResponseData>('transactions', params, signal) });
/** GET /wallet/payout-account */
export const useGetEnterprisePayoutAccount = () => useQuery({ queryKey: ['enterprise-payout-account'], queryFn: ({ signal }) => walletGet<EnterprisePayoutAccount>('payout-account', undefined, signal) });
/** GET /wallet/payouts */
export const useGetEnterprisePayouts = (enabled = true) => useQuery({ queryKey: ['enterprise-payouts'], enabled, queryFn: ({ signal }) => walletGet<EnterprisePayoutItem[]>('payouts', undefined, signal) });

/** POST /wallet/payout-account */
export const useSaveEnterprisePayoutAccount = (options?: UseMutationOptions<EnterprisePayoutAccount, Error, SaveEnterprisePayoutAccountPayload>) => useWalletMutation<EnterprisePayoutAccount, SaveEnterprisePayoutAccountPayload>('payout-account', options);
/** POST /wallet/request-payout { amount, notes } */
export const useRequestEnterprisePayout = (options?: UseMutationOptions<EnterprisePayoutResult, Error, RequestEnterprisePayoutPayload>) => useWalletMutation<EnterprisePayoutResult, RequestEnterprisePayoutPayload>('request-payout', options);
/** POST /wallet/withdraw-profit { amount } */
export const useEnterpriseWithdrawProfit = (options?: UseMutationOptions<EnterpriseWithdrawProfitResult, Error, { amount: number }>) => useWalletMutation<EnterpriseWithdrawProfitResult, { amount: number }>('withdraw-profit', options);

/** GET /wallet/transactions/export (CSV) */
export function useExportEnterpriseTransactions() {
  return useMutation({
    retry: false,
    mutationFn: async (params: { category: WalletCategory; search?: string }) => {
      const { data } = await authedHttpClient.get<Blob>(BASE + 'transactions/export', { params, responseType: 'blob' });
      if (data.type.includes('json')) {
        const error = JSON.parse(await data.text()) as { message?: string };
        throw new Error(error.message || 'The statement could not be downloaded');
      }
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'enterprise-wallet-transactions.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    onError: (error: Error) => openNotification({ state: 'error', title: 'Statement download failed', description: error.message }),
  });
}
