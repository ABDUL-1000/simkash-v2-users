export interface RmInventoryKpis {
  totalAvailable: number;
  distributedThisMonth: number;
  receivedThisMonth: number;
  pendingRequests: number;
  scsLowOnStock: number;
}

export interface RmNetworkStockBadge {
  name: string;
  count: number;
  bg: string;
  text: string;
}

export interface RmCurrentInventoryItem {
  id: string;
  name: string;
  typeKey: "pos" | "cctv" | "gps" | "router";
  description: string;
  networks: RmNetworkStockBadge[];
  count: number;
  status: "Good" | "Low" | "Critical";
  percentUsed: number;
}

export interface RmScDistributionRow {
  scId: string;
  name: string;
  state: string;
  pos: number | null;
  cctv: number | null;
  gps: number | null;
  router: number | null;
  total: number | null;
  status: "Good" | "Low" | "Critical" | "Out of Stock";
}

export interface RmInventoryHealthItem {
  name: string;
  count: number;
  status: "good" | "warning" | "danger";
}

export interface RmEstimatedDaysItem {
  name: string;
  days: string;
  status: "good" | "warning" | "danger";
}

export interface RmUrgentScItem {
  scId: string;
  name: string;
  state: string;
  simsRemaining: number;
  statusNote: string;
  isCritical?: boolean;
}

export type RmHistoryGroup =
  | "TODAY"
  | "YESTERDAY"
  | "THIS_WEEK"
  | "EARLIER_THIS_MONTH";

export type RmHistoryEventType =
  | "Received"
  | "Distributed"
  | "Adjusted"
  | "Returned";

export interface RmHistoryEvent {
  id: string;
  refNo: string;
  date: string;
  time: string;
  displayDate: string;
  group: RmHistoryGroup;
  eventType: RmHistoryEventType;
  simType: "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM";
  network: string;
  quantity: number;
  fromTo: string;
  stockBalance: number;
  // Detail Modal Fields
  stockBefore?: number;
  stockAfter?: number;
  adjustmentAmount?: number;
  reason?: string;
  adjustedBy?: string;
  requestRef?: string;
  from?: string;
  networkBreakdown?: string;
}

export interface RmHistorySummary {
  totalReceived: number;
  totalDistributed: number;
  currentlyInStock: number;
  pendingRequest: number;
}

export interface RmHistoryKpis {
  totalSims: number;
  distributed: number;
  available: number;
  expiringSoon: number;
  pendingRequests: number;
}
