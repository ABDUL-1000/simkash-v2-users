import { Activity, AlertCircle, Smartphone } from "lucide-react";
import type { DeviceSimOverviewData } from "../types/api";

export function DeviceSimStatsCards({ stats }: { stats?: DeviceSimOverviewData }) {
  const cards = [
    { icon: Smartphone, value: stats?.statCards?.total?.value ?? stats?.totalSims ?? 0, label: "Total SIMs", sub: stats?.statCards?.total?.subtext ?? `${stats?.activeSims ?? 0} Active · ${stats?.pendingSims ?? 0} Pending`, color: "text-[#2563EB]", bg: "bg-blue-50" },
    { icon: AlertCircle, value: stats?.statCards?.expiringSoon?.value ?? stats?.expiringSims ?? 0, label: "Expiring ≤ 7 Days", sub: stats?.statCards?.expiringSoon?.subtext ?? "Action needed · Renew now", color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { icon: Activity, value: stats?.statCards?.usedThisMonth?.value ?? stats?.usedThisMonth ?? "—", label: "Used This Month", sub: stats?.statCards?.usedThisMonth?.subtext ?? "Across all active SIMs", color: "text-[#10B981]", bg: "bg-emerald-50" },
  ];
  return <div className="grid gap-3 sm:grid-cols-3">{cards.map(({ icon: Icon, ...card }) => <article key={card.label} className="rounded-2xl border border-[#E2ECF6] bg-white p-4"><span className={`mb-3 flex size-9 items-center justify-center rounded-xl ${card.bg} ${card.color}`}><Icon size={18} /></span><p className="text-2xl font-bold text-[#0F152A]">{card.value}</p><p className="mt-1 text-sm font-semibold text-[#0F152A]">{card.label}</p><p className="mt-1 text-xs text-[#8C909B]">{card.sub}</p></article>)}</div>;
}
