import { useQuery } from '@tanstack/react-query';
import { inventoryGet } from './client';
import type { HistoryParams, EnterpriseInventoryHistoryData } from '../types/simInventory';
export function useGetEnterpriseInventoryHistory(params: HistoryParams = {}) { const { flow = 'all', type = 'all', search = '', sort = 'newest', page = 1, limit = 12 } = params; const filters = { flow, type, search, sort, page, limit }; return useQuery({ queryKey: ['enterprise-inventory-history', filters], queryFn: ({ signal }) => inventoryGet<EnterpriseInventoryHistoryData>('history', filters, signal) }); }
