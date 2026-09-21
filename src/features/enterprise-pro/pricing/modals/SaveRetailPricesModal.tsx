import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle, TrendingUp } from "lucide-react";
import type { RetailPriceConfig } from "../types";

interface SaveRetailPricesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prices: RetailPriceConfig[];
  onConfirmSave: () => void;
}

export const SaveRetailPricesModal: React.FC<SaveRetailPricesModalProps> = ({
  open,
  onOpenChange,
  prices,
  onConfirmSave,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Save Retail Prices</h3>
          <p className="text-xs text-slate-500 mt-0.5">Review margin impact before publishing rates</p>
        </div>

        {/* Changed Prices List */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Rate Adjustments
          </span>
          <div className="space-y-1.5 text-xs">
            {prices.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-1 border-b border-slate-200/60 last:border-none">
                <span className="font-semibold text-slate-800">{p.simType}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">₦{p.currentRetail.toLocaleString()}</span>
                  <span className="text-[11px] font-bold text-emerald-600">
                    +₦{(p.currentRetail - p.wholesale).toLocaleString()} margin
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Margin Impact Card */}
        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>ESTIMATED MARGIN IMPACT</span>
          </div>
          <p className="text-xs text-emerald-700">
            Est. additional monthly margin: <strong className="text-emerald-900 font-black">+₦10,000,000+</strong> at current activation pace across network.
          </p>
        </div>

        {/* Warning Notification Notice */}
        <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>12 State Coordinators will be notified of updated retail price cards immediately.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onConfirmSave();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition"
          >
            Save Prices
          </button>
        </div>
      </div>
    </AppModal>
  );
};
