import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { colors } from "@/constants/colors";
import { monthlyEarningsBreakdown } from "../../data/mockInvestmentData";

export const EarningsByTypeChart: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Monthly Earnings by Stream
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Breakdown across activations, continuous data recharges & bonuses
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyEarningsBreakdown}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
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
              tickFormatter={(v) => `₦${(v / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(value: any) => `₦${Number(value).toLocaleString()}`}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: "11px", paddingBottom: "10px" }}
            />
            <Bar
              dataKey="simActivations"
              name="SIM Activations"
              stackId="a"
              fill="#1677ff"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="dataRecharges"
              name="Data Recharges"
              stackId="a"
              fill="#10b981"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="bonusOverrides"
              name="Bonus Overrides"
              stackId="a"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
