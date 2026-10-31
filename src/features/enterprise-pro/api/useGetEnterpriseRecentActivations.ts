import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { EpRecentActivationsData } from '../types/dashboard';
export const useGetEnterpriseRecentActivations = (params: { tab: 'all' | 'mine'; page: number; limit: number }) => useQuery({ queryKey: ['enterprise-recent-activations', params], queryFn: ({ signal }) => enterpriseGet<EpRecentActivationsData>('recent-activations', params, signal), placeholderData: keepPreviousData });
