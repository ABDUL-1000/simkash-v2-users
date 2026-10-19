import React from "react";
import { Pagination, Skeleton } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetBillTransactions } from "../api/useGetBillTransactions";
import type { BillTransactionItem } from "../types/api";
import { billDateLabel, toBillRow, type BillKind } from "../utils/billTransactionView";

interface BillTransactionsTableProps {
  pageSize?: number;
  onRowClick?: (transaction: BillTransactionItem) => void;
}

const ICONS: Record<BillKind, { icon: string; bg: string }> = {
  airtime: { icon: "📱", bg: "bg-[#FFF1F2]" },
  data: { icon: "📶", bg: "bg-[#EFF4F8]" },
  electricity: { icon: "⚡", bg: "bg-[#F5EFEF]" },
  cable: { icon: "📺", bg: "bg-[#F1F5F9]" },
  education: { icon: "🎓", bg: "bg-[#F1EAFE]" },
  airtime_cash: { icon: "💱", bg: "bg-[#EBFFF8]" },
  data_cash: { icon: "💱", bg: "bg-[#EBFFF8]" },
  other: { icon: "🧾", bg: "bg-[#F1F5F9]" },
};
const money = (value: number) => `₦${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

/** Bill payment history as the "Recent Bills" list: icon, service, provider · recipient, signed amount and date. */
export const BillTransactionsTable: React.FC<BillTransactionsTableProps> = ({ pageSize: initialPageSize = 10, onRowClick }) => {
  const { page, pageSize, paginationConfig } = useTablePagination({ initialPage: 1, initialPageSize });
  const { transactions, total, isLoading, isFetching, error, refetch } = useGetBillTransactions({ page, limit: pageSize });

  if (isLoading) return <Skeleton active avatar paragraph={{ rows: 3 }} />;
  if (error) return <AppEmptyState title="Couldn't load bill history" description={error.message} actionText="Retry" onAction={() => void refetch()} />;
  if (!transactions.length) return <AppEmptyState title="No bill payments yet" description="Your airtime, data, electricity and TV payments will appear here." />;

  return (
    <div className={isFetching ? "opacity-60 transition" : "transition"}>
      <ul className="divide-y divide-[#E2ECF6]">
        {transactions.map((item) => {
          const row = toBillRow(item);
          const icon = ICONS[row.kind];
          const failed = row.status === "failed";
          const amountColor = failed ? "text-[#8C909B] line-through" : row.credit ? "text-[#10B981]" : "text-[#0F152A]";
          const Row = onRowClick ? "button" : "div";
          return (
            <li key={row.id}>
              <Row {...(onRowClick ? { type: "button" as const, onClick: () => onRowClick(item) } : {})} className={`flex w-full items-center gap-4 py-4 text-left ${onRowClick ? "transition hover:bg-[#F8FAFC]" : ""}`}>
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg ${icon.bg}`} aria-hidden>{icon.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#0F152A]">{row.title}</span>
                  <span className="block truncate text-xs text-[#66738C]">{row.subtitle}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className={`block text-sm font-bold ${amountColor}`}>{row.credit ? "+" : "-"}{money(row.amount)}</span>
                  <span className="block text-[11px] text-[#8C909B]">
                    {row.status !== "success" && <span className={`mr-1.5 font-semibold ${failed ? "text-[#EF4444]" : "text-[#D9990D]"}`}>{failed ? "Failed" : "Pending"} ·</span>}
                    {billDateLabel(row.date)}
                  </span>
                </span>
              </Row>
            </li>
          );
        })}
      </ul>
      {total > pageSize && <div className="flex justify-end border-t border-[#E2ECF6] pt-4"><Pagination {...paginationConfig} total={total} size="small" /></div>}
    </div>
  );
};
