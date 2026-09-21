export type PricingTabKey =
  | "commission_table"
  | "set_retail_prices"
  | "sc_commission_rates"
  | "ap_commission_rates";

export interface CommissionRecord {
  id: string;
  name: string;
  initials: string;
  phone: string;
  state: string;
  apsCount: number;
  activations: number;
  wholesale: number;
  retail: number;
  marginPerSim: number;
  simRevenue: number;
  scRate: number; // e.g. 0.08
  scComm: number;
  netEpMargin: number;
  pctOfTotal: number; // e.g. 18.5
  isSuspended?: boolean;
}

export interface RetailPriceConfig {
  id: string;
  simType: string;
  label: string;
  wholesale: number;
  currentRetail: number;
  marginPerSim: number;
  paceEstMonthly: number;
  monthlyActivations: number;
}

export interface ScCommissionRateItem {
  id: string;
  name: string;
  initials: string;
  phone: string;
  state: string;
  apsCount: number;
  currentRate: number;
  monthlyEarned: number;
  youKeep: number;
  activations: number;
  isSuspended?: boolean;
}

export interface ApRateConfigItem {
  id: string;
  simType: string;
  label: string;
  mode: "fixed" | "percentage";
  rate: number;
  avgActivations: number;
  totalCommissionEst: number;
}

export interface PricingSummaryKPIs {
  avgMarginPerSim: number;
  totalMargin: number;
  scCommission: number;
  netEpEarnings: number;
  activationsCount: number;
}
