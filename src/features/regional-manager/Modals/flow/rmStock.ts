import { Cctv, CreditCard, MapPin, Router, type LucideIcon } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { rmSimTypes, useGetRmSimInventoryOverview, useGetRmUndistributedSims, type RmTypeQuantities } from "../../api/inventory";
import type { RmSimType } from "../../types/dashboard";

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
