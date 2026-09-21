import React, { useState } from "react";
import { Search, Percent, Users, Landmark, Package, TrendingUp, Award, XCircle, FileText } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockTransactionsList } from "../data/mockTransactionsData";
import type { TransactionItem, TransactionCategory } from "../types";

interface EpTransactionHistoryListProps {
  onSelectTransaction: (txn: TransactionItem) => void;
  onDownloadStatement: () => void;
}

export const EpTransactionHistoryList: React.FC<EpTransactionHistoryListProps> = ({
  onSelectTransaction,
  onDownloadStatement,
}) => {
  const [activeCategory, setActiveCategory] = useState<TransactionCategory>("all");
  const [dateFilter, setDateFilter] = useState("This Month");
  const [search, setSearch] = useState("");

  const categories: { key: TransactionCategory; label: string }[] = [
    { key: "all", label: "All" },
    { key: "margin", label: "Margin Earnings" },
    { key: "commission", label: "Network Commission" },
    { key: "payout", label: "Payouts" },
    { key: "sim-order", label: "SIM Orders" },
    { key: "balance-pay", label: "Balance Payments" },
  ];

  const datePills = ["Today", "This Week", "This Month", "All Time", "Custom"];

  const filteredTxns = mockTransactionsList.filter((t) => {
    if (activeCategory !== "all" && t.type !== activeCategory) {
      if (activeCategory === "payout" && t.type !== "failed-payout") return false;
      if (activeCategory !== "payout") return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.ref.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "margin":
        return <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Percent className="w-4 h-4" /></div>;
      case "commission":
        return <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Users className="w-4 h-4" /></div>;
      case "payout":
        return <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0"><Landmark className="w-4 h-4" /></div>;
      case "sim-order":
        return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0"><Package className="w-4 h-4" /></div>;
      case "balance-pay":
        return <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><TrendingUp className="w-4 h-4" /></div>;
      case "bonus":
        return <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Award className="w-4 h-4" /></div>;
      case "failed-payout":
        return <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0"><XCircle className="w-4 h-4" /></div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>;
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5 border bg-white shadow-sm space-y-4" style={{ borderColor: colors.border }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">Transaction History</h3>
        <button
          type="button"
          onClick={onDownloadStatement}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Statement</span>
        </button>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActiveCategory(c.key)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
              activeCategory === c.key ? "bg-slate-900 text-white font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Date pills & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          {datePills.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setDateFilter(p)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition ${
                dateFilter === p ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ref, type, amount..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Transactions List */}
      <div className="divide-y divide-slate-100 pt-2">
        {filteredTxns.map((t) => {
          const isFailed = t.type === "failed-payout";
          return (
            <div
              key={t.id}
              onClick={() => onSelectTransaction(t)}
              className={`py-3 px-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition hover:bg-slate-50 ${
                isFailed ? "bg-red-50/40 hover:bg-red-50/60" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {getIcon(t.type)}
                <div>
                  <span className="font-bold text-xs text-slate-900 block">{t.title}</span>
                  <span className="text-[11px] text-slate-500 block">{t.subtitle}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{t.timeAgo}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs font-black block ${
                  isFailed
                    ? "text-red-600"
                    : t.isOutflow
                    ? "text-red-500"
                    : t.amount === 0
                    ? "text-slate-400"
                    : "text-emerald-600"
                }`}>
                  {isFailed ? `+₦${t.amount.toLocaleString()}` : t.isOutflow ? `-₦${t.amount.toLocaleString()}` : t.amount === 0 ? "+₦0" : `+₦${t.amount.toLocaleString()}`}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{t.ref}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <span>Showing 1–{filteredTxns.length} of 94 transactions</span>
        <div className="flex items-center gap-1">
          <button type="button" className="px-2 py-1 rounded bg-slate-900 text-white font-bold">1</button>
          <button type="button" className="px-2 py-1 rounded hover:bg-slate-100">2</button>
          <button type="button" className="px-2 py-1 rounded hover:bg-slate-100">3</button>
          <span>...</span>
          <button type="button" className="px-2 py-1 rounded hover:bg-slate-100">8</button>
        </div>
      </div>
    </div>
  );
};
