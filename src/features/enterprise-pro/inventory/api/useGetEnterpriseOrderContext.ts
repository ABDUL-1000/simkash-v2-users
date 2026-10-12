import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { EnterpriseOrderContextData } from '../types/simInventory';
export const useGetEnterpriseOrderContext = () => useQuery({ queryKey: ['enterprise-order-context'], queryFn: ({ signal }) => inventoryGet<EnterpriseOrderContextData>('order/context', undefined, signal) });
