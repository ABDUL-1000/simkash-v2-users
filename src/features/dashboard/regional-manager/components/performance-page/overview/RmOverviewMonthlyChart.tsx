import { useState } from "react";
import { APP_COLORS } from "@/constants/colors";
import { MONTHLY_ACTIVATION_TREND } from "../../../data/regional-manager-performance.data";

export function RmOverviewMonthlyChart() {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const maxVal = Math.max(...MONTHLY_ACTIVATION_TREND.map((d) => d.activations), 16000);

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
              Monthly Activations (Last 6 Months)
            </h3>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                backgroundColor: APP_COLORS.greens.light,
                color: APP_COLORS.greens.secondary,
              }}
            >
              +76.7% H1 Growth
            </span>
          </div>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Network activation trajectory across your 12 State Coordinators
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md" style={{ backgroundColor: APP_COLORS.blues.secondary }} />
            <span style={{ color: APP_COLORS.texts.slate }}>Historical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md" style={{ backgroundColor: APP_COLORS.blues.interactiveCta }} />
            <span style={{ color: APP_COLORS.texts.primary }}>Current Month</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-b-2 border-dashed border-red-400" />
            <span style={{ color: APP_COLORS.texts.slate }}>Target</span>
          </div>
        </div>
      </div>

      {/* SVG / Bar Visualizer */}
      <div className="relative pt-6 pb-2">
        {/* Target dashed line */}
        <div
          className="absolute left-0 right-0 border-b border-dashed border-red-300 pointer-events-none z-0 flex items-center justify-end pr-2"
          style={{
            top: `${100 - (12500 / maxVal) * 100}%`,
          }}
        >
          <span className="text-[10px] font-bold text-red-500 bg-white/90 px-1 rounded">
            Avg Target: 12.5K
          </span>
        </div>

        {/* Bars Container */}
        <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-44 sm:h-52 z-10 relative">
          {MONTHLY_ACTIVATION_TREND.map((item) => {
            const heightPercent = Math.round((item.activations / maxVal) * 100);
            const isCurrent = item.month === "Jun";
            const isHovered = hoveredMonth === item.month;

            return (
              <div
                key={item.month}
                className="flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredMonth(item.month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                {/* Floating tooltip on hover */}
                <div
                  className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded shadow-sm mb-1 transition-all ${
                    isHovered || isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{
                    backgroundColor: isCurrent ? APP_COLORS.blues.primary : "#334155",
                    color: "#FFFFFF",
                  }}
                >
                  {item.activations.toLocaleString()}
                </div>

                {/* Bar */}
                <div
                  className="w-full max-w-[42px] rounded-t-xl transition-all duration-300 relative group-hover:brightness-110"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isCurrent
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.blues.secondary,
                    boxShadow: isCurrent ? "0 4px 14px rgba(37, 99, 235, 0.35)" : "none",
                  }}
                >
                  {isCurrent && (
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/80 animate-ping" />
                  )}
                </div>

                {/* Month Label */}
                <span
                  className="text-xs font-bold mt-2 transition-colors"
                  style={{
                    color: isCurrent ? APP_COLORS.blues.interactiveCta : APP_COLORS.texts.slate,
                  }}
                >
                  {item.month}
                </span>

                {/* Target diff */}
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  {Math.round((item.activations / item.target) * 100)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Footer Stats */}
      <div
        className="grid grid-cols-3 gap-2 pt-3 border-t text-center"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="p-2 rounded-xl" style={{ backgroundColor: APP_COLORS.backgrounds.surface }}>
          <span className="text-[10px] font-semibold block" style={{ color: APP_COLORS.texts.slate }}>
            Peak Month
          </span>
          <span className="text-xs sm:text-sm font-black" style={{ color: APP_COLORS.texts.primary }}>
            Jun '26 (14,847)
          </span>
        </div>
        <div className="p-2 rounded-xl" style={{ backgroundColor: APP_COLORS.backgrounds.surface }}>
          <span className="text-[10px] font-semibold block" style={{ color: APP_COLORS.texts.slate }}>
            6-Month Average
          </span>
          <span className="text-xs sm:text-sm font-black" style={{ color: APP_COLORS.texts.primary }}>
            11,198 /mo
          </span>
        </div>
        <div className="p-2 rounded-xl" style={{ backgroundColor: APP_COLORS.backgrounds.surface }}>
          <span className="text-[10px] font-semibold block" style={{ color: APP_COLORS.texts.slate }}>
            Total H1 Activations
          </span>
          <span className="text-xs sm:text-sm font-black" style={{ color: APP_COLORS.greens.secondary }}>
            67,189 sims
          </span>
        </div>
      </div>
    </div>
  );
}
