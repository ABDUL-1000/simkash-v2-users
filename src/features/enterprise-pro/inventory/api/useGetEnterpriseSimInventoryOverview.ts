import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { EnterpriseSimInventoryOverviewData } from '../types/simInventory';
export const useGetEnterpriseSimInventoryOverview = () => useQuery({ queryKey: ['enterprise-sim-inventory-overview'], queryFn: ({ signal }) => inventoryGet<EnterpriseSimInventoryOverviewData>('overview', undefined, signal) });
