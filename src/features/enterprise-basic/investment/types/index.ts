export type AccountTier = "starter_upfront" | "financed" | "strategic_upfront";

export type InvestmentTabKey = "overview" | "commission" | "pay_down";

export interface EbInvestmentOverview {
  principalInvested: number;
  upfrontPaid: number;
  balanceOwed: number;
  additionalOrders: number;
  totalDeployed: number;
  totalMarginEarned: number;
  posMargin: number;
  cctvMargin: number;
  gpsMargin: number;
  routerMargin: number;
  roiPct: number;
  roiOnCapital: number;
  breakEvenProgress: number;
  projectedBreakEven: string;
  monthlyMarginAvg: number;
}

export interface InstalmentPeriod {
  id: string;
  periodNum: number;
  dueDate: string;
  amount: number;
  status: "paid" | "due" | "scheduled";
}

export interface RecentPayment {
  id: string;
  amount: number;
  date: string;
  status: "completed";
}

export interface MonthlyChartPoint {
  month: string;
  cost: number;
  revenue: number;
  margin: number;
}

export interface SimPnLDetail {
  id: string;
  simType: string;
  wholesalePrice: number;
  retailPrice: number;
  marginPerSim: number;
  totalPurchased: number;
  totalSold: number;
  totalRevenue: number;
  totalCost: number;
  totalMargin: number;
  unsoldStock: number;
  unsoldCostLocked: number;
  sellThroughPct: number;
  monthlySales: { month: string; units: number }[];
}

export interface EbInvestmentModalState {
  isOpenConfirmInstalment: boolean;
  isOpenConfirmExtra: boolean;
  isOpenProcessing: boolean;
  isOpenSuccessInstalment: boolean;
  isOpenSuccessExtra: boolean;
  isOpenFailed: boolean;
  isOpenExport: boolean;
  isOpenGeneratingReport: boolean;
  isOpenSimDetail: boolean;
  selectedSimDetail: SimPnLDetail | null;
  lastPaymentAmount: number;
  receiptRef: string;
}
