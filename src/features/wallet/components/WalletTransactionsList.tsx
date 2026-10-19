import React, { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Phone, RefreshCw, ShoppingBag, Wifi, X, Zap } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetWalletTransactions } from "../api/useGetWalletTransactions";
import { TransactionDetailDrawer } from "./TransactionDetailDrawer";
import type { WalletTransactionItem } from "../types/api";
import { getTransactionGroup, getTransactionSubtitle, getTransactionTimeLabel, getTransactionTitle, isCreditTransaction } from "../utils/transactionView";

const PAGE = 15;

function RowIcon({ tx }: { tx: WalletTransactionItem }) {
  const type = `${tx.transaction_type} ${tx.description}`;
  const [Icon, tone] = /fail/i.test(tx.status) ? [X, "bg-[#FFF7F8] text-[#EF4444]"]
    : isCreditTransaction(tx) ? [ArrowDownRight, "bg-[#EBFFF8] text-[#10B981]"]
      : /airtime/i.test(type) ? [Phone, "bg-[#FFFBEB] text-[#F59E0B]"]
        : /data/i.test(type) ? [Wifi, "bg-[#EFF4F8] text-[#2563EB]"]
          : /electric/i.test(type) ? [Zap, "bg-[#FFF7F8] text-[#EF4444]"]
            : /sim|renew/i.test(type) ? [RefreshCw, "bg-[#EFF4F8] text-[#2563EB]"]
              : /marketplace|order/i.test(type) ? [ShoppingBag, "bg-[#F8FAFC] text-[#0F152A]"]
                : [ArrowUpRight, "bg-[#EFF4F8] text-[#2563EB]"];
  return <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tone}`}><Icon className="size-5" /></div>;
}

/** Wallet transactions grouped by day (TODAY, YESTERDAY, …) with "Load more". */
export const WalletTransactionsList: React.FC<{ type?: string }> = ({ type }) => {
  const [limit, setLimit] = useState(PAGE);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { transactions, total, isLoading, isFetching, isError, refetch } = useGetWalletTransactions({ page: 1, limit, type });

  if (isLoading) return <div className="space-y-2 p-4">{Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>;
  if (isError) return <div className="p-4"><AppEmptyState title="Transactions unavailable" description="We could not load wallet transactions." actionText="Retry" onAction={() => void refetch()} /></div>;
  if (!transactions.length) return <div className="p-4"><AppEmptyState title="No wallet transactions yet" description="Your wallet activity will appear here." /></div>;

  const groups = transactions.reduce<Array<{ section: string; items: WalletTransactionItem[] }>>((list, tx) => {
    const section = getTransactionGroup(tx.createdAt);
    const last = list[list.length - 1];
    if (last?.section === section) last.items.push(tx); else list.push({ section, items: [tx] });
    return list;
  }, []);

  return <>
    <div className="min-w-0 divide-y divide-[#E2ECF6]">
      {groups.map(group => <div key={group.section}>
        <div className="border-b border-[#E2ECF6] bg-[#F8FAFC] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">{group.section}</div>
        <div className="divide-y divide-[#E2ECF6]">{group.items.map(tx => {
          const failed = /fail/i.test(tx.status);
          const pending = /pend|process/i.test(tx.status);
          const credit = isCreditTransaction(tx);
          return <button key={tx.id} type="button" onClick={() => setSelectedId(tx.id)} className="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-[#F8FAFC]">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
              <RowIcon tx={tx} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-xs font-extrabold text-[#0F152A]">{getTransactionTitle(tx)}</h4>
                  {failed && <span className="rounded bg-[#FFF7F8] px-1.5 py-0.5 text-[9px] font-bold text-[#EF4444]">Failed</span>}
                  {pending && <span className="rounded bg-[#FFFBEB] px-1.5 py-0.5 text-[9px] font-bold text-[#F59E0B]">Pending</span>}
                </div>
                <p className="mt-0.5 truncate text-[11px] text-[#8C909B]">{getTransactionSubtitle(tx)}</p>
                <p className="mt-0.5 text-[10px] text-[#8C909B]">{getTransactionTimeLabel(tx.createdAt)}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className={`block text-sm font-extrabold ${failed ? "text-[#8C909B] line-through" : credit ? "text-[#10B981]" : "text-[#0F152A]"}`}>{credit ? "+" : "-"}₦{Number(tx.amount || 0).toLocaleString()}</span>
              <span className="mt-0.5 block max-w-40 truncate font-mono text-[10px] text-[#8C909B]">{tx.transaction_reference}</span>
            </div>
          </button>;
        })}</div>
      </div>)}
    </div>
    <div className="border-t border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center">
      <span className="block text-xs font-medium text-[#8C909B]">Showing {transactions.length} of {total} transactions</span>
      {transactions.length < total && <button type="button" disabled={isFetching} onClick={() => setLimit(current => current + PAGE)} className="mt-1 text-xs font-bold text-[#2563EB] hover:underline disabled:opacity-50">{isFetching ? "Loading…" : "Load more →"}</button>}
    </div>
    <TransactionDetailDrawer id={selectedId} open={selectedId !== null} onClose={() => setSelectedId(null)} />
  </>;
};
