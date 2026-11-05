import { Cctv, CreditCard, MapPin, Router, type LucideIcon } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { rmSimTypes, useGetRmRedistributableSims, useGetRmSimInventoryOverview, useGetRmUndistributedSims, type RmTypeQuantities } from "../../api/inventory";
import type { RmSimType } from "../../types/dashboard";
import { simOptions } from "@/utils/simSearch";

export const rmSimMeta: Record<RmSimType, { label: string; device: string; short: string; icon: LucideIcon; color: string; bg: string }> = {
  pos: { label: "POS SIM", device: "POS Terminal", short: "POS", icon: CreditCard, color: APP_COLORS.blues.primary, bg: APP_COLORS.blues.surfaceLight },
  cctv: { label: "CCTV SIM", device: "CCTV Device", short: "CCTV", icon: Cctv, color: APP_COLORS.greens.green, bg: APP_COLORS.greens.light },
  gps: { label: "GPS SIM", device: "GPS Tracker", short: "GPS", icon: MapPin, color: "#7C3AED", bg: "#F1EAFE" },
  router: { label: "Router SIM", device: "Router", short: "Router", icon: Router, color: APP_COLORS.ambers.amber, bg: "#FEF6E0" },
};

export const sumQuantities = (quantities: RmTypeQuantities) => rmSimTypes.reduce((sum, type) => sum + quantities[type], 0);
export const activeTypes = (quantities: RmTypeQuantities) => rmSimTypes.filter(type => quantities[type] > 0);
export const breakdownText = (stock?: Partial<RmTypeQuantities>) => rmSimTypes.map(type => `${rmSimMeta[type].short} ${stock?.[type] ?? "—"}`).join(" · ");

/** RM's own stock per SIM type, from the inventory overview. */
export function useRmOwnStock() {
  const query = useGetRmSimInventoryOverview();
  const byType = query.data ? Object.fromEntries(rmSimTypes.map(type => [type, query.data!.current_inventory.find(stock => stock.type.toLowerCase() === type)?.available ?? 0])) as RmTypeQuantities : undefined;
  return { query, byType, total: query.data?.summary_cards.total_available.count };
}

/** A coordinator's undistributed stock per SIM type. */
export function useRmCoordinatorStock(coordinatorId?: number) {
  const query = useGetRmUndistributedSims({ coordinator_id: coordinatorId, page: 1, limit: 1, type: "all" }, Boolean(coordinatorId));
  const summary = query.data?.summary;
  const byType = summary ? { pos: summary.pos, cctv: summary.cctv, gps: summary.gps, router: summary.router } : undefined;
  return { query, byType, total: summary?.total_undistributed, owner: query.data?.owner };
}

export const firstName = (name?: string) => name?.split(" ")[0] ?? "SC";
export const stockTone = (stock: number) => stock === 0 ? { color: APP_COLORS.reds.red, bg: APP_COLORS.reds.light } : stock < 10 ? { color: APP_COLORS.ambers.secondary, bg: "#FEF6E0" } : { color: APP_COLORS.greens.green, bg: APP_COLORS.greens.light };

/** Where SIM numbers are picked from: the RM's own undistributed stock, or an SC's unactivated (redistributable) stock. */
export type RmSimSource = { kind: "own" } | { kind: "redistributable"; coordinatorId?: number };

/** SIM-number options for one type (first 100 matches of the search). */
export function useRmSimOptions(source: RmSimSource, type: RmSimType, pool: { limit: number; debouncedSearch: string }, enabled = true) {
  // First page + debounced server search, merged; the picker also filters locally (see simFilterOption).
  const base = { type, search: undefined, page: 1, limit: pool.limit };
  const searched = { ...base, limit: 100, search: pool.debouncedSearch || undefined };
  const isOwn = source.kind === "own";
  const coordinatorId = source.kind === "redistributable" ? source.coordinatorId : undefined;
  const canRedistribute = enabled && source.kind === "redistributable" && Boolean(coordinatorId);
  const own = useGetRmUndistributedSims(base, enabled && isOwn);
  const ownFound = useGetRmUndistributedSims(searched, enabled && isOwn);
  const redistributable = useGetRmRedistributableSims({ ...base, coordinator_id: coordinatorId }, canRedistribute);
  const redistributableFound = useGetRmRedistributableSims({ ...searched, coordinator_id: coordinatorId }, canRedistribute);
  const options = isOwn ? simOptions(own.data?.sims, ownFound.data?.sims) : simOptions(redistributable.data?.sims, redistributableFound.data?.sims);
  const first = isOwn ? own.data : redistributable.data;
  // Full count of this type (summary), so the stepper and scrolling can go beyond the loaded page.
  const available = Math.max(Number(first?.summary?.[type] ?? 0) || 0, options.length);
  const loaded = first?.sims?.length ?? 0;
  return { options, available, hasMore: loaded < available, loading: isOwn ? own.isFetching || ownFound.isFetching : redistributable.isFetching || redistributableFound.isFetching };
}

/** Stepper count → SIM list: grows with the next unselected options, shrinks from the end. */
export function resizeSims(value: string[], count: number, options: Array<{ value: string }>) {
  if (count <= value.length) return value.slice(0, count);
  const free = options.map(option => option.value).filter(sim => !value.includes(sim));
  return [...value, ...free.slice(0, count - value.length)];
}

/** An SC's unactivated stock per type (GET /redistributable filtered by coordinator). */
export function useRmRedistributableStock(coordinatorId?: number) {
  const query = useGetRmRedistributableSims({ coordinator_id: coordinatorId, page: 1, limit: 1, type: "all" }, Boolean(coordinatorId));
  const summary = query.data?.summary;
  const byType = summary ? { pos: summary.pos, cctv: summary.cctv, gps: summary.gps, router: summary.router } : undefined;
  return { query, byType, total: summary?.total };
}
