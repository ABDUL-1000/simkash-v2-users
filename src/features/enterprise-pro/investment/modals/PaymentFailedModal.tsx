import { AppModal } from "@/components/common/AppModal";
import { X, AlertTriangle } from "lucide-react";

interface PaymentFailedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry: () => void;
  onContactKemi?: () => void;
}

export function PaymentFailedModal({
  open,
  onOpenChange,
  onRetry,
  onContactKemi,
}: PaymentFailedModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-2 text-center space-y-3.5">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto ring-8 ring-red-50">
          <X className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900">Payment Failed</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Your balance is unchanged. Your wallet is unchanged.
          </p>
        </div>

        {/* Warning Box */}
        <div className="rounded-xl bg-amber-50 p-3 text-amber-900 border border-amber-200 text-xs text-left space-y-1.5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span>Reason: Processing error. Please try again. If this persists, contact Kemi Ade immediately.</span>
              <button
                type="button"
                onClick={onContactKemi}
                className="block font-bold text-blue-600 hover:underline mt-1"
              >
                Call Kemi
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={onContactKemi}
            className="w-full text-xs font-semibold text-blue-600 hover:underline py-1"
          >
            Contact Kemi
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full text-xs text-slate-500 hover:text-slate-800 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default PaymentFailedModal;
