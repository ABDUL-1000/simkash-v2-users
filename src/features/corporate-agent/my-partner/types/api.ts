export type PartnerTab = "all" | "active" | "low_stock" | "suspended" | "new";
export type PartnerBonusFilter = "all" | "achieved" | "on_track" | "at_risk" | "missed";

// --- GET /my-partner/overview ---
export interface PartnerMetric { count: number; label: string; subtitle: string }
export interface PartnerItem {
  id: number; name: string; initials: string; phone: string; location: string; status: string; status_label: string;
  stock: number; customers_count: number; acts_per_month: number; bonus_milestone: string;
}
export interface PartnerPagination { total_items: number; current_page: number; total_pages: number; showing_text?: string }
export interface PartnersOverview {
  cards: Record<"total_aps" | "active_aps" | "low_stock_aps" | "bonus_achieved_aps" | "network_acts", PartnerMetric>;
  network_summary: { total_aps: number; active: number; low_stock: number; suspended: number; new_this_month: number; network_acts_this_month: number };
  aps_needing_stock: { can_distribute_all: boolean; items: Array<{ id: number; name: string; stock: number; customers_count: number; subtitle: string; severity: string }> };
  ap_bonus_status: { achieved: number; on_track: number; at_risk: number; missed: number; na: number; suspended_count: number; can_remind_at_risk: boolean };
  partners: PartnerItem[];
  pagination: PartnerPagination;
}
export interface PartnerOverviewParams { search?: string; status?: PartnerTab; bonus_status?: PartnerBonusFilter; page: number; limit: number }

// --- GET /my-partner/{agentId} ---
export interface PartnerProfile { fullname: string; phone: string; email: string; state: string; lga: string; address: string }
export interface PartnerDetail {
  summary_bar: {
    role: string;
    stock: { count: number; label: string; sublabel: string };
    customers: { count: number };
    activations: { count: number };
    bonus: { status: string };
    last_active: string;
  };
  hero: { id: number; name: string; initials: string; phone: string; status: string; location?: string; is_suspended?: boolean };
  profile_details: PartnerProfile & { onboarded_by: string; onboarded_date: string; kyc_status: string; bank_name: string; account_number_masked: string };
  stock_details: {
    total_stock: number; total_stock_label: string; received_all_time_text: string; last_distribution_text: string;
    breakdown: Array<{ label: string; count: number; percentage: number }>;
  };
  performance_this_month: { activations: number; customers: number; avg_per_day: number; commission_formatted: string; daily_activations: Array<{ day: number; count: number }> };
  bonus_tracker: { headline: string; percentage: number; bonus_reward: string };
  commission: {
    current_month_formatted: string; subtitle: string; activation_rate: string; bonus_status: string;
    vs_last_month_formatted: string; last_month_formatted: string; two_months_ago_formatted: string;
  };
  account_timeline: Array<{ title: string; subtitle: string; icon: string }>;
}
export interface PartnerUpdateResult { hero: PartnerDetail["hero"] & { location: string; status_color: string; role: string; is_suspended: boolean }; profile_details: PartnerProfile & { kyc_status: string } }

// --- /my-partner/{agentId}/customers and /stock-history ---
export interface PartnerCustomer { id: number; name: string; initials: string; sim_type: string; sim_number: string; status: string; status_color: string }
export interface PartnerCustomersData { total: number; page: number; limit: number; total_pages: number; items: PartnerCustomer[] }
export interface PartnerStockEvent { id: string; time_ago: string; total_sims: number; total_sims_label: string; breakdown_text: string; created_at: string }
export interface PartnerStockHistoryData { total_records: number; items: PartnerStockEvent[] }

// --- Onboarding: verify-partner → add-partner (already an AP) or onboard (new) ---
export interface VerifiedPartner { fullname: string; email: string; phone: string; gender?: string; country?: string; isRegistered: boolean }
export interface PartnerOnboardPayload extends PartnerProfile { dob: string; country: string; reason?: string; password?: string }
export interface PartnerOnboardResult { partner_id: number; agent_id: number; fullname: string; email: string; phone: string; state: string; lga: string }

// --- Reminders / suspension ---
export type PartnerReminderType = "low_stock" | "bonus_at_risk" | "general";
export interface PartnerReminder { partner_id: number; type: PartnerReminderType; title: string; message: string }
export interface PartnerBulkReminder { target_at_risk_only: boolean; message: string }
export interface PartnerReminderResult { reminders_sent: number; reminder_type: string; title: string; message: string; target_partner_ids: number[] }
export interface PartnerSuspendPayload { suspend: boolean; reason: string }
export interface PartnerStatusResult { partner_id: number; status: string; is_suspended: boolean; reason: string }

export interface PartnerTarget { id: number; name: string; phone?: string; email?: string; suspended?: boolean }
