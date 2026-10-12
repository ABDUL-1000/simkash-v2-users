export interface NetworkResponse<T> { success: boolean; message: string; data: T; }
export interface NetworkMetric { value: number; value_formatted: string; label: string; subtext: string; }
export interface EnterpriseScSummaryCards {
  state_coordinators: NetworkMetric;
  agency_partners: NetworkMetric;
  activations_this_month: NetworkMetric;
  margin_this_month: NetworkMetric;
  network_commission: NetworkMetric;
}
export interface EnterpriseCoordinatorItem {
  id: number; name: string; initials: string; phone: string; state: string;
  aps_count: number; activations_count: number;
  retail_price_formatted?: string; margin_per_sim_formatted?: string;
  total_margin_formatted?: string; commission_formatted?: string;
  total_earnings_formatted: string; stock_formatted: string; status: string;
}
export interface EnterpriseNetworkTotals {
  sc_count: number; aps_count: number; label: string; total_activations: number;
  total_margin_formatted: string; total_commission_formatted: string;
  grand_total_earnings_formatted: string;
}
export interface EnterpriseScHealthSummary { active: number; low_stock: number; suspended: number; new: number; }
export interface EnterpriseEarningsSummary {
  total_commission?: number; total_commission_formatted: string; growth_label: string;
  pending_payout?: number; pending_payout_formatted: string; pending_payout_subtext: string;
  last_payout?: number; last_payout_formatted: string; last_payout_subtext: string;
}
export interface EnterpriseTopScItem { rank: string; name: string; activations?: number; activations_formatted: string; }
export interface EnterpriseScOverviewData {
  summary_cards: EnterpriseScSummaryCards; totals: EnterpriseNetworkTotals;
  coordinators: EnterpriseCoordinatorItem[]; health_summary: EnterpriseScHealthSummary;
  earnings_summary: EnterpriseEarningsSummary; top_5_scs: EnterpriseTopScItem[];
}
export interface EnterpriseApSummaryCards {
  state_coordinators: { value: number; subtext: string };
  agency_partners: { value: number; subtext: string };
  total_activations: { value: number; subtext: string };
  avg_margin: { value_formatted: string; subtext: string };
  total_commission: { value_formatted: string; subtext: string };
}
export interface EnterpriseApRowItem {
  id: number; name: string; state: string; sc_name: string; sims_sold: number;
  activations: number; commission_formatted: string; status: string;
}
export interface EnterpriseApFilterOption { id: string | number; name: string; }
export interface EnterpriseApDirectoryData {
  summary_cards: EnterpriseApSummaryCards; total_aps: number; page: number; limit: number;
  total_pages: number; rows: EnterpriseApRowItem[]; sc_filter_options: EnterpriseApFilterOption[];
}
export interface EnterpriseNetworkActivityItem {
  id: string; customer_name: string; customer_phone: string; sim_type: string;
  ap_name: string; sc_name: string; state: string; retail_price: number;
  margin_earned: number; commission_earned: number; time_formatted: string;
}
export interface EnterpriseNetworkActivityData {
  summary: { total_activations_today: number; commission_earned_today: number; commission_earned_today_formatted: string };
  activities: EnterpriseNetworkActivityItem[];
}
export interface EnterpriseActivationsChartData {
  title: string; subtitle: string;
  items: { id: number; name: string; activations: number; percentage: number; color_code: string }[];
}
export interface OnboardScPayload {
  fullname: string; email: string; phone: string; state: string; lga: string;
  initial_sim_allocation: { pos: number; cctv: number; gps: number; router: number };
}
export interface OnboardScResult {
  sc_id: number; sc_code: string; fullname: string; email: string; phone: string;
  state: string; status: string; initial_sim_allocation: OnboardScPayload['initial_sim_allocation']; message?: string;
}
export interface UpdateScStatusPayload { status: 'ACTIVE' | 'SUSPENDED'; reason: string; }
export interface UpdateScStatusResult {
  sc_id: number; name: string; previous_status: string; new_status: string; reason: string; message?: string;
}
export interface AgencyPartnerParams { sc_id?: string; search?: string; status?: 'all' | 'Active' | 'Low Stock' | 'Out of Stock' | 'Suspended'; page?: number; limit?: number; }
