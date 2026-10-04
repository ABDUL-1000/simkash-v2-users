import type { ApiResponse } from "@/features/auth/types/api";

export interface ApDashboardSummaryData {
  today: { activations: number; commission: number; comparison: { yesterday_activations: number; difference: number; direction: "up" | "down"; text: string } };
  this_month: { activations: number; commission: number };
  wallet: { balance: number; currency: string };
}
export interface ApRecentActivationItem { id: string; sim_type: string; sim_number: string; network: string; customer_name: string; commission: number; status: string; created_at: string; time_ago: string }
export interface ApSimStockData { total_available: number; breakdown: { pos_sim: number; cctv_sim: number; gps_sim: number; router_sim: number } }
export interface ApMonthlyCommissionData { own_activations: { count: number; rate: number; total: number }; bonus_earned: { description: string; amount: number }; total: number; pending_payout: number; currency: string }
export interface ApRecentCustomerItem { id: string; initials: string; name: string; sim_type: string; status: string }
export interface ApRecentCustomersData { total_customers: number; customers: ApRecentCustomerItem[] }
export interface ApRecentActivityItem { id: string; type: string; title: string; subtitle: string; timestamp: string; time_ago: string }
export interface ActivatedDeviceSimItem { id: number; sim_id: number; sim_number: string; network: string; sim_type: string; type_label: string; customer: { id: number; fullname: string; phone: string; email: string }; activated_at: string; expired_date: string; status: string; commission: number; time_ago: string }
export interface UnactivatedDeviceSimItem { id: number; sim_number: string; network: string; sim_type: string; type_label: string; status: string; current_owner_id: number; current_owner_role: string; price: number; partner_commission: number; assigned_date: string }
export interface SimListData<T> { total: number; page: number; limit: number; totalPages: number; summary: { cctv: number; router: number; gps: number; pos: number; total: number }; sims: T[] }
export interface VerifyCustomerPayload { phone: string; sim_type: string; sim_number: string }
export interface VerifyCustomerResponseData { user_id: number; fullname: string; phone: string; email: string; wallet_balance: number; has_pin: boolean; sim_type: string; sim_price: number; can_afford: boolean; shortfall: number }
export interface ActivateSimPayload { sim_number: string; phone: string; pin: string; sim_type: string }
export interface ActivateSimResponseData { activation_id: number; sim_id: number; sim_number: string; sim_type: string; type_label: string; network: string; customer: { id: number; fullname: string; phone: string }; amount_debited: number; partner_commission_earned: number; activated_at: string; expired_date: string; transaction_reference: string }
export type ApResponse<T> = ApiResponse<T>;
export type ApDashboardSummaryResponse = ApResponse<ApDashboardSummaryData>;
export type ApRecentActivationsResponse = ApResponse<ApRecentActivationItem[]>;
export type ApSimStockResponse = ApResponse<ApSimStockData>;
export type ApMonthlyCommissionResponse = ApResponse<ApMonthlyCommissionData>;
export type ApRecentCustomersResponse = ApResponse<ApRecentCustomersData>;
export type ApRecentActivityResponse = ApResponse<ApRecentActivityItem[]>;
export type ActivatedSimsResponse = ApResponse<SimListData<ActivatedDeviceSimItem>>;
export type UnactivatedSimsResponse = ApResponse<SimListData<UnactivatedDeviceSimItem>>;
export type VerifyCustomerResponse = ApResponse<VerifyCustomerResponseData>;
export type ActivateSimResponse = ApResponse<ActivateSimResponseData>;

