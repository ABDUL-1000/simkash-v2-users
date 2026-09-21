import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, Users } from "lucide-react";

interface ApRatesUpdatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApRatesUpdatedSuccessModal: React.FC<ApRatesUpdatedSuccessModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">AP Rates Updated!</h3>
          <p className="text-xs text-slate-500 mt-1">
            New agency partner commission guidelines are active across all 12 SC territories.
          </p>
        </div>

        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-left text-xs text-emerald-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>247 Agency Partners Updated</span>
          </div>
          <p className="text-[11px] text-emerald-700">
            SCs will automatically distribute newly specified rates on upcoming activation batches.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full py-2.5 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition"
        >
          Done
        </button>
      </div>
    </AppModal>
  );
};
