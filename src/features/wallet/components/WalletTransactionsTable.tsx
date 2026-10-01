import React, { useState } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetWalletTransactions } from "../api/useGetWalletTransactions";
import { TransactionDetailDrawer } from "./TransactionDetailDrawer";
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
    paginationConfig,
  } = useTablePagination({
    initialPage: 1,
    initialPageSize,
  });

  const {
    transactions,
    total,
    isLoading,
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
      render: (description?: string) => <span className="text-xs text-[#66738C]">{description || "—"}</span>,
    },
    {
      title: "TYPE",
      dataIndex: "transaction_type",
      key: "transaction_type",
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
    <div className="space-y-4">
      <Table<WalletTransactionItem>
        rowKey="id"
        columns={columns}
        dataSource={transactions}
        loading={isLoading}
        pagination={{
          ...paginationConfig,
          total,
        }}
        onRow={(record) => ({
          onClick: () => setSelectedTxnId(record.id),
          className: "cursor-pointer transition hover:bg-slate-50",
        })}
        scroll={{ x: 600 }}
      />

      <TransactionDetailDrawer
        id={selectedTxnId}
        open={!!selectedTxnId}
        onClose={() => setSelectedTxnId(null)}
      />
    </div>
  );
};
