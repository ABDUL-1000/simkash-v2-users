export type CaInventoryTab = "available" | "distribute" | "redistribute" | "history";

export interface CaInventoryKpis {
  totalAvailable: number;
  distributedThisMonth: number;
  receivedThisMonth: number;
  pendingRequests: number;
  apsLowStockCount: number;
}

export interface CaCurrentInventoryCardItem {
  id: string;
  type: string;
  count: number;
  status: string;
  subtext?: string;
  capacityText?: string;
  statusColor: string;
  capacityPercent: number;
  capacityColor: string;
  carriers: { name: string; count: number }[];
}

export interface CaApStockDistributionRow {
  id: string;
  name: string;
  phone: string;
  state: string;
  total: number;
  status: string;
  customers?: number;
  activations?: string;
  avatarInitials: string;
}

export interface CaHealthBreakdownItem {
  label: string;
  percent: number;
  color: string;
}

export interface CaDaysRemainingItem {
  label: string;
  days: number;
  badgeTone?: "normal" | "warning" | "danger";
}

export interface CaUrgentApStockItem {
  id: string;
  name: string;
  simType: string;
  remaining: number;
  status: "Low Stock" | "Out of Stock" | "Critical";
}

export interface CaHistoryKpiData {
  totalReceived: number;
  totalDistributed: number;
  currentlyInStock: number;
  pendingRequest: number;
}

export interface CaHistoryEventItem {
  id: string;
  timeLabel: string;
  periodGroup: string;
  eventType: string;
  simType: string;
  qty: number;
  fromTo: string;
  ref: string;
}

/** Recipient card in the distribute tab, built from GET /my-partner/{id} and /stock-history. */
export interface CaApPreview {
  id: number;
  name: string;
  phone: string;
  initials: string;
  location: string;
  customers: number;
  current_stock: number;
  activations_text: string;
  last_received: string;
  last_sent_details?: { time_ago: string; total_sims: number; breakdown_text: string };
}

/** Stock before/after, computed locally from your undistributed stock and the partner stock. */
export interface CaDistributionPreview { total: number; csaBefore: number; csaAfter: number; apBefore: number; apAfter: number; healthy: boolean; safetyMessage: string }
