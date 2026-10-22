import { AlertCircle, AlertTriangle, BarChart3, Bell, CardSim, CheckCircle2, Circle, Download, PauseCircle, Send, Trophy, TrendingUp, UserPlus, Users, XCircle } from "lucide-react";
import type { ScAgencyPartnersOverviewData } from "../../types/agents";

interface ScPartnersSidebarProps {
  data: ScAgencyPartnersOverviewData;
  exporting: boolean;
  onDistribute: (partnerId: number) => void;
  onDistributeAll: () => void;
  onOpenDistribute: () => void;
  onOnboard: () => void;
  onBulkRemind: () => void;
  onExport: () => void;
  onViewNetwork: () => void;
}

export function ScPartnersSidebar({ data, exporting, onDistribute, onDistributeAll, onOpenDistribute, onOnboard, onBulkRemind, onExport, onViewNetwork }: ScPartnersSidebarProps) {
  const summary = data.network_summary;
  const bonus = data.ap_bonus_status;
  const summaryRows = [
    { label: "Total APs", value: summary.total_aps, icon: Users, tone: "text-[#0F152A]", valueTone: "text-[#0F152A]" },
    { label: "Active", value: summary.active, icon: CheckCircle2, tone: "text-[#10B981]", valueTone: "text-[#10B981]" },
    { label: "Low Stock", value: summary.low_stock, icon: AlertTriangle, tone: "text-[#F59E0B]", valueTone: "text-[#F59E0B]" },
    { label: "Suspended", value: summary.suspended, icon: PauseCircle, tone: "text-[#EF4444]", valueTone: "text-[#EF4444]" },
    { label: "New this month", value: summary.new_this_month, icon: UserPlus, tone: "text-[#0F152A]", valueTone: "text-[#0F152A]" },
  ];
  const bonusRows = [
    { label: "Achieved", value: bonus.achieved, icon: Trophy, tone: "text-[#7C3AED]" },
    { label: "On Track", value: bonus.on_track, icon: TrendingUp, tone: "text-[#10B981]" },
    { label: "At Risk", value: bonus.at_risk, icon: AlertTriangle, tone: "text-[#F59E0B]" },
    { label: "Missed", value: bonus.missed, icon: XCircle, tone: "text-[#EF4444]" },
  ];

  return (
    <aside className="min-w-0 space-y-4">
      {/* Network Summary */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1 text-xs">
        <h3 className="pb-1 text-sm font-extrabold text-[#0F152A]">Network Summary</h3>
        {summaryRows.map(({ label, value, icon: Icon, tone, valueTone }) => (
          <div key={label} className="flex items-center justify-between border-b border-[#F1F5F9] py-2">
            <span className="flex items-center gap-2 text-[#66738C]"><Icon className={`size-3.5 ${tone}`} />{label}</span>
            <span className={`font-black ${valueTone}`}>{value.toLocaleString()}</span>
          </div>
        ))}
        <div className="flex items-center justify-between py-2">
          <span className="flex items-center gap-2 text-[#66738C]"><CardSim className="size-3.5 text-[#10B981]" />Network Acts</span>
          <span className="text-right"><span className="block font-black text-[#10B981]">{summary.network_acts_this_month.toLocaleString()}</span><span className="text-[10px] text-[#8C909B]">this month</span></span>
        </div>
      </div>

      {/* APs Needing Stock */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-3 text-xs">
        <h3 className="text-sm font-extrabold text-[#F59E0B]">APs Needing Stock</h3>
        {data.aps_needing_stock.items.length === 0 ? <p className="text-[#8C909B]">All your APs have enough stock.</p>
          : <div className="space-y-2 rounded-xl border border-[#FDE68A] bg-[#FEF3C7] p-2.5">
            {data.aps_needing_stock.items.map((ap) => {
              const critical = ap.severity === "critical";
              const Icon = critical ? AlertCircle : AlertTriangle;
              return (
                <div key={ap.id} className="flex items-start justify-between gap-2 border-b border-[#FDE68A] bg-white/70 px-2 py-1.5 last:border-0">
                  <div className="min-w-0">
                    <p className={`flex items-center gap-1 font-extrabold ${critical ? "text-[#EF4444]" : "text-[#D9990D]"}`}><Icon className="size-3.5 shrink-0" />{ap.name}</p>
                    <p className="text-[10px] text-[#66738C]">{ap.subtitle}</p>
                  </div>
                  <button type="button" onClick={() => onDistribute(ap.id)} className={`shrink-0 text-[11px] font-bold hover:underline ${critical ? "text-[#EF4444]" : "text-[#D9990D]"}`}>Distribute</button>
                </div>
              );
            })}
            {data.aps_needing_stock.can_distribute_all && <button type="button" onClick={onDistributeAll} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2 text-xs font-bold text-[#D9990D] hover:bg-amber-100">
              <Send className="size-3.5" />Distribute to All Low APs
            </button>}
          </div>}
      </div>

      {/* AP Bonus Status */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1 text-xs">
        <h3 className="pb-1 text-sm font-extrabold text-[#0F152A]">AP Bonus Status</h3>
        {bonusRows.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="flex items-center justify-between border-b border-[#F1F5F9] py-2">
            <span className="flex items-center gap-2 text-[#66738C]"><Icon className={`size-3.5 ${tone}`} />{label}</span>
            <span className={`font-black ${tone}`}>{value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-b border-[#F1F5F9] py-2">
          <span className="flex items-center gap-2 text-[#66738C]"><Circle className="size-3.5 text-[#8C909B]" />N/A</span>
          <span className="text-right"><span className="block font-black text-[#0F152A]">{bonus.na}</span><span className="text-[10px] text-[#8C909B]">(suspended: {bonus.suspended_count})</span></span>
        </div>
        {bonus.can_remind_at_risk && <button type="button" onClick={onBulkRemind} className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-[#F59E0B] hover:underline">
          <Bell className="size-3.5" />Send Reminders to At Risk
        </button>}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2 text-xs">
        <h3 className="pb-1 text-sm font-extrabold text-[#0F152A]">Quick Actions</h3>
        <button type="button" onClick={onOnboard} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E2E4F] py-2.5 font-bold text-white hover:bg-[#0F152A]"><UserPlus className="size-4" />Onboard New AP</button>
        <button type="button" onClick={onOpenDistribute} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#10B981] py-2.5 font-bold text-[#10B981] hover:bg-[#EBFFF8]"><Send className="size-4" />Distribute SIMs</button>
        <button type="button" onClick={onBulkRemind} disabled={!bonus.can_remind_at_risk} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#F59E0B] py-2.5 font-bold text-[#F59E0B] hover:bg-[#FFFBEB] disabled:opacity-50"><Bell className="size-4" />Send Bulk Reminder</button>
        <button type="button" onClick={onExport} disabled={exporting} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2ECF6] py-2.5 font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-50"><Download className="size-4" />{exporting ? "Exporting…" : "Export AP List"}</button>
        <button type="button" onClick={onViewNetwork} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2ECF6] py-2.5 font-bold text-[#66738C] hover:bg-[#F8FAFC]"><BarChart3 className="size-4" />View Network Activity</button>
      </div>
    </aside>
  );
}
