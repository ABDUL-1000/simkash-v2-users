import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetPayLaterTransactions } from "../api/usePayLater";
import type { PayLaterTransactionStatus } from "../types/api";
import { payLaterStatusTone } from "../utils/payLaterStatus";

interface RepaymentHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRepayAllClick: () => void;
  onTransactionClick: (id: number) => void;
  /** Summary header values from the dashboard / account endpoints. */
  pendingFormatted?: string;
  paidFormatted?: string;
  overdueFormatted?: string | null;
  canRepay?: boolean;
}

const PAGE = 10;

export function RepaymentHistoryModal({
  open,
  onOpenChange,
  onRepayAllClick,
  onTransactionClick,
  pendingFormatted,
  paidFormatted,
  overdueFormatted,
  canRepay = true,
}: RepaymentHistoryModalProps) {
  const [statusFilter, setStatusFilter] = useState<PayLaterTransactionStatus>("all");
  const [limit, setLimit] = useState(PAGE);
  const query = useGetPayLaterTransactions({ status: statusFilter, page: 1, limit }, open);
  const transactions = query.data?.items ?? [];
  const total = query.data?.pagination.total ?? 0;

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
          {([
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "paid", label: "Paid" },
            { id: "overdue", label: "Overdue" },
            { id: "defaulted", label: "Defaulted" },
          ] as const).map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => { setStatusFilter(st.id); setLimit(PAGE); }}
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

        {/* Timeframe filter (This Month / Last Month / 3 Months / All Time) is disabled:
            GET /paylater/transactions only accepts status, billType, page and limit. */}

        {/* Metric Summary Header */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs font-extrabold">
          <div>
            <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">PENDING</span>
            <span className="text-[#F59E0B]">{pendingFormatted ?? "—"}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">PAID</span>
            <span className="text-[#10B981]">{paidFormatted ?? "—"}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">OVERDUE</span>
            <span className={overdueFormatted ? "text-[#EF4444]" : "text-[#0F152A]"}>{overdueFormatted ?? "NO"}</span>
          </div>
        </div>

        {/* Transactions List */}
        {query.isLoading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-12 animate-pulse rounded-xl bg-slate-100" />)}</div>
        ) : query.error ? (
          <AppEmptyState title="Couldn't load PayLater transactions" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
        ) : transactions.length === 0 ? (
          <AppEmptyState title="No PayLater transactions" description={statusFilter === "all" ? "Bills you pay on credit will appear here." : "No transactions with this status."} />
        ) : (
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs">
            {transactions.map((tx) => {
              const tone = payLaterStatusTone(tx.status_color);
              return (
                <button key={tx.id} type="button" onClick={() => onTransactionClick(tx.id)} className="flex w-full items-center justify-between py-2.5 text-left first:pt-0 last:pb-0 hover:bg-[#F8FAFC]">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-xl text-xs font-bold text-white" style={{ background: tone.solid }}>
                      💳
                    </span>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">{tx.service}</h4>
                      <p className="text-[11px] text-[#8C909B]">{tx.date_formatted ?? tx.date} · Due {tx.due_date_formatted ?? tx.due_date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#EF4444]">{tx.amount_formatted}</span>
                    <div className="mt-0.5">
                      <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: tone.bg, color: tone.color }}>
                        {tx.status_label}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Load More Link */}
        {transactions.length < total && (
          <div className="text-center pt-1">
            <button type="button" disabled={query.isFetching} onClick={() => setLimit(current => current + PAGE)} className="text-xs font-bold text-[#2563EB] hover:underline disabled:opacity-50">
              {query.isFetching ? "Loading…" : `Load more transactions (${total - transactions.length} more)`}
            </button>
          </div>
        )}

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
            disabled={!canRepay}
            onClick={() => {
              onOpenChange(false);
              onRepayAllClick();
            }}
            className="flex-1 rounded-xl bg-[#F59E0B] py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 disabled:opacity-50"
          >
            Repay All Pending
          </button>
        </div>
      </div>
    </AppModal>
  );
}
