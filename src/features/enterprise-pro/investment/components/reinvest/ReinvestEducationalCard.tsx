import React from "react";
import { Sparkles, Zap, ShieldCheck, RefreshCw } from "lucide-react";
import { colors } from "@/constants/colors";

export const ReinvestEducationalCard: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center gap-2">
        <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-sm font-bold text-gray-900">
            The Power of Stock Reinvestment
          </h4>
          <p className="text-[11px] text-gray-500">
            How compounding capital accelerates Enterprise ROI
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <RefreshCw className="w-3.5 h-3.5" />
          </div>
          <div>
            <h5 className="font-bold text-gray-900">Zero Idle Cash Drag</h5>
            <p className="text-gray-500 mt-0.5 leading-relaxed">
              Instead of letting cash sit in wallet, reinvesting unlocks wholesale
              tiers with immediate 40%–55% instant margin spreads.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <h5 className="font-bold text-gray-900">
              36-Month Recurring Inflows
            </h5>
            <p className="text-gray-500 mt-0.5 leading-relaxed">
              Every deployed SIM doesn't just produce an activation fee; it yields
              recurring data pack overrides every single month.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <h5 className="font-bold text-gray-900">Guaranteed Fulfillment</h5>
            <p className="text-gray-500 mt-0.5 leading-relaxed">
              Enterprise Pro orders get priority batch production and direct DHL/hub
              courier dispatch within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
