import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
import type { WalletResponse } from '../types/api';
export async function walletGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
 const { data } = await authedHttpClient.get<WalletResponse<T>>('/enterprise/wallet/' + path, { params, signal });
 if (!data.success) throw new Error(data.message || 'Unable to retrieve enterprise wallet data');
 return data.data;
}
export const walletRefreshKeys = ['enterprise-wallet-overview', 'enterprise-wallet-transactions', 'enterprise-recent-payouts', 'enterprise-wallet-activity', 'enterprise-wallet-statement'];
export function useWalletMutation<T, V>(path: string, keys: string[], options?: UseMutationOptions<T, Error, V>) {
 const client = useQueryClient();
 return useMutation<T, Error, V>({ ...options,
  mutationFn: async payload => {
   const { data } = await authedHttpClient.post<WalletResponse<T>>('/enterprise/wallet/' + path, payload);
   if (!data.success) throw new Error(data.message || 'Enterprise wallet action failed');
   return data.data;
  },
  onSuccess: async (...args) => {
   await Promise.all(keys.map(key => client.invalidateQueries({ queryKey: [key] })));
   openNotification({ state: 'success', title: 'Enterprise Wallet', description: 'Your request completed successfully.' });
   await options?.onSuccess?.(...args);
  },
  onError: (...args) => { openNotification({ state: 'error', title: 'Enterprise Wallet', description: args[0].message }); options?.onError?.(...args); },
  onSettled: (...args) => options?.onSettled?.(...args),
 });
}
