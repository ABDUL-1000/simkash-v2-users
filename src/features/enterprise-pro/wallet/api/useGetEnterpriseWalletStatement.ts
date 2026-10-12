import { useQuery } from '@tanstack/react-query';
import { walletGet } from './client';
import type { EnterpriseStatementSummaryData } from '../types/api';
export const useGetEnterpriseWalletStatement = (enabled = true) => useQuery({ queryKey: ['enterprise-wallet-statement'], queryFn: ({ signal }) => walletGet<EnterpriseStatementSummaryData>('statement', undefined, signal), enabled });
