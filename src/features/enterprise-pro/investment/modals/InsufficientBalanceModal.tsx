import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle, Wallet } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../data/mockInvestmentData";

interface InsufficientBalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiredAmount?: number;
  onFundWallet?: () => void;
}

export const InsufficientBalanceModal: React.FC<
  InsufficientBalanceModalProps
> = ({
  open,
  onOpenChange,
  requiredAmount = 15_000_000,
  onFundWallet,
}) => {
  const available = investmentSummaryData.walletAvailable;
  const shortfall = Math.max(0, requiredAmount - available);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      footer={null}
    >
      <div className="text-center py-4 space-y-4">
        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-50">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-900">
            Insufficient Wallet Balance
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            Your available balance is insufficient to process this batch purchase.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Available Liquid Balance:</span>
            <span className="font-bold text-gray-900">
              ₦{available.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Required Order Total:</span>
            <span className="font-bold text-gray-900">
              ₦{requiredAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-amber-200 text-red-600 font-bold">
            <span>Shortfall:</span>
            <span>-₦{shortfall.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Adjust Quantity
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              if (onFundWallet) onFundWallet();
            }}
            className="py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: colors.primary }}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Top Up Wallet</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
