import React from "react";
import { colors } from "@/constants/colors";

interface CommissionQuickActionsCardProps {
  onUpdateRetailPrices: () => void;
  onAdjustScRates: () => void;
  onExportCommissionTable: () => void;
}

export const CommissionQuickActionsCard: React.FC<CommissionQuickActionsCardProps> = ({
  onUpdateRetailPrices,
  onAdjustScRates,
  onExportCommissionTable,
}) => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4 flex flex-col justify-between"
      style={{ borderColor: colors.border }}
    >
      <h4 className="font-bold text-gray-900 text-sm">Quick Actions</h4>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={onUpdateRetailPrices}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs"
        >
          Update Retail Prices
        </button>

        <button
          type="button"
          onClick={onAdjustScRates}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-amber-50 text-amber-600 border border-amber-300 font-bold text-xs transition"
        >
          Adjust SC Rates
        </button>

        <button
          type="button"
          onClick={onExportCommissionTable}
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs transition"
        >
          Export Commission Table
        </button>
      </div>
    </div>
  );
};
