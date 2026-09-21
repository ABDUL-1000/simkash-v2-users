import React from "react";
import { Copy, History, Download, Zap } from "lucide-react";

interface ApQuickActionsCardProps {
  onCopyScRates: () => void;
  onViewRateHistory: () => void;
  onExportApReport: () => void;
}

export const ApQuickActionsCard: React.FC<ApQuickActionsCardProps> = ({
  onCopyScRates,
  onViewRateHistory,
  onExportApReport,
}) => {
  return (
    <div className="rounded-2xl p-5 border bg-white shadow-sm space-y-3.5">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-500" />
        <h4 className="font-bold text-gray-900 text-sm">Quick Actions</h4>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={onCopyScRates}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs transition border border-slate-200/70"
        >
          <Copy className="w-3.5 h-3.5 text-slate-500" />
          <span>Copy SC Rates to AP</span>
        </button>

        <button
          type="button"
          onClick={onViewRateHistory}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs transition border border-slate-200/70"
        >
          <History className="w-3.5 h-3.5 text-slate-500" />
          <span>View Rate History</span>
        </button>

        <button
          type="button"
          onClick={onExportApReport}
          className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs transition border border-slate-200/70"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export AP Report</span>
        </button>
      </div>
    </div>
  );
};
