export type SimCategory = "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM";

export type StockHealthStatus = "Good" | "Low" | "Critical";

export type UrgencyLevel = "Normal" | "Urgent" | "Critical";

export type StockEventType = "Received" | "Used" | "Adjusted";

export interface NetworkStockCount {
  network: "MTN" | "Airtel" | "Glo" | "T2" | "9mobile";
  count: number;
}

export interface SimInventoryItem {
  id: string;
  simType: SimCategory;
  subtitle: string;
  count: number;
  networks: NetworkStockCount[];
  percentUsed: number;
  status: StockHealthStatus;
  canRequestMore?: boolean;
}

export interface StockEventItem {
  id: string;
  eventRef: string;
  date: string;
  dateGroup: "TODAY" | "YESTERDAY" | "THIS WEEK" | "EARLIER THIS MONTH";
  eventType: StockEventType;
  simType: SimCategory;
  network: "MTN" | "Airtel" | "Glo" | "9mobile" | "T2";
  quantity: number; // positive or negative
  fromTo: string;
  runningTotal: string;
  ref: string;
  // Modal specific fields
  customer?: string;
  simNumber?: string;
  commission?: string;
  activationRef?: string;
  requestRef?: string;
  stockBefore?: string;
  deltaQty?: string;
  stockAfter?: string;
  fullDate?: string;
  notes?: string;
}

export interface StockRequestQuantities {
  pos: number;
  cctv: number;
  gps: number;
  router: number;
}

export interface PendingStockRequestInfo {
  requestRef: string;
  totalRequested: number;
  posQty: number;
  cctvQty: number;
  gpsQty?: number;
  routerQty?: number;
  submittedTime: string;
  status: string;
  urgency: UrgencyLevel;
  scName: string;
  scPhone: string;
}
