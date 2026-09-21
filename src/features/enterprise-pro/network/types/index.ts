export type ScStatus = "active" | "suspended" | "new";

export interface StateCoordinatorNetwork {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  state: string;
  zone: string;
  apsCount: number;
  activationsThisMonth: number;
  retailPerSim: number;
  marginPerSim: number;
  totalMargin: number;
  commissionRate: number; // e.g. 8% -> 0.08
  commissionEarned: number;
  totalEarnings: number;
  simStock: number;
  status: ScStatus;
  suspendedDate?: string;
  suspensionReason?: string;
  targetActivations?: number;
  activeApCount?: number;
}

export type ApStatus = "active" | "low_stock" | "out_of_stock";

export interface AgencyPartnerNetwork {
  id: string;
  name: string;
  state: string;
  scId: string;
  scName: string;
  simsSold: number;
  activations: number;
  commission: number;
  status: ApStatus;
  phone?: string;
}

export interface NetworkSummaryKPIs {
  totalScs: number;
  activeScs: number;
  suspendedScs: number;
  newScs: number;
  lowStockScs: number;
  totalAps: number;
  activationsThisMonth: number;
  marginThisMonth: number;
  networkCommission: number;
}

export interface OnboardScFormData {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  lga: string;
  commissionRate: number;
  posSims: number;
  cctvSims: number;
  gpsSims: number;
  routerSims: number;
}
