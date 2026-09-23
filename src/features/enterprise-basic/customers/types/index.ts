export type CustomerStatus = "active" | "expiring" | "expired";

export interface EbCustomerRecord {
  id: string;
  name: string;
  initials: string;
  phone: string;
  simsCount: number;
  productType: "POS" | "CCTV" | "GPS" | "Router";
  planDuration: "6 Month" | "1 Year" | "2 Year" | "3 Year";
  expiryDate: string;
  marginEarned: number;
  status: CustomerStatus;
  stateLocation: string;
}

export interface CustomerMetrics {
  totalCustomers: number;
  activeProducts: number;
  expiringIn30Days: number;
  marginThisMonth: number;
  avgMarginPerCustomer: number;
}
