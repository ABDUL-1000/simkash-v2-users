import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import type { RetailPriceConfig } from "../types";

interface PricesUpdatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prices: RetailPriceConfig[];
}

export const PricesUpdatedSuccessModal: React.FC<PricesUpdatedSuccessModalProps> = ({
  open,
  onOpenChange,
  prices,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Prices Updated!</h3>
          <p className="text-xs text-slate-500 mt-1">
            New retail prices are active across your EP network immediately.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[11px] border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>12 SCs notified</span>
        </div>

        {/* Updated list */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
          {prices.slice(0, 2).map((p) => (
            <div key={p.id} className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">{p.simType}</span>
              <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                ₦{p.currentRetail.toLocaleString()}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full py-2.5 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition"
        >
          Done
        </button>
      </div>
    </AppModal>
  );
};
