export interface RmInventoryOverviewData {
  summary_cards: {
    total_available: { count: number; label: string; subtext: string };
    distributed: { count: number; label: string; subtext: string };
    received: { count: number; label: string; subtext: string };
    pending_request: { count: number; label: string; subtext: string };
    scs_low_on_stock: { count: number; label: string; subtext: string };
  };
  current_inventory: Array<{
    type: string;
    label: string;
    available: number;
    status: string;
    used_percentage: number;
  }>;
  how_stock_is_distributed: {
    total_coordinators: number;
    coordinators: Array<{
      name: string;
      state: string;
      pos: number;
      cctv: number;
      gps: number;
      router: number;
      total: number;
      status: string;
    }>;
  };
  inventory_health: {
    overall_health: string;
    total_sims: number;
  };
  estimated_days_remaining: {
    estimates: Array<{ type: string; days_text: string }>;
  };
  scs_need_distribution: {
    items: Array<{ name: string; state: string; stock: number; subtitle: string }>;
  };
}

export interface RmUndistributedSimsData {
  owner: { id: number; role: string; name: string };
  summary: { total_undistributed: number; pos: number; cctv: number; gps: number; router: number };
  sims: Array<{
    id: number;
    sim_number: string;
    type: string;
    type_label: string;
    network: string;
    status: string;
    received_at: string;
  }>;
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface RmInventoryHistoryItem {
  id: string;
  reference: string;
  event_type: "received" | "distributed" | "adjusted" | "returned";
  sim_type: string;
  network: string;
  quantity_delta: number;
  quantity_formatted: string;
  party_info: string;
  stock_after: number;
  time: string;
}

export interface RmStockRequestItem {
  id: number;
  reference: string;
  sim_types_summary: string;
  total_quantity: number;
  status: "pending" | "approved" | "rejected";
  urgency: string;
  notes: string;
  requested_at: string;
}

// ==========================================
// MY STATE COORDINATORS TYPES
// ==========================================
