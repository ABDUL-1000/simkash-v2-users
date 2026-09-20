import { Layers } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { MOCK_SIM_TYPE_BREAKDOWN } from "../../data/regional-manager-network.data";

export function RmSimTypeBreakdownCard() {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        borderColor: APP_COLORS.greys.stroke,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="size-4" style={{ color: APP_COLORS.blues.primary }} />
          <h3
            className="text-xs font-bold tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            SIM Type Breakdown
          </h3>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2.5 text-xs">
        {MOCK_SIM_TYPE_BREAKDOWN.map((sim) => (
          <div key={sim.type} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
                {sim.type.replace(" SIM", "")}
              </span>
              <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
                <strong className="text-slate-900 font-bold">{sim.count}</strong> ({sim.percentage}%)
              </span>
            </div>

            {/* Bar */}
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${sim.percentage}%`,
                  backgroundColor: sim.barColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RmSimTypeBreakdownCard;
