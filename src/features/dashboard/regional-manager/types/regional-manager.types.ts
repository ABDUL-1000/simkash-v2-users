export type ScStockStatus = "Normal" | "Low" | "Critical" | "Out of Stock";
export type ScBonusStatus = "On Track" | "Achieved" | "At Risk" | "Missed";

export interface SimStockBreakdown {
  pos: number;
  cctv: number;
  gps: number;
  router: number;
}

export interface ScAgencyPartnerItem {
  id: string;
  initials: string;
  name: string;
  activations: number;
  status: "Active" | "Pending" | "Suspended";
  avatarBg?: string;
}

export interface StockDistributionRecord {
  id: string;
  date: string;
  pos: number;
  cctv: number;
  gps?: number;
  router?: number;
  total: number;
}

export interface AccountTimelineEvent {
  title: string;
  date: string;
  completed: boolean;
}

export interface StateCoordinatorItem {
  id: string;
  initials: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  lga?: string;
  address?: string;
  onboardedBy?: string;
  onboardedOn?: string;
  kycStatus?: "Verified" | "Pending" | "Unverified";
  bank?: string;
  stock: number;
  stockStatus: ScStockStatus;
  apsCount: number;
  activationsCount: number;
  bonusStatus: ScBonusStatus;
  lastActive: string;
  avatarBg?: string;
  simStockBreakdown: SimStockBreakdown;
  agencyPartners?: ScAgencyPartnerItem[];
  distributions?: StockDistributionRecord[];
  timeline?: AccountTimelineEvent[];
}

export interface NetworkActivityItem {
  id: string;
  type:
    | "sim_activated"
    | "batch_activations"
    | "stock_distributed"
    | "bonus_achieved"
    | "low_stock"
    | "sc_onboarded"
    | "sc_at_risk";
  title: string;
  subtitle: string;
  badgeText: string;
  badgeTone: "success" | "warning" | "danger" | "info" | "neutral";
  timeAgo: string;
}

export interface RmInventoryStats {
  totalAvailable: number;
  pos: number;
  cctv: number;
  gps: number;
  router: number;
  estimatedDays: number;
  distributedThisWeek: number;
}

export interface RmCommissionStats {
  totalActivations: number;
  commissionRate: number;
  totalEarned: number;
  pendingPayout: number;
}

export interface RmNetworkHealth {
  activeScs: { active: number; total: number };
  lowStockScs: { count: number; total: number };
  avgActivationsPerSc: number;
  bonusHitRatePercent: number;
  bonusHitCount: { count: number; total: number };
  outOfStockScs: { count: number; total: number };
}
