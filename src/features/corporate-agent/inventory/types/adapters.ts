import { APP_COLORS as c } from "@/constants/colors";
import type { CaInventoryHistoryItem, CaInventoryOverviewData, CaRedistType, CaSimType, CaStockSummary } from "./inventory";
import type { CaApStockDistributionRow, CaCurrentInventoryCardItem, CaHistoryEventItem } from "./ca-inventory.types";
import type { PartnersOverview } from "../../my-partner/types/api";

export const CA_SIM_TYPES: CaSimType[] = ["pos", "cctv", "gps", "router"];
export const CA_SIM_LABELS: Record<CaSimType, string> = { pos: "POS SIM", cctv: "CCTV SIM", gps: "GPS SIM", router: "Router SIM" };
export const emptyCaSims = (): Record<CaSimType, string[]> => ({ pos: [], cctv: [], gps: [], router: [] });
export const CA_REDIST_TYPES: CaRedistType[] = [...CA_SIM_TYPES, "cctv_device"];
export const CA_REDIST_LABELS: Record<CaRedistType, string> = { ...CA_SIM_LABELS, cctv_device: "CCTV Device" };
export const emptyCaRedist = (): Record<CaRedistType, string[]> => ({ pos: [], cctv: [], gps: [], router: [], cctv_device: [] });

export function inventoryTone(value: string) {
  if (/green|good|healthy|#10b981/i.test(value)) return c.greens.green;
  if (/red|critical|out|#ef4444/i.test(value)) return c.reds.red;
  if (/yellow|orange|amber|low|moderate|warning|#f59e0b/i.test(value)) return c.ambers.amber;
  return c.blues.primary;
}
export const inventoryItems = (data: CaInventoryOverviewData): CaCurrentInventoryCardItem[] => data.stock_types.map(item => ({
  id: item.type, type: item.label, count: item.available, status: item.status, statusColor: inventoryTone(item.status),
  capacityPercent: Math.min(100, Math.max(0, item.allocated_percentage)), capacityColor: inventoryTone(item.status),
  capacityText: item.allocated_text, subtext: `${item.available} available`, carriers: item.network_breakdown.map(n => ({ name: n.network, count: n.count })),
}));
const initials = (name: string) => name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
export const stockRows = (data: CaInventoryOverviewData): CaApStockDistributionRow[] => data.how_stock_is_distributed.partners.map(ap => ({
  id: String(ap.id), name: ap.name, phone: ap.phone, state: "", avatarInitials: initials(ap.name), total: ap.stock, status: ap.status, customers: ap.customers, activations: ap.activations_text,
}));
/** Agency partners (GET /my-partner/overview) as distribute-form rows. */
export const partnerRows = (data?: PartnersOverview): CaApStockDistributionRow[] => (data?.partners ?? []).map(ap => ({
  id: String(ap.id), name: ap.name, phone: ap.phone, state: ap.location, avatarInitials: ap.initials || initials(ap.name), total: ap.stock, status: ap.status_label, customers: ap.customers_count,
}));
/** Per-type stock from the overview's stock_types. */
export const overviewStock = (data?: CaInventoryOverviewData): CaStockSummary => {
  const count = (type: CaSimType) => data?.stock_types.find(item => item.type === type)?.available ?? 0;
  const stock = { pos: count("pos"), cctv: count("cctv"), gps: count("gps"), router: count("router") };
  return { ...stock, total: data?.summary_cards.total_available.count ?? stock.pos + stock.cctv + stock.gps + stock.router, summary_text: stockText(stock) };
};
export const stockText = (stock: Record<CaSimType, number>) => CA_SIM_TYPES.map(type => `${CA_SIM_LABELS[type].replace(" SIM", "")} ${stock[type]}`).join(" · ");

const dayGroup = (iso: string) => {
  const date = new Date(iso);
  const days = Math.floor((new Date().setHours(0, 0, 0, 0) - new Date(date).setHours(0, 0, 0, 0)) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return "This Week";
  return date.toLocaleDateString("en-NG", { month: "long", year: "numeric" });
};
export const historyRow = (event: CaInventoryHistoryItem): CaHistoryEventItem => {
  const received = event.event_type === "received";
  return {
    id: event.id, periodGroup: dayGroup(event.date), timeLabel: `${new Date(event.date).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · ${event.time_ago}`,
    eventType: received ? "Received" : "Distributed", simType: event.sim_type, qty: received ? event.quantity : -event.quantity,
    fromTo: `${received ? "From" : "To"}: ${event.party_name}`, ref: event.reference,
  };
};
