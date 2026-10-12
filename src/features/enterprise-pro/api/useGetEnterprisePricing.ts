import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { EnterprisePricingData } from '../types/dashboard';
export const useGetEnterprisePricing = (enabled = true) => useQuery({ queryKey: ['enterprise-pricing'], queryFn: ({ signal }) => enterpriseGet<EnterprisePricingData>('pricing', undefined, signal), enabled });
