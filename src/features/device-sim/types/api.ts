export interface DeviceSimStatCard {
  value: number | string;
  label: string;
  subtext: string;
  active?: number;
  pending?: number;
  actionNeeded?: boolean;
}

export interface DeviceSimOverviewData {
  totalSims: number;
  activeSims: number;
  pendingSims: number;
  expiringSims: number;
  expiredSims: number;
  usedThisMonth: string;
  statCards: { total: DeviceSimStatCard; expiringSoon: DeviceSimStatCard; usedThisMonth: DeviceSimStatCard };
}

export interface SimDataUsage { used: string; total: string; remaining: string; percentage: number; }
export interface PendingStep { step: number; title: string; completed: boolean; current: boolean; }
export interface PendingDetails { currentStep: number; stepName: string; submitted_at: string; steps: PendingStep[]; }

export interface DeviceSimItem {
  id: number;
  sim_id: number;
  sim_number: string;
  network: string;
  sim_type: string;
  typeLabel: string;
  plan: string;
  status: "active" | "pending" | "expiring" | "expired";
  rawStatus: string;
  activated_at?: string;
  expiredDate?: string;
  daysLeft?: number;
  renewsInText?: string;
  isExpiringSoon?: boolean;
  dataUsage?: SimDataUsage;
  pendingDetails?: PendingDetails;
  serial?: string;
  autoRenew?: boolean;
}

export interface DeviceSimListResponseData {
  stats: DeviceSimOverviewData;
  sims: DeviceSimItem[];
  pagination: { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };
}

export interface RenewSimPayload { sim_type: string; sim_number: string; duration: string; pin: string; }

export interface DeviceSimFilters { page: number; limit: number; network?: string; status?: string; }
