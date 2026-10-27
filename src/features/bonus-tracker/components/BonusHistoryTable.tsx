import { useState } from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useBonusHistory, type BonusRole } from "../api";
import { naira, shortDate, weekRange } from "../utils";

/** Paginated weekly bonus payouts from GET /{role}/bonus/history. */
export function BonusHistoryTable({ role, limit = 10 }: { role: BonusRole; limit?: number }) {
  const [page, setPage] = useState(1);
  const query = useBonusHistory(role, page, limit);
  const rows = query.data?.bonusHistory ?? [];
  const totalPages = query.data?.pagination.totalPages ?? 1;

  if (query.isLoading) return <p className="p-6 text-center text-xs text-[#8C909B]">Loading bonus history…</p>;
  if (query.isError) return <div className="p-6 text-center text-xs text-[#EF4444]">{query.error.message} · <button type="button" className="font-bold underline" onClick={() => void query.refetch()}>Retry</button></div>;
  if (!rows.length) return <AppEmptyState title="No bonus payouts yet" description="Weekly bonuses you earn will appear here once credited." />;

  return <div className="space-y-3">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-xs">
        <thead className="border-b border-[#E2ECF6] bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
          <tr><th className="px-3 py-2.5">Week</th><th className="px-3 py-2.5 text-center">Activations</th><th className="px-3 py-2.5 text-right">Bonus</th><th className="px-3 py-2.5">Paid</th><th className="px-3 py-2.5 text-center">Status</th></tr>
        </thead>
        <tbody className="divide-y divide-[#E2ECF6]">
          {rows.map((row) => <tr key={row.id} className="hover:bg-slate-50/70">
            <td className="px-3 py-2.5 font-bold text-[#0F152A]">{weekRange(row.week_start, row.week_end)}</td>
            <td className="px-3 py-2.5 text-center font-medium text-[#66738C]">{row.total_activations.toLocaleString()}</td>
            <td className="px-3 py-2.5 text-right font-black text-[#0F152A]">{naira(row.bonus_amount)}</td>
            <td className="px-3 py-2.5 text-[#66738C]">{shortDate(row.paid_at)}</td>
            <td className="px-3 py-2.5 text-center">
              {row.paid_at
                ? <span className="inline-flex items-center gap-1 rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]"><CheckCircle2 className="size-3" />Paid</span>
                : <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold text-[#D9990D]"><Clock3 className="size-3" />Pending</span>}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {totalPages > 1 && <div className="flex items-center justify-between px-3 pb-2 text-xs text-[#66738C]">
      <span>Page {page} of {totalPages}</span>
      <div className="flex gap-2">
        <button type="button" disabled={page <= 1 || query.isFetching} onClick={() => setPage(page - 1)} className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 font-semibold disabled:opacity-50">Previous</button>
        <button type="button" disabled={page >= totalPages || query.isFetching} onClick={() => setPage(page + 1)} className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 font-semibold disabled:opacity-50">Next</button>
      </div>
    </div>}
  </div>;
}
