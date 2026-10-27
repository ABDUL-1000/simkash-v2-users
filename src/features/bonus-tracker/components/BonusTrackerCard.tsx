import { useState, type ReactNode } from "react";
import { Calendar, Camera, CheckCircle2, MapPin, Router, Trophy } from "lucide-react";
import { useBonusOverview, type BonusRole, type SimTypeBreakdown, type SpecialIncentiveStatus } from "../api";
import { naira, weekRange } from "../utils";
import { BonusHistoryModal } from "./BonusHistoryModal";

const BREAKDOWN: Array<[keyof SimTypeBreakdown, string]> = [
  ["standard_sim", "Standard"], ["pos_sim", "POS"], ["cctv_sim", "CCTV"], ["gps_sim", "GPS"], ["router_sim", "Router"],
];
const INCENTIVES = [
  { key: "cctv", label: "CCTV SIM", icon: Camera, tone: "bg-[#EFF4F8] text-[#2563EB]" },
  { key: "gps", label: "GPS SIM", icon: MapPin, tone: "bg-[#EBFFF8] text-[#10B981]" },
  { key: "router", label: "Router SIM", icon: Router, tone: "bg-[#F3E8FF] text-[#7C3AED]" },
] as const;

function IncentiveTile({ label, icon: Icon, tone, status }: { label: string; icon: typeof Camera; tone: string; status?: SpecialIncentiveStatus }) {
  const count = status?.count ?? 0;
  const next = status?.nextMilestone;
  return <div className="rounded-2xl border border-[#E2ECF6] p-3 space-y-2">
    <div className="flex items-center gap-2">
      <span className={`flex size-8 items-center justify-center rounded-xl ${tone}`}><Icon className="size-4" /></span>
      <div className="min-w-0"><p className="text-xs font-bold text-[#0F152A]">{label}</p><p className="text-[10px] text-[#8C909B]">{count} this week</p></div>
    </div>
    {next != null && <div className="h-1.5 overflow-hidden rounded-full bg-[#EFF4F8]"><div className="h-full rounded-full bg-[#2563EB]" style={{ width: `${Math.min(100, (count / next) * 100)}%` }} /></div>}
    <div className="flex items-center justify-between text-[10px]">
      <span className="font-semibold text-[#8C909B]">{next != null ? `${next - count} to ${next}` : "Max milestone reached"}</span>
      <span className="font-black text-[#10B981]">{naira(status?.expectedBonus ?? 0)}</span>
    </div>
  </div>;
}

/**
 * Weekly bonus tracker from GET /{role}/bonus/overview, with history from /{role}/bonus/history.
 * `children` renders below the incentives (e.g. the SC dashboard's AP network status).
 */
export function BonusTrackerCard({ role, children, className = "" }: { role: BonusRole; children?: ReactNode; className?: string }) {
  const query = useBonusOverview(role);
  const [historyOpen, setHistoryOpen] = useState(false);
  const data = query.data;
  const milestones = [...(data?.milestones ?? [])].sort((a, b) => a.milestone - b.milestone);
  const total = data?.totalActivation ?? 0;
  const top = milestones.at(-1);
  const next = milestones.find((m) => !m.achieved);
  const achieved = milestones.length > 0 && !next;
  const pct = top ? Math.min(100, (total / top.milestone) * 100) : 0;

  return <div className={`rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5 ${className}`}>
    {/* Header Strip */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Trophy className="size-5 text-[#F59E0B] shrink-0" />
        <h2 className="text-base sm:text-lg font-black text-[#0F152A]">Bonus Tracker</h2>
      </div>
      <button type="button" onClick={() => setHistoryOpen(true)} className="text-xs font-semibold text-[#8C909B] hover:text-[#2563EB] flex items-center gap-1 self-start sm:self-auto">
        {data && <span>{weekRange(data.weekStart, data.weekEnd)} ·</span>}<span>View History →</span>
      </button>
    </div>

    {query.isLoading ? <p className="py-8 text-center text-xs text-[#8C909B]">Loading bonus progress…</p>
      : query.isError ? <div className="py-8 text-center text-xs text-[#EF4444]">{query.error.message} · <button type="button" className="font-bold underline" onClick={() => void query.refetch()}>Retry</button></div>
      : <>
        {/* Main Target Banner */}
        <div className={`rounded-2xl border p-4 sm:p-6 text-center space-y-3 ${achieved ? "border-[#9DF8DA] bg-[#EBFFF8]" : "border-[#FDE68A] bg-[#FFFBEB]"}`}>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#10B981]/10 text-[#F59E0B]"><Trophy className="size-6" /></div>
          <div className="space-y-0.5">
            <h3 className={`text-lg sm:text-xl font-black flex items-center justify-center gap-1.5 ${achieved ? "text-[#10B981]" : "text-[#D9990D]"}`}>
              {achieved ? <><span>🎉</span><span>Top Milestone Achieved!</span></> : <><span>🎯</span><span>{next ? `${next.milestone - total} more to ${naira(next.amount)}` : "Weekly Bonus"}</span></>}
            </h3>
            <p className="text-xs font-medium text-[#66738C]">{total.toLocaleString()} activations this week{top ? ` · top tier at ${top.milestone}` : ""}</p>
          </div>

          {/* Milestone progress */}
          {milestones.length > 0 && <div className="mx-auto max-w-md space-y-2 text-left">
            <div className="h-2 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full ${achieved ? "bg-[#10B981]" : "bg-[#F59E0B]"}`} style={{ width: `${pct}%` }} /></div>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}>
              {milestones.map((m) => <div key={m.milestone} className={`rounded-xl border px-2 py-1.5 text-center ${m.achieved ? "border-[#9DF8DA] bg-white text-[#10B981]" : "border-[#E2ECF6] bg-white/70 text-[#66738C]"}`}>
                <p className="flex items-center justify-center gap-1 text-[10px] font-bold">{m.achieved && <CheckCircle2 className="size-3" />}{m.milestone} acts</p>
                <p className="text-xs font-black">{naira(m.amount)}</p>
              </div>)}
            </div>
          </div>}

          {/* Dark Navy Bonus Pill */}
          <div className="rounded-2xl bg-[#0D1B2E] p-3.5 sm:p-4 text-center text-white space-y-0.5 shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-[#10B981] break-words">{naira(data?.expectedBonusAmount ?? 0)}</h2>
            <p className="text-xs text-[#8C909B] font-medium">Expected bonus this week</p>
          </div>
        </div>

        {/* Week + breakdown strip */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 font-semibold text-[#66738C]"><Calendar className="size-4 shrink-0 text-[#8C909B]" />Week {weekRange(data?.weekStart, data?.weekEnd)}</span>
          <div className="flex flex-wrap gap-1.5">
            {BREAKDOWN.map(([key, label]) => <span key={key} className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#66738C] border border-[#E2ECF6]">{label} {data?.breakdown?.[key] ?? 0}</span>)}
          </div>
        </div>

        {/* Special incentives */}
        <div className="space-y-2">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Special Incentives</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {INCENTIVES.map(({ key, ...tile }) => <IncentiveTile key={key} {...tile} status={data?.specialIncentives?.[key]} />)}
          </div>
        </div>
      </>}

    {children}
    <BonusHistoryModal role={role} open={historyOpen} onClose={() => setHistoryOpen(false)} />
  </div>;
}
