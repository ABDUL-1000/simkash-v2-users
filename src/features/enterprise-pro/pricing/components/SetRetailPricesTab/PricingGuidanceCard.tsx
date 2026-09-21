import React from "react";
import { Info, CheckCircle2 } from "lucide-react";
import type { RetailPriceConfig } from "../../types";

interface PricingGuidanceCardProps {
  prices: RetailPriceConfig[];
}

export const PricingGuidanceCard: React.FC<PricingGuidanceCardProps> = ({ prices }) => {
  const standardRates = {
    pos: 4500,
    cctv: 9500,
    gps: 12000,
    router: 8000,
  };

  const isMatching = prices.every(
    (p) => p.currentRetail === standardRates[p.id as keyof typeof standardRates]
  );

  return (
    <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-3.5">
      <h4 className="font-bold text-gray-900 text-sm">Pricing Guidance</h4>

      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
          <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Simkash standard retail rates:</span>
        </div>
        <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
          POS: <strong>₦4,500</strong> · CCTV: <strong>₦9,500</strong>
          <br />
          GPS: <strong>₦12,000</strong> · Router: <strong>₦8,000</strong>
        </p>
      </div>

      <div className="flex items-center gap-2 pt-1 text-xs">
        {isMatching ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-emerald-700 font-semibold">
              You are currently matching standard rates.
            </span>
          </>
        ) : (
          <>
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-amber-700 font-semibold">
              Customized enterprise pricing active.
            </span>
          </>
        )}
      </div>
    </div>
  );
};
