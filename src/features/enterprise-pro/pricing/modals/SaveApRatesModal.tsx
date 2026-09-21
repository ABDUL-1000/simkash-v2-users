import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle } from "lucide-react";

interface SaveApRatesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSave: () => void;
}

export const SaveApRatesModal: React.FC<SaveApRatesModalProps> = ({
  open,
  onOpenChange,
  onConfirmSave,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Save AP Commission Rates</h3>
          <p className="text-xs text-slate-500 mt-0.5">1 rate changed from Simkash standard</p>
        </div>

        {/* Changed Rates list */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">POS SIM</span>
            <span className="font-bold text-emerald-600">₦1,000 → ₦1,200 (+₦200/act)</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>CCTV SIM: ₦1,200</span>
            <span className="text-[11px]">unchanged</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>GPS SIM: ₦1,500</span>
            <span className="text-[11px]">unchanged</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Router SIM: ₦1,000</span>
            <span className="text-[11px]">unchanged</span>
          </div>
        </div>

        {/* Impact on APs */}
        <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
          <span className="text-[10px] font-bold text-blue-800 uppercase block">
            Impact on Agency Partners
          </span>
          <p className="text-xs text-blue-900 leading-relaxed">
            All 247 APs in your EP network will earn the new rates from the next activation cycle.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-blue-200/60 text-center">
            <div className="p-2 bg-white rounded-lg">
              <span className="text-[10px] text-slate-400 font-bold block">AFFECTED APs</span>
              <span className="text-sm font-black text-slate-900">247</span>
            </div>
            <div className="p-2 bg-white rounded-lg">
              <span className="text-[10px] text-slate-400 font-bold block">EFFECTIVE</span>
              <span className="text-sm font-black text-emerald-600">Next cycle</span>
            </div>
          </div>
        </div>

        {/* Amber warning */}
        <div className="flex items-center gap-2 text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>AP rate changes come from SC commission pool — ensure SC rates are adjusted accordingly.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onConfirmSave();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition"
          >
            Save AP Rates
          </button>
        </div>
      </div>
    </AppModal>
  );
};
