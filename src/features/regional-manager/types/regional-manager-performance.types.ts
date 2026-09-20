export type PerformanceNavTab = "overview" | "commission" | "bonuses" | "comparison";
export type PerformancePeriod = "This Week" | "This Month" | "Last 3 Months" | "This Year" | "Custom";

export interface ScPerformanceRowItem {
  id: string;
  rank: number;
  name: string;
  state: string;
  scName?: string;
  activations: number;
  status?: string;
  target?: number;
  totalAps?: number;
  growthRate?: number;
  commissionEarned?: number;
  activeAps?: number;
  targetAchieved?: number;
  growthPercentage?: string;
  phone?: string;
  vsLastMonth: string;
  isPositiveGrowth: boolean;
  commission: string;
  commissionNumeric: number;
  apsCount: number;
  bonusStatus: "Achieved" | "On Track" | "At Risk" | "Suspended";
  stock: number;
  growthMoM: string;
  avgPerAp: number;
}

export interface MonthlyCommissionHistoryItem {
  month: string;
  networkActs: number;
  commission: string;
  commissionNumeric: number;
  vsPrev: string;
  payoutStatusText: string;
  statusType: "paid" | "partial" | "pending";
}

export interface ScBonusTrackerRowItem {
  id: string;
  name: string;
  phone: string;
  state: string;
  scName?: string;
  target: number;
  achieved: number;
  progressPercent: number;
  daysLeft: number;
  status: "Achieved" | "On Track" | "At Risk" | "Suspended";
  bonusText: string;
  bonusStatus?:string
  isPaid: boolean;
}

export interface BonusPayoutHistoryRowItem {
  month: string;
  scsHit: string;
  bonusesPaidOut: string;
  hitRate: string;
}

export interface EasyBuyStats {
  netRebate: string;
  vsLastMonth: string;
  activePlans: number;
  completedThisMonth: number;
  avgCommissionPerPlan: string;
  totalPlanValue: string;
  q2Target: string;
  q2Achieved: string;
  q2Percent: number;
  topContributors: { name: string; amount: string }[];
}

export interface NetworkHealthMetrics {
  overallScore: number;
  scActivityRate: number;
  activationSuccess: number;
  stockUtilisation: number;
  apEngagement: number;
  commissionHealth: number;
}
