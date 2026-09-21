import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Download, FileSpreadsheet, FileText, CheckSquare, Square } from "lucide-react";

interface ExportNetworkReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartExport: (config: { scope: string; format: string; period: string }) => void;
}

export const ExportNetworkReportModal: React.FC<ExportNetworkReportModalProps> = ({
  open,
  onOpenChange,
  onStartExport,
}) => {
  const [scope, setScope] = useState("all");
  const [format, setFormat] = useState<"xlsx" | "csv" | "pdf">("xlsx");
  const [period, setPeriod] = useState("current_month");

  const [includes, setIncludes] = useState({
    scOverview: true,
    apDirectory: true,
    simInventory: true,
    activations: true,
    commissions: true,
    statusHistory: false,
  });

  const toggleInclude = (key: keyof typeof includes) => {
    setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    onOpenChange(false);
    onStartExport({ scope, format, period });
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Export Network Report</h3>
            <p className="text-xs text-slate-500">Generate formatted spreadsheets and performance audits</p>
          </div>
        </div>

        {/* Scope and Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Export Scope</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600"
            >
              <option value="all">Full Network (12 SCs, 247 APs)</option>
              <option value="sc_only">State Coordinators Only (12 SCs)</option>
              <option value="ap_only">Agency Partners Only (247 APs)</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Time Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600"
            >
              <option value="current_month">Current Month (May 2026)</option>
              <option value="last_month">Last Month (April 2026)</option>
              <option value="q2">Q2 2026 (Apr - Jun)</option>
              <option value="all_time">All-Time Cumulative</option>
            </select>
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">File Format</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "xlsx", label: "Excel (.xlsx)", icon: FileSpreadsheet },
              { key: "csv", label: "CSV (.csv)", icon: FileSpreadsheet },
              { key: "pdf", label: "PDF Summary", icon: FileText },
            ].map((fmt) => {
              const Icon = fmt.icon;
              return (
                <button
                  key={fmt.key}
                  type="button"
                  onClick={() => setFormat(fmt.key as any)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-medium border transition ${
                    format === fmt.key
                      ? "bg-[#1F3A5F] text-white border-[#1F3A5F]"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{fmt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Include Checkboxes */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
            Include in Report
          </span>
          <div className="grid grid-cols-2 gap-2 text-slate-700">
            {[
              { key: "scOverview", label: "SC Overview & Margin" },
              { key: "apDirectory", label: "Agency Partner Directory" },
              { key: "simInventory", label: "SIM Stock & Depletion" },
              { key: "activations", label: "Activations Breakdown" },
              { key: "commissions", label: "Commission & Payouts" },
              { key: "statusHistory", label: "Suspensions & Alerts" },
            ].map((item) => {
              const checked = includes[item.key as keyof typeof includes];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleInclude(item.key as keyof typeof includes)}
                  className="flex items-center gap-2 text-left text-xs hover:text-slate-900"
                >
                  {checked ? (
                    <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 transition"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Export</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
