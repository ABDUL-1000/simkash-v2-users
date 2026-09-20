export type RedistributeMode = "sc-to-sc" | "recall" | "quick-dist";

export type RedistributeReason =
  | "balance-stock"
  | "urgent-request"
  | "campaign-support"
  | "sc-closing"
  | "other";

export interface ScNetworkMapItem {
  id: string;
  name: string;
  fullName: string;
  state: string;
  stock: number;
  phone: string;
  tone: "green" | "yellow" | "red" | "blue";
  posStock: number;
  cctvStock: number;
  gpsStock: number;
  routerStock: number;
}

export interface RecentMovementItem {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  type: "transfer" | "received" | "returned" | "adjustment";
}

export interface RedistributionHistoryRecord {
  id: string;
  date: string;
  type: "SC to SC" | "Recall" | "Quick Dist";
  from: string;
  to: string;
  qty: number;
  reason: string;
  status: "Completed" | "Declined" | "Pending";
  ref: string;
}

export interface RecallRequestRecord {
  scName: string;
  phone: string;
  recallQty: number;
  simType: string;
  requestedTime: string;
  expiresIn: string;
  refNo: string;
}
