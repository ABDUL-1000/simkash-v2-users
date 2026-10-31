import { keepPreviousData, useQuery, type UseMutationOptions } from '@tanstack/react-query';
import { inventoryGet, useInventoryMutation } from './client';
import type {
  EnterpriseInventoryHistoryData, EnterpriseSimInventoryOverviewData, EpDistributionPayload, EpDistributionResult, EpHistoryDetailData, EpRedistributableData,
  EpRedistributableParams, EpRedistributionPayload, EpRedistributionResult, EpRequisitionPayload, EpRequisitionResult, EpSimListData, EpSimListParams, EpSimType,
  EpStockRequestItem, EpUndistributedData, HistoryParams,
} from '../types/simInventory';

/** GET /sim-inventory/overview */
export const useGetEnterpriseSimInventoryOverview = () => useQuery({ queryKey: ['enterprise-sim-inventory-overview'], queryFn: ({ signal }) => inventoryGet<EnterpriseSimInventoryOverviewData>('overview', undefined, signal) });
/** GET /sim-inventory/undistributed — limit 1 is enough for the per-type summary. */
export const useGetEnterpriseUndistributedSummary = () => useQuery({ queryKey: ['enterprise-undistributed-summary'], queryFn: ({ signal }) => inventoryGet<EpUndistributedData>('undistributed', { type: 'all', page: 1, limit: 1 }, signal) });
/** GET /sim-inventory/undistributed/{type} — the SIM numbers offered in the distribute form. */
export const useGetEnterpriseUndistributedByType = (type: EpSimType, params: EpSimListParams, enabled = true) => useQuery({ queryKey: ['enterprise-undistributed-sims', type, params], enabled, placeholderData: keepPreviousData, queryFn: ({ signal }) => inventoryGet<EpSimListData>('undistributed/' + type, params, signal) });
/** GET /sim-inventory/available */
export const useGetEnterpriseAvailableSims = (params: EpSimListParams & { sim_type?: string }) => useQuery({ queryKey: ['enterprise-available-sims', params], placeholderData: keepPreviousData, queryFn: ({ signal }) => inventoryGet<EpSimListData>('available', params, signal) });
/** GET /sim-inventory/redistributable */
export const useGetEnterpriseRedistributableSims = ({ coordinatorId, type = 'all', ...params }: EpRedistributableParams) => useQuery({ queryKey: ['enterprise-redistributable-sims', { coordinatorId, type, ...params }], placeholderData: keepPreviousData, queryFn: ({ signal }) => inventoryGet<EpRedistributableData>('redistributable', { ...params, type, coordinator_id: coordinatorId }, signal) });
/** GET /sim-inventory/redistributable/{type} — the SIM numbers of one source coordinator, per type. */
export const useGetEnterpriseRedistributableByType = (type: EpSimType, { coordinatorId, ...params }: Omit<EpRedistributableParams, 'type'>) => useQuery({ queryKey: ['enterprise-redistributable-sims', type, { coordinatorId, ...params }], placeholderData: keepPreviousData, queryFn: ({ signal }) => inventoryGet<EpRedistributableData>('redistributable/' + type, { ...params, coordinator_id: coordinatorId }, signal) });
/** GET /sim-inventory/history */
export function useGetEnterpriseInventoryHistory(params: HistoryParams = {}) {
  const filters = { event_type: 'all', sim_type: 'all', sortBy: 'newest', page: 1, limit: 12, ...params };
  return useQuery({ queryKey: ['enterprise-inventory-history', filters], placeholderData: keepPreviousData, queryFn: ({ signal }) => inventoryGet<EnterpriseInventoryHistoryData>('history', filters, signal) });
}
/** GET /sim-inventory/history/{id} */
export const useGetEnterpriseInventoryHistoryDetail = (id?: string) => useQuery({ queryKey: ['enterprise-inventory-history-detail', id], enabled: Boolean(id), queryFn: ({ signal }) => inventoryGet<EpHistoryDetailData>('history/' + encodeURIComponent(id ?? ''), undefined, signal) });
/** GET /sim-inventory/requests */
export const useGetEnterpriseStockRequests = (params: { page: number; limit: number }) => useQuery({ queryKey: ['enterprise-stock-requests', params], placeholderData: keepPreviousData, queryFn: ({ signal }) => inventoryGet<EpStockRequestItem[]>('requests', params, signal) });

/** POST /sim-inventory/distribute */
export const useEnterpriseDistributeSims = (options?: UseMutationOptions<EpDistributionResult, Error, EpDistributionPayload>) => useInventoryMutation<EpDistributionResult, EpDistributionPayload>('distribute', options);
/** POST /sim-inventory/redistribute */
export const useEnterpriseRedistributeSims = (options?: UseMutationOptions<EpRedistributionResult, Error, EpRedistributionPayload>) => useInventoryMutation<EpRedistributionResult, EpRedistributionPayload>('redistribute', options);
/** POST /sim-inventory/request-stock */
export const useEnterpriseRequestStock = (options?: UseMutationOptions<EpRequisitionResult, Error, EpRequisitionPayload>) => useInventoryMutation<EpRequisitionResult, EpRequisitionPayload>('request-stock', options);
