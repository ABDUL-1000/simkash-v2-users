import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface TopUpHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  msisdn?: string;
}

export function TopUpHistoryModal({
  open,
  onOpenChange,
  msisdn = "0812 345 6789",
}: TopUpHistoryModalProps) {
  const [filter, setFilter] = useState("all");

  const historyItems = [
    { date: "24 Jun 2026", plan: "20GB Data Top Up", amount: "₦6,000", status: "Processed", success: true },
    { date: "10 Jun 2026", plan: "50GB Data Top Up", amount: "₦13,000", status: "Processed", success: true },
    { date: "1 Jun 2026", plan: "20GB Data Top Up", amount: "₦6,000", status: "Processed", success: true },
    { date: "15 May 2026", plan: "100GB Data Top Up", amount: "₦24,000", status: "Processed", success: true },
    { date: "1 May 2026", plan: "20GB Data Top Up", amount: "₦6,000", status: "Failed", success: false },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Top-Up History"
      description={`ZeroLimit SIM · ${msisdn}`}
      size="lg"
    >
      <div className="space-y-5 pt-1">
        {/* Metric Summary Cards (3 Columns) */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3.5">
            <span className="text-xs text-[#8C909B] font-semibold">Total Top-Ups</span>
            <h3 className="text-2xl font-extrabold text-[#0F152A] mt-1">12</h3>
          </div>
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3.5">
            <span className="text-xs text-[#8C909B] font-semibold">This Month</span>
            <h3 className="text-2xl font-extrabold text-[#0F152A] mt-1">₦19,000</h3>
          </div>
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3.5">
            <span className="text-xs text-[#8C909B] font-semibold">Last Top-Up</span>
            <h3 className="text-2xl font-extrabold text-[#0F152A] mt-1">24 Jun</h3>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All" },
            { id: "30", label: "30 Days" },
            { id: "90", label: "90 Days" },
            { id: "year", label: "This Year" },
          ].map((item) => {
            const isSelected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#2563EB] text-white"
                    : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#66738C] hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* History Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
          <table className="w-full min-w-[450px] text-left text-xs">
            <thead className="bg-[#F8FAFC] font-bold text-[#8C909B] border-b border-[#E2ECF6]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6]">
              {historyItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-medium text-[#0F152A]">{item.date}</td>
                  <td className="py-3 px-4 font-bold text-[#0F152A]">{item.plan}</td>
                  <td className="py-3 px-4 font-extrabold text-[#0F152A] text-right">
                    {item.amount}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {item.success ? (
                      <span className="font-bold text-[#10B981]">Processed ✓</span>
                    ) : (
                      <span className="rounded-md bg-red-100 px-2 py-0.5 font-bold text-[#EF4444]">
                        Failed ✕
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between text-xs text-[#8C909B] pt-1">
          <button type="button" className="text-[#8C909B] cursor-not-allowed">
            ← Previous
          </button>
          <span className="font-semibold text-[#0F152A]">Page 1 of 3</span>
          <button type="button" className="font-bold text-[#2563EB] hover:underline">
            Next →
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
