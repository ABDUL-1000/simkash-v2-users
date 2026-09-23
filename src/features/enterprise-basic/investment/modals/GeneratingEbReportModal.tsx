import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, Download } from "lucide-react";

interface GeneratingEbReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GeneratingEbReportModal: React.FC<GeneratingEbReportModalProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="py-2 text-center space-y-4 text-xs">
        <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-base font-extrabold text-slate-900">Report Generated!</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Your export has been compiled and is ready for download.
          </p>
        </div>

        {/* Details Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-left font-medium">
          <div className="flex justify-between text-slate-600">
            <span>Report</span>
            <span className="font-bold text-slate-900">Full Report</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Format</span>
            <span className="font-semibold text-slate-900">PDF Document</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Period</span>
            <span className="font-semibold text-slate-900">All Time</span>
          </div>
          <div className="flex justify-between text-slate-600 pt-1.5 border-t border-slate-200">
            <span>Size</span>
            <span className="font-bold text-blue-600">12 pages · 2.4 MB</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Your download will start automatically.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition inline-flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Again</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#152a45] text-white font-bold transition shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
};
