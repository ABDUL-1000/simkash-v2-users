import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle, RotateCcw } from "lucide-react";

interface OnboardInviteFailedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry: () => void;
  errorMessage?: string;
}

export const OnboardInviteFailedModal: React.FC<OnboardInviteFailedModalProps> = ({
  open,
  onOpenChange,
  onRetry,
  errorMessage = "Unable to dispatch invitation SMS/email due to a delivery timeout. Please check the network connectivity or contact details and try again.",
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Invite Delivery Failed</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{errorMessage}</p>
        </div>

        <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 text-left text-red-800 text-[11px]">
          <span className="font-semibold block mb-0.5">Recommended action:</span>
          Ensure the phone number is in international (+234) or 11-digit local format and that the email address is valid.
        </div>

        <div className="flex items-center gap-3 pt-2">
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
              onRetry();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
