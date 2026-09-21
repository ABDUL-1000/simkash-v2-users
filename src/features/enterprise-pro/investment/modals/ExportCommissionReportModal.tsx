import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Table, Users, Layers, Check } from "lucide-react";

interface ExportCommissionReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateSuccess: (filename: string) => void;
}

export function ExportCommissionReportModal({
  open,
  onOpenChange,
  onGenerateSuccess,
}: ExportCommissionReportModalProps) {
  const [scope, setScope] = useState<"full" | "sc" | "sim">("full");
  const [format, setFormat] = useState<"xlsx" | "csv" | "pdf">("xlsx");
  const [period, setPeriod] = useState<string>("this-month");

  const [columns, setColumns] = useState({
    scDetails: true,
    apCount: true,
    acts: true,
    wholesale: true,
    retail: true,
    margin: true,
    totalMargin: true,
    commRate: true,
    commAmount: true,
    totalEarnings: true,
    shareEarnings: true,
    momCompare: true,
    chartBreakdown: false,
    chartCompare: false,
    roiSummary: false,
    headerSummary: false,
  });

  const toggleCol = (k: keyof typeof columns) => {
    setColumns((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const handleGenerate = () => {
    onOpenChange(false);
    onGenerateSuccess("commission_report_jun2026.xlsx");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Commission Report"
      description="Download your full earnings breakdown"
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Report Scope Cards */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Report Scope
          </span>
          <div className="space-y-1.5">
            <div
              onClick={() => setScope("full")}
              className={`p-2.5 rounded-xl border flex items-start justify-between cursor-pointer transition ${
                scope === "full" ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Table className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">Full Commission Table</span>
                  <span className="text-[11px] text-slate-500">
                    All SCs, APs, margin per SIM, network commission, total earnings — complete data set
                  </span>
                </div>
              </div>
              {scope === "full" && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />}
            </div>

            <div
              onClick={() => setScope("sc")}
              className={`p-2.5 rounded-xl border flex items-start justify-between cursor-pointer transition ${
                scope === "sc" ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">SC-Level Summary</span>
                  <span className="text-[11px] text-slate-500">Per-SC totals only — no AP or SIM type breakdown</span>
                </div>
              </div>
              {scope === "sc" && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />}
            </div>

            <div
              onClick={() => setScope("sim")}
              className={`p-2.5 rounded-xl border flex items-start justify-between cursor-pointer transition ${
                scope === "sim" ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/20" : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs">By SIM Type</span>
                  <span className="text-[11px] text-slate-500">Earnings grouped by POS, CCTV, GPS and Router SIM types</span>
                </div>
              </div>
              {scope === "sim" && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />}
            </div>
          </div>
        </div>

        {/* Columns Checkbox Grid */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Columns to Include
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.scDetails} onChange={() => toggleCol("scDetails")} className="rounded text-blue-600" />
              <span>SC name/state/details</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.apCount} onChange={() => toggleCol("apCount")} className="rounded text-blue-600" />
              <span>AP count per SC</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.acts} onChange={() => toggleCol("acts")} className="rounded text-blue-600" />
              <span>Activation counts</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.wholesale} onChange={() => toggleCol("wholesale")} className="rounded text-blue-600" />
              <span>Simkash wholesale price</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.retail} onChange={() => toggleCol("retail")} className="rounded text-blue-600" />
              <span>Your retail price</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.margin} onChange={() => toggleCol("margin")} className="rounded text-blue-600" />
              <span>Margin per SIM</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.totalMargin} onChange={() => toggleCol("totalMargin")} className="rounded text-blue-600" />
              <span>Total margin earnings</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.commRate} onChange={() => toggleCol("commRate")} className="rounded text-blue-600" />
              <span>Network comm rate %</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={columns.totalEarnings} onChange={() => toggleCol("totalEarnings")} className="rounded text-blue-600" />
              <span>Total earnings per SC</span>
            </label>
          </div>
        </div>

        {/* Export Format */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Export Format
          </span>
          <div className="flex gap-2">
            {[
              { id: "xlsx", label: "Excel (.xlsx)" },
              { id: "csv", label: "CSV" },
              { id: "pdf", label: "PDF Document" },
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

        {/* Footer info & action */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400">
            12 SCs · 247 APs · Jun 2026 · Est. 8 pages (PDF) or 317 rows (Excel)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-sm"
            >
              Generate Export
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
export default ExportCommissionReportModal;
