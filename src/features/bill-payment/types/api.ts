import type { ApiResponse } from "@/features/auth/types/api";

// --- Common Payloads ---
export interface AirtimePurchasePayload {
  network: string;
  amount: number;
  phone: string;
  pin: string;
}

export interface BulkAirtimePurchasePayload {
  type: "same";
  amount: number;
  network: string; // e.g. "mtn", "airtel", "glo", "etisalat"
  recipients: string[]; // array of 11-digit clean strings
  pin: string;
}

export interface VerifyPhoneNetworkPayload {
  phone: string;
}

export interface DataPurchasePayload {
  serviceID: string;
  billersCode: string;
  variation_code: string;
  amount: number;
  phone: string;
  pin: string;
}

export interface BulkDataPurchasePayload {
  type: "same";
  network: string; // e.g. "mtn-data", "airtel-data", "glo-data"
  plan: string; // variation_code, e.g. "mtn-10mb-100"
  amount: number;
  recipients: string[]; // array of 11-digit clean strings
  pin: string;
}

export interface BulkPurchaseResponseData {
  message: string;
  total_count: number;
  totalCost: number;
  reference?: string;
  status?: string;
  [key: string]: any;
}

export interface CableVerifyPayload {
  serviceID: string;
  billersCode: string;
}

export interface CablePurchasePayload {
  serviceID: string;
  billersCode: string;
  variation_code: string;
  packageName: string;
  amount: number;
  phone: string;
  pin: string;
}

export interface ElectricityVerifyPayload {
  serviceID: string;
  billersCode: string;
  type: "prepaid" | "postpaid";
}

export interface ElectricityPurchasePayload {
  serviceID: string;
  billersCode: string;
  variation_code: string;
  amount: number;
  phone: string;
  pin: string;
}

export interface EducationVerifyPayload {
  serviceID: "jamb";
  billersCode: string;
  type: string;
}

export interface EducationPurchasePayload {
  serviceID: "waec" | "jamb";
  variation_code: string;
  amount: number;
  quantity?: number;
  billersCode?: string;
  phone: string;
  pin: string;
}

// --- Response Item Schemas ---
export interface NetworkItem {
  id: number;
  serviceID: string;
  name: string;
  image?: string;
  discount?: number;
}

export interface BillerVariationItem {
  variation_code: string;
  name: string;
  variation_amount: string;
  fixedPrice: "Yes" | "No" | string;
}

export interface VariationsResponseData {
  ServiceName: string;
  serviceID: string;
  convinience_fee?: string;
  variations: BillerVariationItem[];
  varations?: BillerVariationItem[];
}

export type AirtimeNetworkItem = NetworkItem;
export type DataPlanItem = BillerVariationItem;

export interface BillServiceItem {
  serviceID: string;
  name: string;
  minimun_amount?: number | string;
  maximum_amount?: number | string;
  image?: string;
}

export interface ElectricityDiscoItem extends BillServiceItem {}
export interface CableProviderItem extends BillServiceItem {}

export interface ServiceVariationItem {
  variation_code: string;
  name: string;
  variation_amount: number | string;
  fixedPrice?: string | number;
}

export interface VerificationResult {
  customer_name?: string;
  Customer_Name?: string;
  customerName?: string;
  meter_number?: string;
  address?: string;
  status?: string;
  [key: string]: any;
}

export interface BillPurchaseResponseData {
  reference: string;
  status: string;
  amount: number;
  network?: string;
  phone?: string;
  token?: string;
  purchased_code?: string;
  pins?: string[];
  [key: string]: any;
}

export interface BillTransactionItem {
  id: number;
  service: string;
  type: string;
  amount: number;
  status: string;
  reference: string;
  recipient: string;
  token?: string;
  provider?: string;
  biller?: string;
  variation?: string;
  variation_code?: string;
  billersCode?: string;
  meter_number?: string;
  phone?: string;
  smartcard_number?: string;
  createdAt: string;
}

export interface PaginatedBillTransactionsResponse {
  transactions: BillTransactionItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type AirtimeNetworksApiResponse = ApiResponse<AirtimeNetworkItem[]>;
export type VerifyPhoneNetworkApiResponse = ApiResponse<{ network: string; serviceID?: string }>;
export type DataPlansApiResponse = ApiResponse<VariationsResponseData>;
export type BillServicesApiResponse = ApiResponse<BillServiceItem[]>;
export type ServiceVariationsApiResponse = ApiResponse<VariationsResponseData>;
export type VerifyCustomerApiResponse = ApiResponse<VerificationResult>;
export type BillPurchaseApiResponse = ApiResponse<BillPurchaseResponseData>;
export type BulkPurchaseApiResponse = ApiResponse<BulkPurchaseResponseData>;
export type BillTransactionsApiResponse = ApiResponse<PaginatedBillTransactionsResponse>;
