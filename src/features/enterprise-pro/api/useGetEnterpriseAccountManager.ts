import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { AccountManagerData } from '../types/dashboard';
export const useGetEnterpriseAccountManager = (enabled = true) => useQuery({ queryKey: ['enterprise-account-manager'], queryFn: ({ signal }) => enterpriseGet<AccountManagerData>('account-manager', undefined, signal), enabled });
