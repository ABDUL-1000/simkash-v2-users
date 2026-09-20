import { useState } from "react";
import {
  Database,
  Download,
  Send,
  List,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface ExportInventoryReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloaded?: (fileName: string) => void;
}

export function ExportInventoryReportModal({
  open,
  onOpenChange,
  onDownloaded,
}: ExportInventoryReportModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [selectedReport, setSelectedReport] = useState("snapshot");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [dateRange, setDateRange] = useState<"This Month" | "Last 3 Months" | "All Time">(
    "This Month"
  );
  const [fromDate, setFromDate] = useState("01 / 06 / 2026");
  const [toDate, setToDate] = useState("30 / 06 / 2026");
  const [groupBy, setGroupBy] = useState<"Date" | "AP" | "SIM Type">("Date");

  const reports = [
    {
      id: "snapshot",
      title: "Current Stock Snapshot",
      desc: "All types, networks, quantities",
      icon: <Database className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "received",
      title: "Stock Received",
      desc: "All batches received from Admin",
      icon: <Download className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: "distributions",
      title: "Distributions to APs",
      desc: "All stock sent to your 12 APs",
      icon: <Send className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "complete",
      title: "Complete History",
      desc: "All events including adjustments",
      icon: <List className="w-5 h-5 text-slate-600" />,
    },
  ];

  const currentReportObj =
    reports.find((r) => r.id === selectedReport) || reports[0];

  const fileName =
    selectedReport === "snapshot"
      ? "inventory_history_jun2026.csv"
      : `${selectedReport}_report_jun2026.${format.toLowerCase()}`;

  const handleGenerate = () => {
    setStep(2);
  };

  const handleDownload = () => {
    onDownloaded?.(fileName);
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => {
        if (!v) setStep(1);
        onOpenChange(v);
      }}
      title="Export Inventory Report"
      description="Download your stock records"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      {step === 1 ? (
        /* ========================================================================= */
        /* STEP 1: CONFIGURE EXPORT OPTIONS */
        /* ========================================================================= */
        <div className="space-y-4 pt-1 text-xs">
          {/* 4 REPORT TYPE CARDS */}
          <div className="space-y-2">
            {reports.map((r) => {
              const isSelected = selectedReport === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedReport(r.id)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                      {r.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">
                        {r.title}
                      </div>
                      <div className="text-[11px] text-slate-500">{r.desc}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              );
            })}
          </div>

          {/* FORMAT PILLS */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Format
            </span>
            <div className="flex gap-2">
              {(["CSV", "Excel", "PDF"] as const).map((fmt) => {
                const isSelected = format === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DATE RANGE PILLS */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Date Range
            </span>
            <div className="flex flex-wrap gap-2">
              {(["This Month", "Last 3 Months", "All Time"] as const).map((dr) => {
                const isSelected = dateRange === dr;
                return (
                  <button
                    key={dr}
                    type="button"
                    onClick={() => setDateRange(dr)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {dr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FROM / TO DATE INPUTS */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                From
              </label>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                To
              </label>
              <input
                type="text"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* GROUP BY */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Group By
            </span>
            <div className="flex gap-2">
              {(["Date", "AP", "SIM Type"] as const).map((gb) => {
                const isSelected = groupBy === gb;
                return (
                  <button
                    key={gb}
                    type="button"
                    onClick={() => setGroupBy(gb)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {gb}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUMMARY ROW */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <FileText className="w-4 h-4 text-slate-400 shrink-0" />
            <span>~87 events · Jun 2026</span>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              Generate Export
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* STEP 2: DOWNLOAD READY SCREEN */
        /* ========================================================================= */
        <div className="space-y-4 pt-1 text-xs">
          {/* SELECTED REPORT CARD */}
          <div className="p-3 rounded-2xl border border-blue-600 bg-blue-50/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0">
                {currentReportObj.icon}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">
                  {currentReportObj.title}
                </div>
                <div className="text-[11px] text-slate-500">
                  {currentReportObj.desc}
                </div>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>

          {/* METADATA SUMMARY ROW */}
          <div className="flex items-center justify-between text-xs px-1 text-slate-600">
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                Format
              </span>
              <strong className="text-slate-900">{format}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                Date Range
              </span>
              <strong className="text-slate-900">{dateRange}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                Group By
              </span>
              <strong className="text-slate-900">{groupBy}</strong>
            </div>
          </div>

          {/* DOWNLOAD FILE READY CARD */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-xs">
                  {fileName}
                </div>
                <div className="text-[11px] text-slate-500">
                  Generated just now · 87 events
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Download
            </button>
          </div>

          {/* FOOTER CLOSE BUTTON */}
          <div className="pt-2 flex justify-center border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
