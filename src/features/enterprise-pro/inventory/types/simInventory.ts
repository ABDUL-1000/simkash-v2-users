export type EpSimType = "pos" | "cctv" | "gps" | "router";
export type EpSimSelection = Record<EpSimType, string[]>;
export type StockQuantities = Record<EpSimType, number>;
export interface InventoryResponse<T> { success: boolean; message: string; data: T }

interface EpSummaryCard { count?: number; label: string; subtext: string; icon?: string; highlight?: boolean }

// --- GET /sim-inventory/overview ---
export interface EnterpriseStockType {
  type: EpSimType; label: string; subtitle: string; available?: number; total_received?: number; status: string; status_color: string;
  used_percentage: number; used_text: string; network_breakdown: Array<{ network: string; count: number; code: string; color: string }>;
}
export interface EnterpriseStockCoordinator {
  id: number; name: string; state: string; pos: number; cctv: number; gps: number; router: number; total: number; total_label: string; status: string; status_color: string;
}
export interface EnterpriseSimInventoryOverviewData {
  summary_cards: {
    total_available: EpSummaryCard; distributed: EpSummaryCard; received: EpSummaryCard; pending_requests: EpSummaryCard; scs_low_on_stock: EpSummaryCard;
  };
  stock_types: EnterpriseStockType[];
  how_stock_is_distributed: { total_coordinators: number; total_coordinators_text: string; coordinators: EnterpriseStockCoordinator[] };
  inventory_health: { overall_health: string; color: string; total_sims: number; total_sims_text: string; breakdown: Array<{ type: string; count?: number; status: string; color: string }> };
  estimated_days_remaining: {
    subtitle: string;
    estimates: Array<{ type: string; days: number; days_text: string; color: string; is_alert: boolean }>;
    alert_callout?: { message: string; level: string } | null;
  };
  scs_need_distribution: {
    title: string; can_distribute_all: boolean;
    items: Array<{ coordinator_id: number; name: string; state: string; status: string; subtitle: string; stock: number; level: string; action: string; action_color: string }>;
  };
  admin_info: { name: string; role: string; phone: string; region: string; initials: string };
}

// --- GET /sim-inventory/undistributed, /undistributed/{type}, /available ---
export interface EpStockSim {
  id: number; sim_number: string; type: string; type_label: string; network: string; network_code?: string; network_color?: string; status: string; received_at: string;
}
export interface EpSimListParams { network?: string; search?: string; page: number; limit: number }
export interface EpSimListData { sims: EpStockSim[]; total: number; page: number; limit: number; total_pages: number }
export interface EpUndistributedData extends EpSimListData {
  owner?: { id: number; role: string; name: string };
  summary: { total_undistributed: number } & StockQuantities;
}

// --- POST /sim-inventory/distribute ---
export interface EpDistributionPayload { coordinator_id: number; phone: string; sims: Partial<EpSimSelection>; notes?: string }
interface EpRecipient { user_id: number; agent_id: number; name: string; phone: string; state: string }
export interface EpDistributionResult {
  reference: string; recipient: EpRecipient; total_distributed: number; summary: Partial<StockQuantities>;
  distributions: Partial<EpSimSelection>; distributed_at: string; message: string;
}

// --- GET /sim-inventory/redistributable(/{type}) + POST /redistribute ---
export interface EpRedistributableSim {
  id: number; sim_number: string; type: EpSimType; type_label: string; network: string; network_code: string; network_color: string;
  status: string; status_label: string; distributed_at: string;
  current_coordinator: { id: number; user_id: number; name: string; phone: string; state: string };
}
export interface EpRedistributableCoordinator {
  coordinator_id: number; user_id: number; name: string; phone: string; state: string; unactivated_count: number; breakdown: StockQuantities;
}
export interface EpRedistributableData {
  sims: EpRedistributableSim[];
  summary: StockQuantities & { total: number; coordinators_count: number };
  coordinators: EpRedistributableCoordinator[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
export interface EpRedistributableParams { type?: string; coordinatorId?: number; search?: string; page: number; limit: number }
export interface EpRedistributionPayload { to_coordinator_id: number; phone: string; from_coordinator_id: number; sims: Partial<EpSimSelection>; reason?: string }
export interface EpRedistributionResult {
  reference: string; total_redistributed: number; redistributedTo: string; recipient: EpRecipient;
  previous_coordinators: Array<EpRecipient & { count: number }>;
  summary: Partial<StockQuantities>; distributions: Partial<EpSimSelection>; redistributed_at: string; message: string;
}

// --- GET /sim-inventory/history and /history/{id} ---
export interface EpHistoryBreakdown extends StockQuantities { total: number }
export interface EnterpriseInventoryHistoryRow {
  id: string; event_type: string; event_label: string; event_badge_color: string; sim_type: string; sim_type_label: string; network: string;
  quantity: number; quantity_delta: number; quantity_formatted: string; party_name: string; party_role: string; party_info: string;
  reference: string; date: string; time_ago: string; breakdown?: EpHistoryBreakdown;
}
export interface EnterpriseInventoryHistoryData { history: EnterpriseInventoryHistoryRow[]; total: number; page: number; limit: number; total_pages?: number }
export interface HistoryParams {
  search?: string; event_type?: "all" | "received" | "distributed" | "returned" | "adjusted"; sim_type?: "all" | EpSimType; partner_id?: number;
  start_date?: string; end_date?: string; sortBy?: "newest" | "oldest"; page?: number; limit?: number;
}
export interface EpHistoryDetailData extends Omit<EnterpriseInventoryHistoryRow, "breakdown"> {
  recipient?: { user_id?: number; name: string; phone?: string; state?: string; role?: string };
  sender?: { name: string; phone?: string; role?: string };
  time: string; created_at: string; breakdown: EpHistoryBreakdown; total_sims: number;
  sims: Array<{ id: number; sim_number: string; serial_no?: string; network?: string; status?: string; sim_type: string; sim_type_label: string; date?: string }>;
}

// --- POST /sim-inventory/request-stock + GET /requests ---
export interface EpRequisitionPayload { sim_type: EpSimType; quantity: number; network?: string; urgency: "normal" | "urgent"; notes?: string }
export interface EpRequisitionResult { request_id: number; reference: string; sim_type: string; quantity: number; status: string; requested_at: string; message: string }
export interface EpStockRequestItem {
  id: number; reference: string; sim_type: string; quantity: number; status: string; status_color: string; urgency: string; notes: string; requested_at: string; time_ago: string;
}
