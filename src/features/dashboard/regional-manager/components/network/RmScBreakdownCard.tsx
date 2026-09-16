import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { ScNetworkBreakdownItem } from "../../types/regional-manager-network.types";

interface RmScBreakdownCardProps {
  scs: ScNetworkBreakdownItem[];
  onSelectSc: (sc: ScNetworkBreakdownItem) => void;
}

export function RmScBreakdownCard({ scs, onSelectSc }: RmScBreakdownCardProps) {
  const maxActivations = Math.max(...scs.map((s) => s.activationsToday), 1);

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
          <Users className="size-4" style={{ color: APP_COLORS.blues.primary }} />
          <h3
            className="text-xs font-bold tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            SC Breakdown Today
          </h3>
        </div>
        <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
          12 State Coordinators
        </span>
      </div>

      {/* SC Rows */}
      <div className="space-y-2 text-xs">
        {scs.map((sc) => {
          const widthPercent = (sc.activationsToday / maxActivations) * 100;

          return (
            <div
              key={sc.id}
              onClick={() => onSelectSc(sc)}
              className="group cursor-pointer rounded-xl p-1.5 transition hover:bg-slate-50 space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="font-bold text-xs truncate group-hover:text-blue-600 transition"
                    style={{ color: APP_COLORS.texts.primary }}
                  >
                    {sc.name}
                  </span>
                  <span className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
                    · {sc.state}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="font-black text-xs"
                    style={{ color: APP_COLORS.texts.primary }}
                  >
                    {sc.activationsToday}
                  </span>

                  {/* Trend icon */}
                  {sc.trend === "up" && (
                    <TrendingUp className="size-3 text-emerald-500" />
                  )}
                  {sc.trend === "down" && (
                    <TrendingDown className="size-3 text-red-500" />
                  )}
                  {sc.trend === "neutral" && (
                    <Minus className="size-3 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(2, widthPercent)}%`,
                    backgroundColor:
                      sc.activationsToday > 10
                        ? APP_COLORS.blues.interactiveCta
                        : sc.activationsToday > 0
                        ? "#93C5FD"
                        : "#E2E8F0",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RmScBreakdownCard;
