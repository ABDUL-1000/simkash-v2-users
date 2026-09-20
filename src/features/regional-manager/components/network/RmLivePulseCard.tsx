import { Zap } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { MOCK_HOURLY_PULSE } from "../../data/regional-manager-network.data";

export function RmLivePulseCard() {
  const maxVal = Math.max(...MOCK_HOURLY_PULSE.map((p) => p.count), 1);

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
          <Zap className="size-4" style={{ color: APP_COLORS.blues.interactiveCta }} />
          <h3
            className="text-xs font-bold tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Live Activity Pulse
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live</span>
        </div>
      </div>

      {/* Main Metric */}
      <div>
        <div className="flex items-baseline gap-2">
          <span
            className="text-3xl font-black tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            84
          </span>
          <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
            activations today
          </span>
        </div>
      </div>

      {/* Hourly Mini Bar Chart */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-end gap-1.5 h-16 pt-2">
          {MOCK_HOURLY_PULSE.map((item, idx) => {
            const heightPercent = Math.round((item.count / maxVal) * 100);
            const isPeak = item.isPeak;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-7 hidden group-hover:flex items-center justify-center rounded-md bg-slate-900 text-[10px] text-white font-bold px-1.5 py-0.5 whitespace-nowrap z-10 shadow-sm">
                  {item.hour}: {item.count}
                </div>

                {/* Bar */}
                <div
                  className="w-full rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${Math.max(12, heightPercent)}%`,
                    backgroundColor: isPeak
                      ? APP_COLORS.blues.interactiveCta
                      : "#BFDBFE",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Peak Note */}
        <p className="text-[11px] font-semibold text-center" style={{ color: APP_COLORS.texts.slate }}>
          Peak: <strong className="text-slate-800">10AM · 18 activations</strong>
        </p>
      </div>
    </div>
  );
}

export default RmLivePulseCard;
