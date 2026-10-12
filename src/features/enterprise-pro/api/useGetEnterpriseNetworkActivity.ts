import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { NetworkActivityData } from '../types/dashboard';
export function useGetEnterpriseNetworkActivity({ network = 'all', page = 1, limit = 10 }: { network?: string; page?: number; limit?: number } = {}, enabled = true) {
 return useQuery({ queryKey: ['enterprise-network-activity', { network, page, limit }], queryFn: ({ signal }) => enterpriseGet<NetworkActivityData>('network-activity', { network, page, limit }, signal), enabled, refetchInterval: enabled ? 30000 : false });
}
