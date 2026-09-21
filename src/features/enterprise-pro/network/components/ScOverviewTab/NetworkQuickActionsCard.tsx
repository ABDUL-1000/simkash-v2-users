import React from "react";
import { UserPlus, Download, Bell, Send } from "lucide-react";
import { colors } from "@/constants/colors";

interface NetworkQuickActionsCardProps {
  onOnboardSc: () => void;
  onExportReport: () => void;
  onSendReminder: () => void;
  onDistributeSims: () => void;
}

export const NetworkQuickActionsCard: React.FC<NetworkQuickActionsCardProps> = ({
  onOnboardSc,
  onExportReport,
  onSendReminder,
  onDistributeSims,
}) => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <h4 className="font-bold text-gray-900 text-sm">Quick Actions</h4>

      <div className="space-y-2">
        <button
          type="button"
          onClick={onOnboardSc}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-blue-800 transition font-semibold text-xs border border-blue-200"
        >
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-4 h-4 text-blue-700" />
            <span>Onboard New SC</span>
          </div>
          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
            +Add
          </span>
        </button>

        <button
          type="button"
          onClick={onDistributeSims}
          className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-800 transition font-medium text-xs border border-slate-200"
        >
          <Send className="w-4 h-4 text-slate-600" />
          <span>Distribute SIMs to SCs</span>
        </button>

        <button
          type="button"
          onClick={onSendReminder}
          className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-800 transition font-medium text-xs border border-slate-200"
        >
          <Bell className="w-4 h-4 text-slate-600" />
          <span>Send Activation Reminder</span>
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-800 transition font-medium text-xs border border-slate-200"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export Network Report</span>
        </button>
      </div>
    </div>
  );
};
