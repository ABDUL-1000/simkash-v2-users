import React from "react";
import { Info, AlertTriangle } from "lucide-react";
import { RetailPriceStepperCards } from "./RetailPriceStepperCards";
import { EstimatedMonthlyMarginCard } from "./EstimatedMonthlyMarginCard";
import { MarginCalculatorSidebar } from "./MarginCalculatorSidebar";
import { PricingGuidanceCard } from "./PricingGuidanceCard";
import type { RetailPriceConfig } from "../../types";

interface SetRetailPricesTabViewProps {
  prices: RetailPriceConfig[];
  onChangePrice: (id: string, delta: number) => void;
  onResetPrices: () => void;
  onSavePrices: () => void;
  hasChanges: boolean;
}

export const SetRetailPricesTabView: React.FC<SetRetailPricesTabViewProps> = ({
  prices,
  onChangePrice,
  onResetPrices,
  onSavePrices,
  hasChanges,
}) => {
  return (
    <div className="space-y-5">
      {/* Informational Blue Banner */}
      <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-900 leading-relaxed font-medium">
          You set the retail price customers pay for SIMs in your EP network. Simkash charges you the wholesale price. The difference is your margin.
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          <RetailPriceStepperCards prices={prices} onChangePrice={onChangePrice} />
          <EstimatedMonthlyMarginCard prices={prices} />

          {/* Unsaved changes bottom bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              {hasChanges ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-amber-600">Unsaved changes</span>
                </>
              ) : (
                <span className="text-xs text-slate-400">All prices saved</span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onResetPrices}
                disabled={!hasChanges}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Reset to Current
              </button>

              <button
                type="button"
                onClick={onSavePrices}
                className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
              >
                Save Prices
              </button>
            </div>
          </div>
        </div>

        {/* Right column (1 col) */}
        <div className="lg:col-span-1 space-y-5">
          <MarginCalculatorSidebar prices={prices} />
          <PricingGuidanceCard prices={prices} />
        </div>
      </div>
    </div>
  );
};
