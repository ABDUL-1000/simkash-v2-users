import { useQuery } from '@tanstack/react-query';
import { walletGet } from './client';
import type { EnterpriseRecentPayoutsData } from '../types/api';
export const useGetEnterpriseRecentPayouts = (enabled = true) => useQuery({ queryKey: ['enterprise-recent-payouts'], queryFn: ({ signal }) => walletGet<EnterpriseRecentPayoutsData>('recent-payouts', undefined, signal), enabled });
