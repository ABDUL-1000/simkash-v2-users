import React, { useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetWalletTransactions } from "../api/useGetWalletTransactions";
import { TransactionDetailDrawer } from "./TransactionDetailDrawer";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { WalletTransactionItem } from "../types/api";

interface WalletTransactionsTableProps {
  type?: string;
  pageSize?: number;
}

export const WalletTransactionsTable: React.FC<WalletTransactionsTableProps> = ({
  type,
  pageSize: initialPageSize = 10,
}) => {
  const [selectedTxnId, setSelectedTxnId] = useState<number | null>(null);

  const {
    page,
    pageSize,
    setPage,
    paginationConfig,
  } = useTablePagination({
    initialPage: 1,
    initialPageSize,
  });

  const {
    transactions,
    total,
    isLoading,
    isError,
  } = useGetWalletTransactions({
    page,
    limit: pageSize,
    type,
  });

  const columns: ColumnsType<WalletTransactionItem> = [
    {
      title: "REFERENCE",
      dataIndex: "transaction_reference",
      key: "transaction_reference",
      width: 150,
      render: (ref: string, record) => (
        <div>
          <span className="font-mono text-xs font-semibold text-[#0F152A] hover:text-[#2563EB]">
            {ref || `#${record.id}`}
          </span>
        </div>
      ),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      width: 190,
      responsive: ["lg"],
      render: (description?: string) => <span className="text-xs text-[#66738C]">{description || "—"}</span>,
    },
    {
      title: "TYPE",
      dataIndex: "transaction_type",
      key: "transaction_type",
      width: 120,
      render: (txnType: string) => {
        const isCredit =
          txnType?.toLowerCase().includes("credit") ||
          txnType?.toLowerCase().includes("inflow") ||
          txnType?.toLowerCase().includes("topup");
        return (
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${
              isCredit
                ? "bg-[#EBFFF8] text-[#10B981]"
                : "bg-[#FFF7F8] text-[#EF4444]"
            }`}
          >
            {txnType || "Transfer"}
          </span>
        );
      },
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      width: 130,
      render: (amount: number, record) => {
        const isCredit =
          record.transaction_type?.toLowerCase().includes("credit") ||
          record.transaction_type?.toLowerCase().includes("inflow") ||
          record.transaction_type?.toLowerCase().includes("topup");
        return (
          <span
            className={`font-mono text-xs font-bold ${
              isCredit ? "text-[#10B981]" : "text-[#0F152A]"
            }`}
          >
            {isCredit ? "+" : "-"}₦{Number(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        const s = status?.toLowerCase();
        let color = "default";
        if (s === "successful" || s === "completed" || s === "success") color = "success";
        else if (s === "pending" || s === "processing") color = "warning";
        else if (s === "failed" || s === "cancelled") color = "error";

        return (
          <Tag color={color} className="rounded-full text-[10px] uppercase font-bold">
            {status || "Completed"}
          </Tag>
        );
      },
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 165,
      render: (dateStr: string) => {
        if (!dateStr) return <span className="text-xs text-[#8C909B]">—</span>;
        const d = new Date(dateStr);
        return (
          <span className="text-xs text-[#8C909B]">
            {isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      },
    },
  ];

  return (
    <div className="w-full min-w-0 max-w-full space-y-4">
      <div className="hidden w-full min-w-0 overflow-hidden lg:block">
        <Table<WalletTransactionItem>
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={transactions}
          loading={isLoading}
          pagination={{ ...paginationConfig, total, responsive: true }}
          onRow={(record) => ({
            onClick: () => setSelectedTxnId(record.id),
            className: "cursor-pointer transition hover:bg-slate-50",
          })}
          scroll={{ x: "max-content" }}
        />
      </div>

      <div className="space-y-3 lg:hidden">
        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-24 animate-pulse rounded-xl bg-slate-100" />)}</div>
        ) : isError ? (
          <AppEmptyState title="Transactions unavailable" description="We could not load wallet transactions. Please try again." />
        ) : transactions.length === 0 ? (
          <AppEmptyState title="No wallet transactions yet" description="Your wallet activity will appear here." />
        ) : transactions.map((transaction) => {
          const isCredit = /credit|inflow|top.?up|deposit|refund|commission/i.test(transaction.transaction_type ?? "");
          return (
            <button key={transaction.id} type="button" onClick={() => setSelectedTxnId(transaction.id)} className="w-full min-w-0 rounded-xl border border-[#E2ECF6] bg-white p-3 text-left transition active:bg-slate-50">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-[#0F152A]">{transaction.transaction_type || "Transaction"}</p>
                  <p className="mt-1 truncate font-mono text-[10px] text-[#8C909B]">{transaction.transaction_reference || `#${transaction.id}`}</p>
                </div>
                <p className={`shrink-0 text-xs font-bold ${isCredit ? "text-[#10B981]" : "text-[#0F152A]"}`}>{isCredit ? "+" : "−"}₦{Number(transaction.amount || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="min-w-0 truncate text-[10px] text-[#66738C]">{transaction.description || "—"}</p>
                <Tag color={transaction.status?.toLowerCase() === "failed" ? "error" : transaction.status?.toLowerCase() === "pending" ? "warning" : "success"} className="m-0 shrink-0 rounded-full text-[9px] uppercase">{transaction.status || "Completed"}</Tag>
              </div>
              <p className="mt-2 text-[10px] text-[#8C909B]">{transaction.createdAt ? new Date(transaction.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}</p>
            </button>
          );
        })}
        {!isLoading && total > pageSize && <div className="flex items-center justify-between gap-3 border-t border-[#E2ECF6] pt-3 text-xs">
          <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border border-[#E2ECF6] px-3 py-2 font-semibold disabled:opacity-40">Previous</button>
          <span className="text-[#66738C]">Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</span>
          <button type="button" disabled={page >= Math.ceil(total / pageSize)} onClick={() => setPage(page + 1)} className="rounded-lg border border-[#E2ECF6] px-3 py-2 font-semibold disabled:opacity-40">Next</button>
        </div>}
      </div>

      <TransactionDetailDrawer
        id={selectedTxnId}
        open={!!selectedTxnId}
        onClose={() => setSelectedTxnId(null)}
      />
    </div>
  );
};
