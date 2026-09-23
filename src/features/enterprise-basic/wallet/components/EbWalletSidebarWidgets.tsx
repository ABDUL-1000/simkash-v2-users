import React from "react";
import { Landmark, ArrowRight, TrendingUp } from "lucide-react";

interface EbWalletSidebarWidgetsProps {
  onUpgradeClick?: () => void;
}

export const EbWalletSidebarWidgets: React.FC<EbWalletSidebarWidgetsProps> = ({
  onUpgradeClick,
}) => {
  return (
    <div className="space-y-4 text-xs font-medium">
      {/* Wallet Composition Gauge */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Wallet Composition
        </span>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 border-4 border-blue-600 flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-black text-blue-600">68%</span>
            <span className="text-[8px] text-slate-400 font-bold uppercase">Recov</span>
          </div>
          <div>
            <div className="font-bold text-slate-900">Capital Recouped</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              ₦866,000 recovered of ₦1,247,000 deployed
            </p>
          </div>
        </div>
      </div>

      {/* Linked Bank Account */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Linked Payout Account
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">First Bank of Nigeria</span>
              <span className="text-[11px] text-slate-400">•••• •••• 4521</span>
            </div>
          </div>
          <button type="button" className="text-blue-600 font-bold hover:underline">
            Change
          </button>
        </div>
      </div>

      {/* Monthly Earnings Mini Chart */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Monthly Earnings
          </span>
          <span className="text-emerald-600 font-bold inline-flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+18%</span>
          </span>
        </div>
        <div className="h-16 flex items-end justify-between gap-2 pt-2">
          {[
            { m: "May", h: "40%" },
            { m: "Jun", h: "60%" },
            { m: "Jul", h: "50%" },
            { m: "Aug", h: "75%" },
            { m: "Sep", h: "85%" },
            { m: "Oct", h: "100%" },
          ].map((bar) => (
            <div key={bar.m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-blue-600 rounded-t-xs" style={{ height: bar.h }} />
              <span className="text-[9px] text-slate-400 font-semibold">{bar.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Uses Horizontal Breakdown */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Wallet Activity Breakdown
        </span>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Margin Inflow</span>
            <span className="font-bold text-emerald-600">+₦1,246,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payouts Outflow</span>
            <span className="font-bold text-slate-800">-₦380,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Stock Reorders</span>
            <span className="font-bold text-slate-800">-₦250,000</span>
          </div>
        </div>
      </div>

      {/* Upgrade Callout */}
      <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-5 shadow-xs space-y-2.5">
        <h5 className="font-bold text-purple-900 text-xs">Want instalment options?</h5>
        <p className="text-[11px] text-purple-800 leading-relaxed">
          Upgrade to Premium Distributor to unlock 50% upfront financing with flexible repayment cycles.
        </p>
        <button
          type="button"
          onClick={onUpgradeClick}
          className="font-bold text-purple-700 hover:text-purple-800 text-[11px] inline-flex items-center gap-1"
        >
          <span>Learn About Premium</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
