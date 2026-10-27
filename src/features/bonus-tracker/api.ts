import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";

export type BonusRole = "partner" | "state-coordinator" | "regional-manager";

export interface BonusMilestone { milestone: number; amount: number; achieved: boolean }
export interface SpecialIncentiveStatus { count: number; expectedBonus: number; nextMilestone: number | null }
export interface SimTypeBreakdown { standard_sim: number; pos_sim: number; cctv_sim: number; gps_sim: number; router_sim: number }
export interface BonusOverviewData {
  totalActivation: number;
  expectedBonusAmount: number;
  weekStart: string;
  weekEnd: string;
  milestones: BonusMilestone[];
  breakdown: SimTypeBreakdown;
  specialIncentives: { cctv: SpecialIncentiveStatus; gps: SpecialIncentiveStatus; router: SpecialIncentiveStatus };
}
export interface BonusHistoryItem {
  id: number;
  agent_id: number;
  week_start: string;
  week_end: string;
  total_activations: number;
  bonus_amount: number;
  paid_at: string | null;
  createdAt: string;
  updatedAt: string;
  is_state: boolean;
  is_regional: boolean;
  role: string;
}
export interface BonusHistoryData { bonusHistory: BonusHistoryItem[]; pagination: { total: number; page: number; totalPages: number } }

const get = async <T,>(url: string, params?: Record<string, number>) => {
  const { data } = await authedHttpClient.get<ApiResponse<T>>(url, { params });
  if (!data.success) throw new Error(data.message);
  return data.data;
};

/** GET /{role}/bonus/overview: this week's activations, milestone tiers and CCTV/GPS/Router incentives. */
export function useBonusOverview(role: BonusRole) {
  return useQuery({ queryKey: ["bonus", role, "overview"], queryFn: () => get<BonusOverviewData>(`/${role}/bonus/overview`) });
}

/** GET /{role}/bonus/history?page&limit: past weekly bonus payouts. */
export function useBonusHistory(role: BonusRole, page: number, limit = 10, enabled = true) {
  return useQuery({
    queryKey: ["bonus", role, "history", page, limit],
    queryFn: () => get<BonusHistoryData>(`/${role}/bonus/history`, { page, limit }),
    placeholderData: keepPreviousData,
    enabled,
  });
}
