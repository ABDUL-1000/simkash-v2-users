import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { FileText, Percent, BarChart3, Wallet, Check } from "lucide-react";
import { toast } from "sonner";

interface ExportInvestmentReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportInvestmentReportModal({
  open,
  onOpenChange,
}: ExportInvestmentReportModalProps) {
  const [reportType, setReportType] = useState<"full" | "comm" | "roi" | "balance">("full");
  const [format, setFormat] = useState<"pdf" | "xlsx" | "csv">("pdf");
  const [period, setPeriod] = useState("this-month");

  const [pdfOptions, setPdfOptions] = useState({
    roiCharts: true,
    commCharts: true,
    scCompare: true,
    timelineVisual: true,
    breakEven: true,
  });

  const toggleOption = (key: keyof typeof pdfOptions) => {
    setPdfOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    onOpenChange(false);
    toast.success("Investment analysis report generated and downloaded successfully");
  };

  const reportTypes = [
    { id: "full", title: "Full Investment Report", desc: "Principal, earnings, ROI, balance, all orders and commission history", icon: FileText },
    { id: "comm", title: "% Commission Report", desc: "Margin and network commission breakdown by SC, AP and SIM type", icon: Percent },
    { id: "roi", title: "ROI Analysis", desc: "Principal vs returns, break-even projections, monthly performance", icon: BarChart3 },
    { id: "balance", title: "Balance Report", desc: "All balance payments made and remaining balance over time", icon: Wallet },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Investment Report"
      description="Download your full investment analysis"
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* Report Type Selector */}
        <div className="space-y-1.5">
          {reportTypes.map((rt) => {
            const Icon = rt.icon;
            const isSel = reportType === rt.id;
            return (
              <div
                key={rt.id}
                onClick={() => setReportType(rt.id as any)}
                className={`p-2.5 rounded-xl border flex items-start justify-between cursor-pointer transition ${
                  isSel ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/20" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">{rt.title}</span>
                    <span className="text-[11px] text-slate-500">{rt.desc}</span>
                  </div>
                </div>
                {isSel && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
              </div>
            );
          })}
        </div>

        {/* Export Format */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Export Format
          </span>
          <div className="flex gap-2">
            {[
              { id: "pdf", label: "PDF Document" },
              { id: "xlsx", label: "Excel (.xlsx)" },
              { id: "csv", label: "CSV" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                  format === f.id ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reporting Period */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Reporting Period
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "this-month", label: "This Month" },
              { id: "last-3", label: "Last 3 Months" },
              { id: "this-year", label: "This Year" },
              { id: "all-time", label: "All Time" },
              { id: "custom", label: "Custom" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  period === p.id ? "bg-emerald-50 text-emerald-700 border border-emerald-300" : "bg-slate-100 text-slate-600"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* PDF Options */}
        {format === "pdf" && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Include PDF Options
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pdfOptions.roiCharts} onChange={() => toggleOption("roiCharts")} className="rounded text-blue-600" />
                <span>ROI projection charts</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pdfOptions.commCharts} onChange={() => toggleOption("commCharts")} className="rounded text-blue-600" />
                <span>Commission breakdown charts</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pdfOptions.scCompare} onChange={() => toggleOption("scCompare")} className="rounded text-blue-600" />
                <span>SC performance comparison</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pdfOptions.timelineVisual} onChange={() => toggleOption("timelineVisual")} className="rounded text-blue-600" />
                <span>Investment timeline visual</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={pdfOptions.breakEven} onChange={() => toggleOption("breakEven")} className="rounded text-blue-600" />
                <span>Break-even analysis page</span>
              </label>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            All investment data · Jan 2026 - Jun 2026 · Est. 14 pages (PDF)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-sm"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
export default ExportInvestmentReportModal;