export interface StockInventoryItem { type: string; type_label: string; subtitle: string; available_count: number; networks: Array<{ network: string; count: number }>; networks_text: string; utilization_rate: number; health_status: string; health_color: string; action_needed: boolean; estimated_days: number; daily_avg_pace: number; pace_text: string }
export interface StockOverviewData { summary: { total_available: number; total_available_subtext: string; activated_this_month: number; activated_this_month_subtext: string; sim_types_low: number; sim_types_low_subtext: string }; inventory: StockInventoryItem[]; stock_health: { overall_status: string; total_remaining: number; items: Array<{ type: string; type_label: string; count: number; health_status: string; health_color: string }> }; stock_by_network: Array<{ network: string; count: number; percentage: number; color: string }>; stock_tip: string; last_updated: string }
export interface AvailableSimItem { id: number; sim_number: string; network: string; sim_type: string; type_label: string; status: string; assigned_date: string }
export interface PartnerCustomerItem { id: number; name: string; initials: string; phone: string; email: string; sim_number: string; sim_type: string; type_label: string; network: string; plan: string; status: string; days_left: number; activated_at: string; expires_at: string; can_remind: boolean }
export interface PartnerCustomerDetailData { id: number; fullname: string; initials: string; phone: string; email: string; address: string; added_by: string; added_on: string; customer_since: string; customer_since_days_ago: string; sims_activated_count: number; active_plan: string; status: string; expiry_date: string; days_left: number; active_sim: { sim_id: number; sim_number: string; sim_type: string; type_label: string; network: string; plan: string; activated_at: string; expires_at: string; auto_renew: boolean; data_usage: { used: string; total: string; remaining: string; percentage: number }; last_used: string }; renewal_history: Array<{ plan_name: string; started_at: string; expires_at: string; amount_charged: number; is_current: boolean; description: string }>; reminders_sent: Array<{ date: string; reminder_type: string; channel: string; status: string }>; notes: Array<{ id: string; content: string; created_at: string }>; earnings: { activations_count: number; commission_amount: number; renewals_count: number; renewal_commission_amount: number; total_earned: number } }
export type CustomerListItem = PartnerCustomerItem;
export type CustomerDetailData = PartnerCustomerDetailData;
export interface PartnerCustomerOverviewData { total_customers: number; active_sims: number; expiring_soon: number; expired_sims: number; tab_counts: { all: number; active: number; expiring: number; expired: number; new_this_month: number } }
export interface PartnerCustomerListData { customers: PartnerCustomerItem[]; total: number; page: number; limit: number; totalPages: number; tab_counts?: PartnerCustomerOverviewData["tab_counts"] }
export interface PartnerWalletOverviewData { commission_balance: { amount: number; earned_this_month: number; earned_this_month_text: string }; bonus_this_period: { amount: number; status: string; subtext: string }; pending_payout: { amount: number; subtext: string }; stats: { total_earned: { amount: number; activations_count: number; subtext: string }; total_paid_out: { amount: number; payouts_count: number; subtext: string }; total_bonus: { amount: number; periods_achieved: number; subtext: string } }; can_request_payout: boolean }
export interface PartnerTransactionItem { id: string; reference: string; type: string; category: string; category_label: string; flow: "credit" | "debit"; title: string; subtitle: string; amount: number; amount_formatted: string; status: string; icon: string; created_at: string; time_ago: string; date_group: string; can_retry?: boolean }
export interface PartnerTransactionDetail extends PartnerTransactionItem { balance_before?: number; balance_after?: number; description?: string }
export interface PartnerTransactionsData { transactions: PartnerTransactionItem[]; total: number; page: number; limit: number; totalPages: number }
export type PartnerStockOverviewResponse = ApResponse<StockOverviewData>;
export type PartnerAvailableSimsResponse = ApResponse<SimListData<AvailableSimItem>>;
export type PartnerCustomerOverviewResponse = ApResponse<PartnerCustomerOverviewData>;
export type PartnerCustomersResponse = ApResponse<PartnerCustomerListData>;
export type PartnerCustomerDetailResponse = ApResponse<PartnerCustomerDetailData>;
export type PartnerWalletResponse = ApResponse<PartnerWalletOverviewData>;
export type PartnerTransactionsResponse = ApResponse<PartnerTransactionsData>;
export type PartnerTransactionDetailResponse = ApResponse<PartnerTransactionDetail>;
export type PartnerPayoutAccountResponse = ApResponse<{ bank_name: string; bank_code: string; account_number: string; account_name: string }>;
