export interface NetworkResponse<T> { success: boolean; message: string; data: T }

export interface EpScMetric { count: number; label: string; subtext: string; icon?: string; highlight?: boolean }
export type EpScTab = "all" | "active" | "at_risk" | "suspended" | "pending";

// GET /my-state-coordinator/overview
export interface EnterpriseCoordinatorItem {
  id: number; initials: string; name: string; phone: string; state: string; joined_date: string; status: string; status_color: string; last_active: string;
  sub_stats: {
    aps_count: number; aps_label: string; stock_count: number; stock_label: string; stock_status: string; stock_status_color: string;
    activations_this_month: number; activations_label: string;
  };
  target_progress?: { current_activations: number; target_activations: number; percentage: number; text: string; bar_color: string };
  is_at_risk_border?: boolean;
  actions?: { can_view_profile: boolean; can_distribute: boolean; can_remind: boolean; can_suspend: boolean };
}
export interface EnterpriseScOverviewData {
  summary_cards: Record<"state_coordinators" | "active_scs" | "at_risk" | "suspended" | "agency_partners", EpScMetric>;
  tab_counts: Record<EpScTab, number>;
  coordinators: EnterpriseCoordinatorItem[];
  total: number; page: number; limit: number; total_pages: number;
  network_summary: { total_scs: number; active: number; at_risk: number; suspended: number; total_aps: number; network_acts_this_month: number; network_acts_text: string };
  stock_alerts: {
    title: string; can_distribute_all_low: boolean; distribute_all_button_text: string;
    alerts: Array<{ coordinator_id: number; name: string; state: string; stock: number; stock_text: string; status_label: string; level: string; action_text: string }>;
  };
}
export interface EnterpriseScOverviewParams { tab?: EpScTab; search?: string; state?: string; page: number; limit: number }

// GET /my-state-coordinator/comparison
export interface EnterpriseScComparisonData {
  period: string; period_label: string;
  top_performers: Array<{ rank: number; podium_style: string; initials: string; name: string; state: string; activations: number; activations_text: string; commission: number; commission_formatted: string }>;
  comparison_table: Array<{
    rank: number; coordinator_id: number; initials: string; name: string; state: string; is_suspended: boolean; status_badge: string;
    aps_count: number; aps_text: string; stock_count: number; stock_status: string; stock_badge_color: string;
    activations: number; activations_text: string; target: number; target_text: string; commission: number; commission_formatted: string;
  }>;
  total_coordinators: number;
}

// GET /my-state-coordinator/{id}/undistributed-sims
export interface EnterpriseScSimsData {
  summary: { total_undistributed: number; pos: number; cctv: number; gps: number; router: number };
  sims: Array<{ id: number; sim_number: string; type: string; type_label: string; network: string; network_code?: string; status: string; received_at: string }>;
  total: number; page: number; limit: number; total_pages: number;
}
export interface EnterpriseScSimsParams { type?: string; network?: string; search?: string; page: number; limit: number }

// Onboarding: verify-coordinator → add-coordinator (already an SC) or onboard (new)
export interface VerifiedCoordinator {
  exists: boolean; is_state_coordinator: boolean; user_id?: number; agent_id?: number; name?: string; phone?: string; email?: string; state?: string; status?: string; message?: string;
}
export interface OnboardScPayload {
  fullname: string; phone: string; email: string; state: string; lga: string; address: string; initial_stock?: number; country: string; dob: string; gender: string; reason?: string; password?: string;
}
export interface OnboardScResult { coordinator_id: number; user_id: number; fullname: string; email: string; state: string; lga: string; phone: string; initial_stock: number; status: string; message?: string }
export interface AddCoordinatorResult { success: boolean; coordinator_id: number; user_id: number; name: string; message: string }

// Reminder + suspension
export interface RemindScPayload { coordinator_id: number; message: string }
export interface SuspendScPayload { action: "suspend" | "reactivate"; reason: string }
export interface SuspendScResult { coordinator_id: number; status: string; message: string }
