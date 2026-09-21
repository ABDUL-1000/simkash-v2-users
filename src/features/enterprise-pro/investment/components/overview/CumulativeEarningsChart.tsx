import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { colors } from "@/constants/colors";
import {
  earningsTimeline6M,
  earningsTimeline1Y,
  earningsTimelineAll,
  investmentSummaryData,
} from "../../data/mockInvestmentData";

type TimeRange = "6M" | "1Y" | "ALL";

export const CumulativeEarningsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("6M");

  const chartData =
    timeRange === "6M"
      ? earningsTimeline6M
      : timeRange === "1Y"
      ? earningsTimeline1Y
      : earningsTimelineAll;

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">
              Principal vs. Cumulative Earnings
            </h3>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
              Break-Even Achieved
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Total recovered ₦59.5M on ₦50M principal (119% of initial capital)
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          {(["6M", "1Y", "ALL"] as TimeRange[]).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === range
                  ? "bg-white text-gray-900 shadow-xs font-bold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {range === "ALL" ? "All Time" : range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₦${(v / 1_000_000).toFixed(0)}M`}
            />
            <Tooltip
              formatter={(value: any, name?: any) => [
                `₦${Number(value).toLocaleString()}`,
                name === "cumulativeEarnings"
                  ? "Cumulative Earnings"
                  : "Principal Investment",
              ]}
              labelFormatter={(label) => `Timeline: ${label}`}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />
            <ReferenceLine
              y={investmentSummaryData.principalAmount}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label={{
                value: "Principal ₦50M",
                fill: "#ef4444",
                fontSize: 11,
                position: "insideTopRight",
              }}
            />
            <Area
              type="monotone"
              dataKey="cumulativeEarnings"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
