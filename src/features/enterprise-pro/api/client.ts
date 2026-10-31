import { authedHttpClient } from '@/utils/http/auth';
import type { EnterpriseResponse } from '../types/dashboard';
export async function enterpriseGet<T>(path: string, params?: object, signal?: AbortSignal): Promise<T> {
  const { data } = await authedHttpClient.get<EnterpriseResponse<T>>('/enterprise/dashboard/' + path, { params, signal });
  if (!data.success) throw new Error(data.message || 'Unable to retrieve enterprise data');
  return data.data;
}
