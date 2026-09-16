import { ArrowRight, Package } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { ScPerformanceRowItem } from "../types/regional-manager-performance.types";

interface RmScPerformanceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: ScPerformanceRowItem | null;
  onViewFullProfile?: (scId: string) => void;
  onDistributeStock?: (sc: ScPerformanceRowItem) => void;
}

// Sample daily activation distribution for June (peak on day 18)
const DAILY_ACTIVATIONS = [
  { day: 1, count: 8 },
  { day: 2, count: 12 },
  { day: 3, count: 14 },
  { day: 4, count: 10 },
  { day: 5, count: 6 },
  { day: 6, count: 13 },
  { day: 7, count: 15 },
  { day: 8, count: 11 },
  { day: 9, count: 9 },
  { day: 10, count: 13 },
  { day: 11, count: 18, isPeak: true }, // Peak
  { day: 12, count: 15 },
  { day: 13, count: 12 },
  { day: 14, count: 7 },
  { day: 15, count: 12 },
  { day: 16, count: 10 },
  { day: 17, count: 14 },
  { day: 18, count: 16 },
  { day: 19, count: 12 },
  { day: 20, count: 11 },
  { day: 21, count: 9 },
  { day: 22, count: 14 },
  { day: 23, count: 12 },
  { day: 24, count: 7 },
  { day: 25, count: 0 },
  { day: 26, count: 0 },
  { day: 27, count: 0 },
  { day: 28, count: 0 },
  { day: 29, count: 0 },
  { day: 30, count: 0 },
];

const TOP_APS = [
  { name: "Rabiu Sani", acts: 847, commission: "₦847,000", bonus: "Achieved", bonusType: "purple" },
  { name: "Chioma Eze", acts: 634, commission: "₦634,000", bonus: "On Track", bonusType: "green" },
  { name: "Hassan I.", acts: 421, commission: "₦421,000", bonus: "On Track", bonusType: "green" },
  { name: "Abubakar S.", acts: 287, commission: "₦287,000", bonus: "At Risk", bonusType: "amber" },
  { name: "Others (19)", acts: 3658, commission: "₦3,658,000", bonus: "—", bonusType: "neutral" },
];

const SIM_TYPE_STATS = [
  { type: "POS SIM", count: 1152, percent: 62, color: "#2563EB" },
  { type: "CCTV SIM", count: 387, percent: 21, color: "#10B981" },
  { type: "GPS SIM", count: 240, percent: 13, color: "#8B5CF6" },
  { type: "Router SIM", count: 68, percent: 4, color: "#F59E0B" },
];

