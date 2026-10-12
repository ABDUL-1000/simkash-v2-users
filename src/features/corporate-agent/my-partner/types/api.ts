export type PartnerTab = "all" | "active" | "low_stock" | "suspended" | "new";
export type PartnerSort = "most_activations" | "least_activations" | "highest_stock" | "lowest_stock" | "newest" | "highest_customers";
export interface PartnerPagination { total_items: number; current_page: number; total_pages: number; limit: number; showing_text?: string }
export interface PartnerPermissions { can_view: boolean; can_distribute: boolean; can_remind: boolean; can_suspend: boolean; can_reactivate: boolean }
export interface PartnerItem {
 id: number; agent_id: number; partner_id: number; ap_code: string; name: string; initials: string; phone: string; email: string;
 location: string; joined_date: string; location_and_date: string; status: string; status_label: string; status_color: string;
 border_highlight: string; last_active: string; sim_stock: number; sim_stock_label: string; sim_stock_status: string; sim_stock_color: string;
 customers_count: number; customers_label: string; activations_this_month: number; activations_this_month_label: string;
 bonus_status: string; bonus_status_label: string; bonus_color: string; bonus_progress_pct: number; actions: PartnerPermissions;
}
export interface PartnerMetric { count: number; count_formatted: string; label: string; subtitle: string; icon: string; color: string }
export interface PartnersOverview {
 cards: Record<"total_partners" | "active_partners" | "low_stock" | "hit_bonus" | "network_activations", PartnerMetric>;
 tabs: { id: PartnerTab; label: string; count: number; is_active: boolean }[]; active_tab: PartnerTab; partners: PartnerItem[];
 network_summary: { total_aps: number; active: number; low_stock: number; suspended: number; new_this_month: number; network_activations: number; network_activations_formatted: string; active_network_size_text: string; critical_stock_alerts_text: string; suspended_partners_text: string };
 // The supplied example contains an empty items array. Optional fields allow available data without inventing values.
 aps_needing_stock: { items: { id?: number; partner_id?: number; name?: string; stock?: number; customers_count?: number; subtitle?: string; detail?: string }[]; can_distribute_all: boolean };
 live_stock_alerts: { id: string; severity: string; message: string }[];
 ap_bonus_status: { achieved: number; on_track: number; at_risk: number; missed: number; na: number; can_remind_at_risk: boolean };
 bonus_tier_progress: { next_threshold: number; current_activations: number; target: number; percent_completed: number; label: string; subtext: string };
 quick_actions: { id: string; label: string; action_type: string; style: string }[];
 pagination: PartnerPagination;
}
export interface PartnerProfile { fullname: string; phone: string; email: string; state: string; lga: string; address: string }
export interface PartnerCustomer { id: number; name: string; initials: string; sim_type: string; sim_number: string; status: string; status_color: string; activated_date?: string; expiry_date?: string }
export interface PartnerStockEvent { id: number; time_ago: string; total_sims: number; total_sims_label: string; breakdown_text: string; date_formatted: string; created_at: string }
export interface PartnerDetail {
 summary_bar: {
  role: { label: string; sublabel: string; color: string };
  stock: { count: number; label: string; sublabel: string; status: string };
  customers: { count: number; label: string; sublabel: string };
  activations: { count: number; label: string; sublabel: string };
  bonus: { status: string; sublabel: string; color: string };
  last_active: { time_ago: string; sublabel: string };
 };
 hero: { id: number; agent_id: number; partner_id: number; ap_code: string; name: string; initials: string; phone: string; email: string; location: string; phone_and_location: string; status: string; status_color: string; role_label: string; is_suspended: boolean; can_distribute: boolean; can_suspend: boolean; can_reactivate: boolean; can_contact: boolean };
 profile_details: PartnerProfile & { onboarded_by: string; onboarded_date: string; kyc_status: string; kyc_color: string; bank_name: string; account_number_masked: string };
 stock_details: { breakdown: { type: string; label: string; count: number; percentage: number; bar_color: string; is_zero: boolean }[]; total_stock: number; total_stock_label: string; received_all_time: number; received_all_time_text: string; last_distribution: string; last_distribution_text: string; can_distribute_more: boolean };
 performance_this_month: { commission: number; commission_formatted: string; rate_note: string; total_activations: number; rate_per_activation: number; histogram: { day: number; date: string; count: number; is_highest: boolean }[] };
 bonus_tracker: { current: number; target: number; percentage: number; headline: string; status: string; status_color: string; bonus_reward: string; is_paid: boolean };
 stock_sent_history: { items: PartnerStockEvent[]; total_count: number; can_view_all: boolean };
 contribution: { partner_name: string; partner_activations: number; csa_total_activations: number; csa_target: number; percentage_of_target: number; alert_text: string; summary_text: string; subtext: string };
 timeline: { onboarded_by_you: string; first_stock_received: string; first_activation: string; bonus_first_hit: string; last_login: string };
 customers_preview: { total_count: number; view_all_label: string; items: PartnerCustomer[] };
 quick_actions: { can_distribute: boolean; can_contact: boolean; can_remind: boolean; can_view_customers: boolean; can_suspend: boolean; can_reactivate: boolean };
}
export interface PartnerOverviewParams { tab: PartnerTab; sort: PartnerSort; search: string; page: number; limit: number }
export interface PartnerQuantities { pos_quantity: number; cctv_quantity: number; gps_quantity: number; router_quantity: number }
export type PartnerOnboardPayload = PartnerProfile & { gender: string; password: string };
export interface PartnerDistributionResult { partner_id: number; total_sims_distributed: number; breakdown: { pos: number; cctv: number; gps: number; router: number }; message: string }
export interface PartnerBatchResult { total_partners_supplied: number; total_sims_distributed: number; partners: PartnerDistributionResult[]; message: string }
export interface PartnerReminder { reminder_type: "bonus" | "low_stock"; message: string }
export interface PartnerReminderResult { partner_id?: number; reminder_type?: string; message_sent: string; status?: string; recipients_count?: number; target_group?: string; message: string }
export interface PartnerRecall { quantity: number; sim_type: "pos" | "cctv" | "gps" | "router"; reason: string }
export interface PartnerRecallResult { partner_id: number; recalled_sims: number; message: string }
export interface PartnerStatusResult { partner_id: number; status: string; is_suspended: boolean; message: string }
export interface PartnerTarget { id: number; name: string; phone?: string; email?: string; suspended?: boolean }
export type PartnerAction = "onboard" | "edit" | "distribute" | "multiple" | "allLow" | "remind" | "bulkRemind" | "status" | "contact" | "customers" | "history" | "export" | "recall" | "more";
