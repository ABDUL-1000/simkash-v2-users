import { useState } from "react";
import { Download } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface MonthlyCommissionRecord {
  month: string;
  acts: number;
  comm: string;
  bonus: string;
  total: string;
  status: "Paid" | "Partial" | "Missed";
  note?: string;
}

interface CommissionBreakdownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestPayout?: () => void;
  onExportReport?: () => void;
}

export function CommissionBreakdownModal({
  open,
  onOpenChange,
  onRequestPayout,
  onExportReport,
}: CommissionBreakdownModalProps) {
  const [filterPeriod, setFilterPeriod] = useState<"Today" | "This Week" | "This Month" | "Last 3 Months" | "All Time">("All Time");

  const monthlyRecords: MonthlyCommissionRecord[] = [
    {
      month: "Jun 2026",
      acts: 247,
      comm: "₦247,000",
      bonus: "₦5,000",
      total: "₦252,000",
      status: "Partial",
      note: "₦45,000 paid",
    },
    {
      month: "May 2026",
      acts: 198,
      comm: "₦198,000",
      bonus: "₦5,000",
      total: "₦203,000",
      status: "Paid",
    },
    {
      month: "Apr 2026",
      acts: 124,
      comm: "₦124,000",
      bonus: "₦5,000",
      total: "₦129,000",
      status: "Paid",
    },
    {
      month: "Mar 2026",
      acts: 98,
      comm: "₦98,000",
      bonus: "₦5,000",
      total: "₦103,000",
      status: "Paid",
    },
    {
      month: "Feb 2026",
      acts: 87,
      comm: "₦87,000",
      bonus: "—",
      total: "₦87,000",
      status: "Missed",
    },
    {
      month: "Jan 2026",
      acts: 93,
      comm: "₦93,000",
      bonus: "₦5,000",
      total: "₦98,000",
      status: "Paid",
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Commission Breakdown"
      description="Full earnings history and analysis"
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Period Filter Pills (Matching Image 3) */}
        <div className="flex items-center gap-2">
          {(["Today", "This Week", "This Month", "Last 3 Months", "All Time"] as const).map((p) => {
            const isSelected = filterPeriod === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setFilterPeriod(p)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8]"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* 4 Metric Summary Cards (Matching Image 3) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">TOTAL ACTIVATIONS</span>
            <h3 className="text-xl font-black text-[#0F152A]">847</h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">TOTAL COMMISSION</span>
            <h3 className="text-xl font-black text-[#10B981]">₦847,000</h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">TOTAL BONUS</span>
            <h3 className="text-xl font-black text-[#7C3AED]">₦35,000</h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B]">TOTAL EARNED</span>
            <h3 className="text-xl font-black text-[#0F152A]">₦882,000</h3>
          </div>
        </div>

        {/* EARNINGS BY TYPE Progress Bars (Matching Image 3) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            EARNINGS BY TYPE
          </span>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="font-extrabold text-[#0F152A] w-32 truncate">SIM Commission...</span>
              <span className="font-black text-[#10B981] font-mono">₦847,000</span>
              <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                <div className="h-full rounded-full bg-[#10B981] w-[96%]" />
              </div>
              <span className="text-[11px] font-bold text-[#8C909B] font-mono">96%</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="font-extrabold text-[#0F152A] w-32 truncate">Bonus Payments</span>
              <span className="font-black text-[#7C3AED] font-mono">₦35,000</span>
              <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                <div className="h-full rounded-full bg-[#7C3AED] w-[4%]" />
              </div>
              <span className="text-[11px] font-bold text-[#8C909B] font-mono">4%</span>
            </div>
          </div>
        </div>

        {/* MONTH BY MONTH Data Table (Matching Image 3) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden space-y-1">
          <div className="p-3 bg-[#F8FAFC] border-b border-[#E2ECF6]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              MONTH BY MONTH
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[550px] text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2ECF6] font-extrabold text-[10px] uppercase text-[#8C909B]">
                  <th className="p-3">MONTH</th>
                  <th className="p-3">ACTS</th>
                  <th className="p-3">COMM.</th>
                  <th className="p-3">BONUS</th>
                  <th className="p-3">TOTAL</th>
                  <th className="p-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                {monthlyRecords.map((m, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]">
                    <td className="p-3 font-extrabold text-[#0F152A]">{m.month}</td>
                    <td className="p-3 font-bold">{m.acts}</td>
                    <td className="p-3 font-bold">{m.comm}</td>
                    <td className="p-3 font-bold">{m.bonus}</td>
                    <td className="p-3 font-black text-[#0F152A]">{m.total}</td>
                    <td className="p-3 text-right">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                          m.status === "Paid"
                            ? "bg-[#EBFFF8] text-[#10B981]"
                            : m.status === "Partial"
                            ? "bg-[#FFFBEB] text-[#D9990D]"
                            : "bg-[#FFF7F8] text-[#EF4444]"
                        }`}
                      >
                        {m.status}
                      </span>
                      {m.note && (
                        <span className="text-[10px] text-[#8C909B] font-medium block mt-0.5">
                          {m.note}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* YOUR COMMISSION RATE Box (Matching Image 3) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#8C909B] block">
              YOUR COMMISSION RATE
            </span>
            <span className="font-black text-[#0F152A] text-sm">
              ₦1,000 <span className="text-xs font-medium text-[#66738C]">per activation</span>
            </span>
          </div>
          <span className="text-xs font-semibold text-[#8C909B]">Set by Simkash</span>
        </div>

        {/* Footer Actions (Matching Image 3) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onExportReport?.()}
            className="flex items-center gap-1.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            <Download className="size-4" />
            <span>Export Report</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRequestPayout?.();
            }}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Request Payout
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
