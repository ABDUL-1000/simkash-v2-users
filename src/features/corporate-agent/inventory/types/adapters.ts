import { APP_COLORS as c } from "@/constants/colors";
import type { CaInventoryOverviewData, CaDistributeContextData, CaInventoryHistoryEvent } from "./inventory";
import type { CaApStockDistributionRow, CaCurrentInventoryCardItem, CaHistoryEventItem } from "./ca-inventory.types";
export function inventoryTone(value: string) {
  if (/green|good|healthy|#10b981/i.test(value)) return c.greens.green;
  if (/red|critical|out|#ef4444/i.test(value)) return c.reds.red;
  if (/yellow|orange|amber|low|warning|#f59e0b/i.test(value)) return c.ambers.amber;
  return c.blues.primary;
}
export const inventoryItems = (data: CaInventoryOverviewData): CaCurrentInventoryCardItem[] => data.current_inventory.map(item => ({
  id: item.type, type: item.label, count: item.available, status: item.status, statusColor: inventoryTone(item.status_color),
  capacityPercent: Math.min(100, Math.max(0, item.capacity_percentage)), capacityColor: inventoryTone(item.progress_color),
  capacityText: item.capacity_text, subtext: item.subtext, carriers: item.network_breakdown.map(n => ({ name: n.network, count: n.count })),
}));
export const stockRows = (data: CaInventoryOverviewData): CaApStockDistributionRow[] => data.how_stock_is_distributed.partners.map(ap => ({ ...ap, id: String(ap.id), avatarInitials: ap.initials, state: "" }));
export const contextRows = (data: CaDistributeContextData): CaApStockDistributionRow[] => data.agency_partners.map(ap => ({ id: String(ap.id), name: ap.name, phone: ap.phone, state: "", avatarInitials: ap.initials, total: ap.current_stock, status: ap.status, customers: ap.customers,
  // Per-type AP stock isn't supplied by this endpoint. It is not displayed in the form.
  pos: 0, cctv: 0, gps: 0, router: 0,
}));
export const historyRow = (event: CaInventoryHistoryEvent): CaHistoryEventItem => ({ id: event.id, timeLabel: event.date, periodGroup: event.date_section.replaceAll("_", " "), eventType: event.event, simType: event.sim_type, network: event.network, qty: event.qty, fromTo: event.party_text, runningTotal: event.running_total, ref: event.reference, detailedDate: event.raw_date });
