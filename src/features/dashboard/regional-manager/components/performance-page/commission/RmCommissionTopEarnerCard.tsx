import {Trophy,  MessageSquare } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmCommissionTopEarnerCardProps {
  onContactTopEarner?: () => void;
}

export function RmCommissionTopEarnerCard({ onContactTopEarner }: RmCommissionTopEarnerCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Top Earner This Month
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
          Rank #1
        </span>
      </div>

      <div
        className="rounded-xl p-3 border space-y-2.5"
        style={{
          background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
          borderColor: "#FDE68A",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
            AO
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="font-extrabold text-sm text-amber-950 truncate">
              Aminat Okafor
            </h5>
            <p className="text-[11px] font-medium text-amber-800">
              Lagos State Coordinator • 38 APs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/60">
          <div>
            <span className="text-[10px] text-amber-800 font-semibold block">Commission Overrides</span>
            <span className="text-base font-black text-amber-950">₦35,395</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-amber-800 font-semibold block">Activations</span>
            <span className="text-base font-black text-amber-950">3,120</span>
          </div>
        </div>

        {onContactTopEarner && (
          <button
            type="button"
            onClick={onContactTopEarner}
            className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-amber-900 bg-amber-200/70 hover:bg-amber-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send Congratulations</span>
          </button>
        )}
      </div>
    </div>
  );
}
