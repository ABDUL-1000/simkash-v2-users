import { ArrowUpRight, Wallet, CheckCircle2, TrendingUp } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaCommissionThisMonthCardProps {
  onRequestPayout?: () => void;
}

export function CaCommissionThisMonthCard({
  onRequestPayout,
}: CaCommissionThisMonthCardProps) {
  const directCommission = 187200;
  const networkOverride = 97500;
  const totalCommission = directCommission + networkOverride; // 284,700

  // Direct percentage for breakdown bar
  const directPercent = Math.round((directCommission / totalCommission) * 100);
  const networkPercent = 100 - directPercent;

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: APP_COLORS.greens.light }}
          >
            <Wallet className="w-4 h-4" style={{ color: APP_COLORS.greens.secondary }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Commission This Month</h3>
            <p className="text-[11px] text-slate-500">Jul 1 – Jul 31, 2026</p>
          </div>
        </div>

        <span
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200"
        >
          <TrendingUp className="w-3 h-3" />
          +28.4%
        </span>
      </div>

      {/* TOTAL AMOUNT DISPLAY */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-500">Total Earned</span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            ₦{totalCommission.toLocaleString()}
          </span>
        </div>

        {/* DUAL BREAKDOWN BAR */}
        <div className="space-y-1">
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${directPercent}%` }}
              title={`Direct: ${directPercent}%`}
            />
            <div
              className="h-full bg-indigo-500 transition-all duration-500"
              style={{ width: `${networkPercent}%` }}
              title={`Network: ${networkPercent}%`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              Direct ({directPercent}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
              Network Overrides ({networkPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* DETAILED STATS */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg border border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 font-medium">Direct Acts</div>
          <div className="text-sm font-black text-slate-900 mt-0.5">
            ₦{directCommission.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">312 acts @ ₦600</div>
        </div>

        <div className="p-2.5 rounded-lg border border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 font-medium">AP Network</div>
          <div className="text-sm font-black text-slate-900 mt-0.5">
            ₦{networkOverride.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">2,535 acts override</div>
        </div>
      </div>

      {/* PAYOUT STATUS & CTA BUTTON */}
      <div className="pt-1 space-y-2">
        <button
          type="button"
          onClick={onRequestPayout}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] hover:opacity-95"
          style={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
          }}
        >
          <span>Request Payout</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 text-center">
          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
          <span>Next automated payout: Friday, July 18</span>
        </div>
      </div>
    </div>
  );
}
