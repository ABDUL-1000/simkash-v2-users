import type { RmDistributePayload, RmPagination, RmProfilePayload } from "./dashboard";
import type { RmInventoryHistoryItem } from "./inventory";
import type { RmPayoutItem } from "./wallet";

export interface RmDates { start_date?: string; end_date?: string }
export interface RmPage { page: number; limit: number }
export interface RmWalletFilters extends RmDates { category: string; period: "today" | "this_week" | "this_month" | "custom"; search?: string }
export interface RmWalletParams extends RmWalletFilters, RmPage {}
export interface RmPayoutsData extends RmPagination { payouts: RmPayoutItem[] }
export interface RmBankPayload { bank_name: string; bank_code: string; account_number: string; account_name: string; is_default: boolean }
export interface RmWalletPayoutPayload { amount: number; bank_account_id?: number; pin: string }
export interface RmInventoryParams extends RmPage { type?: string; network?: string; search?: string; coordinator_id?: number }
export interface RmHistoryParams extends RmPage, RmDates { search?: string; event_type?: string; sim_type?: string; coordinator_id?: number; sortBy?: string }
export interface RmHistoryData extends RmPage {
  total: number; showing_text: string;
  summary_cards: Record<string, { count: number }>;
  grouped_history: Array<{ date_group: string; items: RmInventoryHistoryItem[] }>;
}
export interface RmInventoryDistribution extends RmDistributePayload { network?: string; notes?: string }
export interface RmBulkStockPayload { pos_quantity: number; cctv_quantity: number; gps_quantity: number; router_quantity: number; urgency: "normal" | "urgent"; notes: string }
export interface RmMyScParams extends RmPage { tab: string; search: string; sortBy: string }
export interface RmNewCoordinatorPayload extends RmProfilePayload { initial_stock: number }
export interface RmScReminderPayload { coordinator_id?: number; coordinator_ids?: number[]; remind_all_at_risk?: boolean; message: string }
