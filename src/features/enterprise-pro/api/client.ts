import { authedHttpClient } from '@/utils/http/auth';
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { EnterpriseResponse } from '../types/dashboard';
export async function enterpriseGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
  const { data } = await authedHttpClient.get<EnterpriseResponse<T>>('/enterprise/dashboard/' + path, { params, signal });
  if (!data.success) throw new Error(data.message || 'Unable to retrieve enterprise data');
  return data.data;
}
export function useEnterpriseMutation<T, V>(path: string, method: 'post' | 'put', keys: string[], options?: UseMutationOptions<T, Error, V>) {
  const client = useQueryClient();
  return useMutation<T, Error, V>({ ...options,
    mutationFn: async (payload) => {
      const { data } = await authedHttpClient[method]<EnterpriseResponse<T>>('/enterprise/dashboard/' + path, payload);
      if (!data.success) throw new Error(data.message || 'Enterprise action failed');
      return data.data;
    },
    onSuccess: async (...args) => {
      await Promise.all(keys.map(key => client.invalidateQueries({ queryKey: [key] })));
      toast.success('Enterprise action completed successfully');
      await options?.onSuccess?.(...args);
    },
    onError: (...args) => { toast.error(args[0].message); options?.onError?.(...args); },
    onSettled: (...args) => options?.onSettled?.(...args),
  });
}