export function RmScPerformanceDetailModal({
  open,
  onOpenChange,
  sc,
  onViewFullProfile,
  onDistributeStock,
}: RmScPerformanceDetailModalProps) {
  const scName = sc?.scName || "Aminat Okafor";
  const state = sc?.state || "Lagos";
  const initials = scName.split(" ").map((n) => n[0]).join("") || "AO";
  const firstName = scName.split(" ")[0];

  const maxDaily = Math.max(...DAILY_ACTIVATIONS.map((d) => d.count), 18);

  const getBonusBadge = (type: string) => {
    switch (type) {
      case "purple":
        return { bg: "#F3E8FF", color: "#7E22CE" };
      case "green":
        return { bg: "#ECFDF5", color: "#059669" };
      case "amber":
        return { bg: "#FEF3C7", color: "#D97706" };
      default:
        return { bg: "transparent", color: "#94A3B8" };
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${scName} — Performance`}
      description={`${state} • This Month`}
      descriptionColor={APP_COLORS.texts.slate}
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* TOP DARK HERO CARD */}
        <div
          className="rounded-2xl p-4 text-white flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-slate-800 text-white font-bold text-sm flex items-center justify-center shadow-inner">
              {initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{scName}</h3>
              <p className="text-xs text-slate-300">{state} • 23 APs</p>
            </div>
          </div>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: "#10B981",
              color: "#FFFFFF",
            }}
          >
            Active
          </span>
        </div>

        {/* 4 METRIC CARDS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Acts */}
          <div
            className="p-3 rounded-2xl border flex flex-col justify-between"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Acts
            </span>
            <span className="text-xl font-black mt-1" style={{ color: APP_COLORS.texts.primary }}>
              1,847
            </span>
          </div>

          {/* APs */}
          <div
            className="p-3 rounded-2xl border flex flex-col justify-between"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              APs
            </span>
            <span className="text-xl font-black mt-1" style={{ color: APP_COLORS.texts.primary }}>
              23
            </span>
          </div>

          {/* Stock */}
          <div
            className="p-3 rounded-2xl border flex flex-col justify-between"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Stock
            </span>
            <div className="text-xl font-black mt-1 flex items-baseline gap-1" style={{ color: APP_COLORS.greens.secondary }}>
              <span>42</span>
              <span className="text-xs font-bold">Good</span>
            </div>
          </div>

          {/* Bonus */}
          <div
            className="p-3 rounded-2xl border flex flex-col justify-between"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <span className="text-[11px] font-semibold" style={{ color: APP_COLORS.texts.slate }}>
              Bonus
            </span>
            <div className="mt-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                Achieved
              </span>
            </div>
          </div>
        </div>

        {/* DAILY ACTIVATIONS THIS MONTH */}
        <div
          className="p-3.5 rounded-2xl border space-y-2"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <h4 className="font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
            Daily Activations This Month
          </h4>

          {/* Mini Bar Visualizer */}
          <div className="flex items-end gap-1 sm:gap-1.5 h-20 pt-2 pb-1 overflow-x-auto scrollbar-none">
            {DAILY_ACTIVATIONS.map((d, idx) => {
              const heightPercent = d.count > 0 ? Math.max(Math.round((d.count / maxDaily) * 100), 12) : 6;
              const isPeak = d.isPeak;

              return (
                <div key={idx} className="flex-1 min-w-[6px] flex flex-col items-center justify-end h-full group relative">
                  <div
                    className={`w-full rounded-t-sm transition-all ${
                      isPeak
                        ? "bg-amber-500 ring-2 ring-amber-300"
                        : d.count > 0
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-200"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                    title={`Day ${d.day}: ${d.count} acts`}
                  />
                </div>
              );
            })}
          </div>
          <span className="text-[11px] font-semibold block" style={{ color: APP_COLORS.texts.slate }}>
            Peak: 18 Jun • 18 activations
          </span>
        </div>

        {/* BY AP (TOP 5 OF 23) */}
        <div
          className="rounded-2xl border overflow-hidden shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <h4 className="font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
              By AP (Top 5 of 23)
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                style={{
                  backgroundColor: APP_COLORS.backgrounds.surface,
                  borderBottom: `1px solid ${APP_COLORS.greys.stroke}`,
                  color: APP_COLORS.texts.slate,
                }}
              >
                <tr>
                  <th className="py-2 px-3 font-semibold text-[11px]">AP NAME</th>
                  <th className="py-2 px-3 font-semibold text-[11px] text-right">ACTS</th>
                  <th className="py-2 px-3 font-semibold text-[11px] text-right">COMMISSION</th>
                  <th className="py-2 px-3 font-semibold text-[11px] text-center">BONUS</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
                {TOP_APS.map((ap, i) => {
                  const badge = getBonusBadge(ap.bonusType);
                  return (
                    <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {ap.name}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-700">
                        {ap.acts.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-slate-400 line-through decoration-slate-300">
                        {ap.commission}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {ap.bonus === "—" ? (
                          <span className="text-slate-400 font-bold">—</span>
                        ) : (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold inline-block"
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.color,
                            }}
                          >
                            {ap.bonus}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 border-t text-right" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <button
              type="button"
              onClick={() => onViewFullProfile?.(sc?.id || "aminat-okafor")}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>View all 23 APs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BY SIM TYPE */}
        <div
          className="p-3.5 rounded-2xl border space-y-2.5"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <h4 className="font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
            By SIM Type
          </h4>

          <div className="space-y-2">
            {SIM_TYPE_STATS.map((st) => (
              <div key={st.type} className="flex items-center justify-between gap-3 text-xs">
                <span className="w-24 font-semibold text-slate-700">{st.type}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${st.percent}%`,
                      backgroundColor: st.color,
                    }}
                  />
                </div>
                <div className="w-20 text-right">
                  <span className="font-extrabold text-slate-900">{st.count}</span>{" "}
                  <span className="text-[10px] text-slate-400 font-medium">{st.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AMINAT VS NETWORK AVG */}
        <div
          className="p-3.5 rounded-2xl border space-y-2"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <h4 className="font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
            {firstName} vs Network Avg
          </h4>

          <div className="space-y-2 pt-1 divide-y divide-slate-200/60">
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500 font-medium">Acts</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-900">1,847</span>
                <span className="text-slate-400 font-normal">vs 702 avg</span>
                <span className="text-emerald-600 font-extrabold flex items-center">
                  +163% ↑
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5">
              <span className="text-slate-500 font-medium">APs</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-900">23</span>
                <span className="text-slate-400 font-normal">vs 20.6</span>
                <span className="text-emerald-600 font-extrabold flex items-center">
                  +12% ↑
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5">
              <span className="text-slate-500 font-medium">Stock</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-slate-900">42</span>
                <span className="text-slate-400 font-normal">vs 19.3</span>
                <span className="text-emerald-600 font-extrabold flex items-center">
                  +118% ↑
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5">
              <span className="text-slate-500 font-medium">Bonus</span>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-purple-700 font-black">Achieved</span>
                <span className="text-slate-400 font-normal">vs 67% rate</span>
                <span className="text-emerald-600 font-extrabold">
                  ↑ ↑
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewFullProfile?.(sc?.id || "aminat-okafor");
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold border transition-colors hover:bg-slate-100 text-slate-700"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            View Full Profile
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              if (sc) {
                onDistributeStock?.(sc);
              }
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold border transition-colors hover:bg-emerald-50 text-emerald-600 flex items-center justify-center gap-1.5"
            style={{ borderColor: APP_COLORS.greens.secondary }}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Distribute Stock</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
