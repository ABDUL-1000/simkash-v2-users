import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { EnterpriseOverviewData } from '../types/dashboard';
export const useGetEnterpriseOverview = (enabled = true) => useQuery({ queryKey: ['enterprise-overview'], queryFn: ({ signal }) => enterpriseGet<EnterpriseOverviewData>('overview', undefined, signal), enabled });
