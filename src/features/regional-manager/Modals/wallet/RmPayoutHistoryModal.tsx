import { useState } from "react";
import { Skeleton } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetRmRecentPayouts } from "../../api/wallet";
import type { RmWalletOverviewData } from "../../types/wallet";
import { RmBadge } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";

const PAGE = 8;
// recent-payouts supports page/limit only, so "Load more" grows the limit; date/status filters from the design are not shown.
export function RmPayoutHistoryModal({ overview, payoutDisabled, onClose, onPayout, onExport }: { overview?: RmWalletOverviewData; payoutDisabled: boolean; onClose: () => void; onPayout: () => void; onExport: () => void }) {
  const [limit, setLimit] = useState(PAGE);
  const query = useGetRmRecentPayouts({ page: 1, limit });
  const payouts = query.data?.payouts ?? [];
  const total = query.data?.total ?? overview?.recent_payouts.total_count ?? 0;
  const paid = overview?.recent_payouts.total_paid_out ?? 0;
  const count = overview?.recent_payouts.total_count ?? total;
  const remaining = Math.max(0, total - payouts.length);
  return <AppModal open size="md" title={<span style={{ color: rmFlow.navy }}>Payout History</span>} description="All commission withdrawals" onOpenChange={open => { if (!open) onClose(); }}
    footer={<div className="flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: rmFlow.border }}>
      <button type="button" onClick={onExport} className="text-sm font-semibold" style={{ color: rmFlow.ink }}>Export History</button>
      <div className="flex items-center gap-3"><button type="button" onClick={onClose} className="text-sm font-semibold" style={{ color: rmFlow.slate }}>Close</button><button type="button" disabled={payoutDisabled} onClick={onPayout} className="min-h-10 rounded-xl px-5 text-sm font-semibold text-white disabled:opacity-45" style={{ background: rmFlow.navy }}>Request Payout</button></div>
    </div>}>
    <div className="space-y-4 border-t pt-4" style={{ borderColor: rmFlow.border }}>
      <div className="grid grid-cols-3 gap-3 rounded-xl p-3" style={{ background: rmFlow.base }}>{[["Total payouts", count.toLocaleString(), rmFlow.ink], ["Total amount", overview?.recent_payouts.total_paid_out_formatted ?? "—", rmFlow.green], ["Avg payout", count ? `₦${Math.round(paid / count).toLocaleString()}` : "—", rmFlow.ink]].map(([label, value, color]) =>
        <div key={label}><p className="text-[10px] font-semibold uppercase" style={{ color: rmFlow.muted }}>{label}</p><p className="text-lg font-bold" style={{ color }}>{value}</p></div>)}</div>
      {query.isLoading ? <Skeleton active paragraph={{ rows: 5 }} /> : query.error ? <AppEmptyState title="Unable to load payouts" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
        : payouts.length ? <div className="overflow-x-auto"><table className="w-full min-w-110 text-xs">
          <thead><tr className="border-b text-left text-[10px] uppercase" style={{ borderColor: rmFlow.border, color: rmFlow.muted }}>{["Date", "Amount", "Bank", "Reference", "Status"].map(head => <th key={head} className="px-2 py-2 font-semibold">{head}</th>)}</tr></thead>
          <tbody>{payouts.map(payout => { const failed = /fail/i.test(payout.status); const label = payout.status_badge || payout.status;
            return <tr key={payout.id} className="border-b" style={{ borderColor: rmFlow.border }}>
              <td className="px-2 py-3" title={new Date(payout.created_at).toLocaleString()}>{payout.date_label}</td>
              <td className="px-2 py-3 font-bold" style={{ color: failed ? rmFlow.muted : rmFlow.green }}>{payout.amount_formatted}</td>
              <td className="px-2 py-3" style={{ color: rmFlow.muted }}>{payout.account_number_masked}</td>
              <td className="px-2 py-3" style={{ color: rmFlow.muted }}>{payout.reference}</td>
              <td className="px-2 py-3"><RmBadge tone={failed ? "danger" : /pend|process/i.test(label) ? "warning" : "success"}>{label}</RmBadge></td>
            </tr>; })}</tbody>
        </table></div> : <AppEmptyState title="No payouts yet" description="Your regional commission payout requests will appear here." />}
      {remaining > 0 && <button type="button" disabled={query.isFetching} onClick={() => setLimit(current => current + PAGE)} className="w-full text-xs font-semibold disabled:opacity-50" style={{ color: rmFlow.navy }}>{query.isFetching ? "Loading…" : `Load more (${remaining} payouts)`}</button>}
      {overview && <div className="flex justify-end border-t pt-3 text-xs font-semibold" style={{ borderColor: rmFlow.border }}>Successful payouts: {overview.recent_payouts.total_paid_out_formatted}</div>}
    </div>
  </AppModal>;
}
