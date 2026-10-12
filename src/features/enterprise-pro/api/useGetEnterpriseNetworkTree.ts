import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { NetworkTreeData } from '../types/dashboard';
export const useGetEnterpriseNetworkTree = (enabled = true) => useQuery({ queryKey: ['enterprise-network-tree'], queryFn: ({ signal }) => enterpriseGet<NetworkTreeData>('network', undefined, signal), enabled });
