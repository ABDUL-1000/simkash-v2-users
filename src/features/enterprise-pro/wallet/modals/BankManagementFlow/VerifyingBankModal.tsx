import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Loader2 } from "lucide-react";

interface VerifyingBankModalProps {
  open: boolean;
}

export const VerifyingBankModal: React.FC<VerifyingBankModalProps> = ({
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
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900">Validating Bank Account...</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Connecting to Nigerian Inter-Bank Settlement System (NIBSS) to verify corporate beneficiary credentials...
          </p>
        </div>
      </div>
    </AppModal>
  );
};
