import type { ScPagination } from "./requests";
import type { UndistributedSimItem, InventoryHistoryItem } from "./inventory";
import type { ScAgentDetailData, ScAgencyPartnersOverviewData } from "./agents";

export type SimType = "pos" | "cctv" | "gps" | "router";
export type ScAgentItem = ScAgencyPartnersOverviewData["partners"][number];
export type ScPartnerTarget = { id: number; name: string };
export interface SimListParams { type?: string; network?: string; search?: string; agentId?: number; page: number; limit: number }
export interface StockListData extends ScPagination { sims: UndistributedSimItem[] }
export interface UndistributedData extends StockListData {
  owner: { id: number; role: string; name: string };
  summary: { total_undistributed: number; pos: number; cctv: number; gps: number; router: number };
}
export interface InventoryHistoryData extends ScPagination { history: InventoryHistoryItem[] }
export interface InventoryHistoryParams { eventType?: string; page: number; limit: number }
export interface AgentOverviewParams { search?: string; status?: string; bonusStatus?: string; page: number; limit: number }
export interface CustomerParams { search?: string; page: number; limit: number }
export interface AgentCustomer { id: number; name: string; initials: string; sim_type: string; sim_number: string; status: string; status_color: string }
export interface AgentCustomersData extends ScPagination { items: AgentCustomer[] }
export interface AgentStockHistoryItem { id: string; time_ago: string; total_sims: number; total_sims_label: string; breakdown_text: string; created_at: string }
export interface AgentStockHistoryData { total_records: number; items: AgentStockHistoryItem[] }
export interface StockRequestPayload { sim_type: SimType; quantity: number; urgency: "normal" | "urgent"; notes: string }
export interface DistributionPayload { partner_id?: number; partner_ids?: number[]; distribute_to_all_low?: boolean; sim_type: SimType; quantity: number }
/** POST /sim-inventory/distribute with hand-picked SIM numbers per type. */
export interface InventoryDistributionPayload { partner_id: number; phone?: string; sims: Partial<Record<SimType, string[]>>; note?: string }
export interface InventoryDistributionResult {
  reference: string;
  recipient: { user_id: number; agent_id: number; name: string; phone: string };
  total_distributed: number;
  summary: Partial<Record<SimType | "cctv_device", number>>;
  distributions: Partial<Record<SimType | "cctv_device", string[]>>;
  distributed_at: string;
  message: string;
}
export type AgentProfilePayload = Pick<ScAgentDetailData["profile_details"], "fullname" | "email" | "phone" | "state" | "lga" | "address">;
export interface OnboardAgentPayload extends AgentProfilePayload { password?: string; initial_sim_type?: SimType; initial_sim_quantity: number }
export interface AgentReminderPayload { partner_id: number; type: "low_stock" | "bonus_target"; title: string; message: string }
export interface BulkReminderPayload { target_at_risk_only: boolean; message: string }
export interface SuspendAgentPayload { suspend: boolean; reason: string }

// ---- Redistribution (unactivated SIMs already with an AP → another AP) ----
export type RedistType = SimType | "cctv_device";
export interface RedistributableSim {
  id: number; sim_number: string; type: RedistType; type_label: string; network: string; network_code: string; network_color: string;
  status: string; status_label: string; distributed_at: string;
  current_partner: { id: number; user_id: number; name: string; phone: string };
}
export interface RedistributablePartner {
  partner_id: number; user_id: number; name: string; phone: string; unactivated_count: number;
  breakdown: Record<RedistType, number>;
}
export interface RedistributableData {
  sims: RedistributableSim[];
  summary: Record<RedistType, number> & { total: number; partners_count: number };
  partners: RedistributablePartner[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
export interface RedistributableParams { type?: string; partnerId?: number; search?: string; page: number; limit: number }
export interface RedistributionPayload {
  partner_id: number; phone: string; from_partner_id: number; from_phone: string;
  sims: Partial<Record<RedistType, string[]>>; note?: string;
}
export interface RedistributionResult {
  reference: string; total_redistributed: number; redistributedTo: string;
  recipient: { user_id: number; agent_id: number; name: string; phone: string };
  previous_partners: { user_id: number; name: string; phone: string; count: number }[];
  summary: Partial<Record<RedistType, number>>;
  distributions: Partial<Record<RedistType, string[]>>;
  redistributed_at: string; message: string;
}
