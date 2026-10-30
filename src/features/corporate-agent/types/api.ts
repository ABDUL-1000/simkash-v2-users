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
      profit: number;
      profit_formatted: string;
      comparison: CaComparison;
    };
    network_today: {
      activations: number;
      network_profit: number;
      profit_formatted: string;
      partner_commission_paid: number;
      partner_commission_formatted: string;
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
    my_profit: {
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
    total_profit: { value: string; label: string; subtext: string };
    sims_in_stock: { value: number; label: string; subtext: string };
  };
  profit_this_month?: {
    my_activations: { count: number; rate: number; total: number };
    ap_network: { count: number; total: number; partner_commission_total: number };
    total_profit_this_month: number;
    total_partner_commission_this_month: number;
  };
  recent_activations: {
    items: Array<{
      sim_number: string;
      network: string;
      actor_badge: string;
      customer_name: string;
      time_ago: string;
      corporate_profit: number;
      corporate_profit_formatted: string;
      partner_commission: number;
      partner_commission_formatted: string;
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
  corporate_profit: number;
  corporate_profit_formatted: string;
  partner_commission: number;
  partner_commission_formatted: string;
  profit: number;
  profit_formatted: string;
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
