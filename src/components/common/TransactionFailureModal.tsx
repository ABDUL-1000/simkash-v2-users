import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface TransactionFailureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  reason?: string;
  onTryAgain?: () => void;
  onCancel?: () => void;
  tryAgainButtonText?: string;
  cancelButtonText?: string;
}

export function TransactionFailureModal({
  open,
  onOpenChange,
  title = "Purchase Failed",
  subtitle = "We couldn't complete this purchase. Your wallet was not debited.",
  reason = "Network provider temporarily unavailable. Please try again.",
  onTryAgain,
  onCancel,
  tryAgainButtonText = "Try Again",
  cancelButtonText = "Cancel",
}: TransactionFailureModalProps) {
  const handleCancel = () => {
    onOpenChange(false);
    onCancel?.();
  };

  const handleTryAgain = () => {
    onOpenChange(false);
    onTryAgain?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      description=""
      size="md"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-5">
        {/* Soft Red X Icon Container */}
        <div className="flex size-20 items-center justify-center rounded-full bg-[#FFF7F8] text-[#EF4444]">
          <X className="size-10 stroke-[2.5]" />
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#0F152A]">{title}</h2>
          {subtitle && (
            <p className="text-xs font-medium text-[#66738C] max-w-xs mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Reason Alert Banner */}
        {reason && (
          <div className="w-full flex items-start gap-2.5 rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 text-left">
            <AlertTriangle className="size-4 shrink-0 text-[#D9990D] mt-0.5" />
            <p className="text-xs font-semibold text-[#D9990D]">
              Reason: {reason}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleTryAgain}
            className="flex-1 rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            {tryAgainButtonText}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-xl border border-[#E2ECF6] py-3 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
