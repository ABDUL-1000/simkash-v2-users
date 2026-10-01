import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetBillTransactions } from "../api/useGetBillTransactions";
import type { BillTransactionItem } from "../types/api";

interface BillTransactionsTableProps {
  pageSize?: number;
  onRowClick?: (transaction: BillTransactionItem) => void;
}

export const BillTransactionsTable: React.FC<BillTransactionsTableProps> = ({
  pageSize: initialPageSize = 10,
  onRowClick,
}) => {
  const {
    page,
    pageSize,
    paginationConfig,
  } = useTablePagination({
    initialPage: 1,
    initialPageSize,
  });

  const {
    data,
    total,
    isLoading,
  } = useGetBillTransactions({
    page,
    limit: pageSize,
  });

  const transactions = data?.data?.transactions || [];

  const columns: ColumnsType<BillTransactionItem> = [
    {
      title: "SERVICE",
      dataIndex: "service",
      key: "service",
      render: (service: string, record) => (
        <div>
          <span className="font-bold text-xs text-[#0F152A] capitalize">
            {service || record.type || "Bill"}
          </span>
          <p className="font-mono text-[10px] text-[#8C909B]">
            {record.reference || `#${record.id}`}
          </p>
        </div>
      ),
    },
    {
      title: "RECIPIENT",
      dataIndex: "recipient",
      key: "recipient",
      render: (recipient: string, record) => (
        <span className="text-xs font-semibold text-[#0F152A]">
          {recipient || record.phone || record.billersCode || record.meter_number || record.smartcard_number || "—"}
        </span>
      ),
    },
    {
      title: "PROVIDER / PACKAGE",
      key: "provider",
      render: (_, record) => <div className="text-xs"><div className="font-semibold text-[#0F152A]">{record.provider || record.biller || record.service || "—"}</div><div className="text-[10px] text-[#8C909B]">{record.variation || record.variation_code || ""}</div></div>,
    },
    {
      title: "TOKEN",
      dataIndex: "token",
      key: "token",
      render: (token?: string) => <span className="font-mono text-xs text-[#66738C]">{token || "—"}</span>,
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <span className="font-mono text-xs font-bold text-[#0F152A]">
          ₦{Number(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
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
      <Table<BillTransactionItem>
        rowKey="id"
        columns={columns}
        dataSource={transactions}
        loading={isLoading}
        pagination={{
          ...paginationConfig,
          total,
        }}
        onRow={(record) => ({
          onClick: () => onRowClick?.(record),
          className: onRowClick ? "cursor-pointer transition hover:bg-slate-50" : undefined,
        })}
        scroll={{ x: 600 }}
      />
    </div>
  );
};
