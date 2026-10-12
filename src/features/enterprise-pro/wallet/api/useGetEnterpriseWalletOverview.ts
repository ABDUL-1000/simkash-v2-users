import { useQuery } from '@tanstack/react-query';
import { walletGet } from './client';
import type { EnterpriseWalletOverviewData } from '../types/api';
export const useGetEnterpriseWalletOverview = (enabled = true) => useQuery({ queryKey: ['enterprise-wallet-overview'], queryFn: ({ signal }) => walletGet<EnterpriseWalletOverviewData>('overview', undefined, signal), enabled });
