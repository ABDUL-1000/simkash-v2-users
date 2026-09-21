import { AppModal } from "@/components/common/AppModal";
import { Loader2 } from "lucide-react";

interface ProcessingPaymentModalProps {
  open: boolean;
  amount?: number;
}

export function ProcessingPaymentModal({
  open,
  amount = 2_847_000,
}: ProcessingPaymentModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={() => {}}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900">Processing Payment...</h4>
          <p className="text-xs text-slate-600 mt-1">
            ₦{amount.toLocaleString()} toward your balance
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            Do not close this screen
          </p>
        </div>
      </div>
    </AppModal>
  );
}
export default ProcessingPaymentModal;
