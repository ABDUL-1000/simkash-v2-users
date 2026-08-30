import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CHART_COLORS } from "@/constants/colors";
import { simActivationData } from "../dashboard.data";

const networkLegend = [
  { key: "mtn", label: "MTN", color: CHART_COLORS.mtn, textColor: "#2563EB" },
  { key: "glo", label: "Glo", color: CHART_COLORS.glo, textColor: "#047857" },
  { key: "airtel", label: "Airtel", color: CHART_COLORS.airtel, textColor: "#B91C1C" },
  { key: "t2", label: "T2", color: CHART_COLORS.t2, textColor: "#64748B" },
] as const;

const networkLabels: Record<string, string> = {
  mtn: "MTN",
  glo: "Glo",
  airtel: "Airtel",
  t2: "T2",
};

function ActivationXAxisTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) {
  const value = payload?.value ?? "";
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={12}
        textAnchor="middle"
        fill={value === "Today" ? "#0EA5E9" : "#94A3B8"}
        fontSize={10}
        fontWeight={value === "Today" ? 700 : 500}
      >
        {value}
      </text>
    </g>
  );
}

export function SimActivationsChart() {
  return (
    <Card className="overflow-hidden rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-col gap-4 px-5 pb-0 pt-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="min-w-max">
          <h2 className="text-sm font-bold text-[#0F1F36]">
            SIM Activations — Last 14 Days
          </h2>
          <p className="mt-1 text-xs text-[#94A3B8]">All networks combined</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          {networkLegend.map((network) => (
            <span
              key={network.key}
              className="rounded-md px-2.5 py-1 text-[10px] font-bold"
              style={{
                backgroundColor: network.color,
                color: network.textColor,
              }}
            >
              {network.label}
            </span>
          ))}
          <span className="ml-0 rounded-lg border border-[#E2ECF8] bg-white px-3 py-2 text-[11px] font-medium text-[#64748B] sm:ml-2">
            Last 14 days
          </span>
        </div>
      </CardHeader>

      <CardContent className="h-56 px-3 pb-3 pt-2 sm:h-64 sm:px-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={simActivationData}
            margin={{ top: 8, right: 2, bottom: 2, left: 2 }}
            barCategoryGap="18%"
          >
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={28}
              height={28}
              tick={<ActivationXAxisTick />}
            />
            <Tooltip
              cursor={{ fill: "#F8FAFC" }}
              contentStyle={{
                border: "1px solid #E2ECF8",
                borderRadius: 10,
                boxShadow: "0 8px 24px rgba(15, 31, 54, 0.08)",
                fontSize: 12,
              }}
              formatter={(value, name) => [
                Number(value).toLocaleString(),
                networkLabels[String(name)] ?? String(name),
              ]}
            />
            <Bar dataKey="t2" stackId="activations" fill={CHART_COLORS.t2} />
            <Bar dataKey="glo" stackId="activations" fill={CHART_COLORS.glo} />
            <Bar dataKey="airtel" stackId="activations" fill={CHART_COLORS.airtel} />
            <Bar
              dataKey="mtn"
              stackId="activations"
              fill={CHART_COLORS.mtn}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
