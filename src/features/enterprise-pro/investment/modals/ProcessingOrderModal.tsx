import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Loader2 } from "lucide-react";

interface ProcessingOrderModalProps {
  open: boolean;
  message?: string;
  subMessage?: string;
}

export const ProcessingOrderModal: React.FC<ProcessingOrderModalProps> = ({
  open,
  message = "Allocating SIM Batch...",
  subMessage = "Reserving factory serial numbers & updating ledger allocations...",
}) => {
  return (
    <AppModal
      open={open}
      onOpenChange={() => {}}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div>
          <h4 className="text-base font-bold text-gray-900">{message}</h4>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            {subMessage}
          </p>
        </div>
      </div>
    </AppModal>
  );
};
