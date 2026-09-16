import { Wallet, CheckCircle2, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmCommissionPayoutsCardProps {
  onRequestPayout: () => void;
}

export function RmCommissionPayoutsCard({ onRequestPayout }: RmCommissionPayoutsCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Payouts This Month
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Settlement status for June 2026
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <Wallet className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      {/* Available for Payout Banner */}
      <div
        className="rounded-xl p-3 border space-y-2"
        style={{
          backgroundColor: APP_COLORS.blues.surfaceLight,
          borderColor: APP_COLORS.blues.surfaceMid,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Available to Withdraw
          </span>
          <span className="text-xl font-black" style={{ color: APP_COLORS.greens.secondary }}>
            ₦84,000
          </span>
        </div>
        <button
          type="button"
          onClick={onRequestPayout}
          className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 active:scale-98 flex items-center justify-center gap-1.5"
          style={{ backgroundColor: APP_COLORS.greens.secondary }}
        >
          <span>Request Payout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recent Disbursal */}
      <div
        className="p-2.5 rounded-xl border space-y-1"
        style={{
          borderColor: APP_COLORS.greys.stroke,
          backgroundColor: APP_COLORS.backgrounds.surface,
        }}
      >
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Settled Transfer
          </span>
          <span className="font-extrabold text-slate-900">₦200,000</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>Jun 10, 2026 • Access Bank (..6789)</span>
          <span className="font-mono">#PAY-9921</span>
        </div>
      </div>
    </div>
  );
}
