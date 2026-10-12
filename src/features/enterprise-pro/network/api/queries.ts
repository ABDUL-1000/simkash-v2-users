import { useQuery } from '@tanstack/react-query';
import { networkGet, networkOverviewKey } from './client';
import type { AgencyPartnerParams, EnterpriseScOverviewData, EnterpriseApDirectoryData, EnterpriseNetworkActivityData,
  EnterpriseScHealthSummary, EnterpriseEarningsSummary, EnterpriseTopScItem, EnterpriseActivationsChartData } from '../types/api';

export const useGetEnterpriseScOverview = () => useQuery({
  queryKey: [networkOverviewKey], queryFn: ({ signal }) => networkGet<EnterpriseScOverviewData>('sc-overview', undefined, signal),
});
export function useGetEnterpriseAgencyPartners(params: AgencyPartnerParams = {}) {
  const { sc_id = 'all', search = '', status = 'all', page = 1, limit = 6 } = params;
  const filters = { sc_id, search, status, page, limit };
  return useQuery({ queryKey: ['enterprise-agency-partners', filters],
    queryFn: ({ signal }) => networkGet<EnterpriseApDirectoryData>('agency-partners', filters, signal) });
}
export const useGetEnterpriseNetworkActivity = () => useQuery({
  queryKey: ['enterprise-network-activity-feed'],
  queryFn: ({ signal }) => networkGet<EnterpriseNetworkActivityData>('activity', undefined, signal), refetchInterval: 30000,
});
export const useGetEnterpriseScHealth = () => useQuery({ queryKey: ['enterprise-sc-health'],
  queryFn: ({ signal }) => networkGet<EnterpriseScHealthSummary>('sc-health', undefined, signal) });
export const useGetEnterpriseEarningsSummary = () => useQuery({ queryKey: ['enterprise-earnings-summary'],
  queryFn: ({ signal }) => networkGet<EnterpriseEarningsSummary>('earnings-summary', undefined, signal) });
export const useGetEnterpriseTopScs = () => useQuery({ queryKey: ['enterprise-top-scs'],
  queryFn: ({ signal }) => networkGet<EnterpriseTopScItem[]>('top-scs', undefined, signal) });
export const useGetEnterpriseActivationsChart = () => useQuery({ queryKey: ['enterprise-activations-chart'],
  queryFn: ({ signal }) => networkGet<EnterpriseActivationsChartData>('activations-chart', undefined, signal) });
