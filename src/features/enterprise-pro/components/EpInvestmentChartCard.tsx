import { colors } from "@/constants/colors";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import { useGetEnterpriseInvestmentReturns } from "../api/useGetEnterpriseInvestmentReturns";
import { EpQueryState } from "./EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";
export function EpInvestmentChartCard() {
  const query = useGetEnterpriseInvestmentReturns();
  const data = query.data;
  const months = data?.months ?? [];
  const chart = months.map(month => ({ ...month, principal: month.principal / 1000000, earnings: month.cumulative_earnings / 1000000 }));
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <div>
        <p className="font-bold text-slate-900 text-sm">{data?.title ?? "Investment vs Returns"}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {data?.subtitle} ·{" "}
          <span className="font-semibold text-blue-600">{data?.current_roi_badge ?? "—"}</span>
        </p>
      </div>

      <div className="h-[220px] w-full pt-2">
        <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
        {query.isSuccess && !months.length ? <AppEmptyState title="No Investment Returns" description="No monthly investment returns are available yet." /> : <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0" }}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₦${v}M`}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <Tooltip
              formatter={(value, name) => [`₦${value}M`, name === "principal" ? "Principal" : "Cumulative earnings"]}
              contentStyle={{
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                borderRadius: 10,
                border: "none",
                fontSize: 12,
              }}
            />
            <Bar dataKey="principal" fill={colors.border} radius={[6, 6, 0, 0]} barSize={42} />
            <Bar dataKey="earnings" fill={colors.success} radius={[6, 6, 0, 0]} barSize={42} />
          </BarChart>
        </ResponsiveContainer>}
      </div>

      <div className="flex items-center gap-6 pt-1 border-t border-slate-100 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="text-slate-500">Principal (₦{((months.at(-1)?.principal ?? 0) / 1000000).toLocaleString()}M)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#10B981]" />
          <span className="text-emerald-700">Cumulative Earnings (₦{((months.at(-1)?.cumulative_earnings ?? 0) / 1000000).toLocaleString()}M)</span>
        </div>
      </div>
    </div>
  );
}
