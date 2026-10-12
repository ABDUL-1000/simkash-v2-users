import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { RecentActivityData } from '../types/dashboard';
export const useGetEnterpriseRecentActivity = (enabled = true) => useQuery({ queryKey: ['enterprise-recent-activity'], queryFn: ({ signal }) => enterpriseGet<RecentActivityData>('recent-activity', undefined, signal), enabled });
