import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { Download, FileSpreadsheet, FileText, Check } from "lucide-react";

interface CaExportHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportSuccess: (format: string, dateRange: string) => void;
}

export function CaExportHistoryModal({
  open,
  onOpenChange,
  onExportSuccess,
}: CaExportHistoryModalProps) {
  const [format, setFormat] = useState<"csv" | "excel">("csv");
  const [dateRange, setDateRange] = useState("This Month");
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      onOpenChange(false);
      onExportSuccess(format.toUpperCase(), dateRange);
    }, 700);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Activation History"
      description="Download your activation records, commissions, and subscriber data."
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Format Selection */}
        <div className="space-y-2">
          <label
            className="text-[11px] font-black uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Export Format
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setFormat("csv")}
              className="p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between"
              style={{
                borderColor:
                  format === "csv"
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.greys.stroke,
                borderWidth: format === "csv" ? "2px" : "1px",
                backgroundColor:
                  format === "csv" ? "#F8FAFC" : APP_COLORS.backgrounds.background,
              }}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="size-5 text-blue-600" />
                <div>
                  <div className="font-bold text-slate-900">CSV Spreadsheet</div>
                  <div className="text-[10px] text-slate-400">Comma separated values</div>
                </div>
              </div>
              {format === "csv" && <Check className="size-4 text-blue-600 stroke-[3]" />}
            </div>

            <div
              onClick={() => setFormat("excel")}
              className="p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between"
              style={{
                borderColor:
                  format === "excel"
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.greys.stroke,
                borderWidth: format === "excel" ? "2px" : "1px",
                backgroundColor:
                  format === "excel" ? "#F8FAFC" : APP_COLORS.backgrounds.background,
              }}
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="size-5 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900">Excel (.xlsx)</div>
                  <div className="text-[10px] text-slate-400">Microsoft Excel format</div>
                </div>
              </div>
              {format === "excel" && <Check className="size-4 text-blue-600 stroke-[3]" />}
            </div>
          </div>
        </div>

        {/* Date Range Selection */}
        <div className="space-y-2">
          <label
            className="text-[11px] font-black uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Date Range
          </label>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full rounded-xl border p-2.5 bg-white font-bold text-slate-800 outline-hidden cursor-pointer"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <option value="Today">Today Only</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month (Jun 2026 - 312 records)</option>
            <option value="Last Month">Last Month</option>
            <option value="All Time">All Time (2,847 records)</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={exporting}
            className="px-4 py-2.5 rounded-xl border font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="px-6 py-2.5 rounded-xl font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            <Download className={`size-3.5 ${exporting ? "animate-bounce" : ""}`} />
            <span>{exporting ? "Generating Report..." : "Download Export"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
