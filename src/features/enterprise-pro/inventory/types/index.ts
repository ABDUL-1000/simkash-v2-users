export type SimType = "POS" | "CCTV" | "GPS" | "ROUTER";

export type StockHealthStatus = "healthy" | "low" | "critical";

export interface SimStockItem {
  id: SimType;
  name: string;
  category: string;
  inStock: number;
  minThreshold: number;
  maxCapacity: number;
  wholesalePrice: number;
  retailPrice: number;
  profitMargin: number;
  status: StockHealthStatus;
  description: string;
  iconBgColor?: string;
}

export interface StateCoordinatorStock {
  id: string;
  name: string;
  state: string;
  zone: string;
  status: "active" | "suspended" | "pending";
  onHandStock: {
    pos: number;
    cctv: number;
    gps: number;
    router: number;
    total: number;
  };
  monthlyDistributed: {
    pos: number;
    cctv: number;
    gps: number;
    router: number;
    total: number;
  };
  totalActivated: number;
  lastDistributedDate: string;
  phone: string;
  apCount?: number;
  initials?: string;
}

export interface InventoryActivityItem {
  id: string;
  type: "reorder" | "distribution" | "return" | "adjustment";
  title: string;
  description: string;
  timestamp: string;
  referenceId: string;
  simTypeSummary: string;
  totalSims: number;
  status: "completed" | "in-transit" | "processing";
}

export interface SimLedgerEntry {
  id: string;
  date: string;
  referenceId: string;
  type: "distribution" | "reorder" | "return" | "adjustment";
  actor: string;
  recipientOrSource: string;
  pos: number;
  cctv: number;
  gps: number;
  router: number;
  totalSims: number;
  balanceAfter: number;
  authorizedBy: string;
  status: "completed" | "pending" | "processing";
  notes?: string;
}

export interface DistributionRequestPayload {
  scId: string;
  scName: string;
  state: string;
  pos: number;
  cctv: number;
  gps: number;
  router: number;
  notes?: string;
  pin: string;
}

export interface BulkDistributionRow {
  scId: string;
  scName: string;
  state: string;
  zone: string;
  status: "active" | "suspended";
  apCount?: number;
  initials?: string;
  currStockLabel?: string;
  currentStock: number;
  pos: number;
  cctv: number;
  gps: number;
  router: number;
}

export interface SimOrderPayload {
  pos: number;
  cctv: number;
  gps: number;
  router: number;
  paymentMethod: "wallet" | "bank_transfer";
  deliveryAddress: string;
  pin: string;
}
