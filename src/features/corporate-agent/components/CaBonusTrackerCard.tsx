import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { CaDashboardOverviewData } from "../types/api";
import { Trophy, Zap, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaBonusTrackerCardProps {
  data: CaDashboardOverviewData["bonus_tracker"];
  onViewAllAps?: () => void;
}



export function CaBonusTrackerCard({
  data,
  onViewAllAps,
}: CaBonusTrackerCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Bonus Tracker</h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">{data.period_label}</span>
          {/* View History is commented out: no CA bonus-history endpoint supplied. */}
        </div>
      </div>

      {/* TARGET & OVERALL PROGRESS */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm sm:text-base font-black text-slate-900">
            {data.current_activations.toLocaleString()} of {data.target_activations.toLocaleString()} activations
          </h4>
          <span className="text-xs font-semibold text-slate-500">
            {data.target_activations.toLocaleString()} target • Reward: <strong>{data.bonus_amount_formatted}</strong>
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, data.percentage))}%`,
              backgroundColor: APP_COLORS.blues.primary,
            }}
          />
        </div>
      </div>

      {/* ENCOURAGEMENT BANNER */}
      <div
        className="p-3 rounded-xl border flex items-center gap-2.5 text-xs"
        style={{
          backgroundColor: APP_COLORS.blues.surfaceLight,
          borderColor: APP_COLORS.blues.surfaceMid,
        }}
      >
        <Zap className="w-4 h-4 text-blue-600 shrink-0" />
        <span className="font-semibold text-slate-700">
          {data.banner_message}
        </span>
      </div>

      {/* 3 STAT BOXES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          className="p-3 rounded-xl border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="text-base sm:text-lg font-black text-slate-900">{data.days_remaining} Days Left</div>
          <span className="text-[11px] text-slate-400 font-medium">Days remaining</span>
        </div>

        <div
          className="p-3 rounded-xl border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="text-base sm:text-lg font-black text-slate-900">{data.activations_left} To Go</div>
          <span className="text-[11px] text-slate-400 font-medium">Activations left</span>
        </div>

        <div
          className="p-3 rounded-xl border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="text-base sm:text-lg font-black text-slate-900">{data.daily_average} Avg/Day</div>
          <span className="text-[11px] text-slate-400 font-medium">Daily Average</span>
        </div>
      </div>

      {/* AP NETWORK BONUS STATUS MINI-LIST */}
      <div className="space-y-2 pt-2 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
          My AP Network Bonus Status
        </span>

        <div className="space-y-2.5">
          {!data.ap_network_bonus_status.length && <AppEmptyState title="No AP bonus milestones" description="Partner bonus progress will appear here." />}
          {data.ap_network_bonus_status.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3 text-xs">
              <span className="w-24 font-bold text-slate-800 truncate">{item.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.target > 0 ? Math.min(100, Math.max(0, item.activations / item.target * 100)) : 0}%`,
                    backgroundColor: APP_COLORS.greens.green,
                  }}
                />
              </div>
              <span className="w-16 text-right font-medium text-slate-500 text-[11px]">
                {item.activations}/{item.target}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 w-16 text-center"
                style={{
                  backgroundColor: APP_COLORS.blues.surfaceLight,
                  color: APP_COLORS.blues.primary,
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 text-left">
          <button
            type="button"
            onClick={onViewAllAps}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
          >
            <span>View all APs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
