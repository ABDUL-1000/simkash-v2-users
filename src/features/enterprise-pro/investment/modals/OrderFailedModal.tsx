import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle, RotateCcw } from "lucide-react";
import { colors } from "@/constants/colors";

interface OrderFailedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: string;
  onRetry?: () => void;
}

export const OrderFailedModal: React.FC<OrderFailedModalProps> = ({
  open,
  onOpenChange,
  reason = "Temporary inventory ledger lock or network timeout. No funds were debited.",
  onRetry,
}) => {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      footer={null}
    >
      <div className="text-center py-4 space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto ring-8 ring-red-50">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-900">
            Order Submission Failed
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            {reason}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              if (onRetry) onRetry();
            }}
            className="py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: colors.primary }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
