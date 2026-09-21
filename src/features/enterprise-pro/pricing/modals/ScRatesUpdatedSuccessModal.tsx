import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2 } from "lucide-react";

interface ScRatesUpdatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScRatesUpdatedSuccessModal: React.FC<ScRatesUpdatedSuccessModalProps> = ({
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
          <h3 className="text-base font-bold text-slate-900">SC Rates Updated!</h3>
          <p className="text-xs text-slate-500 mt-1">
            3 SCs have been notified of their new commission rates.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[11px] border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>3 SCs notified of rate changes</span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">Aminat Okafor</span>
            <span className="font-bold text-emerald-600 flex items-center gap-0.5">
              10% ↑ from 8%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">Fatima Bello</span>
            <span className="font-bold text-emerald-600 flex items-center gap-0.5">
              9% ↑ from 8%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">Ngozi Adeyemi</span>
            <span className="font-bold text-emerald-600 flex items-center gap-0.5">
              9% ↑ from 8%
            </span>
          </div>
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
