export interface ScAgencyPartnersOverviewData {
  cards: {
    total_aps: { count: number; label: string; subtitle: string };
    active_aps: { count: number; label: string; subtitle: string };
    low_stock_aps: { count: number; label: string; subtitle: string };
    bonus_achieved_aps: { count: number; label: string; subtitle: string };
    network_acts: { count: number; label: string; subtitle: string };
  };
  network_summary: {
    total_aps: number;
    active: number;
    low_stock: number;
    suspended: number;
    new_this_month: number;
    network_acts_this_month: number;
  };
  aps_needing_stock: {
    can_distribute_all: boolean;
    items: Array<{
      id: number;
      name: string;
      stock: number;
      customers_count: number;
      subtitle: string;
      severity: string;
    }>;
  };
  ap_bonus_status: {
    achieved: number;
    on_track: number;
    at_risk: number;
    missed: number;
    na: number;
    suspended_count: number;
    can_remind_at_risk: boolean;
  };
  partners: Array<{
    id: number;
    name: string;
    initials: string;
    phone: string;
    location: string;
    status: string;
    status_label: string;
    stock: number;
    customers_count: number;
    acts_per_month: number;
    bonus_milestone: string;
  }>;
  pagination: {
    total_items: number;
    current_page: number;
    total_pages: number;
    showing_text: string;
  };
}

export interface ScAgentDetailData {
  summary_bar: {
    role: string;
    stock: { count: number; label: string; sublabel: string };
    customers: { count: number };
    activations: { count: number };
    bonus: { status: string };
    last_active: string;
  };
  hero: {
    id: number;
    name: string;
    initials: string;
    phone: string;
    status: string;
  };
  profile_details: {
    fullname: string;
    phone: string;
    email: string;
    state: string;
    lga: string;
    address: string;
    onboarded_by: string;
    onboarded_date: string;
    kyc_status: string;
    bank_name: string;
    account_number_masked: string;
  };
  stock_details: {
    total_stock: number;
    total_stock_label: string;
    received_all_time_text: string;
    last_distribution_text: string;
    breakdown: Array<{ label: string; count: number; percentage: number }>;
  };
  performance_this_month: {
    activations: number;
    customers: number;
    avg_per_day: number;
    commission_formatted: string;
    daily_activations: Array<{ day: number; count: number }>;
  };
  bonus_tracker: {
    headline: string;
    percentage: number;
    bonus_reward: string;
  };
  commission: {
    current_month_formatted: string;
    subtitle: string;
    activation_rate: string;
    bonus_status: string;
    vs_last_month_formatted: string;
    last_month_formatted: string;
    two_months_ago_formatted: string;
  };
  account_timeline: Array<{ title: string; subtitle: string; icon: string }>;
}
