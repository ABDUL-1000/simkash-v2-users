export interface EnterpriseProfile {
  id: number;
  agent_id: number;
  name: string;
  email: string;
  phone: string;
  state: string;
}

export interface EnterpriseTopCards {
  principal_invested: {
    title: string;
    amount: number;
    amount_formatted: string;
    sims_formatted: string;
    balance_percentage: number;
    balance_remaining: number;
    balance_remaining_formatted: string;
    badge_text: string;
    badge_color: string;
  };
  total_earned: {
    title: string;
    amount: number;
    amount_formatted: string;
    margin_earnings: number;
    network_commission: number;
    growth: {
      percentage: number;
      direction: "up" | "down";
      label: string;
    };
  };
  my_network: {
    title: string;
    sc_count: number;
    ap_count: number;
    network_label: string;
    activations_this_month: number;
    activations_formatted: string;
  };
  sim_stock: {
    title: string;
    total_available: number;
    total_available_formatted: string;
    subtext: string;
    breakdown: {
      pos: number;
      cctv: number;
      gps: number;
      router: number;
    };
  };
  wallet_balance: {
    title: string;
    amount: number;
    amount_formatted: string;
    subtext: string;
  };
}

export interface EnterpriseSecondaryCards {
  margin_earnings: {
    label: string;
    amount: number;
    amount_formatted: string;
    badge: string;
  };
  network_commission: {
    label: string;
    amount: number;
    amount_formatted: string;
    badge: string;
  };
  balance_remaining: {
    label: string;
    amount: number;
    amount_formatted: string;
    badge: string;
  };
  roi_this_month: {
    label: string;
    percentage: number;
    percentage_formatted: string;
    badge: string;
  };
}

export interface EnterpriseOverviewData {
  enterprise_profile: EnterpriseProfile;
  top_cards: EnterpriseTopCards;
  secondary_cards: EnterpriseSecondaryCards;
  balance_card: {
    initial_principal: number;
    paid_amount: number;
    remaining_balance: number;
    percentage_paid: number;
    percentage_remaining: number;
    action_route: string;
  };
  account_manager: {
    name: string;
    designation: string;
    phone: string;
    email: string;
    call_action: string;
    whatsapp_action: string;
  };
}

export interface CommissionTableRow {
  id: number;
  coordinator_name: string;
  state: string;
  aps_count: number;
  acts_count: number;
  retail_price_formatted: string;
  margin_per_sim_formatted: string;
  total_margin_formatted: string;
  commission_formatted: string;
  total_earnings_formatted: string;
  stock_formatted: string;
  status: string;
}

export interface CommissionTableResponseData {
  period: string;
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  summary: {
    sc_count: number;
    ap_count: number;
    acts_count: number;
    label: string;
    total_retail_value: number;
    total_retail_formatted: string;
    total_margin: number;
    total_margin_formatted: string;
    total_commission: number;
    total_commission_formatted: string;
    total_earnings: number;
    total_earnings_formatted: string;
  };
  rows: CommissionTableRow[];
}

export interface NetworkActivityItem {
  id: number;
  network: "MTN" | "GLO" | "AIRTEL" | "9MOBILE" | string;
  network_badge_color: string;
  phone: string;
  state: string;
  coordinator_name: string;
  agent_name: string;
  commission_amount: number;
  commission_formatted: string;
  time_formatted: string;
}

export interface InvestmentReturnsData {
  title: string;
  subtitle: string;
  current_roi_percentage: number;
  current_roi_badge: string;
  months: Array<{
    month: string;
    principal: number;
    cumulative_earnings: number;
    margin_earnings: number;
    network_commission: number;
  }>;
}

export interface RoiProjectionData {
  title: string;
  current_roi: number;
  current_roi_formatted: string;
  monthly_earnings: number;
  monthly_earnings_formatted: string;
  projected_6_month_roi: number;
  projected_6_month_roi_formatted: string;
  break_even_timeline: string;
  full_roi_recovery_timeline: string;
  status_label: string;
}

export interface EnterprisePricingData {
  pos_sim_price: number;
  cctv_sim_price: number;
  gps_sim_price: number;
  router_sim_price: number;
  router_device_price: number;
  wholesale_price: number;
  margin_per_sim: number;
}

export type EnterprisePeriod = 'this_month' | 'last_3_months' | 'all_time';
export interface EnterpriseResponse<T> { success: boolean; message: string; data: T; }
export interface NetworkActivityData { total: number; page: number; limit: number; total_pages: number; items: NetworkActivityItem[]; }
export interface RecentActivityData { title: string; items: { id: number; type: string; title: string; detail: string; time_label: string }[]; }
export interface NetworkTreeData {
  sc_count: number;
  ap_count?: number;
  aps_count?: number;
  total_activations?: number;
  state_coordinators: {
    id: number;
    name: string;
    state?: string;
    initials?: string;
    agency_partners_count?: number;
    aps_count?: number;
    activations?: number;
    activations_count?: number;
    total_activations?: number;
    total_earnings_formatted?: string;
    commission_formatted?: string;
  }[];
}
export interface AccountManagerData { title: string; initials: string; name: string; designation: string; phone: string; email: string; actions: { call: string; whatsapp: string }; }
export interface CommissionExportData { format: string; period: EnterprisePeriod; summary: { sc_count: number; ap_count: number; acts_count: number; total_earnings_formatted: string }; records: { coordinator: string; state: string; aps: number; acts: number; total_earnings: string }[]; }
export interface PayBalancePayload { amount: number; payment_method: string; }
export interface ReinvestPayload { amount: number; action_type: 'order_more' | 'reduce_principal'; sim_type?: string; quantity?: number; }
export interface OrderSimsPayload { sim_type: string; quantity: number; delivery_address: string; }
export type UpdatePricingPayload = Pick<EnterprisePricingData, 'pos_sim_price' | 'cctv_sim_price' | 'gps_sim_price' | 'router_sim_price'>;
export interface ActionResult { reference: string; [key: string]: unknown; }
