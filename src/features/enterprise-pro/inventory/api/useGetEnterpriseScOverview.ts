import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { ScOverviewData } from '../types/simInventory';
export const useGetEnterpriseScOverview = () => useQuery({ queryKey: ['enterprise-sc-overview'], queryFn: ({ signal }) => inventoryGet<ScOverviewData>('sc-overview', undefined, signal) });
