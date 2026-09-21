import React, { useState, useEffect } from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, RotateCw, FileSpreadsheet } from "lucide-react";

interface GeneratingPricingReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: { scope: string; format: string; period: string } | null;
}

export const GeneratingPricingReportModal: React.FC<GeneratingPricingReportModalProps> = ({
  open,
  onOpenChange,
  config,
}) => {
  const [progress, setProgress] = useState(20);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setProgress(20);
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

  const filename = `Commission_Pricing_Jun2026.${config?.format || "xlsx"}`;

  const handleDownload = () => {
    const blob = new Blob(["Simkash Enterprise Pro Pricing & Commission Report Export Data"], {
      type: "text/plain",
    });
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
      <div className="py-2 text-center text-xs">
        {!isDone ? (
          /* Screen 3: Generating report */
          <div className="space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-700">
              <RotateCw className="w-5 h-5 animate-spin" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">Generating report...</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Compiling commission data for 12 SCs and 247 APs.
              </p>
            </div>

            {/* Blue Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          /* Screen 4: Report Ready! */
          <div className="space-y-4 pt-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900">Report Ready!</h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Your Commission & Pricing Report has been generated successfully.
              </p>
            </div>

            {/* File Info Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">{filename}</span>
                <span className="text-[10px] text-slate-400">12 SCs · 247 APs · Jun 2026 · Excel</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="w-full py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-slate-800 text-white font-bold text-xs transition"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </AppModal>
  );
};
