import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { authedHttpClient } from '@/utils/http/auth';
import { openNotification } from '@/utils/notifications';
import type { NetworkResponse } from '../types/api';

const BASE = '/enterprise/my-state-coordinator/';
export const networkRefreshKeys = ['enterprise-my-sc-overview', 'enterprise-sc-comparison', 'enterprise-sc-sims', 'enterprise-overview', 'enterprise-sim-inventory-overview'];

export async function networkGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
  const { data } = await authedHttpClient.get<NetworkResponse<T>>(BASE + path, { params, signal });
  if (!data.success) throw new Error(data.message || 'Unable to load State Coordinators');
  return data.data;
}

export function useNetworkMutation<T, V>(path: string, options?: UseMutationOptions<T, Error, V>, { silent = false } = {}) {
  const client = useQueryClient();
  return useMutation<T, Error, V>({
    ...options,
    retry: false,
    mutationFn: async payload => {
      const { data } = await authedHttpClient.post<NetworkResponse<T>>(BASE + path, payload);
      if (!data.success) throw new Error(data.message || 'Request failed');
      return data.data;
    },
    onSuccess: async (...args) => {
      if (!silent) {
        await Promise.all(networkRefreshKeys.map(key => client.invalidateQueries({ queryKey: [key] })));
        openNotification({ state: 'success', title: 'State Coordinators', description: 'Your request completed successfully.' });
      }
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      if (!silent) openNotification({ state: 'error', title: 'State Coordinators', description: args[0].message });
      return options?.onError?.(...args);
    },
    onSettled: (...args) => options?.onSettled?.(...args),
  });
}
