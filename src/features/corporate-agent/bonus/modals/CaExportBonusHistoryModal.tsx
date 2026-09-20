import { useState } from "react";
import { Check, Download, FileText, Trophy, Users } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface CaExportBonusHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CaExportBonusHistoryModal({
  open,
  onOpenChange,
  onSuccess,
}: CaExportBonusHistoryModalProps) {
  const [step, setStep] = useState<"config" | "ready">("config");
  const [scope, setScope] = useState<"my-bonus" | "ap-network" | "complete">("my-bonus");
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [period, setPeriod] = useState<"This Year" | "6 Months" | "All Time">("All Time");
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
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SELECT SCOPE
            </span>

            <div className="space-y-2">
              <div
                onClick={() => setScope("my-bonus")}
                className={`flex items-center justify-between rounded-2xl border p-3.5 cursor-pointer transition ${
                  scope === "my-bonus" ? "border-[#2563EB] bg-blue-50/20 shadow-xs" : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#F59E0B]">
                    <Trophy className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">My Bonus History</h4>
                    <p className="text-[11px] font-medium text-[#8C909B]">
                      Your bonus periods, targets and payout dates
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

              <div
                onClick={() => setScope("ap-network")}
                className={`flex items-center justify-between rounded-2xl border p-3.5 cursor-pointer transition ${
                  scope === "ap-network" ? "border-[#2563EB] bg-blue-50/20 shadow-xs" : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                    <Users className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">AP Network Bonus</h4>
                    <p className="text-[11px] font-medium text-[#8C909B]">
                      All APs bonus status per period and hit rate
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

              <div
                onClick={() => setScope("complete")}
                className={`flex items-center justify-between rounded-2xl border p-3.5 cursor-pointer transition ${
                  scope === "complete" ? "border-[#2563EB] bg-blue-50/20 shadow-xs" : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
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

          <div className="grid grid-cols-2 gap-4">
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
                      format === fmt ? "bg-[#0F152A] text-white shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                PERIOD
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-2xl bg-[#F8FAFC] p-1 border border-[#E2ECF6]">
                {(["This Year", "6 Months", "All Time"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPeriod(p)}
                    className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                      period === p ? "bg-[#0F152A] text-white shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              INCLUDE
            </span>
            <div className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
              {[
                { label: "Charts/data visualizations", checked: includeChart, onChange: setIncludeChart },
                { label: "Leaderboard summary", checked: includeLeaderboard, onChange: setIncludeLeaderboard },
                { label: "Detailed breakdown", checked: includeBreakdown, onChange: setIncludeBreakdown },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between gap-3 text-xs text-[#0F152A] font-medium">
                  <span>{item.label}</span>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={(e) => item.onChange(Boolean(e.target.checked))}
                    className="size-4 accent-[#2563EB]"
                  />
                </label>
              ))}
            </div>
          </div>

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
              className="rounded-2xl bg-[#2563EB] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-[#1D4ED8]"
              disabled={generating}
            >
              {generating ? "Generating..." : "Generate Export"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-4 flex items-center justify-center gap-3 text-[#10B981]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#10B981]/10">
              <Download className="size-5" />
            </div>
            <div className="text-center">
              <p className="font-extrabold text-sm text-[#0F152A]">Export Ready</p>
              <p className="text-[11px] font-medium text-[#66738C]">Your {format} file is prepared.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-2">
            <div className="flex items-center justify-between text-[#0F152A]">
              <span className="font-medium">Scope</span>
              <span className="font-bold">{scope}</span>
            </div>
            <div className="flex items-center justify-between text-[#0F152A]">
              <span className="font-medium">Format</span>
              <span className="font-bold">{format}</span>
            </div>
            <div className="flex items-center justify-between text-[#0F152A]">
              <span className="font-medium">Period</span>
              <span className="font-bold">{period}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-2xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl bg-[#10B981] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs hover:bg-[#059669]"
            >
              <span className="inline-flex items-center gap-2">
                <Check className="size-3.5" />
                Finished
              </span>
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
