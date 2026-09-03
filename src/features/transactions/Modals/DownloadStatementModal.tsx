import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface DownloadStatementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadStatementModal({
  open,
  onOpenChange,
}: DownloadStatementModalProps) {
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [fromDate, setFromDate] = useState("2026-06-01");
  const [toDate, setToDate] = useState("2026-06-30");
  const [dateRangePreset, setDateRangePreset] = useState("This Month");

  const [categories, setCategories] = useState({
    topUps: true,
    transfers: true,
    billPayments: true,
    simRenewals: true,
    zeroLimitSim: true,
    marketplaceOrders: true,
    payLater: true,
    withdrawals: true,
    failedTransactions: true,
  });

  const [options, setOptions] = useState({
    accountName: true,
    periodSummary: true,
    spendingChart: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const toggleCategory = (key: keyof typeof categories) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      onOpenChange(false);
      alert(`Statement (${format}) generated successfully!`);
    }, 1500);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Download Statement"
      description="Export your transaction history"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* FORMAT Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            FORMAT
          </label>
          <div className="flex items-center gap-2">
            {(["PDF", "Excel", "CSV"] as const).map((fmt) => {
              const isSelected = format === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-slate-50"
                  }`}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* DATE RANGE & Presets */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            DATE RANGE
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] text-[#8C909B] block mb-1">From:</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2 px-3 text-xs font-bold text-[#0F152A] outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-[#8C909B] block mb-1">To:</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2 px-3 text-xs font-bold text-[#0F152A] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {["This Month", "Last Month", "Last 3 Months", "This Year", "All Time"].map(
              (preset) => {
                const isSelected = dateRangePreset === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDateRangePreset(preset)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                      isSelected
                        ? "bg-[#EFF4F8] text-[#2563EB] border border-[#2563EB]"
                        : "border border-[#E2ECF6] bg-white text-[#8C909B] hover:bg-slate-50"
                    }`}
                  >
                    {preset}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* INCLUDE TRANSACTIONS Checkboxes */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            INCLUDE TRANSACTIONS
          </label>

          <div className="grid grid-cols-1 gap-2 text-xs font-semibold text-[#0F152A] sm:grid-cols-2">
            {[
              { key: "topUps", label: "Top Ups" },
              { key: "transfers", label: "Transfers (sent & received)" },
              { key: "billPayments", label: "Bill Payments" },
              { key: "simRenewals", label: "SIM Renewals" },
              { key: "zeroLimitSim", label: "ZeroLimit SIM" },
              { key: "marketplaceOrders", label: "Marketplace Orders" },
              { key: "payLater", label: "PayLater Transactions" },
              { key: "withdrawals", label: "Withdrawals" },
              { key: "failedTransactions", label: "Failed Transactions" },
            ].map((cat) => (
              <label
                key={cat.key}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={categories[cat.key as keyof typeof categories]}
                  onChange={() => toggleCategory(cat.key as keyof typeof categories)}
                  className="size-4 accent-[#2563EB]"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* STATEMENT OPTIONS (PDF) */}
        {format === "PDF" && (
          <div className="space-y-2 pt-1 border-t border-[#E2ECF6]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              STATEMENT OPTIONS (PDF)
            </label>

            <div className="space-y-2 text-xs font-semibold text-[#0F152A]">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.accountName}
                  onChange={() => setOptions({ ...options, accountName: !options.accountName })}
                  className="size-4 accent-[#2563EB]"
                />
                <span>Include account name</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.periodSummary}
                  onChange={() => setOptions({ ...options, periodSummary: !options.periodSummary })}
                  className="size-4 accent-[#2563EB]"
                />
                <span>Include period summary</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.spendingChart}
                  onChange={() => setOptions({ ...options, spendingChart: !options.spendingChart })}
                  className="size-4 accent-[#2563EB]"
                />
                <span>Include spending breakdown chart</span>
              </label>
            </div>
          </div>
        )}

        {/* Estimation Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs space-y-0.5">
          <p className="font-extrabold text-[#0F152A]">~47 transactions · Jun 2026</p>
          <p className="text-[11px] text-[#8C909B]">Estimated: 4 pages (PDF)</p>
        </div>

        {/* Progress State */}
        {isGenerating && (
          <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3 text-center text-xs font-bold text-[#2563EB] animate-pulse">
            Generating statement...
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate & Download"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
