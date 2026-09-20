export type CaCarrier = "MTN" | "Airtel" | "Glo" | "9mobile";

export type CaSimType = "POS SIM" | "CCTV SIM" | "GPS SIM" | "Router SIM";

export type CaActivationStatus = "Completed" | "Pending" | "Failed";

export interface CaActivationRecord {
  id: string;
  reference: string;
  simNumber: string;
  simType: string;
  network: CaCarrier;
  status: CaActivationStatus;
  agentName: string;
  agentPhone?: string;
  customerName: string;
  customerPhone?: string;
  date: string;
  time: string;
  timeAgo: string;
  isDirect: boolean;
  commission: string;
  failureReason?: string;
}

export interface CaNetworkMetricStats {
  ownToday: {
    count: number;
    trendText: string;
  };
  ownThisMonth: {
    count: number;
    commissionText: string;
  };
  ownCommission: {
    amount: string;
    trendText: string;
  };
  ownSuccessRate: {
    rate: string;
    subtext: string;
  };
}

export interface CaNetworkFilterState {
  searchQuery: string;
  network: string;
  status: string;
  simType: string;
  date: string;
}
