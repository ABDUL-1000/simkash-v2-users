import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useGetWalletMonthTransactions } from "../api/useGetWalletMonthTransactions";
import { useGetWalletTransactions } from "../api/useGetWalletTransactions";
import { TransactionDetailDrawer } from "./TransactionDetailDrawer";
import type { WalletTransactionItem } from "../types/api";
import { getTransactionNetwork, getTransactionTimeLabel, getTransactionTitle, isBillTransaction, isCreditTransaction } from "../utils/transactionView";

const card = "rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs";
const Skeleton = ({ rows = 4 }: { rows?: number }) => <div className="space-y-2">{Array.from({ length: rows }).map((_, index) => <div key={index} className="h-4 animate-pulse rounded bg-slate-100" />)}</div>;
const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

// Spending categories for "Where your money went", matched against transaction_type + description.
const CATEGORIES: Array<{ name: string; pattern: RegExp; color: string }> = [
  { name: "Marketplace", pattern: /marketplace|order/i, color: "bg-[#0F152A]" },
  { name: "PayLater", pattern: /pay.?later|credit repayment/i, color: "bg-[#F59E0B]" },
  { name: "ZeroLimit SIM", pattern: /zero.?limit/i, color: "bg-[#10B981]" },
  { name: "SIM Renewals", pattern: /renew/i, color: "bg-[#2563EB]" },
  { name: "Bill Payments", pattern: /airtime|data|electric|cable|tv|bill|waec|jamb/i, color: "bg-[#F59E0B]" },
  { name: "Transfers", pattern: /transfer|sent|withdraw/i, color: "bg-[#9333EA]" },
];
const categoryOf = (tx: WalletTransactionItem) => {
  const text = `${tx.transaction_type} ${tx.description}`;
  return CATEGORIES.find(category => category.pattern.test(text)) ?? { name: tx.transaction_type || "Other", color: "bg-[#94A2B8]" };
};
const isFailed = (tx: WalletTransactionItem) => /fail/i.test(tx.status ?? "");

/** Transaction History sidebar: this month's counts, spend by category and recent failed transactions — all from wallet transactions. */
export const WalletInsightsSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const month = useGetWalletMonthTransactions();
  const failed = useGetWalletTransactions({ page: 1, limit: 3, status: "failed" });

  const txs = month.transactions;
  const settled = txs.filter(tx => !isFailed(tx));
  const credits = settled.filter(isCreditTransaction).length;
  const debits = settled.length - credits;
  const failedCount = txs.length - settled.length;

  const spend = new Map<string, { amount: number; color: string }>();
  for (const tx of settled.filter(tx => !isCreditTransaction(tx) && !/pend/i.test(tx.status))) {
    const category = categoryOf(tx);
    const current = spend.get(category.name) ?? { amount: 0, color: category.color };
    spend.set(category.name, { ...current, amount: current.amount + Number(tx.amount || 0) });
  }
  const spending = [...spend.entries()].sort((a, b) => b[1].amount - a[1].amount);
  const maxSpend = spending[0]?.[1].amount || 1;

  return <>
    <div className={card}>
      <h4 className="font-extrabold text-[#0F152A]">This Month</h4>
      {month.isLoading ? <Skeleton /> : month.isError ? <p className="text-[11px] text-[#EF4444]">Couldn't load this month's activity.</p> : <div className="divide-y divide-[#E2ECF6] text-[11px]">
        {[["Transactions", txs.length.toLocaleString(), "text-[#0F152A]"], ["Credits", plural(credits, "transaction"), "text-[#10B981]"], ["Debits", plural(debits, "transaction"), "text-[#0F152A]"], ["Failed", plural(failedCount, "transaction"), "text-[#EF4444]"]].map(([label, value, tone]) =>
          <div key={label} className="flex justify-between py-2 first:pt-0 last:pb-0"><span className="text-[#8C909B]">{label}</span><span className={`font-bold ${tone}`}>{value}</span></div>)}
      </div>}
      {!month.complete && <p className="text-[10px] text-[#8C909B]">Showing your 1,000 most recent transactions this month.</p>}
    </div>

    <div className={card}>
      <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">WHERE YOUR MONEY WENT</h4>
      {month.isLoading ? <Skeleton rows={6} /> : spending.length ? <div className="space-y-2.5 text-[11px]">{spending.map(([name, { amount, color }]) =>
        <div key={name} className="space-y-1">
          <div className="flex justify-between font-semibold"><span className="text-[#0F152A]">{name}</span><span className="font-bold text-[#0F152A]">₦{amount.toLocaleString()}</span></div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EFF4F8]"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(4, Math.round(amount / maxSpend * 100))}%` }} /></div>
        </div>)}</div> : <p className="text-[11px] text-[#8C909B]">No spending yet this month.</p>}
    </div>

    {failed.isLoading ? <div className={card}><Skeleton rows={2} /></div> : failed.transactions.length ? <div className="space-y-3 rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-5 text-xs shadow-xs">
      <h4 className="font-extrabold text-[#EF4444]">Failed Transactions</h4>
      {failed.transactions.map(tx => {
        const bill = isBillTransaction(tx);
        const network = getTransactionNetwork(tx);
        return <div key={tx.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#F7D2D7] bg-white p-3">
          <button type="button" onClick={() => setSelectedId(tx.id)} className="min-w-0 text-left">
            <h5 className="truncate font-bold text-[#0F152A]">{getTransactionTitle(tx)}{network && bill ? ` (${network})` : ""}</h5>
            <p className="text-[10px] text-[#8C909B]">{getTransactionTimeLabel(tx.createdAt).split(" · ")[0]} · ₦{Number(tx.amount || 0).toLocaleString()}</p>
          </button>
          <button type="button" onClick={() => bill ? navigate("/bill-payments") : setSelectedId(tx.id)} className="shrink-0 rounded-lg border border-[#EF4444] px-3 py-1 text-[11px] font-bold text-[#EF4444] hover:bg-red-50">{bill ? "Retry" : "View"}</button>
        </div>;
      })}
    </div> : !failed.isError && <div className="flex items-center gap-2 rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs font-semibold text-[#10B981] shadow-xs"><CheckCircle2 className="size-4" /> No failed transactions</div>}

    <TransactionDetailDrawer id={selectedId} open={selectedId !== null} onClose={() => setSelectedId(null)} />
  </>;
};
