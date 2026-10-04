import type { RmActivityItem, RmStateCoordinatorItem } from "./api";

export interface RmPagination { total: number; page: number; limit: number; total_pages: number }
export interface RmListParams { page: number; limit: number; search?: string }
export interface RmCoordinatorParams extends RmListParams { status?: "all" | "active" | "at_risk" | "suspended" }
export interface RmCoordinatorsData extends RmPagination { showing_text: string; coordinators: RmStateCoordinatorItem[] }
export interface RmActivitiesData extends RmPagination { activities: RmActivityItem[] }
export interface RmApItem { id: number; name: string; initials: string; activations: number; activations_text: string; status: string; status_color: string }
export interface RmApsData extends RmPagination { items: RmApItem[] }
export interface RmStockHistoryItem { id: string; time_ago: string; breakdown_text: string; total_sims: number; total_sims_text: string; created_at: string }
export interface RmStockHistoryData { subtitle: string; items: RmStockHistoryItem[] }
export type RmSimType = "pos" | "cctv" | "gps" | "router";
export interface RmTarget { id: number; name: string }
export interface RmDistributePayload { coordinator_id?: number; coordinator_ids?: number[]; distribute_to_all_low?: boolean; quantity: number; sim_type: RmSimType }
export interface RmRedistributePayload { from_coordinator_id: number; to_coordinator_id: number; quantity: number; sim_type: RmSimType; reason: string }
export interface RmPayoutPayload { amount: number; notes?: string }
export interface RmProfilePayload { fullname: string; email: string; phone: string; state: string; lga: string; address: string }
export interface RmOnboardScPayload extends RmProfilePayload { initial_sim_type?: RmSimType; initial_sim_quantity: number }
export interface RmStockRequestPayload { sim_type: RmSimType; quantity: number; urgency: "normal" | "urgent"; notes: string }
export interface RmReminderPayload { coordinator_id: number; message: string }
export interface RmSuspendPayload { suspend: boolean; reason: string }
export interface RmQuickDistributePayload { quantity: number; sim_type: RmSimType }
