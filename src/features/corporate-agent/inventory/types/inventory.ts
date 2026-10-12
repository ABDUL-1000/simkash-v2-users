
// --- Overview (Tab 1) ---
export interface CaInventoryOverviewData {
  summary_cards: {
    total_available: { count: number; label: string; subtext: string; icon: string };
    distributed: { count: number; label: string; subtext: string; icon: string };
    received: { count: number; label: string; subtext: string; icon: string };
    pending_requests: { count: number; label: string; subtext: string; icon: string };
    aps_low_on_stock: { count: number; label: string; subtext: string; icon: string; highlight?: boolean };
  };
  current_inventory: Array<{
    type: string;
    label: string;
    subtext: string;
    available: number;
    status: string;
    status_color: string;
    capacity_percentage: number;
    capacity_text: string;
    progress_color: string;
    network_breakdown: Array<{ network: string; count: number }>;
    action: string;
    is_warning?: boolean;
    is_critical?: boolean;
  }>;
  how_stock_is_distributed: {
    total_partners: number;
    total_partners_text: string;
    partners: Array<{
      id: number;
      name: string;
      phone: string;
      initials: string;
      pos: number;
      cctv: number;
      gps: number;
      router: number;
      total: number;
      status: string;
      status_color: string;
      stock_alert: boolean;
    }>;
  };
  inventory_health: {
    status: string;
    score: number;
    score_text: string;
    breakdown: Array<{ category: string; percentage: number; color: string }>;
  };
  days_remaining: {
    subtitle: string;
    estimates: Array<{
      category: string;
      days: number;
      days_text: string;
      status: string;
      color: string;
      is_alert: boolean;
    }>;
  };
  aps_needing_stock: Array<{
    id: number;
    name: string;
    detail: string;
    status: string;
    status_color: string;
    icon: string;
  }>;
  request_stock_card: {
    message: string;
    last_request_text: string;
    can_request: boolean;
  };
}

// --- Distribution Context & Previews (Tab 2) ---
export interface CaDistributeContextData {
  csa_stock: {
    total: number;
    pos: number;
    cctv: number;
    gps: number;
    router: number;
    summary_text: string;
  };
  agency_partners: Array<{
    id: number;
    name: string;
    phone: string;
    initials: string;
    current_stock: number;
    current_stock_label: string;
    status: string;
    status_color: string;
    customers: number;
    activations_per_month: number;
    bonus_status: string;
    last_received_text: string;
    is_low_stock: boolean;
  }>;
}

export interface CaApPreviewData {
  id: number;
  name: string;
  phone: string;
  initials: string;
  location: string;
  customers: number;
  current_stock: number;
  current_stock_text: string;
  status: string;
  activations_per_month: number;
  activations_text: string;
  bonus_status: string;
  bonus_status_color: string;
  last_received: string;
  last_sent_details: {
    time_ago: string;
    total_sims: number;
    breakdown_text: string;
    reference: string;
  };
}

export interface CaDistributeQuantities {
  pos?: number;
  cctv?: number;
  gps?: number;
  router?: number;
}

export interface CaDistributePreviewResponseData {
  partner: { id: number; name: string; location: string; customers: number };
  quantities: CaDistributeQuantities & { total: number };
  csa_stock: {
    before: number;
    after: number;
    difference_text: string;
    is_healthy: boolean;
    safety_message: string;
  };
  partner_stock: {
    before: number;
    after: number;
    difference_text: string;
  };
}

// --- History (Tab 3) ---
export interface CaInventoryHistoryEvent {
  id: string;
  date: string;
  date_section: string;
  event: string;
  event_color: string;
  sim_type: string;
  network: string;
  qty: number;
  qty_formatted: string;
  party_text: string;
  running_total: string;
  reference: string;
  raw_date: string;
}

export interface CaInventoryHistoryResponseData {
  summary_cards: {
    total_received: { count: number; label: string; subtext: string; icon: string };
    total_distributed: { count: number; label: string; subtext: string; icon: string };
    currently_in_stock: { count: number; label: string; subtext: string; icon: string };
    pending_requests: { count: number; label: string; subtext: string; icon: string };
  };
  total_events: number;
  filtered_events_count: number;
  page: number;
  limit: number;
  total_pages: number;
  showing_text: string;
  grouped_events: Record<string, CaInventoryHistoryEvent[]>;
  events: CaInventoryHistoryEvent[];
}

// --- Stock Requisitions ---
export interface CaStockRequestItem {
  id: number;
  reference: string;
  sim_type: string;
  quantity: number;
  status: string;
  status_color: string;
  requested_at: string;
  time_ago: string;
  notes: string;
}
export type CaSimType = "pos" | "cctv" | "gps" | "router";
export type CaQuantities = Record<CaSimType, number>;
export interface CaDistributionPayload { partner_id: number; quantities: CaQuantities; note?: string }
export interface CaDistributionResult {
 reference: string; partner_id: number; partner_name: string;
 distributed_quantities: CaQuantities & { total: number };
 csa_stock_after: number; partner_stock_after: number; note: string; distributed_at: string; message: string;
}
export interface CaRequisitionPayload { sim_type: CaSimType; quantity: number; notes: string; urgency: "normal" | "high" }
export interface CaRequisitionResult { request_id: number; reference: string; sim_type: string; quantity: number; status: string; requested_at: string; message: string }
export interface CaHistoryParams { search: string; event_type: string; sim_type: string; page: number; limit: number }
