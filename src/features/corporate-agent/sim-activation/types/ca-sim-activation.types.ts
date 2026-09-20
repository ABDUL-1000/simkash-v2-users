export type CaSimType = "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM";

export type CaNetworkProvider = "MTN" | "Airtel" | "Glo" | "2 (9mobile)";

export type CaActivationStep = 1 | 2 | 3;

export type CaActivationMode = "single" | "bulk";

export type CaActivationStatus = "Completed" | "Pending" | "Failed" | "Cancelled" | "Stuck";

export interface CaPlanOption {
  id: string;
  days: number;
  label: string;
  price: string;
  priceAmount: number;
  description: string;
  expiryDate: string;
  isBestValue?: boolean;
}

export interface CaSimStockInfo {
  type: CaSimType;
  inStock: number;
  commission: number;
  isLowStock?: boolean;
}

export interface CaBulkSimItem {
  id: string;
  simNumber: string;
  status: "valid" | "invalid" | "already_active" | "checking" | "pending";
  errorMessage?: string;
}

export interface CaPendingActivationItem {
  id: string;
  simNumber: string;
  customerName: string;
  customerPhone: string;
  simType: CaSimType;
  network: CaNetworkProvider;
  plan: string;
  planDuration: string;
  pendingDuration: string;
  pendingMinutes: number;
  isStuck: boolean;
  commission: number;
  statusText: string;
  statusType: "verifying" | "processing" | "stuck";
  firstAttemptTime: string;
  attemptsCount: number;
  lastError?: string;
  requestId: string;
}

export interface CaActivationHistoryRecord {
  id: string;
  date: string;
  time: string;
  dateGroup: "TODAY" | "YESTERDAY" | "THIS WEEK" | "EARLIER THIS MONTH";
  simNumber: string;
  simType: CaSimType;
  network: CaNetworkProvider;
  planName: string;
  planPrice: string;
  commission: string;
  status: "Completed" | "Failed" | "Cancelled" | "Pending";
  customerName: string;
  customerPhone: string;
  address?: string;
  email?: string;
  reference: string;
  activatedAt: string;
  expiryDate: string;
  stockUsed: string;
  walletBalanceAfter: string;
  failureReason?: string;
}

export interface CaActivationTopKpiData {
  activationsToday: number;
  activationsTodayCommission: number;
  thisMonthCount: number;
  thisMonthCommission: number;
  simsInStock: number;
  simsInStockLabel: string;
  isLowStock: boolean;
  lowStockCount?: number;
  combinedTargetCurrent: number;
  combinedTargetTotal: number;
  combinedTargetPercentage: number;
  ownActivationsCount: number;
  apNetworkActivationsCount: number;
}

export interface CaHistoryAnalyticsData {
  monthName: string;
  totalActivations: number;
  completedCount: number;
  failedCount: number;
  commissionEarned: number;
  successRate: number;
  simTypeBreakdown: Array<{
    type: CaSimType;
    count: number;
    percentage: number;
    color: string;
  }>;
  networkBreakdown: Array<{
    network: CaNetworkProvider;
    count: number;
    percentage: number;
    color: string;
    barColor: string;
  }>;
  peakDayLabel: string;
  myContributionCount: number;
  combinedTotalCount: number;
  contributionPercentage: number;
  apNetworkCount: number;
}
