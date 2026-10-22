import type { ScAgencyPartnerItem, ScRecentActivationItem, ScWalletTransactionItem } from "./api";

export interface ScPagination { total: number; page: number; limit: number; total_pages: number }
export interface ScPartnersData extends ScPagination { partners: ScAgencyPartnerItem[] }
export interface ScActivationsData extends ScPagination { activations: ScRecentActivationItem[] }
export interface ScTransactionsData extends ScPagination {
  showing_text: string;
  grouped_transactions: Array<{ date_group: string; transactions: ScWalletTransactionItem[] }>;
}
export interface ScPayoutItem {
  id: number; reference: string; amount: number; amount_formatted: string; status: string; status_badge: string;
  bank_name: string; account_number_masked: string; requested_at: string; processed_at: string | null;
}
export interface ScPayoutsData extends ScPagination { payouts: ScPayoutItem[] }
export interface ScPayoutResult { payout_id: number; amount: number; reference: string; status: string; bank_account: { bank_name: string; account_number: string; account_name: string } }
export interface ScListParams { page: number; limit: number; search?: string }
export interface ScPartnerParams extends ScListParams { status?: string; bonus_status?: string }
export interface ScActivationParams extends ScListParams { network?: string }
export interface ScTransactionFilters {
  category: string;
  period: "today" | "this_week" | "this_month" | "custom";
  start_date?: string;
  end_date?: string;
  search?: string;
}
export interface ScTransactionParams extends ScListParams, ScTransactionFilters {}
export interface ScDistributionPayload {
  partner_id?: number;
  distribute_to_all_low: boolean;
  sim_type: "pos" | "cctv" | "gps" | "router";
  quantity: number;
}
export interface ScOnboardPayload {
  fullname: string; email: string; phone: string; state: string; lga: string; address: string;
  initial_sims_to_assign: number; sim_type: ScDistributionPayload["sim_type"];
}
export interface ScPayoutAccountPayload {
  bank_name: string; bank_code: string; account_number: string; account_name: string; is_default: boolean;
}
