import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Square, FileText } from "lucide-react";

interface ExportPricingReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartExport: (cfg: { scope: string; format: string; period: string }) => void;
}

const scopeOptions = [
  { key: "full", label: "Full Report", subtext: "Commission table + pricing + SC/AP rates + margin analysis" },
  { key: "commission", label: "Commission Table Only", subtext: "SC/AP commission breakdown" },
  { key: "pricing", label: "Pricing Analysis", subtext: "Retail prices, wholesale, margins" },
  { key: "sc_history", label: "SC Rate History", subtext: "Commission rate changes over time" },
  { key: "ap_report", label: "AP Rate Report", subtext: "AP rates across EP network" },
];

const includeOptions = [
  { key: "scName", label: "SC name and commission rate" },
  { key: "apCount", label: "AP count and activation counts" },
  { key: "pricing", label: "Retail and wholesale per SIM type" },
  { key: "marginPerSim", label: "Margin per SIM and total" },
  { key: "scComm", label: "SC commission amounts" },
  { key: "netEp", label: "Net EP earnings after commission" },
  { key: "momCompare", label: "Month-over-month comparison" },
  { key: "apBreakdown", label: "AP-level breakdown" },
];

export const ExportPricingReportModal: React.FC<ExportPricingReportModalProps> = ({
  open,
  onOpenChange,
  onStartExport,
}) => {
  const [scope, setScope] = useState("full");
  const [format, setFormat] = useState<"xlsx" | "csv" | "pdf">("xlsx");
  const [period, setPeriod] = useState("this_month");
  const [includes, setIncludes] = useState<Record<string, boolean>>({
    scName: true, apCount: true, pricing: true, marginPerSim: true,
    scComm: true, netEp: true, momCompare: true, apBreakdown: true,
  });

  const toggleInclude = (key: string) => {
    setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    onOpenChange(false);
    onStartExport({ scope, format, period });
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3 pt-1 text-xs">
        <h3 className="text-sm font-bold text-slate-900">Export Commission & Pricing Report</h3>

        {/* SELECT SCOPE */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            SELECT SCOPE
          </span>
          <div className="space-y-1.5">
            {scopeOptions.map((opt) => {
              const isSelected = scope === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setScope(opt.key)}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl border text-left transition ${
                    isSelected ? "border-blue-500 bg-blue-50/40" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? "border-blue-600" : "border-slate-300"
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{opt.label}</span>
                    <span className="text-[10px] text-slate-400">{opt.subtext}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* INCLUDE IN EXPORT */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            INCLUDE IN EXPORT
          </span>
          <div className="space-y-0.5">
            {includeOptions.map((item) => {
              const isChecked = !!includes[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleInclude(item.key)}
                  className="w-full flex items-center gap-2 text-left py-0.5 hover:text-slate-900 text-xs"
                >
                  {isChecked ? (
                    <div className="w-3.5 h-3.5 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                      ✓
                    </div>
                  ) : (
                    <Square className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  )}
                  <span className="text-[11px] text-slate-700">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FORMAT & PERIOD */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              FORMAT
            </span>
            <div className="flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
              {(["xlsx", "csv", "pdf"] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                    format === fmt ? "bg-[#1E3A5F] text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {fmt === "xlsx" ? "Excel" : fmt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              PERIOD
            </span>
            <div className="flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
              {(["this_month", "all_time", "custom"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${
                    period === p ? "bg-[#1E3A5F] text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {p === "this_month" ? "This Month" : p === "all_time" ? "All Time" : "Custom"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Note */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>Preview: 12 SCs · 247 APs · Jun 2026</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50 text-[11px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="flex-1 py-2 rounded-xl bg-[#1E3A5F] text-white font-bold hover:bg-slate-800 transition text-[11px]"
          >
            Generate Export
          </button>
        </div>
      </div>
    </AppModal>
  );
};
