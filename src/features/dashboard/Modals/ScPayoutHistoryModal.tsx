import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

export interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  bank: string;
  approval: "Auto" | "Admin" | "Failed";
  status: "Paid" | "Failed" | "Pending";
  ref: string;
}

interface ScPayoutHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestPayoutClick?: () => void;
  onExportHistoryClick?: () => void;
}

export function ScPayoutHistoryModal({
  open,
  onOpenChange,
  onRequestPayoutClick,
  onExportHistoryClick,
}: ScPayoutHistoryModalProps) {
  const [periodFilter, setPeriodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const payoutsData: PayoutRecord[] = [
    {
      id: "1",
      date: "Yesterday",
      amount: 30000,
      bank: "****0476",
      approval: "Auto",
      status: "Paid",
      ref: "PAY-008469",
    },
    {
      id: "2",
      date: "14 Jun",
      amount: 20000,
      bank: "****0476",
      approval: "Auto",
      status: "Paid",
      ref: "PAY-008465",
    },
    {
      id: "3",
      date: "1 Jun",
      amount: 15000,
      bank: "****0476",
      approval: "Auto",
      status: "Paid",
      ref: "PAY-008462",
    },
    {
      id: "4",
      date: "1 Jun",
      amount: 10000,
      bank: "****0476",
      approval: "Failed",
      status: "Failed",
      ref: "PAY-008461",
    },
    {
      id: "5",
      date: "14 May",
      amount: 12000,
      bank: "****0476",
      approval: "Auto",
      status: "Paid",
      ref: "PAY-008458",
    },
    {
      id: "6",
      date: "1 May",
      amount: 10000,
      bank: "****0476",
      approval: "Auto",
      status: "Paid",
      ref: "PAY-008455",
    },
    {
      id: "7",
      date: "14 Apr",
      amount: 25000,
      bank: "****0476",
      approval: "Admin",
      status: "Paid",
      ref: "PAY-008450",
    },
    {
      id: "8",
      date: "1 Apr",
      amount: 15000,
      bank: "****0476",
      approval: "Auto",
      status: "Paid",
      ref: "PAY-008445",
    },
  ];

  // Filtering
  const filteredPayouts = payoutsData.filter((p) => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    return true;
  });

  const totalPayoutsCount = payoutsData.length;
  const successfulTotal = payoutsData
    .filter((p) => p.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const avgPayout = Math.round(successfulTotal / (totalPayoutsCount || 1));

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Payout History"
      description="All commission withdrawals"
      size="lg"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Summary Cards Strip (3 items) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">
              Total Payouts
            </span>
            <h3 className="text-xl font-black text-[#0F152A]">
              {totalPayoutsCount}
            </h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">
              Total Amount
            </span>
            <h3 className="text-xl font-black text-[#10B981]">
              ₦{successfulTotal.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">
              Avg Payout
            </span>
            <h3 className="text-xl font-black text-[#0F152A]">
              ₦{avgPayout.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 font-bold text-[#0F152A]">
            <span className="text-[11px] text-[#66738C]">Period:</span>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="bg-transparent text-xs font-extrabold outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 font-bold text-[#0F152A]">
            <span className="text-[11px] text-[#66738C]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-extrabold outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Payout Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
              <tr>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">BANK</th>
                <th className="py-3 px-4">APPROVAL</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">REF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
              {filteredPayouts.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8FAFC] transition">
                  <td className="py-3 px-4 font-semibold text-[#0F152A]">
                    {row.date}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-[#0F152A]">
                    ₦{row.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#66738C]">
                    {row.bank}
                  </td>
                  <td className="py-3 px-4 text-[#66738C] font-semibold">
                    {row.approval}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                        row.status === "Paid"
                          ? "bg-[#EBFFF8] text-[#10B981]"
                          : "bg-[#FFF7F8] text-[#EF4444]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[#8C909B]">
                    {row.ref}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Successful Total Bar */}
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-right text-xs">
          <span className="font-extrabold text-[#0F152A]">
            Successful: ₦{successfulTotal.toLocaleString()}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onExportHistoryClick?.();
            }}
            className="text-xs font-extrabold text-[#2563EB] hover:underline"
          >
            Export History
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRequestPayoutClick?.();
            }}
            className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition"
          >
            Request Payout
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
