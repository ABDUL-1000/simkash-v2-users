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
  statCards: { total: DeviceSimStatCard; expiringSoon: DeviceSimStatCard };
}

export interface PendingStep { step: number; title: string; completed: boolean; current: boolean; }
export interface PendingDetails { currentStep: number; stepName: string; submitted_at: string; steps: PendingStep[]; }

export interface DeviceSimItem {
  id: number;
  sim_id: number | null;
  sim_number: string;
  network: string;
  sim_type: string;
  typeLabel: string;
  status: "active" | "pending" | "expiring" | "expired";
  rawStatus: string;
  activated_at?: string | null;
  expiredDate?: string | null;
  daysLeft?: number | null;
  renewsInText?: string;
  isExpiringSoon?: boolean;
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

export type SimRequestType = "pos" | "cctv" | "gps" | "router";
export type SimRequestNetwork = "MTN" | "Airtel" | "Glo" | "T2" | "No preference";
export type SimRequestDelivery = "Agent Visit" | "Pick Up";
export interface RequestSimPayload {
  sim_type: SimRequestType; preferred_network: SimRequestNetwork; quantity: number; delivery_method: SimRequestDelivery;
  country: string; state: string; lga: string; street_address: string; landmark?: string; additional_notes?: string;
}
export interface SimRequestAgent { id: number; fullname: string; phone: string; email: string; whatsapp_link?: string }
export interface RequestSimResponseData {
  request_id: number; sim_type: string; typeLabel: string; preferred_network: string; quantity: number; delivery_method: string;
  delivery_address: { country: string; state: string; lga: string; street_address: string; landmark?: string; additional_notes?: string };
  status: string; assigned_agent?: SimRequestAgent | null;
}
