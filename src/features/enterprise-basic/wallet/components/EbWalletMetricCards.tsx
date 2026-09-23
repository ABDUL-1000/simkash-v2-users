import React from "react";
import { TrendingUp, ArrowDownLeft, Package, Clock } from "lucide-react";
import type { EbWalletSummary } from "../types";

interface EbWalletMetricCardsProps {
  summary: EbWalletSummary;
}

export const EbWalletMetricCards: React.FC<EbWalletMetricCardsProps> = ({
  summary,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
      {/* Total Margin */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Margin
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            ₦{summary.totalMargin.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            +₦{(summary.marginThisMonth / 1000).toFixed(0)}K this month
          </p>
        </div>
      </div>

      {/* Total Paid Out */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Paid Out
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            ₦{summary.totalPaidOut.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-1">3 completed payouts</p>
        </div>
      </div>

      {/* Orders Placed */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Orders Placed
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {summary.ordersPlacedCount} SIM Orders
          </div>
          <p className="text-[11px] text-purple-600 font-medium mt-1">Additional stock orders</p>
        </div>
      </div>

      {/* Unsold Stock */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Unsold Stock
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            ₦{summary.unsoldStockValue.toLocaleString()}
          </div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            {summary.unsoldUnitsCount} units unsold
          </p>
        </div>
      </div>
    </div>
  );
};
