import { PieChart } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { COMMISSION_BREAKDOWN_CATEGORIES } from "../../../data/regional-manager-performance.data";

export function RmCommissionBreakdownCard() {

  // SVG Donut calculation
  // Radius = 40, circumference = 2 * PI * 40 = 251.32
  const r = 40;
  const c = 2 * Math.PI * r;

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Commission Breakdown
          </h3>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Earnings composition for current period (Jun 2026)
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <PieChart className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        {/* SVG Donut */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
            {COMMISSION_BREAKDOWN_CATEGORIES.map((cat, idx) => {
              const dashOffset = c * (1 - cat.percentage / 100);
              const cumulativePercent = COMMISSION_BREAKDOWN_CATEGORIES
                .slice(0, idx)
                .reduce((totalPercent, item) => totalPercent + item.percentage, 0);
              const rotation = (cumulativePercent / 100) * 360;

              return (
                <circle
                  key={cat.id}
                  cx="50"
                  cy="50"
                  r={r}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth="14"
                  strokeDasharray={c}
                  strokeDashoffset={dashOffset}
                  transform={`rotate(${rotation} 50 50)`}
                  className="transition-all duration-500 hover:opacity-90"
                />
              );
            })}
          </svg>
          <div className="absolute text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Total
            </span>
            <span className="text-lg font-black" style={{ color: APP_COLORS.texts.primary }}>
              ₦284K
            </span>
            <span className="text-[9px] font-semibold text-emerald-600 block">
              +22.9% MoM
            </span>
          </div>
        </div>

        {/* Legend & Details */}
        <div className="space-y-2.5 flex-1 w-full">
          {COMMISSION_BREAKDOWN_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-2.5 rounded-xl border flex items-center justify-between transition-colors hover:bg-slate-50/70"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-md shrink-0" style={{ backgroundColor: cat.color }} />
                <div>
                  <span className="text-xs font-bold block" style={{ color: APP_COLORS.texts.primary }}>
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {cat.percentage}% of total
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black block" style={{ color: APP_COLORS.texts.primary }}>
                  ₦{cat.amount.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">
                  {cat.id === "easybuy" ? "1% override" : cat.id === "bonus" ? "Target reached" : "₦12.39 / act"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
