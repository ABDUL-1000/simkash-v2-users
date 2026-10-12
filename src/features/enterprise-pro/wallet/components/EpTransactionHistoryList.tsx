import React, { useState } from "react";
import { Search, FileText } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useGetEnterpriseWalletTransactions } from "../api/useGetEnterpriseWalletTransactions";
import { walletCategoryMap, walletTransaction } from "../types/adapters";
import type { WalletTimeframe } from "../types/api";
import { useTablePagination } from "@/hooks/useTablePagination";
import { EpQueryState } from "../../components/EpQueryState";
import { EpTransactionRow } from "./EpTransactionRow";
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

  const pagination = useTablePagination({ initialPageSize: 14 });
  const timeframe = ({ Today: "today", "This Week": "this_week", "This Month": "this_month", "All Time": "all_time", Custom: "custom" } as Record<string, WalletTimeframe>)[dateFilter];
  const query = useGetEnterpriseWalletTransactions({ category: walletCategoryMap[activeCategory], timeframe, search, page: pagination.page, limit: pagination.pageSize });
  const groups = (query.data?.groups ?? []).filter(group => group.transactions?.length);
  const count = groups.reduce((sum, group) => sum + group.transactions.length, 0);

  const pageSize = Math.max(1, Number(pagination.pageSize) || 14);
  const total = Math.max(0, Number(query.data?.total_records ?? (query.data as any)?.total ?? count) || 0);
  const pages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const currentPage = Math.max(1, Math.min(pages, Number(pagination.page) || 1));

  const visiblePages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pages])]
    .filter((page): page is number => typeof page === "number" && Number.isFinite(page) && !Number.isNaN(page) && page >= 1 && page <= pages)
    .sort((a, b) => a - b);

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
            onClick={() => { setActiveCategory(c.key); pagination.resetPage(); }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
              activeCategory === c.key ? "bg-slate-900 text-white font-bold" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {c.label} ({query.data?.category_counts?.[walletCategoryMap[c.key]] ?? 0})
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
              onClick={() => { setDateFilter(p); pagination.resetPage(); }}
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
            onChange={(e) => { setSearch(e.target.value); pagination.resetPage(); }}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Transactions List */}
      <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
      {query.isPending || query.isError ? null : count === 0 ? (
        <AppEmptyState
          title="No Transactions Found"
          description="No wallet transactions match your selected filter."
        />
      ) : (
        <>
          <div className="divide-y divide-slate-100 pt-2">
            {groups.map((group, groupIdx) => (
              <section key={`group-${group.header || "date"}-${groupIdx}`}>
                <p className="pt-3 pb-1 text-[10px] font-bold" style={{ color: colors.textSecondary }}>
                  {group.header}
                </p>
                {group.transactions.map((item, idx) => {
                  const itemKey =
                    item?.id != null && !Number.isNaN(Number(item.id))
                      ? `txn-${item.id}`
                      : item?.reference || (item as any)?.ref || `txn-${groupIdx}-${idx}`;
                  return (
                    <EpTransactionRow
                      key={itemKey}
                      t={walletTransaction(item)}
                      onSelectTransaction={onSelectTransaction}
                    />
                  );
                })}
              </section>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {count ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, total)} of {total} transactions
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => pagination.setPage(currentPage - 1)}
                className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-40"
              >
                Previous
              </button>
              {visiblePages.map((page) => (
                <button
                  type="button"
                  key={`page-${page}`}
                  onClick={() => pagination.setPage(page)}
                  className={
                    page === currentPage
                      ? "px-2 py-1 rounded bg-slate-900 text-white font-bold"
                      : "px-2 py-1 rounded hover:bg-slate-100"
                  }
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= pages}
                onClick={() => pagination.setPage(currentPage + 1)}
                className="px-2 py-1 rounded hover:bg-slate-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
