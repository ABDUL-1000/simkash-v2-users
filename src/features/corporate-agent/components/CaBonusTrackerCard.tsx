import { Trophy, Zap, ArrowRight, ChevronRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaBonusTrackerCardProps {
  onViewHistory?: () => void;
  onViewAllAps?: () => void;
}

const AP_BONUS_PREVIEW = [
  { name: "Rabiu Sani", progress: "847/500", percent: 100, status: "Achieved", statusBg: "#F3E8FF", statusText: "#7E22CE", barColor: "#10B981" },
  { name: "Chioma Eze", progress: "634/500", percent: 100, status: "Achieved", statusBg: "#F3E8FF", statusText: "#7E22CE", barColor: "#10B981" },
  { name: "Hassan I.", progress: "421/500", percent: 100, status: "Achieved", statusBg: "#F3E8FF", statusText: "#7E22CE", barColor: "#10B981" },
  { name: "Abubakar S.", progress: "287/500", percent: 57, status: "At Risk", statusBg: "#FEF3C7", statusText: "#D97706", barColor: "#F59E0B" },
  { name: "Others (8)", progress: "387/1,000", percent: 38, status: "More", statusBg: "#F1F5F9", statusText: "#64748B", barColor: "#94A3B8" },
];

export function CaBonusTrackerCard({
  onViewHistory,
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
          <span className="text-slate-400 font-medium">Jun 2026</span>
          <button
            type="button"
            onClick={onViewHistory}
            className="text-slate-600 hover:text-slate-900 font-bold flex items-center"
          >
            <span>View History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TARGET & OVERALL PROGRESS */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <h4 className="text-sm sm:text-base font-black text-slate-900">
            2,216 of 3,000 activations
          </h4>
          <span className="text-xs font-semibold text-slate-500">
            2,216 / 3,000 target • Reward: <strong>₦15,000</strong>
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: "74%",
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
          You're 74% there — 15 days left. Push your APs to activate more! 🔥
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
          <div className="text-base sm:text-lg font-black text-slate-900">15 Days Left</div>
          <span className="text-[11px] text-slate-400 font-medium">Days remaining</span>
        </div>

        <div
          className="p-3 rounded-xl border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="text-base sm:text-lg font-black text-slate-900">782 To Go</div>
          <span className="text-[11px] text-slate-400 font-medium">Activations left</span>
        </div>

        <div
          className="p-3 rounded-xl border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="text-base sm:text-lg font-black text-slate-900">148.5 Avg/Day</div>
          <span className="text-[11px] text-slate-400 font-medium">Daily Average</span>
        </div>
      </div>

      {/* AP NETWORK BONUS STATUS MINI-LIST */}
      <div className="space-y-2 pt-2 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
          My AP Network Bonus Status
        </span>

        <div className="space-y-2.5">
          {AP_BONUS_PREVIEW.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3 text-xs">
              <span className="w-24 font-bold text-slate-800 truncate">{item.name}</span>
              <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.percent}%`,
                    backgroundColor: item.barColor,
                  }}
                />
              </div>
              <span className="w-16 text-right font-medium text-slate-500 text-[11px]">
                {item.progress}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 w-16 text-center"
                style={{
                  backgroundColor: item.statusBg,
                  color: item.statusText,
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
            <span>View all 12 APs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
