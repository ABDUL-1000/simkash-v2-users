import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Check, FileText } from "lucide-react";

interface ExportEbInvestmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateExport: (scope: string, format: string) => void;
}

export const ExportEbInvestmentModal: React.FC<ExportEbInvestmentModalProps> = ({
  open,
  onOpenChange,
  onGenerateExport,
}) => {
  const [scope, setScope] = useState("full");
  const [format, setFormat] = useState("pdf");
  const [period, setPeriod] = useState("all_time");

  const scopes = [
    {
      id: "full",
      title: "Full Report",
      desc: "Principal, P&L, commission table, instalment schedule — complete",
    },
    {
      id: "commission",
      title: "Commission Table",
      desc: "Buy vs sell breakdown per SIM type",
    },
    {
      id: "instalment",
      title: "Instalment History",
      desc: "All payments made and schedule",
    },
    {
      id: "tax",
      title: "Tax Statement",
      desc: "Gross revenue and costs formatted for tax filing",
    },
  ];

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Export Investment Report</h3>
          <p className="text-xs text-slate-400 mt-0.5">Download your investment data</p>
        </div>

        {/* Report Scope */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Report Scope
          </span>
          <div className="space-y-1.5">
            {scopes.map((s) => {
              const isSelected = scope === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScope(s.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-start justify-between transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/40"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 text-xs">{s.title}</div>
                    <div className="text-[11px] text-slate-500">{s.desc}</div>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Include Section */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Include
          </span>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
              <span>SIM type breakdown</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
              <span>Running P&L per period</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
              <span>Instalment payment history</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
              <span>Balance progression</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
              <span>Unsold stock value</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
              <span>ROI calculation</span>
            </label>
          </div>
        </div>

        {/* Export Format */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Export Format
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "excel", label: "Excel (.xlsx)" },
              { id: "csv", label: "CSV" },
              { id: "pdf", label: "PDF Document" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                className={`py-2 rounded-xl text-xs font-bold transition border ${
                  format === f.id
                    ? "bg-[#1E3A5F] text-white border-[#1E3A5F]"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reporting Period */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Reporting Period
          </span>
          <div className="flex gap-2">
            {["This Month", "All Time", "Custom"].map((p) => {
              const val = p.toLowerCase().replace(" ", "_");
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    period === val
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>All Time — Full data set · Est. 12 pages (PDF)</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onGenerateExport(scope, format)}
            className="flex-1 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#152a45] text-white font-bold transition shadow-xs"
          >
            Generate Export
          </button>
        </div>
      </div>
    </AppModal>
  );
};
