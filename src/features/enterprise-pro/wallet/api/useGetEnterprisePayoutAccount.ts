import { useQuery } from '@tanstack/react-query';
import { walletGet } from './client';
import type { EnterprisePayoutAccount } from '../types/api';
export const useGetEnterprisePayoutAccount = (enabled = true) => useQuery({ queryKey: ['enterprise-payout-account'], queryFn: ({ signal }) => walletGet<EnterprisePayoutAccount>('payout-account', undefined, signal), enabled });
