export interface RmMyScOverviewData {
  summary_cards: {
    state_coordinators: { count: number };
    active_scs: { count: number };
    at_risk: { count: number };
    suspended: { count: number };
    agency_partners: { count: number };
  };
  coordinators: Array<{
    id: number;
    name: string;
    phone: string;
    state: string;
    status: string;
    sub_stats: {
      aps_label: string;
      stock_label: string;
      activations_label: string;
      bonus_status: string;
    };
    target_progress: {
      text: string;
      percentage: number;
    };
  }>;
}

export interface RmScComparisonData {
  period: string;
  top_performers: {
    first: {
      name: string;
      activations: number;
      commission_formatted: string;
      bonus_status: string;
    };
  };
  table_rows: Array<{
    rank: number;
    name: string;
    state: string;
    aps_text: string;
    activations: number;
    avg_ap_text: string;
    commission_formatted: string;
    stock: number;
    stock_status: string;
    bonus_status: string;
  }>;
  summary_row: {
    total_aps: number;
    total_activations: number;
    total_commission_formatted: string;
  };
}
