export interface ScDashboardOverviewData {
  today: {
    activations: number;
    commission: number;
    commission_formatted: string;
    comparison: {
      yesterday_activations: number;
      difference: number;
      direction: "up" | "down";
      text: string;
    };
  };
  this_month: {
    activations: number;
    activations_formatted: string;
    agency_partners_count: number;
    agency_partners_text: string;
    target: {
      target_activations: number;
      status: string;
      text: string;
      percentage: number;
    };
  };
  my_stock: {
    total_available: number;
    subtext: string;
    low_stock_aps: { count: number; text: string };
    breakdown: { pos_sim: number; cctv_sim: number; gps_sim: number; router_sim: number };
  };
  my_commission: {
    amount: number;
    amount_formatted: string;
    period_text: string;
    currency: string;
    currency_symbol: string;
    can_request_payout: boolean;
  };
  summary_cards: Record<string, { key: string; icon: string; value: string | number; label: string; subtext: string; highlight?: boolean }>;
  agency_partners: {
    total: number;
    subtitle: string;
    partners: Array<{
      id: number;
      name: string;
      phone: string;
      initials: string;
      stock: number;
      stock_label: string;
      stock_status: string;
      acts_per_month: number;
      acts_per_month_formatted: string;
      bonus_status: string;
      last_active: string;
    }>;
  };
  recent_activations: Array<{
    id: string;
    sim_number: string;
    network: string;
    network_code: string;
    network_color: string;
    partner_name: string;
    time_ago: string;
    amount: number;
    amount_formatted: string;
  }>;
  sim_inventory: {
    total_available: number;
    total_available_label: string;
    breakdown: Array<{ type: string; label: string; count: number; percentage: number; color: string }>;
    received_from_rm_total: number;
    received_from_rm_text: string;
    last_distribution_text: string;
  };
  needs_attention: {
    can_distribute_all: boolean;
    items: Array<{ partner_id: number; partner_name: string; stock: number; level: string; message: string; action: string }>;
  };
  commission_this_month: {
    ap_network_acts: number;
    ap_network_acts_formatted: string;
    commission: number;
    commission_formatted: string;
    bonus_earned: number;
    bonus_earned_formatted: string;
    total_this_month: number;
    total_this_month_formatted: string;
    pending_payout: number;
    pending_payout_formatted: string;
    can_request_payout: boolean;
  };
  activity_feed: Array<{ id: string; type: string; title: string; subtitle: string; time_ago: string; icon: string }>;
  coordinator_info: { user_id: number; name: string; state_role: string };
}

export type { ScSimInventoryOverviewData, UndistributedSimItem, InventoryHistoryItem, RmStockRequestItem } from "./inventory";
export type { ScAgencyPartnersOverviewData, ScAgentDetailData } from "./agents";

export interface ScAgencyPartnerItem {
  id: number;
  name: string;
  phone: string;
  initials: string;
  stock: number;
  stock_label: string;
  stock_status: "normal" | "warning" | "critical" | "out" | string;
  stock_alert?: string;
  acts_per_month: number;
  acts_per_month_formatted: string;
  bonus_status: string;
  bonus_color?: string;
  last_active: string;
}

export interface ScRecentActivationItem {
  id: number;
  sim_number: string;
  partner_name: string;
  network: string;
  sim_type: string;
  commission_amount: number;
  commission_formatted: string;
  time_ago: string;
  timestamp: string;
}

export interface ScWalletOverviewData {
  balance_card: {
    commission_balance: number;
    commission_balance_formatted: string;
    currency: string;
    currency_symbol: string;
    chips: {
      ap_network_this_month: { amount: number; formatted: string; label: string };
      bonus_earned: { amount: number; formatted: string; label: string; achieved: boolean };
      pending_payout: { amount: number; formatted: string; label: string };
    };
    actions: { can_request_payout: boolean; can_download_statement: boolean; can_view_history: boolean; can_manage_bank: boolean };
  };
  stats_cards: {
    total_earned: { amount: number; formatted: string; label: string; subtext: string };
    total_paid_out: { amount: number; formatted: string; label: string; subtext: string; payouts_count: number };
    best_month: { amount: number; formatted: string; label: string; subtext: string };
  };
  payout_account: {
    id: number;
    bank_name: string;
    account_number_masked: string;
    account_name: string;
    status: string;
    is_verified: boolean;
  };
  recent_payouts: {
    total_paid_out: number;
    total_paid_out_formatted: string;
    payouts: Array<{ date_label: string; amount_formatted: string; status_badge: string }>;
  };
  monthly_earnings: {
    best_month_text: string;
    bars: Array<{ month: string; earnings: number; percentage: number; is_best_month: boolean }>;
  };
  how_you_earn: {
    info: string;
    ap_network_acts_text: string;
    commission_formatted: string;
    bonus_earned_formatted: string;
    total_this_month_formatted: string;
  };
  category_tabs: Record<string, number>;
}

export interface ScWalletTransactionItem {
  id: string;
  reference: string;
  title: string;
  subtitle: string;
  flow: "credit" | "debit";
  amount: number;
  amount_formatted: string;
  time: string;
}
