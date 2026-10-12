import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { EnterpriseDistributeContextData } from '../types/simInventory';
export const useGetEnterpriseDistributeContext = () => useQuery({ queryKey: ['enterprise-distribute-context'], queryFn: ({ signal }) => inventoryGet<EnterpriseDistributeContextData>('distribute/context', undefined, signal) });
