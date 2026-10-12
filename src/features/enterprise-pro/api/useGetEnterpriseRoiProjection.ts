import { useQuery } from '@tanstack/react-query';
import { enterpriseGet } from './client';
import type { RoiProjectionData } from '../types/dashboard';
export const useGetEnterpriseRoiProjection = (enabled = true) => useQuery({ queryKey: ['enterprise-roi-projection'], queryFn: ({ signal }) => enterpriseGet<RoiProjectionData>('roi-projection', undefined, signal), enabled });
