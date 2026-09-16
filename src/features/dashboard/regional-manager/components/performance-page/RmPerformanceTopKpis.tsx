import {
  TrendingUp,
  Users,
  Building,
  Target,
  Wallet,
  AlertTriangle,
  Award,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmPerformanceTopKpisProps {
  onRequestPayout: () => void;
  onViewAtRisk?: () => void;
  onViewTopPerformer?: () => void;
}

export function RmPerformanceTopKpis({
  onRequestPayout,
  onViewAtRisk,
  onViewTopPerformer,
}: RmPerformanceTopKpisProps) {
  return (
    <div className="space-y-3">
      {/* ROW 1: 5 MAIN KPIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* KPI 1: Network Activations */}
        <div
          className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Network Activations
            </span>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
            >
              <TrendingUp className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
              14,847
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className="px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-0.5"
                style={{
                  backgroundColor: APP_COLORS.greens.light,
                  color: APP_COLORS.greens.secondary,
                }}
              >
                <ArrowUpRight className="w-2.5 h-2.5" /> +18.4%
              </span>
              <span className="text-[11px] font-medium" style={{ color: APP_COLORS.texts.slate }}>
                vs last month
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <span style={{ color: APP_COLORS.texts.slate }}>Target: 18,000</span>
            <span className="font-bold" style={{ color: APP_COLORS.blues.secondary }}>
              82.5% done
            </span>
          </div>
        </div>

        {/* KPI 2: Active SCs */}
        <div
          className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Active SCs
            </span>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: APP_COLORS.greens.light }}
            >
              <Users className="w-3.5 h-3.5" style={{ color: APP_COLORS.greens.secondary }} />
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
              10 <span className="text-sm font-semibold" style={{ color: APP_COLORS.texts.slate }}>of 12</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                style={{
                  backgroundColor: APP_COLORS.greens.light,
                  color: APP_COLORS.greens.secondary,
                }}
              >
                83.3% Active
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <span style={{ color: APP_COLORS.texts.slate }}>Inactive / Training</span>
            <span className="font-bold text-amber-600">2 SCs</span>
          </div>
        </div>

        {/* KPI 3: Active APs */}
        <div
          className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Active APs
            </span>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#F3E8FF" }}
            >
              <Building className="w-3.5 h-3.5 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
              247
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="px-1.5 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-0.5"
                style={{
                  backgroundColor: APP_COLORS.greens.light,
                  color: APP_COLORS.greens.secondary,
                }}
              >
                <ArrowUpRight className="w-2.5 h-2.5" /> +14
              </span>
              <span className="text-[11px] font-medium" style={{ color: APP_COLORS.texts.slate }}>
                new this month
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <span style={{ color: APP_COLORS.texts.slate }}>Total Aggregators</span>
            <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>260 (95%)</span>
          </div>
        </div>

        {/* KPI 4: Avg Activations / AP */}
        <div
          className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Avg Activations / AP
            </span>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: APP_COLORS.ambers.light }}
            >
              <Target className="w-3.5 h-3.5" style={{ color: APP_COLORS.ambers.secondary }} />
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <div className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
              60.1 <span className="text-xs font-normal text-slate-400">/mo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                style={{
                  backgroundColor: APP_COLORS.greens.light,
                  color: APP_COLORS.greens.secondary,
                }}
              >
                +20.2% vs target
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t flex items-center justify-between text-[11px]" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <span style={{ color: APP_COLORS.texts.slate }}>Target threshold</span>
            <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>50.0 /mo</span>
          </div>
        </div>

        {/* KPI 5: My Commission with Request Payout CTA */}
        <div
          className="rounded-2xl border p-3.5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-md"
          style={{
            borderColor: APP_COLORS.blues.surfaceMid,
            backgroundColor: APP_COLORS.blues.surfaceLight,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: APP_COLORS.blues.primary }}>
              My Commission
            </span>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: APP_COLORS.blues.primary }}
            >
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <div className="mt-1 space-y-0.5">
            <div className="text-2xl font-black" style={{ color: APP_COLORS.blues.primary }}>
              ₦284,000
            </div>
            <div className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              ₦19.13 / act avg
            </div>
          </div>
          <div className="mt-2 pt-2 border-t" style={{ borderColor: APP_COLORS.blues.surfaceMid }}>
            <button
              type="button"
              onClick={onRequestPayout}
              className="w-full py-1.5 px-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 active:scale-98 flex items-center justify-center gap-1"
              style={{ backgroundColor: APP_COLORS.greens.secondary }}
            >
              <span>Request Payout</span>
            </button>
          </div>
        </div>
      </div>

      {/* ROW 2: 4 SECONDARY ALERT & ACHIEVEMENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Secondary 1: 8 of 12 SCs Hit Bonus Target */}
        <div
          className="rounded-2xl border p-3 flex items-center gap-3 shadow-2xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: APP_COLORS.greens.light }}
          >
            <Award className="w-5 h-5" style={{ color: APP_COLORS.greens.secondary }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold truncate" style={{ color: APP_COLORS.texts.primary }}>
              8 of 12 SCs Hit Bonus Target
            </div>
            <div className="text-[11px] font-medium" style={{ color: APP_COLORS.texts.slate }}>
              67% qualification rate • ₦120K pool
            </div>
          </div>
        </div>

        {/* Secondary 2: 3 of 12 SCs At Risk */}
        <div
          className="rounded-2xl border p-3 flex items-center gap-3 shadow-2xs cursor-pointer hover:border-amber-300 transition-colors"
          style={{
            borderColor: "#FED7AA",
            backgroundColor: "#FFFBEB",
          }}
          onClick={onViewAtRisk}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#FEF3C7" }}
          >
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-amber-900 truncate">3 SCs At Risk</span>
              <span className="text-[10px] font-bold text-amber-700 underline">Resolve &rarr;</span>
            </div>
            <div className="text-[11px] font-medium text-amber-800 truncate">
              Kwara, Osun, Ondo &lt;60% target
            </div>
          </div>
        </div>

        {/* Secondary 3: Top Performer Aminat Okafor */}
        <div
          className="rounded-2xl border p-3 flex items-center gap-3 shadow-2xs cursor-pointer hover:border-blue-300 transition-colors"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
          onClick={onViewTopPerformer}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#FEF9C3" }}
          >
            <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold truncate" style={{ color: APP_COLORS.texts.primary }}>
              Top: Aminat Okafor (Lagos)
            </div>
            <div className="text-[11px] font-medium truncate" style={{ color: APP_COLORS.texts.slate }}>
              3,120 activations (124.8% target)
            </div>
          </div>
        </div>

        {/* Secondary 4: +23% MoM Growth */}
        <div
          className="rounded-2xl border p-3 flex items-center gap-3 shadow-2xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
          >
            <TrendingUp className="w-5 h-5" style={{ color: APP_COLORS.blues.interactiveCta }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold truncate" style={{ color: APP_COLORS.texts.primary }}>
              +23% MoM Network Growth
            </div>
            <div className="text-[11px] font-medium" style={{ color: APP_COLORS.texts.slate }}>
              +2,777 activations vs May 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
