export interface PosRequestOptions {
  business_types: string[];
  estimated_monthly_transactions: string[];
  preferred_pos_providers: string[];
  steps: Array<{ step: number; title: string; description: string }>;
}

export interface CreatePosRequestPayload {
  business_name: string;
  business_type: string;
  estimated_monthly_transactions: string;
  state: string;
  lga: string;
  business_address?: string;
  preferred_pos_provider: string;
  fullname: string;
  phone: string;
  additional_notes?: string;
}

export type PosRequestStatusFilter = "all" | "pending" | "matched" | "linked";

export interface PosTimelineStep { step: number; title: string; completed: boolean; current: boolean }

/** Row from GET /user/pos-machine/requests. */
export interface PosRequestListItem {
  id: number;
  reference: string;
  title: string;
  subtitle: string;
  business_name: string;
  business_type: string;
  state: string;
  lga: string;
  preferred_pos_provider: string;
  status: string;
  status_label: string;
  status_color: string;
  provider: string | null;
  assigned_provider: string | null;
  current_step: number;
  submitted_date_formatted: string;
  submitted_at: string;
}

/** POST /user/pos-machine/request and GET /user/pos-machine/requests/{id}. */
export interface PosRequestDetail {
  id: number;
  reference: string;
  business_name: string;
  business_type: string;
  estimated_monthly_transactions: string;
  state: string;
  lga: string;
  business_address: string | null;
  preferred_pos_provider: string;
  fullname: string;
  phone: string;
  additional_notes: string | null;
  status: string;
  status_label: string;
  status_color: string;
  assigned_provider: string | null;
  current_step: number;
  timeline: PosTimelineStep[];
  submitted: string;
  submitted_date_formatted: string;
  submitted_at: string;
  note?: string | null;
}
