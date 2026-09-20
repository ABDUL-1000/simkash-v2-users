export type SimType = "POS" | "CCTV" | "GPS" | "Router";
export type TelcoCarrier = "MTN" | "Airtel" | "Glo" | "9mobile";

export interface CaTopKpis {
  myActsToday: number;
  myActsTodayCommission: number;
  networkToday: number;
  networkTodayOverride: number;
  thisMonthActs: number;
  thisMonthDirect: number;
  thisMonthNetwork: number;
  targetAchievedPercent: number;
  myStock: number;
  availableStock: number;
  activeApsInStock: number;
  myCommission: number;
}

export interface CaAgencyPartnerItem {
  id: string;
  name: string;
  phone: string;
  state: string;
  stock: number;
  stockStatus: "Good" | "Low" | "Out";
  actsThisMonth: number;
  bonusStatus: "Achieved" | "On Track" | "At Risk" | "Not Started";
  target: number;
  avatarInitials: string;
}

export interface CaActivationHistoryItem {
  id: string;
  phone: string;
  customerName: string;
  carrier: TelcoCarrier;
  simType: SimType;
  actor: "You" | string; // "You" or "AP: Rabiu Sani"
  isDirect: boolean;
  commission: number;
  timestamp: string;
  timeLabel: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface CaSimInventoryStats {
  totalAvailable: number;
  posAvailable: number;
  cctvAvailable: number;
  gpsAvailable: number;
  routerAvailable: number;
}

export interface CaActivityItem {
  id: string;
  type: "activation" | "stock" | "bonus" | "alert";
  title: string;
  description: string;
  timeAgo: string;
  iconType: "sim" | "stock" | "trophy" | "warning";
}
