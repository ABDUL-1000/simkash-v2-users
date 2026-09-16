export type CaInventoryTab = "available" | "distribute" | "history";

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
  status: "Good" | "Low" | "Critical";
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
  pos: number;
  cctv: number;
  gps: number;
  router: number;
  total: number;
  status: "Good" | "Low" | "Critical" | "Suspended";
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
  periodGroup: "Today" | "Yesterday" | "This Week" | "Earlier";
  eventType: "Received" | "Distributed" | "Returned" | "Adjusted";
  simType: string;
  network: string;
  qty: number;
  fromTo: string;
  runningTotal: string;
  ref: string;
  apName?: string;
  apLocation?: string;
  apPhone?: string;
  returnReason?: string;
  stockBefore?: string;
  stockReturnedOrChanged?: string;
  stockAfter?: string;
  recipientStockTransition?: string;
  detailedDate?: string;
}
