import React from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import { colors } from "@/constants/colors";
import { useGetEnterpriseInvestmentReturns } from "../../api/useGetEnterpriseInvestmentReturns";
import { EpQueryState } from "../../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";

export const EpMonthlyEarningsChart: React.FC = () => {
  const query = useGetEnterpriseInvestmentReturns();
  const rawMonths =
    query.data?.months ??
    (query.data as any)?.monthly_earnings ??
    (query.data as any)?.items ??
    [];
  const months = Array.isArray(rawMonths) ? rawMonths : [];

  const monthlyEarnings = months.map((item: any, index: number, arr: any[]) => {
    const prevCum = arr[index - 1]?.cumulative_earnings ?? 0;
    const currentCum = item?.cumulative_earnings ?? item?.amount ?? 0;
    const amount = item?.amount ?? (currentCum - prevCum);
    return {
      month: item?.month ?? `P${index + 1}`,
      amount: typeof amount === "number" ? amount : Number(amount) || 0,
    };
  });

  const latest = monthlyEarnings.at(-1)?.amount ?? 0;
  const previous = monthlyEarnings.length > 1 ? monthlyEarnings.at(-2)?.amount ?? 0 : 0;
  const growth = previous > 0 ? (((latest - previous) / previous) * 100).toFixed(1) + "%" : "—";
  const maxEarnings = Math.max(1, ...monthlyEarnings.map((m) => m.amount));
  const latestCum = months.at(-1)?.cumulative_earnings ?? months.at(-1)?.amount ?? 0;

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Earnings Trend</h3>
            <p className="text-[11px] text-slate-500">Enterprise yield by reported period</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100">
          <TrendingUp className="w-3 h-3" /> {growth}
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div>
          <span className="text-[11px] text-slate-500 block">Total {monthlyEarnings.length}-Period Inflow</span>
          <span className="text-xl font-black text-slate-900">
            ₦{(Number(latestCum) || 0).toLocaleString()}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          {monthlyEarnings.length > 0
            ? `${monthlyEarnings[0]?.month} – ${monthlyEarnings.at(-1)?.month}`
            : "—"}
        </span>
      </div>

      <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
      {query.isSuccess && !monthlyEarnings.length && (
        <AppEmptyState
          title="No Earnings History"
          description="Your enterprise earnings history will appear here."
        />
      )}

      {/* Bar Chart Visualization */}
      <div className="pt-2 flex items-end justify-between gap-2 h-28 border-b border-slate-100 pb-2">
        {monthlyEarnings.map((item, idx) => {
          const heightPct = Math.round((item.amount / maxEarnings) * 100);
          const isCurrent = idx === monthlyEarnings.length - 1;
          return (
            <div key={`${item.month}-${idx}`} className="flex-1 flex flex-col items-center gap-1.5 group relative">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-semibold rounded pointer-events-none transition z-10 whitespace-nowrap shadow-md">
                ₦{(item.amount / 1000).toLocaleString()}k
              </div>
              <div className="w-full bg-slate-100 rounded-t-lg flex items-end justify-center h-20 overflow-hidden">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isCurrent
                      ? "bg-gradient-to-t from-emerald-600 to-emerald-400"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  isCurrent ? "text-emerald-700 font-bold" : "text-slate-500"
                }`}
              >
                {item.month}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300" /> Previous Months
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Latest ({monthlyEarnings.at(-1)?.month ?? "—"})
        </span>
      </div>
    </div>
  );
};
