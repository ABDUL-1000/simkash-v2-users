import React, { useState, useEffect } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Sliders, Check } from "lucide-react";
import type { CategoryPnLItem } from "../types";

interface SetRetailPricesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: CategoryPnLItem | null;
  onPriceSaved: (itemId: string, newRetail: number) => void;
}

export const SetRetailPricesModal: React.FC<SetRetailPricesModalProps> = ({
  open,
  onOpenChange,
  item,
  onPriceSaved,
}) => {
  const [retailPrice, setRetailPrice] = useState(4500);

  useEffect(() => {
    if (item) {
      setRetailPrice(item.cost + item.marginPerUnit);
    }
  }, [item]);

  if (!item) return null;

  const costPerUnit = item.bought > 0 ? Math.round(item.cost / item.bought) : 2500;
  const simulatedMargin = Math.max(0, retailPrice - costPerUnit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPriceSaved(item.id, retailPrice);
    onOpenChange(false);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Set Retail Price</h3>
            <p className="text-xs text-slate-400">{item.name}</p>
          </div>
        </div>

        {/* Cost vs Retail details */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-medium">
          <div className="flex justify-between text-slate-600">
            <span>Wholesale Cost</span>
            <span className="font-bold text-slate-900">₦{costPerUnit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Current Margin</span>
            <span className="font-bold text-emerald-600">+₦{item.marginPerUnit.toLocaleString()}</span>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            New Retail Price (₦)
          </label>
          <input
            type="number"
            min={costPerUnit}
            step={100}
            value={retailPrice}
            onChange={(e) => setRetailPrice(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Simulated Margin Pill */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-0.5">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
            Simulated Margin Per Unit
          </span>
          <div className="text-xl font-black text-emerald-600">
            +₦{simulatedMargin.toLocaleString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Retail Price</span>
          </button>
        </div>
      </form>
    </AppModal>
  );
};
