import { CheckCircle2, Clock3, ShoppingBag, Wallet } from "lucide-react";
import type { UserOrderStats } from "../types/api";

export function MarketplaceStatsCards({ stats, compact = false, variant = "dashboard" }: { stats?: UserOrderStats; compact?: boolean; variant?: "dashboard" | "orders" }) {
  const cards = [
    { label: "Total Orders", value: stats?.totalOrders ?? 0, Icon: ShoppingBag, color: "text-[#2563EB]", bg: "bg-blue-50" },
    { label: "Pending Orders", value: stats?.pendingOrders ?? 0, Icon: Clock3, color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { label: "Completed Orders", value: stats?.completedOrders ?? 0, Icon: CheckCircle2, color: "text-[#10B981]", bg: "bg-emerald-50" },
    { label: "Total Spend", value: `₦${Number(stats?.totalSpend ?? 0).toLocaleString("en-NG")}`, Icon: Wallet, color: "text-[#0F152A]", bg: "bg-slate-100" },
  ];
  const compactLabels = variant === "orders" ? ["Total Spend", "Completed Orders", "Pending Orders"] : ["Total Orders", "Pending Orders", "Total Spend"];
  const visibleCards = compact ? cards.filter((card) => compactLabels.includes(card.label)) : cards;
  return <div className={`grid gap-3 sm:gap-4 ${compact ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4"}`}>{visibleCards.map(({ label, value, Icon, color, bg }) => <div key={label} className="min-w-0 rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs sm:p-5"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold text-[#8C909B] sm:text-xs">{label}</span><span className={`hidden size-8 shrink-0 items-center justify-center rounded-lg sm:flex ${bg} ${color}`}><Icon className="size-4" /></span></div><p className={`mt-3 truncate text-sm font-extrabold sm:text-xl ${color}`}>{value}</p></div>)}</div>;
}
