import { AppModal } from "@/components/common/AppModal";
import { Check, FileSpreadsheet, Download } from "lucide-react";
import { toast } from "sonner";

interface ExportReportSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileName?: string;
  onGenerateAnother?: () => void;
}

export function ExportReportSuccessModal({
  open,
  onOpenChange,
  fileName = "commission_report_jun2026.xlsx",
  onGenerateAnother,
}: ExportReportSuccessModalProps) {
  const handleDownload = () => {
    toast.success(`Downloading ${fileName}...`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-2 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">
            Report Generated Successfully
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Your custom commission dataset is ready for download.
          </p>
        </div>

        {/* File Card */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-xs text-slate-900 block font-mono">
                {fileName}
              </span>
              <span className="text-[11px] text-slate-400">48 KB · Excel Spreadsheet</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download</span>
          </button>
        </div>

        <div className="space-y-2 pt-2">
          {onGenerateAnother && (
            <button
              type="button"
              onClick={onGenerateAnother}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 block mx-auto"
            >
              Generate Another Report
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default ExportReportSuccessModal;
