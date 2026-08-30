import React from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface SuccessDetailItem {
  label: string;
  value: React.ReactNode;
}

interface TransactionSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  details?: SuccessDetailItem[];
  walletBalanceText?: string;
  onDone?: () => void;
  doneButtonText?: string;
}

export function TransactionSuccessModal({
  open,
  onOpenChange,
  title = "Payment Successful!",
  subtitle,
  details = [],
  walletBalanceText,
  onDone,
  doneButtonText = "Done",
}: TransactionSuccessModalProps) {
  const handleClose = () => {
    onOpenChange(false);
    onDone?.();
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
      <div className="flex flex-col items-center text-center pt-2 space-y-4">
        {/* Soft Green Checkmark Icon Container */}
        <div className="flex size-20 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <Check className="size-10 stroke-[3]" />
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#0F152A]">{title}</h2>
          {subtitle && (
            <p className="text-sm font-medium text-[#66738C] max-w-xs mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Receipt Details Card */}
        {details.length > 0 && (
          <div className="w-full divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left">
            {details.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2.5 text-xs first:pt-0 last:pb-0"
              >
                <span className="text-[#8C909B] font-medium">{item.label}</span>
                <span className="font-bold text-[#0F152A]">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Wallet Balance Note */}
        {walletBalanceText && (
          <p className="text-xs font-semibold text-[#66738C]">{walletBalanceText}</p>
        )}

        {/* Action Button */}
        <div className="w-full pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            {doneButtonText}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
