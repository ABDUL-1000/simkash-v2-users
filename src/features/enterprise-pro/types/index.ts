export type SimType = "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM";

export interface EpKpiData {
  principalInvested: number;
  balanceRemaining: number;
  totalEarned: number;
  marginEarnings: number;
  networkCommission: number;
  activeSimStock: number;
  walletBalance: number;
  currentRoiMonth: number;
  allTimeRoi: number;
  projectedSixMonthRoi: number;
  totalScCount: number;
  totalApCount: number;
  actsThisMonth: number;
  growthRate: number;
}

export interface EpScCommissionRow {
  id: string;
  name: string;
  state: string;
  apsCount: number;
  actsCount: number;
  retailPrice: number;
  wholesalePrice: number;
  marginPerSim: number;
  totalMargin: number;
  netCommission: number;
  total: number;
}

export interface EpSimPriceConfig {
  type: SimType;
  label: string;
  wholesalePrice: number;
  retailPrice: number;
  marginPerSim: number;
  monthlyEstimate: number;
}

export type EpNotificationCategory = "all" | "investment" | "network" | "payments" | "system";

export interface EpNotificationItem {
  id: string;
  category: EpNotificationCategory;
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
  typeBadge?: string;
}

export interface EpNetworkActivityItem {
  id: string;
  network: "MTN" | "GLO" | "AIRTEL" | "9MOBILE";
  phoneNumber: string;
  scName: string;
  apName: string;
  commission: number;
  timeAgo: string;
}

export interface EpTopCoordinatorItem {
  rank: number;
  name: string;
  state: string;
  activations: number;
  commission: number;
}

export interface EpRecentActivityItem {
  id: string;
  title: string;
  detail: string;
  timeAgo: string;
  type: "activation" | "order" | "balance" | "price" | "bonus";
}

export interface SimOrderDraft {
  simType: SimType;
  quantity: number;
  unitCost: number;
  retailPrice: number;
  totalCost: number;
  paymentSource: "wallet" | "fresh";
}
