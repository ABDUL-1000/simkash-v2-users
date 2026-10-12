import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { EnterpriseInvestmentValuation } from '../types/simInventory';
export const useGetEnterpriseValuation = () => useQuery({ queryKey: ['enterprise-valuation'], queryFn: ({ signal }) => inventoryGet<EnterpriseInvestmentValuation>('valuation', undefined, signal) });
