import React from "react";
import type { ApRateConfigItem } from "../../types";

interface TotalApCommissionBannerProps {
  apRates: ApRateConfigItem[];
}

export const TotalApCommissionBanner: React.FC<TotalApCommissionBannerProps> = ({ apRates }) => {
  const total = apRates.reduce((acc, curr) => acc + curr.rate * curr.avgActivations, 0);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12233B] to-[#1E3A5F] text-white shadow-md space-y-3">
      <div>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">
          Total AP Commission at Current Rates
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl sm:text-3xl font-black tracking-tight">
            ₦{total.toLocaleString()}
          </span>
          <span className="text-xs text-slate-300 font-medium">/ month est.</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
        {apRates.map((item) => {
          const subtotal = item.rate * item.avgActivations;
          return (
            <div key={item.id} className="flex items-center justify-between">
              <span>
                • At {item.avgActivations.toLocaleString()} {item.simType.split(" ")[0]} activations avg:
              </span>
              <span className="font-bold text-emerald-400">
                ₦{subtotal.toLocaleString()} to APs{" "}
                <span className="text-[11px] font-normal text-slate-400">
                  (₦{item.rate.toLocaleString()} × {item.avgActivations.toLocaleString()})
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
