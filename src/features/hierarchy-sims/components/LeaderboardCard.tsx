import { useState } from "react";
import { Crown, Medal, RefreshCw, Trophy } from "lucide-react";
import { useLeaderboard } from "../api";
import { useHierarchyConfig } from "../roles";
import type { LeaderboardEntry, LeaderboardPeriod } from "../types";
import { PERIODS, fmtNumber } from "../utils";

const RANK_STYLES: Record<number, { ring: string; chip: string; label: string }> = {
  1: { ring: "border-[#F5C542] bg-[#FFFBEB]", chip: "bg-[#F5C542] text-white", label: "1st" },
  2: { ring: "border-[#CBD5E1] bg-[#F8FAFC]", chip: "bg-[#94A3B8] text-white", label: "2nd" },
  3: { ring: "border-[#F1C7A3] bg-[#FFF7F0]", chip: "bg-[#D98A4E] text-white", label: "3rd" },
};

function Podium({ entry }: { entry: LeaderboardEntry }) {
  const style = RANK_STYLES[entry.rank] ?? RANK_STYLES[3];
  return <div className={`flex min-w-0 items-center gap-3 rounded-2xl border p-3 sm:flex-col sm:p-4 sm:text-center ${style.ring}`}>
    <div className="relative shrink-0">
      <span className="flex size-11 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#0F152A] shadow-xs sm:size-14 sm:text-base">{entry.initials || entry.name.slice(0, 2).toUpperCase()}</span>
      {entry.rank === 1 && <Crown className="absolute -top-2.5 left-1/2 size-4 -translate-x-1/2 text-[#F5C542]" />}
    </div>
    <div className="min-w-0 flex-1 sm:w-full">
      <p className="truncate text-sm font-bold capitalize text-[#0F152A]">{entry.name.toLowerCase()}</p>
      <p className="truncate font-mono text-[10px] text-[#8C909B]">{entry.agent_code}</p>
    </div>
    <div className="shrink-0 text-right sm:text-center">
      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-extrabold ${style.chip}`}>{style.label}</span>
      <p className="mt-1 text-xs font-extrabold text-[#0F152A]">{fmtNumber(entry.activations)} <span className="font-semibold text-[#8C909B]">activations</span></p>
    </div>
  </div>;
}

/** Nationwide top 3 for the signed-in role, plus the user's own rank. */
export function LeaderboardCard() {
  const config = useHierarchyConfig();
  const [period, setPeriod] = useState<LeaderboardPeriod>("this_month");
  const { data, isLoading, isFetching, error, refetch } = useLeaderboard(period);
  if (!config) return null;
  const me = data?.me;
  const periodLabel = PERIODS.find((p) => p.value === period)?.label.toLowerCase();

  return <section className="space-y-4 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#D9990D]"><Trophy className="size-4" /></span>
        <div>
          <h3 className="flex items-center gap-2 text-base font-bold text-[#0F152A]">Leaderboard {isFetching && !isLoading && <RefreshCw className="size-3.5 animate-spin text-[#2563EB]" />}</h3>
          <p className="text-[11px] text-[#8C909B]">Top {data?.filter.role_label ? `${data.filter.role_label}s` : "members"} nationwide by SIM activations</p>
        </div>
      </div>
      <select aria-label="Leaderboard period" value={period} onChange={(e) => setPeriod(e.target.value as LeaderboardPeriod)}
        className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]">
        {PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
    </div>

    {isLoading ? <div className="grid gap-3 sm:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100 sm:h-40" />)}</div>
      : error ? <div className="flex items-center justify-between gap-3 rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs font-semibold text-[#EF4444]">
          <span>{error.message}</span>
          <button type="button" onClick={() => void refetch()} className="shrink-0 font-bold text-[#2563EB] hover:underline">Retry</button>
        </div>
      : !data?.top_three.length ? <div className="rounded-2xl border border-dashed border-[#E2ECF6] p-6 text-center">
          <Medal className="mx-auto size-6 text-[#8C909B]" />
          <p className="mt-2 text-xs font-bold text-[#0F152A]">No activations {periodLabel === "all time" ? "yet" : `for ${periodLabel}`}</p>
          <p className="text-[11px] text-[#8C909B]">The first to activate a SIM takes the top spot.</p>
        </div>
      : <div className="grid gap-3 sm:grid-cols-3">{data.top_three.map((entry) => <Podium key={entry.id} entry={entry} />)}</div>}

    {me && <div className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl p-3.5 text-xs ${me.in_top_three ? "bg-[#EBFFF8]" : "bg-[#F8FAFC]"}`}>
      <span className="font-semibold text-[#66738C]">
        {me.in_top_three ? "You're in the top 3! " : "Your position: "}
        <b className="text-[#0F152A]">#{fmtNumber(me.rank)}</b> of {fmtNumber(me.total_ranked)}
      </span>
      <span className="font-extrabold text-[#0F152A]">{fmtNumber(me.activations)} activation{me.activations === 1 ? "" : "s"}</span>
    </div>}
  </section>;
}
