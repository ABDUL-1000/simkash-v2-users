import { useScOperation, useScResource, type ScMutationOptions } from "./operationsClient";
import type { RmStockRequestItem, ScSimInventoryOverviewData } from "../types/inventory";
import type { DistributionPayload, InventoryHistoryData, InventoryHistoryParams, SimListParams, StockListData, StockRequestPayload, UndistributedData } from "../types/operations";

const base = "/state-coordinator/sim-inventory";
export const useGetScSimInventoryOverview = () => useScResource<ScSimInventoryOverviewData>("sc-sim-inventory-overview", `${base}/overview`);
export const useGetScAvailableStockSims = (params: SimListParams, enabled = true) => {
  const { type, network, search, page, limit } = params;
  const filters = { type, network, search, page, limit };
  return useScResource<StockListData>("sc-available-stock-sims", `${base}/available`, filters, enabled);
};
export const useGetScUndistributedSims = ({ agentId, ...params }: SimListParams, enabled = true) =>
  useScResource<UndistributedData>("sc-undistributed-sims", `${base}/undistributed`, { ...params, agent_id: agentId }, enabled);
export const useGetScInventoryHistory = ({ eventType = "all", ...params }: InventoryHistoryParams) =>
  useScResource<InventoryHistoryData>("sc-inventory-history", `${base}/history`, { ...params, event_type: eventType });
export const useGetScRmStockRequests = () => useScResource<RmStockRequestItem[]>("sc-rm-stock-requests", `${base}/requests`);
export const useDistributeInventoryStock = (options?: ScMutationOptions<DistributionPayload>) => useScOperation(`${base}/distribute`, "post", options);
export const useRequestStockFromRm = (options?: ScMutationOptions<StockRequestPayload>) => useScOperation(`${base}/request-stock`, "post", options);
