import { Smartphone, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmEasyBuyCommissionCardProps {
  onViewDetails: () => void;
}

export function RmEasyBuyCommissionCard({ onViewDetails }: RmEasyBuyCommissionCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            <Smartphone className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
              EasyBuy Passive Commission
            </h4>
            <p className="text-[11px] font-medium" style={{ color: APP_COLORS.texts.slate }}>
              1% override on financed devices
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
          1.0% Rate
        </span>
      </div>

      {/* Metrics Banner */}
      <div
        className="rounded-xl p-3 border space-y-2"
        style={{
          backgroundColor: APP_COLORS.blues.surfaceLight,
          borderColor: APP_COLORS.blues.surfaceMid,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Passive Earned
          </span>
          <span className="text-xl font-black" style={{ color: APP_COLORS.blues.primary }}>
            ₦248,000
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-blue-200/60 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block">This Month's Gain</span>
            <span className="font-black text-emerald-600">₦42,600</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Active Contracts</span>
            <span className="font-black text-slate-800">1,420 devices</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-slate-500">Financed Value: <strong>₦24.8M</strong></span>
        <button
          type="button"
          onClick={onViewDetails}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
