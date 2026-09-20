export type CustomerSimType = "POS" | "CCTV" | "GPS" | "Router";

export type CustomerNetwork = "MTN" | "Airtel" | "Glo" | "T2";

export type CustomerStatus = "Active" | "Expiring" | "Expired" | "Pending";

export interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  simNumber: string;
  simType: CustomerSimType;
  network: CustomerNetwork;
  plan: string;
  status: CustomerStatus;
  activatedDate: string;
  expiryDate: string;
  daysRemaining: number;
  dataUsed: string;
  totalData: string;
  autoRenew: boolean;
  commission: number;
  addedBy?: string;
  customerSince?: string;
}

export interface ReminderItem {
  id: string;
  date: string;
  type: string; // e.g. "7-day reminder"
  channel: "SMS" | "Push" | "WhatsApp";
  status: "Sent" | "Pending" | "Failed";
}

export interface RenewalRecord {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: "Current" | "Completed" | "Expired";
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}
