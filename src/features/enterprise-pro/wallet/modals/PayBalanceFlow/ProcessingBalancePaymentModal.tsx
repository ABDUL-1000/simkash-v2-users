import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Loader2 } from "lucide-react";

interface ProcessingBalancePaymentModalProps {
  open: boolean;
}

export const ProcessingBalancePaymentModal: React.FC<ProcessingBalancePaymentModalProps> = ({
  open,
}) => {
  return (
    <AppModal
      open={open}
      onOpenChange={() => {}}
      title=""
      size="sm"
      footer={null}
      showCloseButton={false}
    >
      <div className="py-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900">Applying Balance Payment...</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Crediting onboarding master contract, adjusting remaining balance, and refreshing equity thresholds...
          </p>
        </div>
      </div>
    </AppModal>
  );
};
