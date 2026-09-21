import React from "react";
import type { RetailPriceConfig } from "../../types";

interface MarginCalculatorSidebarProps {
  prices: RetailPriceConfig[];
}

export const MarginCalculatorSidebar: React.FC<MarginCalculatorSidebarProps> = ({ prices }) => {
  const total = prices.reduce((acc, curr) => {
    const margin = Math.max(0, curr.currentRetail - curr.wholesale);
    return acc + margin * curr.monthlyActivations;
  }, 0);

  return (
    <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-4">
      <h4 className="font-bold text-gray-900 text-sm">Margin Calculator</h4>

      <div className="p-4 rounded-xl bg-[#1E3A5F] text-white space-y-3">
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
          At Current Prices
        </span>

        <div className="space-y-2 text-xs">
          {prices.map((item) => {
            const margin = Math.max(0, item.currentRetail - item.wholesale);
            return (
              <div key={item.id} className="flex items-center justify-between text-slate-200">
                <span>
                  {item.simType.split(" ")[0]} ₦{margin.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-400">
                  × {item.monthlyActivations.toLocaleString()} acts
                </span>
              </div>
            );
          })}
        </div>

        <div className="pt-3 border-t border-white/15 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">Total</span>
          <span className="text-base font-black text-emerald-400">₦{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
