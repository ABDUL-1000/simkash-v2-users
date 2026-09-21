import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { FileText, Download, Calendar, CheckSquare } from "lucide-react";

interface DownloadStatementModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (range: string, format: "pdf" | "csv") => void;
}

export const DownloadStatementModal: React.FC<DownloadStatementModalProps> = ({
  open,
  onClose,
  onGenerate,
}) => {
  const [range, setRange] = useState("last-6-months");
  const [format, setFormat] = useState<"pdf" | "csv">("pdf");
  const [scope, setScope] = useState<string>("all");

  const ranges = [
    { id: "this-month", label: "This Month (June 2026)" },
    { id: "last-3-months", label: "Last 3 Months" },
    { id: "last-6-months", label: "Last 6 Months (Jan – Jun 2026)" },
    { id: "all-time", label: "All Time" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(range, format);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Download Wallet Statement"
      description="Export verified enterprise ledger records for accounting and tax reconciliation."
      size="md"
      footer={null}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Date Range Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Date Period
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ranges.map((r) => (
              <div
                key={r.id}
                onClick={() => setRange(r.id)}
                className={`p-2.5 rounded-xl border cursor-pointer text-xs transition ${
                  range === r.id
                    ? "border-blue-600 bg-blue-50/50 font-bold text-blue-900"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                }`}
              >
                {r.label}
              </div>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Document Format
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div
              onClick={() => setFormat("pdf")}
              className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center gap-2 transition ${
                format === "pdf"
                  ? "border-blue-600 bg-blue-50/50 font-bold text-blue-900 ring-1 ring-blue-500"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FileText className="w-4 h-4 text-rose-600" />
              <div>
                <div>PDF Document</div>
                <div className="text-[10px] text-slate-400 font-normal">Official signed report</div>
              </div>
            </div>

            <div
              onClick={() => setFormat("csv")}
              className={`p-3 rounded-xl border cursor-pointer text-xs flex items-center gap-2 transition ${
                format === "csv"
                  ? "border-blue-600 bg-blue-50/50 font-bold text-blue-900 ring-1 ring-blue-500"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <div>
                <div>Excel / CSV</div>
                <div className="text-[10px] text-slate-400 font-normal">Raw ledger rows</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scope Options */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
            Transaction Scope
          </label>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Inflow & Outflow Activities</option>
            <option value="earnings">Earnings & Margin Only</option>
            <option value="payouts">Bank Payouts Only</option>
            <option value="reinvest">SIM Stock & Balance Payments</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Generate Statement
          </button>
        </div>
      </form>
    </AppModal>
  );
};
