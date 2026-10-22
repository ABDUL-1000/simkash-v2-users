import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useScPayouts } from "../api/queries";

interface ScPayoutHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** stats_cards.total_paid_out from the wallet overview. */
  totalPaidOut?: { formatted: string; amount: number; payouts_count: number };
  onRequestPayoutClick?: () => void;
  onExportHistoryClick?: () => void;
}

const PAGE_SIZE = 10;
const STATUS_BADGE: Record<string, string> = { paid: "bg-[#EBFFF8] text-[#10B981]", completed: "bg-[#EBFFF8] text-[#10B981]", pending: "bg-[#FFFBEB] text-[#D9990D]", processing: "bg-[#FFFBEB] text-[#D9990D]" };
const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

export function ScPayoutHistoryModal({
  open,
  onOpenChange,
  totalPaidOut,
  onRequestPayoutClick,
  onExportHistoryClick,
}: ScPayoutHistoryModalProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useScPayouts({ page, limit: PAGE_SIZE }, open);
  const payouts = data?.payouts ?? [];
  const totalPages = data?.total_pages ?? 1;
  const avgPayout = totalPaidOut && totalPaidOut.payouts_count ? Math.round(totalPaidOut.amount / totalPaidOut.payouts_count) : 0;

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
              {data?.total ?? "—"}
            </h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">
              Total Paid Out
            </span>
            <h3 className="text-xl font-black text-[#10B981]">
              {totalPaidOut?.formatted ?? "—"}
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

        {/* Period / status filters are omitted: GET /state-coordinator/wallet/payouts only takes page and limit. */}

        {/* Payout Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
              <tr>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">BANK</th>
                <th className="py-3 px-4">PROCESSED</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">REF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
              {isLoading && <tr><td colSpan={6} className="py-6 text-center text-[#8C909B]">Loading payouts…</td></tr>}
              {error && <tr><td colSpan={6} className="py-6 text-center text-[#EF4444]">{error.message} <button type="button" onClick={() => void refetch()} className="font-bold text-[#2563EB] hover:underline">Retry</button></td></tr>}
              {!isLoading && !error && payouts.length === 0 && <tr><td colSpan={6} className="py-6 text-center text-[#8C909B]">No payouts yet.</td></tr>}
              {payouts.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8FAFC] transition">
                  <td className="py-3 px-4 font-semibold text-[#0F152A]">
                    {formatDate(row.requested_at)}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-[#0F152A]">
                    {row.amount_formatted}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#66738C]">
                    {row.bank_name} · {row.account_number_masked}
                  </td>
                  <td className="py-3 px-4 text-[#66738C] font-semibold">
                    {row.processed_at ? formatDate(row.processed_at) : "—"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${STATUS_BADGE[row.status.toLowerCase()] ?? "bg-[#FFF7F8] text-[#EF4444]"}`}
                    >
                      {row.status_badge}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[#8C909B]">
                    {row.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-xs">
          <button type="button" disabled={page <= 1 || isFetching} onClick={() => setPage((value) => value - 1)} className="font-bold text-[#2563EB] disabled:opacity-40">Prev</button>
          <span className="font-extrabold text-[#0F152A]">Page {page} of {totalPages}</span>
          <button type="button" disabled={page >= totalPages || isFetching} onClick={() => setPage((value) => value + 1)} className="font-bold text-[#2563EB] disabled:opacity-40">Next</button>
        </div>}

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
