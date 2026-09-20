import { Download, RefreshCw } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmNetworkHeaderProps {
  onExport: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function RmNetworkHeader({
  onExport,
  onRefresh,
  isRefreshing = false,
}: RmNetworkHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title & Subtitle */}
      <div>
        <h1
          className="text-xl font-black tracking-tight sm:text-2xl"
          style={{ color: APP_COLORS.texts.primary }}
        >
          Network Activity
        </h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: APP_COLORS.texts.slate }}>
          Every SIM activation across your entire SC and AP network in real time
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Live Refreshing Indicator Pill */}
        <div
          className="flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold shadow-2xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
            color: APP_COLORS.greens.secondary,
          }}
        >
          <span className="relative flex size-2">
            <span
              className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: APP_COLORS.greens.green }}
            />
            <span
              className="relative inline-flex size-2 rounded-full"
              style={{ backgroundColor: APP_COLORS.greens.green }}
            />
          </span>
          <span>Live · Refreshing every 30s</span>
        </div>

        {/* Manual Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          className="flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer shadow-2xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
            color: APP_COLORS.texts.primary,
          }}
          title="Manual refresh"
        >
          <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>

        {/* Export Activity Button */}
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <Download className="size-3.5" />
          <span>Export Activity</span>
        </button>
      </div>
    </div>
  );
}

export default RmNetworkHeader;
