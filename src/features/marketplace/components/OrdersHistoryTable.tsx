import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useGetOrders, useRetryPayment } from "../api";
import { naira } from "../utils";
import type { OrderCard, OrdersTab } from "../types/api";

const TABS: { key: OrdersTab; label: string }[] = [
  { key: "all", label: "All" }, { key: "active", label: "Active" }, { key: "dispatched", label: "Dispatched" },
  { key: "delivered", label: "Delivered" }, { key: "cancelled", label: "Cancelled" }, { key: "returned", label: "Returned" },
];
const statusColor = (status: string) => /deliver|complete/i.test(status) ? "success" : /cancel|fail/i.test(status) ? "error" : /return|refund/i.test(status) ? "purple" : /dispatch|ship/i.test(status) ? "processing" : "warning";

/** GET /orders — tabs with counts, search, date range; buttons come only from `actions`. */
export function OrdersHistoryTable() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<OrdersTab>("all");
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const debounced = useDebouncedValue(search.trim());
  const { page, pageSize, paginationConfig, setPage, setPageSize } = useTablePagination({ initialPageSize: 10 });
  const query = useGetOrders({ tab, search: debounced || undefined, from: from || undefined, to: to || undefined, page, limit: pageSize });
  const retry = useRetryPayment();
  const orders = query.data?.orders ?? [];
  const counts = query.data?.tabCounts;
  const open = (order: OrderCard) => navigate(`/marketplace/orders/${order.id}`);
  const columns: ColumnsType<OrderCard> = [
    { title: "ORDER", key: "orderNumber", render: (_, order) => <div><span className="font-mono text-xs font-bold text-[#2563EB]">{order.orderNumber}</span><span className="block text-[10px] text-[#8C909B]">{new Date(order.placedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span></div> },
    { title: "ITEMS", key: "summary", render: (_, order) => <div className="flex items-center gap-2"><div className="flex -space-x-2">{order.thumbnails.slice(0, 3).map((src, i) => src ? <img key={i} src={src} alt="" className="size-7 rounded-md border border-white object-cover" /> : <span key={i} className="size-7 rounded-md border border-white bg-slate-100" />)}</div><span className="text-xs text-[#66738C]">{order.summary}</span></div> },
    { title: "TOTAL", dataIndex: "totalAmount", key: "totalAmount", render: (value: number) => <span className="text-xs font-bold">{naira(value)}</span> },
    { title: "STATUS", key: "status", render: (_, order) => <div className="space-y-1"><Tag color={statusColor(order.status)}>{order.statusLabel}</Tag>
      <div className="flex gap-0.5">{order.progress.steps.map((step, i) => <span key={step.key} className={`h-1 w-6 rounded ${order.progress.cancelled && i > order.progress.currentStep ? "bg-slate-200" : i <= order.progress.currentStep && !order.progress.cancelled ? "bg-[#10B981]" : "bg-slate-200"}`} />)}</div>
      <span className="block text-[10px] text-[#8C909B]">{order.deliveredAt ? `Delivered: ${new Date(order.deliveredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : order.estimatedDelivery?.label ? `Est. delivery: ${order.estimatedDelivery.label}` : order.refundNote ?? ""}</span></div> },
    { title: "", key: "actions", render: (_, order) => <div className="flex flex-wrap gap-1.5" onClick={(e) => e.stopPropagation()}>
      {order.actions.canPay && <button type="button" disabled={retry.isPending} onClick={() => retry.mutate(order.id)} className="rounded-lg bg-[#2563EB] px-2.5 py-1 text-[11px] font-bold text-white disabled:opacity-50">Pay now</button>}
      {order.actions.canTrack && <button type="button" onClick={() => open(order)} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-[11px] font-bold">Track</button>}
      {order.actions.canReturn && <button type="button" onClick={() => navigate(`/marketplace/orders/${order.id}?return=1`)} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-[11px] font-bold">Return</button>}
      <button type="button" onClick={() => open(order)} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">View Details</button>
    </div> },
  ];
  return <div className="space-y-3">
    <div className="flex gap-1.5 overflow-x-auto pb-1">{TABS.map((item) => <button key={item.key} type="button" onClick={() => { setTab(item.key); setPage(1); }} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${tab === item.key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{item.label}{counts ? ` (${counts[item.key] ?? 0})` : ""}</button>)}</div>
    <div className="flex flex-col gap-2 sm:flex-row">
      <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search order number or product" className="min-w-0 flex-1 rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs outline-none focus:border-[#2563EB]" />
      <div className="flex gap-2"><input type="date" value={from} max={to || undefined} onChange={(e) => { setFrom(e.target.value); setPage(1); }} className="rounded-xl border border-[#E2ECF6] bg-white px-2 py-2 text-xs" /><input type="date" value={to} min={from || undefined} onChange={(e) => { setTo(e.target.value); setPage(1); }} className="rounded-xl border border-[#E2ECF6] bg-white px-2 py-2 text-xs" /></div>
    </div>
    <DataTable<OrderCard> hideToolbar columns={columns} dataSource={orders} loading={query.isLoading || query.isFetching} rowKey="id" onRowClick={open} scroll={{ x: 900 }} emptyTitle="No orders found"
      pagination={{ ...paginationConfig, total: query.data?.pagination.total ?? 0, current: page, pageSize, onChange: (nextPage, nextSize) => { setPage(nextPage); setPageSize(nextSize); } }} />
  </div>;
}
