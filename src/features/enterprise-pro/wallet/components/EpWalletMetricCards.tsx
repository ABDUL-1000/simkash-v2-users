import React from "react";
import { TrendingUp, CheckCircle2, Package, Landmark } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockWalletBalance } from "../data/mockWalletData";

export const EpWalletMetricCards: React.FC = () => {
  const { earnedThisMonth, totalPaidOut, simOrdersPaid, balancePaidDown } = mockWalletBalance;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Earned This Month */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Earned This Month
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-emerald-600">
            ₦{earnedThisMonth.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Margin + commission</span>
        </div>
      </div>

      {/* Total Paid Out */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Total Paid Out
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            ₦{totalPaidOut.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">All time</span>
        </div>
      </div>

      {/* SIM Orders Paid */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            SIM Orders Paid
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-slate-900">
            ₦{simOrdersPaid.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Additional orders</span>
        </div>
      </div>

      {/* Balance Paid Down */}
      <div
        className="rounded-2xl p-4 border bg-white shadow-xs flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Balance Paid Down
          </span>
        </div>
        <div className="mt-3">
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            ₦{balancePaidDown.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Of ₦7,500,000 initial balance</span>
        </div>
      </div>
    </div>
  );
};
