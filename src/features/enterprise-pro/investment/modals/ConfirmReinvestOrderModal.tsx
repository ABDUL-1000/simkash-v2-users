import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { MapPin, Check } from "lucide-react";
import type { ReinvestSimProduct } from "../types";
import { investmentSummaryData } from "../data/mockInvestmentData";

interface ConfirmReinvestOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: {
    product: ReinvestSimProduct;
    quantity: number;
    sc: { id: string; scName: string; state: string };
    totalCost: number;
    note: string;
  } | null;
  onConfirm: () => void;
}

export const ConfirmReinvestOrderModal: React.FC<
  ConfirmReinvestOrderModalProps
> = ({ open, onOpenChange, orderData, onConfirm }) => {
  if (!orderData) return null;
  const { product, quantity, sc, totalCost, note } = orderData;
  const balanceAfter = investmentSummaryData.walletAvailable - totalCost;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Reinvestment Order"
      description="Review order specifications before capital deduction"
      size="sm"
      footer={null}
    >
      <div className="space-y-4 pt-1 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">SIM Product:</span>
            <span className="font-bold text-gray-900">{product.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Batch Quantity:</span>
            <span className="font-bold text-gray-900">
              {quantity.toLocaleString()} Units
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Wholesale Unit Price:</span>
            <span className="font-semibold text-gray-800">
              ₦{product.wholesalePrice} / SIM
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Destination Hub:</span>
            <span className="font-bold text-blue-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {sc.state} ({sc.scName})
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <span className="font-bold text-gray-900">Total Deduction:</span>
            <span className="font-black text-sm text-gray-900">
              ₦{totalCost.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500">
            <span>Remaining in Wallet:</span>
            <span className="font-semibold text-gray-700">
              ₦{balanceAfter.toLocaleString()}
            </span>
          </div>

          {note && (
            <div className="pt-2 border-t border-slate-200 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-700">Instructions: </span>
              <span>"{note}"</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition"
            style={{ backgroundColor: colors.primary }}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm & Deduct ₦{totalCost.toLocaleString()}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
