import React, { useState, useEffect } from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, Download, Loader2, FileSpreadsheet } from "lucide-react";

interface ExportReportProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: { scope: string; format: string; period: string } | null;
}

export const ExportReportProgressModal: React.FC<ExportReportProgressModalProps> = ({
  open,
  onOpenChange,
  config,
}) => {
  const [progress, setProgress] = useState(15);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setProgress(15);
      setIsDone(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        return prev + 25;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [open]);

  const filename = `simkash-network-report-${config?.period || "may-2026"}.${config?.format || "xlsx"}`;

  const handleDownload = () => {
    const blob = new Blob(["Mock network report export data"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onOpenChange(false);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto border transition-colors ${
            isDone
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-blue-50 text-blue-600 border-blue-100"
          }`}
        >
          {isDone ? <CheckCircle2 className="w-7 h-7" /> : <Loader2 className="w-7 h-7 animate-spin" />}
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">
            {isDone ? "Report Ready for Download!" : "Compiling Network Report..."}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isDone
              ? "Your export file is prepared and ready to download."
              : "Structuring performance metrics across 12 SCs and 247 APs..."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 text-left">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span className="font-bold text-slate-800">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isDone ? "bg-emerald-500" : "bg-blue-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* File Details */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <span className="text-xs font-bold text-slate-800 block truncate">{filename}</span>
            <span className="text-[11px] text-slate-400">Estimated size: ~142 KB</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            type="button"
            disabled={!isDone}
            onClick={handleDownload}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition ${
              isDone
                ? "bg-[#1F3A5F] text-white hover:bg-slate-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
