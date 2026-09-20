import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Calendar, CheckCircle2, FileText } from "lucide-react";

interface ScDownloadStatementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadSuccess?: () => void;
}

export function ScDownloadStatementModal({
  open,
  onOpenChange,
  onDownloadSuccess,
}: ScDownloadStatementModalProps) {
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [range, setRange] = useState<
    "Today" | "This Week" | "This Month" | "Last 3 Months" | "All Time"
  >("This Month");
  const [startDate, setStartDate] = useState("01/06/2026");
  const [endDate, setEndDate] = useState("30/06/2026");

  const [includes, setIncludes] = useState({
    apCommission: true,
    bonusPayments: true,
    payoutRecords: true,
    billPayments: true,
    failedTransactions: true,
    runningBalance: true,
  });

  const [pdfOnly, setPdfOnly] = useState({
    summaryChart: true,
    apNetworkBreakdown: true,
    accountHeader: true,
  });

  const [isGenerated, setIsGenerated] = useState(false);

  const handleToggleInclude = (key: keyof typeof includes) => {
    setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTogglePdfOnly = (key: keyof typeof pdfOnly) => {
    setPdfOnly((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    onDownloadSuccess?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Download Statement"
      description="Export your earnings history"
      size="md"
    >
      <form onSubmit={handleGenerate} className="space-y-4 pt-1 text-xs">
        {/* Format Section */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Format
          </label>
          <div className="flex flex-wrap gap-2">
            {(["PDF", "Excel", "CSV"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                  format === fmt
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Date Range
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                "Today",
                "This Week",
                "This Month",
                "Last 3 Months",
                "All Time",
              ] as const
            ).map((rng) => (
              <button
                key={rng}
                type="button"
                onClick={() => setRange(rng)}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                  range === rng
                    ? "bg-[#0F152A] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {rng}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>
        </div>

        {/* Include Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Include
          </label>
          <div className="space-y-1.5 font-medium text-[#0F152A]">
            {[
              { key: "apCommission", label: "AP commission transactions" },
              { key: "bonusPayments", label: "Bonus payments" },
              { key: "payoutRecords", label: "Payout records" },
              { key: "billPayments", label: "Bill payments (personal)" },
              { key: "failedTransactions", label: "Failed transactions" },
              { key: "runningBalance", label: "Running wallet balance per row" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={includes[key as keyof typeof includes]}
                  onChange={() =>
                    handleToggleInclude(key as keyof typeof includes)
                  }
                  className="size-4 rounded border-[#E2ECF6] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* PDF ONLY Section */}
        {format === "PDF" && (
          <div className="space-y-2 pt-1 border-t border-[#E2ECF6]">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              PDF ONLY
            </label>
            <div className="space-y-1.5 font-medium text-[#0F152A]">
              {[
                { key: "summaryChart", label: "Earnings summary chart" },
                { key: "apNetworkBreakdown", label: "AP network breakdown table" },
                { key: "accountHeader", label: "Account details header" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={pdfOnly[key as keyof typeof pdfOnly]}
                    onChange={() =>
                      handleTogglePdfOnly(key as keyof typeof pdfOnly)
                    }
                    className="size-4 rounded border-[#E2ECF6] text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-xs">{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Estimation pill */}
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-xs text-[#66738C] flex items-center gap-2 font-medium">
          <FileText className="size-4 text-[#8C909B] shrink-0" />
          <span>~67 transactions . Jun 2026 . Est. 5 pages ({format})</span>
        </div>

        {/* Download Ready Banner if generated */}
        {isGenerated && (
          <div className="space-y-1.5 pt-1">
            <div className="rounded-xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#10B981]" />
                <span className="font-mono text-xs font-bold text-[#0F152A]">
                  wallet_statement_jun2026.pdf
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert("Downloading statement...")}
                className="text-xs font-extrabold text-[#2563EB] hover:underline"
              >
                Download
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsGenerated(false)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Generate Another
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition"
          >
            Generate & Download
          </button>
        </div>
      </form>
    </AppModal>
  );
}
