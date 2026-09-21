import React from "react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../../data/mockInvestmentData";
import { mockScCommissions } from "../../data/mockCommissionData";
import type { ReinvestSimProduct } from "../../types";
import { AlertCircle, ArrowRight, TrendingUp } from "lucide-react";

interface ReinvestFormProps {
  selectedProduct: ReinvestSimProduct;
  quantity: number;
  onQuantityChange: (val: number) => void;
  selectedScId: string;
  onScChange: (id: string) => void;
  note: string;
  onNoteChange: (val: string) => void;
  onSubmit: () => void;
}

export const ReinvestForm: React.FC<ReinvestFormProps> = ({
  selectedProduct,
  quantity,
  onQuantityChange,
  selectedScId,
  onScChange,
  note,
  onNoteChange,
  onSubmit,
}) => {
  const totalCost = quantity * selectedProduct.wholesalePrice;
  const remainingBalance = investmentSummaryData.walletAvailable - totalCost;
  const isInsufficient = remainingBalance < 0;
  const estMonthlyYield = Math.round(quantity * selectedProduct.marginPerSim * 0.2);

  const quickPills = [500, 1000, 2500, 5000];

  return (
    <div className="space-y-4">
      {/* Quantity & SC Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            2. Order Quantity (Units)
          </label>
          <input
            type="number"
            min={selectedProduct.minOrder}
            step={100}
            value={quantity}
            onChange={(e) => onQuantityChange(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="flex items-center gap-1.5 mt-2">
            {quickPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => onQuantityChange(pill)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  quantity === pill
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                +{pill.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
            3. Destination State Hub
          </label>
          <select
            value={selectedScId}
            onChange={(e) => onScChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {mockScCommissions.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.state} — {sc.scName} ({sc.activationRate}% rate)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-gray-500 mt-2">
            Inventory is dispatched to the chosen hub for immediate activation.
          </p>
        </div>
      </div>

      {/* Note input */}
      <div>
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
          Order Instructions / Reference (Optional)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="e.g. Priority batch for Lagos mainland campus activation drive"
          className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Real-time Order Summary Box */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Total Purchase Value:</span>
          <span className="font-bold text-gray-900">
            ₦{totalCost.toLocaleString()} ({quantity.toLocaleString()} × ₦{selectedProduct.wholesalePrice})
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Wallet Deduction:</span>
          <span className={`font-bold ${isInsufficient ? "text-red-600" : "text-gray-900"}`}>
            Balance after: ₦{remainingBalance.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Estimated Additional Cashflow:
          </span>
          <span className="font-bold text-emerald-600">
            +₦{estMonthlyYield.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {isInsufficient && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>
            Insufficient reinvestable wallet balance. Available: ₦{investmentSummaryData.walletAvailable.toLocaleString()}.
          </span>
        </div>
      )}

      <button
        type="button"
        disabled={isInsufficient || quantity < selectedProduct.minOrder}
        onClick={onSubmit}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
        style={{ backgroundColor: colors.primary }}
      >
        <span>Preview & Confirm Reinvestment Order</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
