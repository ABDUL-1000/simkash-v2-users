import React from "react";
import { Check } from "lucide-react";
import { colors } from "@/constants/colors";

export const StrategicBenefitsCard: React.FC = () => {
  const benefits = [
    "Best wholesale pricing",
    "Highest priority stock allocation",
    "Dedicated relationship manager",
    "Joint marketing with Simkash",
    "Premium technical + after-sales",
    "Early access to new products",
    "Private label branding eligible",
    "Dedicated business growth support",
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-3.5"
      style={{ borderColor: colors.border }}
    >
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Strategic Distributor Benefits
      </span>

      <div className="space-y-2 text-xs text-slate-700">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span className="font-medium">{b}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-slate-100">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
          <span>Top tier — all benefits unlocked</span>
          <span>✓</span>
        </span>
      </div>
    </div>
  );
};
