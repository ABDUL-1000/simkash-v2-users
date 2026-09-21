export type InvestmentTabKey = "overview" | "commission" | "reinvest" | "pay-down";

export interface AdditionalSimOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  simType: "eSIM Pro" | "Physical 5G" | "IoT Machine" | "Standard 4G";
  quantity: number;
  unitCost: number;
  totalAmount: number;
  destinationSc: string;
  status: "Delivered" | "In Transit" | "Processing";
}

export interface ScCommissionItem {
  id: string;
  scName: string;
  state: string;
  avatar?: string;
  totalSimsAssigned: number;
  activeSims: number;
  activationRate: number;
  commissionRate: number; // percentage e.g. 15
  grossCommission: number;
  platformFee: number;
  netEarned: number;
  status: "Top Performer" | "On Track" | "Needs Attention";
}

export interface ReinvestSimProduct {
  id: string;
  name: string;
  type: string;
  wholesalePrice: number;
  retailPrice: number;
  marginPerSim: number;
  estimatedMonthlyRoi: string;
  minOrder: number;
  badge?: string;
  recommended?: boolean;
}

export interface BalancePaymentRecord {
  id: string;
  reference: string;
  date: string;
  amount: number;
  paymentMethod: string;
  appliedTo: string;
  remainingBalanceAfter: number;
  status: "Successful" | "Pending" | "Failed";
}

export interface EarningsTimelinePoint {
  month: string;
  principal: number;
  cumulativeEarnings: number;
}

export interface MonthlyEarningsBreakdownPoint {
  month: string;
  simActivations: number;
  dataRecharges: number;
  bonusOverrides: number;
}

export interface SimPerformanceMetric {
  type: string;
  activeCount: number;
  totalVolume: number;
  sharePercentage: number;
  monthlyRevenue: number;
  color: string;
}
