import React from "react";
import { Check, Sparkles } from "lucide-react";
import { reinvestProducts } from "../../data/mockInvestmentData";
import type { ReinvestSimProduct } from "../../types";

interface ReinvestSimSelectorProps {
  selectedProduct: ReinvestSimProduct;
  onSelectProduct: (prod: ReinvestSimProduct) => void;
}

export const ReinvestSimSelector: React.FC<ReinvestSimSelectorProps> = ({
  selectedProduct,
  onSelectProduct,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          1. Select SIM Stock Type
        </label>
        <span className="text-[11px] text-gray-500">
          Click card to select inventory tier
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {reinvestProducts.map((prod) => {
          const isSelected = selectedProduct.id === prod.id;

          return (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className={`relative cursor-pointer rounded-2xl p-4 border transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-600/20"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-gray-900">
                      {prod.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {prod.type}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                  {prod.badge && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      <Sparkles className="w-2.5 h-2.5" />
                      {prod.badge}
                    </span>
                  )}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[11px] text-gray-400 block">Wholesale</span>
                  <span className="font-bold text-gray-900">
                    ₦{prod.wholesalePrice}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Margin</span>
                  <span className="font-bold text-emerald-600">
                    +₦{prod.marginPerSim}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Est. Yield</span>
                  <span className="font-bold text-blue-600">
                    {prod.estimatedMonthlyRoi}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
