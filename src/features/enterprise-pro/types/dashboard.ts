export interface EnterpriseResponse<T> { success: boolean; message: string; data: T }

export interface EpComparison { yesterday_activations: number; difference: number; direction: "up" | "down"; text: string }
export interface EpValueCard { value: number | string; label: string; subtext: string }

// GET /enterprise/dashboard/overview
export interface EnterpriseOverviewData {
  top_cards: {
    my_acts_today: { activations: number; profit: number; profit_formatted: string; comparison?: EpComparison };
    network_today: {
      activations: number; network_profit: number; profit_formatted: string;
      partner_commission_paid: number; partner_commission_formatted: string; comparison?: EpComparison;
    };
    this_month: { total_activations: number; own_activations: number; ap_network_activations?: number; sc_network_activations: number; subtitle: string };
    my_stock: { total_available: number; subtext_available: string; managed_aps_count?: number; managed_scs_count: number; subtext_aps?: string; subtext_scs: string };
    my_profit: { amount: number; amount_formatted: string; period_text: string; can_request_payout: boolean };
  };
  secondary_cards: {
    my_own_acts?: EpValueCard;
    sc_network_acts?: EpValueCard;
    state_coordinators?: EpValueCard;
    total_profit?: EpValueCard;
    sims_in_stock?: EpValueCard;
  };
  action_shortcuts?: Array<{ key: string; label: string; icon: string; action_type: string; route: string }>;
  recent_activations?: { tabs?: Array<{ id: string; label: string; count: number }> };
}

// GET /enterprise/dashboard/recent-activations
export interface EpRecentActivation {
  id: number; sim_number: string; type: string; type_label: string; network: string; network_code: string; network_color: string;
  is_own: boolean; actor_badge: string; partner_name?: string; customer_name: string; date: string; created_at: string;
  profit_earned: number; profit_earned_formatted: string;
}
export interface EpRecentActivationsData { activations: EpRecentActivation[]; total: number; page: number; limit: number; total_pages: number }
