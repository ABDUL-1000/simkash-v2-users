import { useQuery } from '@tanstack/react-query';
import { walletGet } from './client';
import type { EnterpriseActivityBreakdownData } from '../types/api';
export const useGetEnterpriseWalletActivity = (enabled = true) => useQuery({ queryKey: ['enterprise-wallet-activity'], queryFn: ({ signal }) => walletGet<EnterpriseActivityBreakdownData>('activity', undefined, signal), enabled });
