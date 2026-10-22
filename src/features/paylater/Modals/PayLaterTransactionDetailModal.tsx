import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetPayLaterTransaction } from "../api/usePayLater";
import type { PayLaterTransactionDetail } from "../types/api";
import { payLaterStatusTone } from "../utils/payLaterStatus";

interface PayLaterTransactionDetailModalProps {
  id: number | null;
  onClose: () => void;
  onRepay: (transaction: PayLaterTransactionDetail) => void;
}

/** A single PayLater bill: amounts, due date, penalty and its repayment log (GET /paylater/transactions/{id}). */
export function PayLaterTransactionDetailModal({ id, onClose, onRepay }: PayLaterTransactionDetailModalProps) {
  const query = useGetPayLaterTransaction(id);
  const tx = query.data;
  const tone = payLaterStatusTone(tx?.status_color);
  const outstanding = tx?.total_outstanding ?? 0;
  const dueNote = tx?.is_overdue ? "Overdue" : tx?.days_until_due !== undefined && outstanding > 0 ? `Due in ${tx.days_until_due} day${tx.days_until_due === 1 ? "" : "s"}` : null;

  return (
    <AppModal open={id !== null} onOpenChange={value => { if (!value) onClose(); }} title="PayLater Bill" description={tx?.bill_reference} size="md">
      {query.isLoading ? (
        <div className="space-y-2">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-10 animate-pulse rounded-xl bg-slate-100" />)}</div>
      ) : !tx ? (
        <AppEmptyState title="Bill not found" description={query.error?.message ?? "This PayLater bill may no longer be available."} actionText={query.error ? "Retry" : undefined} onAction={query.error ? () => void query.refetch() : undefined} />
      ) : (
        <div className="space-y-4 pt-1">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">{tx.service}</span>
            <h2 className="text-3xl font-extrabold text-[#0F152A]">{tx.amount_formatted}</h2>
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: tone.bg, color: tone.color }}>{tx.status_label}</span>
              {dueNote && <span className={`font-bold ${tx.is_overdue ? "text-[#EF4444]" : "text-[#F59E0B]"}`}>● {dueNote}</span>}
            </div>
          </div>

          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs">
            {[
              ["Reference", tx.bill_reference],
              ["Bill type", tx.bill_type],
              ["Date", tx.date_formatted ?? tx.date],
              ["Due date", tx.due_date_formatted ?? tx.due_date],
              ["Amount", tx.amount_formatted],
              ...(tx.penalty ? [["Late fee", `₦${tx.penalty.toLocaleString()}`]] : []),
              ["Repaid", `₦${(tx.total_repaid ?? 0).toLocaleString()}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">{label}</span>
                <span className="font-bold text-[#0F152A]">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 last:pb-0 text-sm font-extrabold">
              <span className="text-[#0F152A]">Outstanding</span>
              <span className={outstanding > 0 ? "text-[#EF4444]" : "text-[#10B981]"}>{tx.total_outstanding_formatted ?? `₦${outstanding.toLocaleString()}`}</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">REPAYMENTS</label>
            {tx.repayments?.length ? (
              <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
                {tx.repayments.map(repayment => (
                  <div key={repayment.id} className="flex justify-between py-2 first:pt-0 last:pb-0">
                    <span className="text-[#66738C]">{repayment.createdAt_formatted} · <span className="capitalize">{repayment.method}</span></span>
                    <span className="font-bold text-[#10B981]">{repayment.amount_formatted}</span>
                  </div>
                ))}
              </div>
            ) : <p className="rounded-2xl border border-dashed border-[#E2ECF6] p-3 text-center text-xs text-[#8C909B]">No repayments yet</p>}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#E2ECF6] pt-4">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Close</button>
            {outstanding > 0 && (
              <button type="button" onClick={() => onRepay(tx)} className="flex-1 rounded-xl bg-[#F59E0B] py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600">
                Repay this bill — {tx.total_outstanding_formatted ?? `₦${outstanding.toLocaleString()}`}
              </button>
            )}
          </div>
        </div>
      )}
    </AppModal>
  );
}
