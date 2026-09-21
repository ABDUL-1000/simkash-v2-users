import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { FileText, Download, CheckCircle2 } from "lucide-react";

interface StatementReadyModalProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const StatementReadyModal: React.FC<StatementReadyModalProps> = ({
  open,
  onClose,
  onDownload,
}) => {
  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900">Statement Generated</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your enterprise financial statement has been compiled and is ready for download.
          </p>
        </div>

        {/* File Card */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">EP-Statement-Jan-Jun2026.pdf</div>
              <div className="text-[10px] text-slate-500">248 KB · 142 Ledger Entries</div>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Verified
          </span>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>
      </div>
    </AppModal>
  );
};
