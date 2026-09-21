import React from "react";
import { Switch } from "antd";

interface BulkRateToggleBarProps {
  bulkApply: boolean;
  onToggleBulkApply: (checked: boolean) => void;
  onResetAll: () => void;
  onSaveAll: () => void;
  hasChanges?: boolean;
}

export const BulkRateToggleBar: React.FC<BulkRateToggleBarProps> = ({
  bulkApply,
  onToggleBulkApply,
  onResetAll,
  onSaveAll,
  hasChanges = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
      {/* Toggle */}
      <div className="flex items-center gap-3">
        <Switch
          checked={bulkApply}
          onChange={onToggleBulkApply}
          className="bg-slate-300"
        />
        <span className="text-xs font-bold text-slate-800">
          Apply same rate to all SCs?
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onResetAll}
          className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Reset All to 8%
        </button>

        <button
          type="button"
          onClick={onSaveAll}
          disabled={!hasChanges}
          className="px-5 py-2 rounded-xl bg-[#1E3A5F] hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save All Rates
        </button>
      </div>
    </div>
  );
};
