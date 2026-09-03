import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface RepaymentHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRepayAllClick: () => void;
}

export function RepaymentHistoryModal({
  open,
  onOpenChange,
  onRepayAllClick,
}: RepaymentHistoryModalProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("this_month");

  const transactions = [
    { name: "Airtime (MTN)", date: "15 Jun 2026", amount: "₦500", status: "Pending" },
    { name: "Electricity", date: "10 Jun 2026", amount: "₦3,000", status: "Pending" },
    { name: "Cable TV", date: "05 Jun 2026", amount: "₦7,900", status: "Pending" },
    { name: "Data (MTN)", date: "01 Jun 2026", amount: "₦500", status: "Pending" },
    { name: "Airtime", date: "31 May 2026", amount: "₦200", status: "Paid" },
    { name: "Electricity", date: "31 May 2026", amount: "₦3,000", status: "Paid" },
    { name: "Data", date: "31 May 2026", amount: "₦500", status: "Paid" },
    { name: "Cable TV", date: "30 Apr 2026", amount: "₦7,900", status: "Paid" },
    { name: "Airtime", date: "30 Apr 2026", amount: "₦300", status: "Paid" },
    { name: "Electricity", date: "31 Mar 2026", amount: "₦5,000", status: "Paid" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Repayment History"
      description="All PayLater transactions"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Status Filter Row */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "paid", label: "Paid" },
            { id: "overdue", label: "Overdue" },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStatusFilter(st.id)}
              className={`rounded-full px-4 py-1 text-xs font-bold transition ${
                statusFilter === st.id
                  ? "bg-[#0F152A] text-white"
                  : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#66738C] hover:bg-slate-100"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Timeframe Filter Row */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "this_month", label: "This Month" },
            { id: "last_month", label: "Last Month" },
            { id: "3_months", label: "Last 3 Months" },
            { id: "all_time", label: "All Time" },
          ].map((tf) => (
            <button
              key={tf.id}
              type="button"
              onClick={() => setTimeFilter(tf.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                timeFilter === tf.id
                  ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                  : "border border-[#E2ECF6] bg-white text-[#8C909B] hover:bg-slate-50"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>

        {/* Metric Summary Header */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs font-extrabold">
          <div>
            <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">PENDING</span>
            <span className="text-[#F59E0B]">₦11,900</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">PAID</span>
            <span className="text-[#10B981]">₦33,100</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">OVERDUE</span>
            <span className="text-[#0F152A]">NO</span>
          </div>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs">
          {transactions.map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span className={`flex size-8 items-center justify-center rounded-xl text-white font-bold text-xs ${
                  tx.status === "Pending" ? "bg-[#F59E0B]" : "bg-[#10B981]"
                }`}>
                  💳
                </span>
                <div>
                  <h4 className="font-bold text-[#0F152A]">{tx.name}</h4>
                  <p className="text-[11px] text-[#8C909B]">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-[#EF4444]">{tx.amount}</span>
                <div className="mt-0.5">
                  {tx.status === "Pending" ? (
                    <span className="rounded-md bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold text-[#F59E0B]">
                      Pending
                    </span>
                  ) : (
                    <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                      Paid
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Link */}
        <div className="text-center pt-1">
          <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
            Load more transactions
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRepayAllClick();
            }}
            className="flex-1 rounded-xl bg-[#F59E0B] py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600"
          >
            Repay All Pending
          </button>
        </div>
      </div>
    </AppModal>
  );
}
