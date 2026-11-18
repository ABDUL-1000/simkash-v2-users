export type SimType = "pos" | "cctv" | "gps" | "router" | "cctv_device";
export type TypeCounts = Record<SimType, number> & { total?: number };
export type Pagination = { total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean };

// ---------- Leaderboard ----------
export type LeaderboardPeriod = "all_time" | "today" | "this_week" | "this_month" | "last_month";
export interface LeaderboardEntry {
  rank: number; id: number; agent_code: string; name: string; initials: string;
  role: string; role_label: string; activations: number; status: string;
}
export interface LeaderboardData {
  filter: { role: string; role_label: string; period: LeaderboardPeriod; period_label: string };
  top_three: LeaderboardEntry[];
  me: { rank: number; activations: number; total_ranked: number; in_top_three: boolean } | null;
}

// ---------- Recall ----------
export interface RecallHolder { id: number; agent_id: number; name: string; phone: string | null; state: string | null; recallable: TypeCounts }
export interface RecallHoldersData { totals: TypeCounts; count: number; holders: RecallHolder[] }
export interface RecallableSim { id: number; type: SimType; type_label: string; number: string; network: string | null; assigned_at: string }
export interface RecallableSimsData { holder: Omit<RecallHolder, "recallable">; counts: TypeCounts; sims: RecallableSim[]; pagination: Pagination }
export type RecallPayload =
  | { items: { type: SimType; sim_number: string }[] }
  | { all: true; sim_type?: SimType };
export interface RecallResult { total_recalled: number; summary: TypeCounts; recalled: Record<SimType, string[]>; message: string }

// ---------- SIM requests ----------
export type SimRequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
export type SimRequestUrgency = "low" | "normal" | "high" | "urgent";
export interface SimRequestParty { user_id: number | null; role: string; role_label: string; name: string; phone: string | null; state: string | null }
export interface SimRequest {
  id: number; reference: string; sim_type: SimType; sim_type_label: string; network: string | null;
  quantity: number; approved_quantity: number | null; urgency: SimRequestUrgency; note: string | null;
  status: SimRequestStatus; response_note: string | null; responded_at: string | null; distribution_reference: string | null;
  requester: SimRequestParty; supplier: SimRequestParty; created_at: string; updated_at: string;
}
export interface SimRequestList {
  counts: Record<"all" | SimRequestStatus, number>;
  requests: SimRequest[];
  pagination: Pagination;
}
export interface SimRequestQuery { status: "all" | "pending" | "approved" | "rejected" | "cancelled"; sim_type?: SimType; page: number; limit: number }
export interface SimSupplier { user_id: number | null; agent_id: number | null; name: string; phone: string | null; email: string | null; state: string | null }
export interface SimSuppliersData { supplier_role: string; count: number; suppliers: SimSupplier[]; sim_types?: SimType[] }
export interface CreateSimRequestPayload { supplier_id?: number; sim_type: SimType; quantity: number; network?: string; urgency?: SimRequestUrgency; note?: string }
export interface ApproveSimRequestPayload { sim_numbers?: string[]; quantity?: number; network?: string; note?: string }
