export type NetworkType = "MTN" | "Airtel" | "Glo" | "9mobile";
export type SimCategory = "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM";
export type ActivationStatus = "Completed" | "Failed" | "Pending";
export type NetworkViewTab = "activation" | "sc" | "ap" | "sim_type";
export type TimeframeFilter = "Today" | "This Week" | "This Month" | "Custom";

export interface NetworkActivationItem {
  id: string;
  reference: string;
  simNumber: string;
  simType: SimCategory;
  network: NetworkType;
  status: ActivationStatus;
  customerName: string;
  customerPhone: string;
  apName: string;
  apPhone: string;
  scName: string;
  scState: string;
  date: string;
  time: string;
  timeAgo: string;
  isToday: boolean;
  commission: {
    apEarned: number;
    scEarned: number;
    rmEarned: number;
    total: number;
  };
  failureReason?: string;
}

export interface ScNetworkBreakdownItem {
  id: string;
  rank: number;
  name: string;
  state: string;
  initials: string;
  activationsToday: number;
  commissionToday: string;
  apsActiveCount: number;
  totalApsCount: number;
  trend: "up" | "down" | "neutral";
}

export interface ApNetworkSummaryItem {
  id: string;
  name: string;
  location: string;
  scName: string;
  scState: string;
  activations: number;
  commission: string;
  simTypes: SimCategory[];
  status: "Active" | "Inactive" | "1 Failed" | "2 Failed";
  failedCount?: number;
}

export interface SimTypeBreakdownItem {
  type: SimCategory;
  count: number;
  percentage: number;
  color: string;
  barColor: string;
  growth?: number; // Optional growth percentage compared to previous period
}

export interface HourlyPulseItem {
  hour: string;
  hourNumber: number;
  count: number;
  isPeak?: boolean;
}
