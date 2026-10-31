import type { InventoryActivityItem, StateCoordinatorStock } from "./index";
import type { EnterpriseInventoryHistoryData, EnterpriseSimInventoryOverviewData, EpSimType } from "./simInventory";

export const EP_SIM_TYPES: EpSimType[] = ["pos", "cctv", "gps", "router"];
export const EP_SIM_LABELS: Record<EpSimType, string> = { pos: "POS SIM", cctv: "CCTV SIM", gps: "GPS SIM", router: "Router SIM" };
export const emptyEpSims = (): Record<EpSimType, string[]> => ({ pos: [], cctv: [], gps: [], router: [] });

export function coordinatorItems(data?: EnterpriseSimInventoryOverviewData): StateCoordinatorStock[] {
  return (data?.how_stock_is_distributed?.coordinators ?? []).map((sc) => ({
    id: String(sc.id), name: sc.name, state: sc.state, statusLabel: sc.status,
    onHandStock: { pos: sc.pos ?? 0, cctv: sc.cctv ?? 0, gps: sc.gps ?? 0, router: sc.router ?? 0, total: sc.total ?? 0 },
  }));
}

const ACTIVITY_TYPE: Record<string, InventoryActivityItem["type"]> = { received: "reorder", distributed: "distribution", returned: "return", adjusted: "adjustment" };
export function activityItems(data?: EnterpriseInventoryHistoryData): InventoryActivityItem[] {
  return (data?.history ?? []).slice(0, 5).map((row) => ({
    id: row.id, type: ACTIVITY_TYPE[row.event_type] ?? "adjustment", title: row.event_label, description: `${row.party_info} · ${row.sim_type_label}`,
    timestamp: row.time_ago, referenceId: row.reference, totalSims: Math.abs(row.quantity ?? 0),
  }));
}
