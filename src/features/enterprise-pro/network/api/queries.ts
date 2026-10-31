import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { networkGet } from './client';
import type { EnterpriseScComparisonData, EnterpriseScOverviewData, EnterpriseScOverviewParams, EnterpriseScSimsData, EnterpriseScSimsParams } from '../types/api';

/** GET /my-state-coordinator/overview */
export const useGetEnterpriseScOverview = (params: EnterpriseScOverviewParams) => useQuery({
  queryKey: ['enterprise-my-sc-overview', params], placeholderData: keepPreviousData,
  queryFn: ({ signal }) => networkGet<EnterpriseScOverviewData>('overview', params, signal),
});
/** GET /my-state-coordinator/comparison */
export const useGetEnterpriseScComparison = () => useQuery({
  queryKey: ['enterprise-sc-comparison'],
  queryFn: ({ signal }) => networkGet<EnterpriseScComparisonData>('comparison', undefined, signal),
});
/** GET /my-state-coordinator/{id}/undistributed-sims */
export const useGetEnterpriseScSims = (id: string | number | undefined, params: EnterpriseScSimsParams, enabled = true) => useQuery({
  queryKey: ['enterprise-sc-sims', id, params], enabled: enabled && Boolean(id), placeholderData: keepPreviousData,
  queryFn: ({ signal }) => networkGet<EnterpriseScSimsData>(encodeURIComponent(String(id)) + '/undistributed-sims', params, signal),
});
