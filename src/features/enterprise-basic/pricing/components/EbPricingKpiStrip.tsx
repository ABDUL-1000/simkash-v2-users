import React from "react";
import { TrendingUp, Landmark, AlertCircle, ShoppingCart } from "lucide-react";
import type { PricingKpis } from "../types";

interface EbPricingKpiStripProps {
  kpis: PricingKpis;
}

export const EbPricingKpiStrip: React.FC<EbPricingKpiStripProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* Total Revenue */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Revenue
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            ₦{kpis.totalRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Direct sales collected</p>
        </div>
      </div>

      {/* Total Products Cost */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Products Cost
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            ₦{kpis.totalProductsCost.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">Wholesale inventory deployed</p>
        </div>
      </div>

      {/* Net Profit (P&L) */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Net Profit (P&L)
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            -₦{Math.abs(kpis.netProfit).toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            Unlocked as remaining stock sells
          </p>
        </div>
      </div>

      {/* Return on Investment */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Landmark className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Return on Investment
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">
            {kpis.roiPct}%
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Projected annualized</p>
        </div>
      </div>
    </div>
  );
};
