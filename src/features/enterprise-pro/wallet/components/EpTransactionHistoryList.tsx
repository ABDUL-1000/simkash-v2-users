import React, { useState } from "react";
import { Search, FileText } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useExportEnterpriseTransactions, useGetEnterpriseWalletTransactions } from "../api/useEnterpriseWallet";
import { walletTransaction } from "../types/adapters";
import type { WalletCategory } from "../types/api";
import { useTablePagination } from "@/hooks/useTablePagination";
import { EpQueryState } from "../../components/EpQueryState";
import { EpTransactionRow } from "./EpTransactionRow";
import type { TransactionItem } from "../types";

interface EpTransactionHistoryListProps {
  onSelectTransaction: (txn: TransactionItem) => void;
}

const categories: { key: WalletCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "commission", label: "Commission" },
  { key: "payout", label: "Payouts" },
  { key: "transfer", label: "Transfers" },
  { key: "bill_payment", label: "Bill Payments" },
];

export const EpTransactionHistoryList: React.FC<EpTransactionHistoryListProps> = ({
  onSelectTransaction,
}) => {
  const [activeCategory, setActiveCategory] = useState<WalletCategory>("all");
  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search.trim());
  const pagination = useTablePagination({ initialPageSize: 15 });
  const query = useGetEnterpriseWalletTransactions({ category: activeCategory, search: debounced || undefined, page: pagination.page, limit: pagination.pageSize });
  const exporter = useExportEnterpriseTransactions();
  const items = (query.data?.items ?? []).map(walletTransaction);
  // The API returns a flat list with a date_group on each row.
  const groups = [...new Set(items.map((item) => item.dateGroup))];

  const pageSize = Math.max(1, Number(pagination.pageSize) || 15);
  const total = Math.max(0, Number(query.data?.total ?? items.length) || 0);
  const pages = Math.max(1, Number(query.data?.total_pages) || Math.ceil(total / pageSize) || 1);
  const currentPage = Math.max(1, Math.min(pages, Number(pagination.page) || 1));

  const visiblePages = [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pages])]
    .filter((page) => page >= 1 && page <= pages)
    .sort((a, b) => a - b);

  return (
    <div className="rounded-2xl p-4 sm:p-5 border bg-white shadow-sm space-y-4" style={{ borderColor: colors.border }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">Transaction History</h3>
        <button
          type="button"
          disabled={exporter.isPending}
          onClick={() => exporter.mutate({ category: activeCategory, search: debounced || undefined })}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span>{exporter.isPending ? "Exporting…" : "Download Statement"}</span>
        </button>
      </div>

      {/* Categories + Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => { setActiveCategory(c.key); pagination.resetPage(); }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                activeCategory === c.key ? "bg-slate-900 text-white font-bold" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by reference or description"
            value={search}
            onChange={(e) => { setSearch(e.target.value); pagination.resetPage(); }}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Transactions List */}
      <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
      {query.isPending || query.isError ? null : items.length === 0 ? (
        <AppEmptyState
          title="No Transactions Found"
          description="No wallet transactions match your selected filter."
        />
      ) : (
        <>
          <div className="divide-y divide-slate-100 pt-2">
            {groups.map((group) => (
              <section key={group}>
                <p className="pt-3 pb-1 text-[10px] font-bold uppercase" style={{ color: colors.textSecondary }}>
                  {group}
                </p>
                {items.filter((item) => item.dateGroup === group).map((item) => (
                  <EpTransactionRow key={item.id} t={item} onSelectTransaction={onSelectTransaction} />
                ))}
              </section>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, total)} of {total} transactions
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
