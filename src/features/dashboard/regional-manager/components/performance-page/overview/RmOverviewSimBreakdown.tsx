import { Radio, ArrowUpRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { MOCK_SIM_TYPE_BREAKDOWN } from "../../../data/regional-manager-network.data";

export function RmOverviewSimBreakdown() {
  const totalSims = MOCK_SIM_TYPE_BREAKDOWN.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            SIM Type Breakdown
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Telco distribution across {totalSims.toLocaleString()} activations
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <Radio className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      {/* Segmented Multi-Bar */}
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 p-0.5 gap-0.5">
          {MOCK_SIM_TYPE_BREAKDOWN.map((sim) => (
            <div
              key={sim.type}
              className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 hover:opacity-90"
              style={{
                width: `${sim.percentage}%`,
                backgroundColor: sim.color,
              }}
              title={`${sim.type}: ${sim.count.toLocaleString()} (${sim.percentage}%)`}
            />
          ))}
        </div>
      </div>

      {/* Carrier List Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MOCK_SIM_TYPE_BREAKDOWN.map((sim) => (
          <div
            key={sim.type}
            className="p-2.5 rounded-xl border flex flex-col justify-between"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sim.color }} />
                <span className="text-xs font-bold" style={{ color: APP_COLORS.texts.primary }}>
                  {sim.type}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                {sim.percentage}%
              </span>
            </div>
            <div className="flex items-end justify-between mt-1">
              <span className="text-xs font-extrabold" style={{ color: APP_COLORS.texts.primary }}>
                {sim.count.toLocaleString()}
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-2.5 h-2.5" /> +{sim.growth}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
