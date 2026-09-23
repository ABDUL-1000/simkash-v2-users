import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { RotateCw } from "lucide-react";

interface ProcessingInstalmentModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  amount?: number;
  isExtra?: boolean;
}

export const ProcessingInstalmentModal: React.FC<
  ProcessingInstalmentModalProps
> = ({
  open,
  onOpenChange = () => {},
  amount = 350000,
  isExtra = false,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="py-6 px-3 text-center space-y-3.5 text-xs">
        {/* Blue Rotating Icon */}
        <div className="w-12 h-12 mx-auto rounded-full bg-blue-50/80 text-blue-500 flex items-center justify-center animate-spin">
          <RotateCw className="w-6 h-6" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {isExtra
              ? `Processing extra payment of ₦${amount.toLocaleString()}...`
              : "Processing instalment payment..."}
          </h4>

          {!isExtra && (
            <div className="text-2xl font-black text-red-500 mt-2">
              ₦{amount.toLocaleString()}
            </div>
          )}

          <p className="text-[11px] text-slate-400 mt-1">
            {isExtra ? "This may take a few seconds" : "Toward your balance"}
          </p>
        </div>

        <div className="pt-2">
          <span className="text-[11px] font-semibold text-amber-500">
            Please do not close this window
          </span>
        </div>
      </div>
    </AppModal>
  );
};
