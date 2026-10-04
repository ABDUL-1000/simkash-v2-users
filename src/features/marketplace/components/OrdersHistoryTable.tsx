import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetOrders } from "../api/useGetOrders";
import type { OrderRecord } from "../types/api";

export function OrdersHistoryTable({ onSelect }: { onSelect: (order: OrderRecord) => void }) {
  const { page, pageSize, paginationConfig, setPage, setPageSize } = useTablePagination({ initialPageSize: 10 });
  const query = useGetOrders({ page, limit: pageSize });
  const orders = query.data?.data?.orders ?? [];
  const total = query.data?.data?.pagination.total ?? 0;
  const columns: ColumnsType<OrderRecord> = [
    { title: "ORDER", dataIndex: "orderNumber", key: "orderNumber", render: (value: string) => <span className="font-mono text-xs font-bold text-[#2563EB]">{value}</span> },
    { title: "DATE", dataIndex: "createdAt", key: "createdAt", render: (value: string) => <span className="text-xs text-[#66738C]">{new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span> },
    { title: "ITEMS", dataIndex: "items", key: "items", render: (items: OrderRecord["items"]) => <span className="text-xs text-[#66738C]">{items?.map((item) => item.productName).join(", ") || "—"}</span> },
    { title: "TOTAL", dataIndex: "totalAmount", key: "totalAmount", render: (value: number) => <span className="text-xs font-bold">₦{value.toLocaleString("en-NG")}</span> },
    { title: "PAYMENT", dataIndex: "paymentStatus", key: "paymentStatus", render: (value: string) => <Tag color={value === "completed" ? "success" : value === "failed" ? "error" : "warning"}>{value}</Tag> },
    { title: "STATUS", dataIndex: "status", key: "status", render: (value: string) => <Tag>{value}</Tag> },
  ];
  return <DataTable<OrderRecord> columns={columns} dataSource={orders} loading={query.isLoading} rowKey="id" onRowClick={onSelect} scroll={{ x: 850 }} pagination={{ ...paginationConfig, total, current: page, pageSize, onChange: (nextPage, nextSize) => { setPage(nextPage); setPageSize(nextSize); } }} emptyTitle="No marketplace orders yet" emptyDescription="Your product orders will appear here." />;
}
