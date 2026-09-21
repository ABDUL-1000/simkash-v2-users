import { colors } from "@/constants/colors";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CHART_DATA = [
  { month: "Jan", earnings: 1.2, principal: 15 },
  { month: "Feb", earnings: 1.8, principal: 15 },
  { month: "Mar", earnings: 2.9, principal: 15 },
  { month: "Apr", earnings: 2.1, principal: 15 },
  { month: "May", earnings: 2.7, principal: 15 },
  { month: "Jun", earnings: 2.85, principal: 15 },
];

export function EpInvestmentChartCard() {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <div>
        <p className="font-bold text-slate-900 text-sm">Investment vs Returns</p>
        <p className="text-xs text-slate-500 mt-0.5">
          Principal deployed vs earnings over time ·{" "}
          <span className="font-semibold text-blue-600">Current ROI: 19% of principal</span>
        </p>
      </div>

      <div className="h-[220px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              formatter={(value: any) => [`₦${value}M`, "Earnings"]}
              contentStyle={{
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                borderRadius: 10,
                border: "none",
                fontSize: 12,
              }}
            />
            <Bar dataKey="earnings" fill="#10B981" radius={[6, 6, 0, 0]} barSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 pt-1 border-t border-slate-100 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="text-slate-500">Principal (₦15M)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#10B981]" />
          <span className="text-emerald-700">Earnings (₦2.85M this month)</span>
        </div>
      </div>
    </div>
  );
}
