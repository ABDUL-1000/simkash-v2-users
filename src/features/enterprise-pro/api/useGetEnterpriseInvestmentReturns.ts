import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { InvestmentReturnsData } from '../types/dashboard';
export const useGetEnterpriseInvestmentReturns = (enabled = true) => useQuery({ queryKey: ['enterprise-investment-returns'], queryFn: ({ signal }) => enterpriseGet<InvestmentReturnsData>('investment-returns', undefined, signal), enabled });
