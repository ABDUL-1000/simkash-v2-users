import React from "react";
import { AlertCircle, Download, Sliders } from "lucide-react";

interface EbPricingOverviewSidebarProps {
  onSetPrices: (category: string) => void;
  onExportReport: () => void;
}

export const EbPricingOverviewSidebar: React.FC<
  EbPricingOverviewSidebarProps
> = ({ onSetPrices, onExportReport }) => {
  return (
    <div className="space-y-4 text-xs font-medium">
      {/* Unsold Stock Summary */}
      <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span>Unsold Stock Summary</span>
        </div>

        <p className="text-[11px] text-amber-900 leading-relaxed">
          You currently have <strong>₦6,209,000</strong> in unsold inventory value across SIM cards, CCTV cameras, and Solar systems.
        </p>

        <div className="pt-1 text-[11px] text-amber-800 font-semibold">
          Assign more units to end customers to realize this value as margin earnings.
        </div>
      </div>

      {/* Quick Pricing Actions */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-2.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Price Controls
        </span>

        <button
          type="button"
          onClick={() => onSetPrices("sim")}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition inline-flex items-center justify-between px-3"
        >
          <span>Set SIM Prices</span>
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onSetPrices("cctv")}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition inline-flex items-center justify-between px-3"
        >
          <span>Set CCTV Prices</span>
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={() => onSetPrices("solar")}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition inline-flex items-center justify-between px-3"
        >
          <span>Set Solar Prices</span>
          <Sliders className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#152a45] text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1.5 mt-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export P&L Report</span>
        </button>
      </div>
    </div>
  );
};
