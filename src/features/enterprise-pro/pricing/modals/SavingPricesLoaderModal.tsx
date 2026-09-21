import React, { useEffect } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Loader2 } from "lucide-react";

interface SavingPricesLoaderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export const SavingPricesLoaderModal: React.FC<SavingPricesLoaderModalProps> = ({
  open,
  onOpenChange,
  onComplete,
}) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onOpenChange(false);
      onComplete();
    }, 1200);
    return () => clearTimeout(timer);
  }, [open, onOpenChange, onComplete]);

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-3 py-6 text-center text-xs">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Saving prices...</h3>
          <p className="text-xs text-slate-500 mt-1">
            Please wait while we update retail prices across your EP network.
          </p>
        </div>
      </div>
    </AppModal>
  );
};
