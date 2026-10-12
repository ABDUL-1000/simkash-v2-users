import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
import type { NetworkResponse } from '../types/api';

export const networkOverviewKey = 'enterprise-my-network-sc-overview';
export const networkRefreshKeys = [networkOverviewKey, 'enterprise-agency-partners', 'enterprise-network-activity-feed',
  'enterprise-sc-health', 'enterprise-earnings-summary', 'enterprise-top-scs', 'enterprise-activations-chart',
  'enterprise-overview', 'enterprise-network-tree', 'enterprise-sim-inventory-overview', 'enterprise-distribute-context',
  'enterprise-sc-overview', 'enterprise-stock-alerts', 'enterprise-valuation', 'enterprise-inventory-history', 'enterprise-order-context'];

export async function networkGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
  const { data } = await authedHttpClient.get<NetworkResponse<T>>('/enterprise/my-network/' + path, { params, signal });
  if (!data.success) throw new Error(data.message || 'Unable to load enterprise network');
  return data.data;
}

export function useNetworkMutation<T, V>(path: string, method: 'post' | 'patch', options?: UseMutationOptions<T, Error, V>) {
  const client = useQueryClient();
  return useMutation<T, Error, V>({
    ...options,
    mutationFn: async payload => {
      const { data } = await authedHttpClient[method]<NetworkResponse<T>>('/enterprise/my-network/' + path, payload);
      if (!data.success) throw new Error(data.message || 'Network request failed');
      return data.data;
    },
    onSuccess: async (...args) => {
      await Promise.all(networkRefreshKeys.map(key => client.invalidateQueries({ queryKey: [key] })));
      openNotification({ state: 'success', title: 'My Network', description: 'Your request completed successfully.' });
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      openNotification({ state: 'error', title: 'My Network', description: args[0].message });
      return options?.onError?.(...args);
    },
    onSettled: (...args) => options?.onSettled?.(...args),
  });
}
