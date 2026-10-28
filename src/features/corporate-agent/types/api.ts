// ==========================================
// CA DASHBOARD CONTRACTS
// ==========================================

export interface CaComparison {
  yesterday_activations: number;
  difference: number;
  direction: "up" | "down";
  text: string;
}

export interface CaDashboardOverviewData {
  top_cards: {
    my_acts_today: {
      activations: number;
      commission: number;
      commission_formatted: string;
      comparison: CaComparison;
    };
    network_today: {
      activations: number;
      network_commission: number;
      commission_formatted: string;
      comparison: CaComparison;
    };
    this_month: {
      total_activations: number;
      own_activations: number;
      ap_network_activations: number;
      subtitle: string;
    };
    my_stock: {
      total_available: number;
      subtext_available: string;
      managed_aps_count: number;
      subtext_aps: string;
    };
    my_commission: {
      amount: number;
      amount_formatted: string;
      period_text: string;
      can_request_payout: boolean;
    };
  };
  secondary_cards: {
    my_own_acts: { value: number; label: string; subtext: string };
    ap_network_acts: { value: number; label: string; subtext: string };
    agency_partners: { value: number; label: string; subtext: string };
    bonus_progress: { value: string; label: string; subtext: string };
    sims_in_stock: { value: number; label: string; subtext: string };
  };
  bonus_tracker: {
    period_label: string;
    target_activations: number;
    current_activations: number;
    percentage: number;
    activations_remaining: number;
    bonus_amount: number;
    bonus_amount_formatted: string;
    banner_message: string;
    days_remaining: number;
    activations_left: number;
    daily_average: number;
    ap_network_bonus_status: Array<{
      name: string;
      activations: number;
      target: number;
      status: string;
    }>;
  };
  recent_activations: {
    items: Array<{
      sim_number: string;
      network: string;
      actor_badge: string;
      customer_name: string;
      time_ago: string;
      commission_formatted: string;
      status: string;
    }>;
  };
}

export interface CaRecentActivationItem {
  id: number;
  sim_number: string;
  network: string;
  network_code: string;
  network_color: string;
  is_own: boolean;
  actor_badge: string;
  partner_name?: string;
  customer_name: string;
  time_ago: string;
  commission: number;
  commission_formatted: string;
  status: string;
  created_at: string;
}

export interface CaRecentActivationsResponseData {
  activations: CaRecentActivationItem[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
