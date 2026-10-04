export interface RmDashboardOverviewData {
  primary_cards: {
    today: {
      activations: number;
      commission: number;
      commission_formatted: string;
      comparison: { yesterday_activations: number; difference: number; direction: "up" | "down"; text: string };
    };
    this_month: {
      activations: number;
      activations_formatted: string;
      state_coordinators_count: number;
      agency_partners_count: number;
      subtitle: string;
      target: { target_activations: number; status: string; text: string };
    };
    my_stock: {
      available: number;
      subtitle: string;
      distributed_this_week: number;
      distributed_this_week_text: string;
    };
    my_commission: {
      amount: number;
      formatted: string;
      subtitle: string;
      can_request_payout: boolean;
    };
  };
  summary_cards: {
    state_coordinators: { count: number; label: string; subtitle: string };
    agency_partners: { count: number; label: string; subtitle: string };
    network_activations: { count: number; label: string; subtitle: string };
    stock_in_inventory: { count: number; label: string; subtitle: string };
  };
  my_state_coordinators: {
    total: number;
    subtitle: string;
    active_count: number;
    at_risk_count: number;
    suspended_count: number;
    coordinators: Array<{
      id: number;
      name: string;
      initials: string;
      state: string;
      stock: number;
      stock_label: string;
      highlight_row: boolean;
      aps_count: number;
      activations: number;
      bonus_status: string;
      last_active: string;
    }>;
  };
  recent_network_activity: Array<{
    title: string;
    subtitle: string;
    time_ago: string;
    badge_text: string;
  }>;
  sim_inventory: {
    total_available: number;
    total_available_label: string;
    distributed_this_week: number;
    subtext: string;
  };
  commission_this_month: {
    network_activations: number;
    commission_rate_text: string;
    total_earned: number;
    total_earned_formatted: string;
    pending_payout_formatted: string;
  };
  network_health: {
    active_scs: { text: string; status: string };
    low_stock_scs: { text: string; status: string };
    avg_acts_per_sc: { formatted: string; status: string };
    bonus_hit_rate: { percentage: number; text: string };
    out_of_stock_scs: { text: string; status: string };
  };
}

// --- State Coordinators Listing ---
export interface RmStateCoordinatorItem {
  id: number;
  name: string;
  initials: string;
  phone: string;
  state: string;
  stock: number;
  stock_label: string;
  stock_status: "normal" | "warning" | "critical" | string;
  stock_alert?: string | null;
  highlight_row: boolean;
  aps_count: number;
  aps_text: string;
  activations: number;
  activations_text: string;
  bonus_status: string;
  bonus_color: string;
  last_active: string;
}

// --- Live Activity Stream ---
export interface RmActivityItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  time_ago: string;
  badge_text: string;
  badge_color: string;
  icon: string;
  created_at: string;
}

// --- Single SC Detail View ---
export interface RmCoordinatorDetailData {
  summary_bar: {
    role: { title: string; status: string };
    stock: { count: number; label: string; sublabel: string };
    aps_managed: { count: number; label: string; sublabel: string };
    activations: { count: number; label: string; sublabel: string };
    bonus: { status: string; target_tier: string };
    last_active: { time_ago: string; location: string };
  };
  hero: {
    name: string;
    initials: string;
    phone: string;
    location: string;
    status: string;
  };
  sc_information: {
    fullname: string;
    phone: string;
    email: string;
    state: string;
    lga: string;
    address: string;
    onboarded_by: string;
    onboarded_on: string;
    kyc_status: string;
    bank: string;
  };
  sim_stock: {
    total: number;
    total_label: string;
    received_from_you_text: string;
    last_distribution_text: string;
  };
  performance: {
    activations: number;
    network_aps: number;
    avg_per_ap: string;
    commission_formatted: string;
  };
  bonus_status: {
    headline: string;
    detail: string;
    bonus_tag: string;
    subtext: string;
  };
  network_commission: {
    sc_network_acts_text: string;
    commission_pool_formatted: string;
    rm_share_formatted: string;
    rm_share_rate: string;
  };
}
export type { RmWalletOverviewData, RmGroupedTransactionItem, RmGroupedTransactionsBlock, RmTransactionsResponseData, RmPayoutAccountData, RmPayoutItem, RmStatementData } from "./wallet";
export type { RmInventoryOverviewData, RmUndistributedSimsData, RmInventoryHistoryItem, RmStockRequestItem } from "./inventory";
export type { RmMyScOverviewData, RmScComparisonData } from "./coordinators";
