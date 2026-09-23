export type EbPaymentModel = "upfront" | "financed";

export interface EbDashboardMetrics {
  // Stock
  productsInStock: number;
  simsInStock: number;
  cctvInStock: number;
  solarInStock: number;
  // Margins & Revenue
  totalMarginEarned: number;
  marginThisMonth: number;
  simsMarginThisMonth: number;
  cctvMarginThisMonth: number;
  solarMarginThisMonth: number;
  // Products Sold
  productsSold: number;
  simsSold: number;
  cctvSold: number;
  solarSold: number;
  // Customers
  totalCustomers: number;
  customersThisMonth: number;
  // Debt & Balance
  balanceRemaining: number;
  balancePaid: number;
  nextInstalmentAmount: number;
  nextInstalmentDate: string;
  nextInstalmentDueDays: number;
  // Wallet & Targets
  walletBalance: number;
  bonusProgressPct: number;
  bonusTargetCurrent: number;
  bonusTargetMax: number;
}

export interface EbSaleItem {
  id: string;
  customerName: string;
  initials: string;
  phone: string;
  itemType: string;
  itemDetail: string;
  margin: number;
  timestamp: string;
}

export interface PnLSummaryRecord {
  simType: string;
  bought: number;
  cost: number;
  sold: number;
  revenue: number;
  marginPerSim: number;
  netPnl: number;
  unsoldStock: number;
  unsoldCost: number;
}

export interface EbNotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: "all" | "sales" | "balance" | "stock" | "system";
  read: boolean;
  amount?: number;
}

export interface InstalmentScheduleItem {
  periodLabel: string;
  dateStr: string;
  amount: number;
  status: "paid" | "due_today" | "scheduled";
}

export interface AssignSimFormData {
  simType: string;
  customerName: string;
  customerPhone: string;
  simNumber: string;
  network: string;
  planDuration: string;
  retailPrice: number;
  costPrice: number;
  margin: number;
}
