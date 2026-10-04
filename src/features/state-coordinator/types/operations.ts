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
export type AgentProfilePayload = Pick<ScAgentDetailData["profile_details"], "fullname" | "email" | "phone" | "state" | "lga" | "address">;
export interface OnboardAgentPayload extends AgentProfilePayload { password?: string; initial_sim_type?: SimType; initial_sim_quantity: number }
export interface AgentReminderPayload { partner_id: number; type: "low_stock" | "bonus_target"; title: string; message: string }
export interface BulkReminderPayload { target_at_risk_only: boolean; message: string }
export interface SuspendAgentPayload { suspend: boolean; reason: string }
