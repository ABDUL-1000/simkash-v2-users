export type CaSimType = "pos" | "cctv" | "gps" | "router";
export type CaRedistType = CaSimType | "cctv_device";
export type CaQuantities = Record<CaSimType, number>;
export type CaSimSelection = Record<CaSimType, string[]>;

interface CaSummaryCard { count: number; label: string; subtext: string }

// --- GET /sim-inventory/overview ---
export interface CaInventoryOverviewData {
  summary_cards: {
    total_available: CaSummaryCard;
    distributed: CaSummaryCard;
    received: CaSummaryCard;
    pending_requests: CaSummaryCard;
    aps_low_on_stock: CaSummaryCard;
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
    partners: Array<{ id: number; name: string; phone: string; stock: number; customers: number; activations_text: string; status: string }>;
  };
  inventory_health: { overall_health: string; total_sims_text: string };
  estimated_days_remaining: { subtitle: string; alert_callout?: { message: string } | null };
  aps_need_distribution: { title: string; can_distribute_all: boolean };
  rm_info: { name: string; role: string; phone: string; region: string };
}

/** Per-type stock used by the distribute and request-stock forms (built from /undistributed or /overview). */
export interface CaStockSummary { total: number; pos: number; cctv: number; gps: number; router: number; summary_text: string }

// --- GET /sim-inventory/available and /undistributed ---
export interface CaStockSim {
  id: number; sim_number: string; type: CaSimType; type_label: string; network: string; network_code: string;
  network_color: string; status: string; received_at: string;
}
export interface CaSimListParams { type?: string; network?: string; search?: string; page: number; limit: number }
export interface CaSimListData { sims: CaStockSim[]; total: number; page: number; limit: number; total_pages: number }
export interface CaUndistributedData extends CaSimListData {
  owner: { id: number; role: string; name: string };
  summary: { total_undistributed: number; pos: number; cctv: number; gps: number; router: number };
}

// --- POST /sim-inventory/distribute ---
export interface CaDistributionPayload { phone: string; partner_id: number; sims: Partial<Record<CaSimType, string[]>>; note?: string }
export interface CaDistributionResult {
  reference: string;
  recipient: { user_id: number; agent_id: number; name: string; phone: string };
  total_distributed: number;
  summary: Partial<Record<CaRedistType, number>>;
  distributions: Partial<Record<CaRedistType, string[]>>;
  distributed_at: string;
  message: string;
}

// --- GET /sim-inventory/redistributable + POST /redistribute ---
export interface CaRedistributableSim {
  id: number; sim_number: string; type: CaRedistType; type_label: string; network: string; network_code: string; network_color: string;
  status: string; status_label: string; distributed_at: string;
  current_partner: { id: number; user_id: number; name: string; phone: string };
}
export interface CaRedistributablePartner {
  partner_id: number; user_id: number; name: string; phone: string; unactivated_count: number;
  breakdown: Record<CaRedistType, number>;
}
export interface CaRedistributableData {
  sims: CaRedistributableSim[];
  summary: Record<CaRedistType, number> & { total: number; partners_count: number };
  partners: CaRedistributablePartner[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
export interface CaRedistributableParams { type?: string; partnerId?: number; search?: string; page: number; limit: number }
export interface CaRedistributionPayload { newPhone: string; sims: Partial<Record<CaRedistType, string[]>>; note?: string }
export interface CaRedistributionResult {
  reference: string; total_redistributed: number; redistributedTo: string;
  recipient: { user_id: number; agent_id: number; name: string; phone: string };
  previous_partners: Array<{ user_id: number; name: string; phone: string; count: number }>;
  summary: Partial<Record<CaRedistType, number>>;
  distributions: Partial<Record<CaRedistType, string[]>>;
  redistributed_at: string; message: string;
}

// --- GET /sim-inventory/history and /history/{id} ---
export interface CaInventoryHistoryItem {
  id: string; event_type: string; sim_type: string; quantity: number; party_name: string; party_role: string;
  reference: string; date: string; time_ago: string;
}
export interface CaInventoryHistoryData { history: CaInventoryHistoryItem[]; total: number; page: number; limit: number; total_pages: number }
export interface CaHistoryParams { search: string; event_type: string; sim_type: string; start_date?: string; end_date?: string; page: number; limit: number }
export interface CaHistoryDetailData {
  id: string; reference: string; event_type: string; event_label: string; quantity: number; quantity_delta: number; quantity_formatted: string;
  party_name: string; party_role: string; party_info: string;
  recipient?: { id: number; name: string; role: string; phone?: string };
  sender?: { id: number; name: string; role: string; phone?: string };
  date: string; time: string; created_at: string; sim_type: string; sim_type_label: string; network: string;
  breakdown: Record<string, number>; total_sims: number; page: number; limit: number; total_pages: number;
  sims: Array<{ id: number; sim_number: string; serial_no?: string; network?: string; status?: string; sim_type: string; sim_type_label: string; date?: string }>;
}

// --- POST /sim-inventory/request-stock + GET /requests ---
export interface CaRequisitionPayload { sim_type: CaSimType; quantity: number; notes: string; urgency: "normal" | "urgent" }
export interface CaRequisitionResult { id: number; product_type: string; quantity: number; status: string; message: string }
export interface CaStockRequestItem {
  id: number; sim_type: string; quantity: number; status: string; urgency: string; notes: string; rm_name: string; requested_at: string;
}
