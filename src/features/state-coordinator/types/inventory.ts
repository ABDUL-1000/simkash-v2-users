export interface ScSimInventoryOverviewData {
  summary_cards: {
    total_available: { count: number; label: string; subtext: string };
    distributed: { count: number; label: string; subtext: string };
    received: { count: number; label: string; subtext: string };
    pending_requests: { count: number; label: string; subtext: string };
    aps_low_on_stock: { count: number; label: string; subtext: string };
  };
  stock_types: Array<{
    type: string;
    label: string;
    available: number;
    status: string;
    allocated_percentage: number;
    allocated_text: string;
    network_breakdown: Array<{ network: string; count: number }>;
  }>;
  how_stock_is_distributed: {
    total_partners: number;
    total_partners_text: string;
    partners: Array<{
      id: number;
      name: string;
      phone: string;
      stock: number;
      customers: number;
      activations_text: string;
      status: string;
    }>;
  };
  inventory_health: {
    overall_health: string;
    total_sims_text: string;
  };
  estimated_days_remaining: {
    subtitle: string;
    alert_callout: { message: string };
  };
  aps_need_distribution: {
    title: string;
    can_distribute_all: boolean;
  };
  rm_info: {
    name: string;
    role: string;
    phone: string;
    region: string;
  };
}

export interface UndistributedSimItem {
  id: number;
  sim_number: string;
  type: string;
  type_label: string;
  network: string;
  network_code: string;
  network_color: string;
  status: string;
  received_at: string;
}

export interface InventoryHistoryItem {
  id: number;
  event_type: "received" | "distributed";
  sim_type: string;
  quantity: number;
  party_name: string;
  party_role: string;
  reference: string;
  date: string;
  time_ago: string;
}

export interface RmStockRequestItem {
  id: number;
  sim_type: string;
  quantity: number;
  status: "pending" | "approved" | "rejected";
  urgency: string;
  notes: string;
  rm_name: string;
  requested_at: string;
}

// ==========================================
// AGENCY PARTNERS MANAGEMENT TYPES
// ==========================================
