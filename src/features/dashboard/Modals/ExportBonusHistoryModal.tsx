import { useState } from "react";
import { Check,  Download, FileText, Trophy, Users } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ExportBonusHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ExportBonusHistoryModal({
  open,
  onOpenChange,
  onSuccess,
}: ExportBonusHistoryModalProps) {
  const [step, setStep] = useState<"config" | "ready">("config");
  const [scope, setScope] = useState<"my-bonus" | "ap-network" | "complete">("my-bonus");
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [period, setPeriod] = useState<"This Year" | "6 Months" | "All Time">("All Time");

  // Checkboxes
  const [includeChart, setIncludeChart] = useState(true);
  const [includeLeaderboard, setIncludeLeaderboard] = useState(true);
  const [includeBreakdown, setIncludeBreakdown] = useState(true);

  const [generating, setGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setStep("ready");
      onSuccess?.();
    }, 1200);
  };

  const handleReset = () => {
    setStep("config");
  };

  const handleClose = () => {
    setStep("config");
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Bonus History"
      description="Download your bonus records"
      size="md"
    >
      {step === "config" ? (
        <form onSubmit={handleGenerate} className="space-y-4 pt-1 text-xs">
          {/* SELECT SCOPE Cards (Matching Image 2) */}
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SELECT SCOPE
            </span>

            <div className="space-y-2">
              {/* Option 1: My Bonus History */}
              <div
                onClick={() => setScope("my-bonus")}
                className={`flex items-center justify-between rounded-2xl border p-3.5 cursor-pointer transition ${
                  scope === "my-bonus"
                    ? "border-[#2563EB] bg-blue-50/20 shadow-xs"
                    : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#F59E0B]">
                    <Trophy className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">My Bonus History</h4>
                    <p className="text-[11px] font-medium text-[#8C909B]">
                      Your SC bonus periods, targets, amounts and payout dates
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={scope === "my-bonus"}
                  onChange={() => setScope("my-bonus")}
                  className="size-4 text-[#2563EB] accent-[#2563EB]"
                />
              </div>

              {/* Option 2: AP Network Bonus */}
              <div
                onClick={() => setScope("ap-network")}
                className={`flex items-center justify-between rounded-2xl border p-3.5 cursor-pointer transition ${
                  scope === "ap-network"
                    ? "border-[#2563EB] bg-blue-50/20 shadow-xs"
                    : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">AP Network Bonus</h4>
                    <p className="text-[11px] font-medium text-[#8C909B]">
                      All APs bonus status per period, hit/miss rates, total paid out
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={scope === "ap-network"}
                  onChange={() => setScope("ap-network")}
                  className="size-4 text-[#2563EB] accent-[#2563EB]"
                />
              </div>

              {/* Option 3: Complete Bonus Report */}
              <div
                onClick={() => setScope("complete")}
                className={`flex items-center justify-between rounded-2xl border p-3.5 cursor-pointer transition ${
                  scope === "complete"
                    ? "border-[#2563EB] bg-blue-50/20 shadow-xs"
                    : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D9990D]">
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">Complete Bonus Report</h4>
                    <p className="text-[11px] font-medium text-[#8C909B]">
                      My bonus + all AP network bonus
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={scope === "complete"}
                  onChange={() => setScope("complete")}
                  className="size-4 text-[#2563EB] accent-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* Format & Period Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Format Segmented */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                FORMAT
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-2xl bg-[#F8FAFC] p-1 border border-[#E2ECF6]">
                {(["PDF", "Excel", "CSV"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                      format === fmt
                        ? "bg-[#0F152A] text-white shadow-xs"
                        : "text-[#8C909B] hover:text-[#0F152A]"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Segmented */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                PERIOD
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-2xl bg-[#F8FAFC] p-1 border border-[#E2ECF6]">
                {(["This Year", "6 Months", "All Time"] as const).map((prd) => (
                  <button
                    key={prd}
                    type="button"
                    onClick={() => setPeriod(prd)}
                    className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                      period === prd
                        ? "bg-[#0F152A] text-white shadow-xs"
                        : "text-[#8C909B] hover:text-[#0F152A]"
                    }`}
                  >
                    {prd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* INCLUDE IN REPORT (PDF Only) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                INCLUDE IN REPORT
              </span>
              <span className="text-[10px] text-[#8C909B] font-medium">PDF only</span>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0F152A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeChart}
                  onChange={(e) => setIncludeChart(e.target.checked)}
                  className="size-4 rounded border-[#E2ECF6] accent-[#2563EB]"
                />
                <span>Performance bar chart</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0F152A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLeaderboard}
                  onChange={(e) => setIncludeLeaderboard(e.target.checked)}
                  className="size-4 rounded border-[#E2ECF6] accent-[#2563EB]"
                />
                <span>AP leaderboard table</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0F152A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBreakdown}
                  onChange={(e) => setIncludeBreakdown(e.target.checked)}
                  className="size-4 rounded border-[#E2ECF6] accent-[#2563EB]"
                />
                <span>Period-by-period breakdown</span>
              </label>
            </div>
          </div>

          {/* Info Pill */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-[11px] font-semibold text-[#8C909B] flex items-center gap-2">
            <FileText className="size-4 text-[#8C909B] shrink-0" />
            <span>8 periods + 23 APs · {period.toLowerCase()} · Est. 6 pages ({format})</span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={generating}
              className="rounded-2xl bg-[#2563EB] px-6 py-2.5 text-xs font-black text-white shadow-xs hover:bg-[#1D4ED8] disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate Export"}
            </button>
          </div>
        </form>
      ) : (
        /* Step 2: Export Ready (Matching Image 3) */
        <div className="space-y-6 pt-2 text-xs text-center">
          {/* Centered Checkmark Circle */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <Check className="size-10 text-[#10B981]" />
          </div>

          <h3 className="text-xl font-black text-[#0F152A]">Export Ready!</h3>

          {/* Download Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-left">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981]">
                <FileText className="size-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#0F152A]">
                  bonus_history_{period.toLowerCase().replace(/\s+/g, "_")}.pdf
                </h4>
                <p className="text-[10px] font-medium text-[#8C909B]">
                  3.2 MB · Generated just now
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Downloading bonus_history_all_time.pdf...")}
              className="flex items-center gap-1 text-xs font-extrabold text-[#2563EB] hover:underline"
            >
              <span>Download</span>
              <Download className="size-3.5" />
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-2xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Export Another
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl bg-[#2563EB] px-6 py-2.5 text-xs font-black text-white shadow-xs hover:bg-[#1D4ED8]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
