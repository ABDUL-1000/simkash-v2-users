import { TrendingUp, Eye } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmTopKpiCardsProps {
  onRequestPayout?: () => void;
}

export function RmTopKpiCards({ onRequestPayout }: RmTopKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Today */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Today
        </span>
        <h3 className="text-3xl font-black tracking-tight text-[#0F152A]">84</h3>
        <p className="text-xs font-bold text-[#10B981] flex items-center gap-1">
          <TrendingUp className="size-3.5" />
          <span>+12 more than yesterday</span>
        </p>
      </div>

      {/* 2. This Month */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          This Month
        </span>
        <h3 className="text-3xl font-black tracking-tight text-[#0F152A]">14,847</h3>
        <p className="text-xs text-[#66738C] font-medium">
          Across 12 SCs · <span className="font-bold text-[#10B981]">372.2%</span>
        </p>
        <p className="text-[10px] font-bold text-[#2563EB]">Target: 4,000 — Exceeded!</p>
      </div>

      {/* 3. My Stock */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            My Stock
          </span>
          <Eye className="size-3.5 text-[#94A3B8]" />
        </div>
        <h3 className="text-3xl font-black tracking-tight text-[#0F152A]">300</h3>
        <p className="text-xs text-[#66738C] font-medium">SIMs available to distribute</p>
        <p className="text-[10px] font-semibold text-[#64748B]">50 distributed this week</p>
      </div>

      {/* 4. My Commission */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            My Commission
          </span>
          <Eye className="size-3.5 text-[#94A3B8]" />
        </div>
        <h3 className="text-3xl font-black tracking-tight text-[#0F152A]">₦284,000</h3>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#66738C] font-medium">This month</span>
          <button
            type="button"
            onClick={onRequestPayout}
            className="rounded-lg bg-[#F59E0B] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-[#D97706] transition"
            style={{ backgroundColor: APP_COLORS.ambers.amber }}
          >
            Request Payout
          </button>
        </div>
      </div>
    </div>
  );
}

export default RmTopKpiCards;
