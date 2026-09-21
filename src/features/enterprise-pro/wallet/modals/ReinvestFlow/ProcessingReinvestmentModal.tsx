import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Loader2 } from "lucide-react";

interface ProcessingReinvestmentModalProps {
  open: boolean;
}

export const ProcessingReinvestmentModal: React.FC<ProcessingReinvestmentModalProps> = ({
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
        <div className="w-14 h-14 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900">Processing Reinvestment...</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Debiting earnings wallet, generating stock dispatch orders, and logging ledger balance...
          </p>
        </div>
      </div>
    </AppModal>
  );
};
