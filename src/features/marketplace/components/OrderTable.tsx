import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { MoreHorizontal } from "lucide-react";
import { SimInventoryTable } from "@/components/sim/sim-inventory-table";

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Dispatched"
  | "In Transit"
  | "Delivered"
  | "Returned"
  | "Disputed"
  | "Cancelled";

export type OrderRow = {
  id: string;
  orderRef: string;
  product: string;
  buyer: string;
  qty: number;
  amount: string;
  payment: "Paid" | "EasyBuy" | "Pending";
  status: OrderStatus;
  date: string;
};

const DUMMY_ORDERS: OrderRow[] = [
  { id: "1", orderRef: "ORD-00847", product: "Hikvision 4MP", buyer: "Aisha B.", qty: 1, amount: "₦48,500", payment: "Paid", status: "Delivered", date: "Jun 15" },
  { id: "2", orderRef: "ORD-00842", product: "TP-Link Router", buyer: "Chidi O.", qty: 2, amount: "₦31,200", payment: "Paid", status: "In Transit", date: "Jun 14" },
  { id: "3", orderRef: "ORD-00839", product: "Luminous INV", buyer: "Emeka N.", qty: 1, amount: "₦125,000", payment: "EasyBuy", status: "Dispatched", date: "Jun 14" },
  { id: "4", orderRef: "ORD-00836", product: "GPS Tracker", buyer: "Fatima I.", qty: 3, amount: "₦18,750", payment: "Pending", status: "Pending", date: "Jun 13" },
  { id: "5", orderRef: "ORD-00831", product: "Dahua Camera", buyer: "Bola A.", qty: 1, amount: "₦35,500", payment: "Paid", status: "Confirmed", date: "Jun 12" },
  { id: "6", orderRef: "ORD-00828", product: "Cat6 Cable", buyer: "Seun M.", qty: 10, amount: "₦4,200", payment: "Paid", status: "Pending", date: "Jun 12" },
  { id: "7", orderRef: "ORD-00825", product: "Hikvision 2MP", buyer: "Ngozi E.", qty: 2, amount: "₦67,000", payment: "Paid", status: "Delivered", date: "Jun 11" },
  { id: "8", orderRef: "ORD-00821", product: "Solar Panel", buyer: "Tunde A.", qty: 1, amount: "₦280,000", payment: "Paid", status: "Disputed", date: "Jun 10" },
];

export type OrderTab =
  | "all"
  | "pending"
  | "confirmed"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "returned"
  | "disputed"
  | "cancelled";

const TABS: { id: OrderTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "dispatched", label: "Dispatched" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "returned", label: "Returned" },
  { id: "disputed", label: "Disputed" },
  { id: "cancelled", label: "Cancelled" },
];

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  if (status === "Delivered") {
    return <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669]">Delivered</span>;
  }
  if (status === "In Transit") {
    return <span className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">In Transit</span>;
  }
  if (status === "Dispatched") {
    return <span className="rounded-full border border-[#E9D5FF] bg-[#F3E8FF] px-2.5 py-0.5 text-[11px] font-bold text-[#9333EA]">Dispatched</span>;
  }
  if (status === "Pending") {
    return <span className="rounded-full border border-[#CBD5E1] bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-bold text-[#64748B]">Pending</span>;
  }
  if (status === "Confirmed") {
    return <span className="rounded-full border border-[#BFDBFE] bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">Confirmed</span>;
  }
  return <span className="rounded-full border border-[#FECACA] bg-[#FFF1F2] px-2.5 py-0.5 text-[11px] font-bold text-[#DC2626]">Disputed</span>;
}

export function OrderTable({
  onConfirmOrder,
  onMarkDispatched,
  onConfirmDelivery,
  onResolveDispute,
}: {
  onConfirmOrder?: (row: OrderRow) => void;
  onMarkDispatched?: (row: OrderRow) => void;
  onConfirmDelivery?: (row: OrderRow) => void;
  onResolveDispute?: (row: OrderRow) => void;
}) {
  const [activeTab, setActiveTab] = useState<OrderTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = 3847;

  const filteredRows = DUMMY_ORDERS.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.orderRef.toLowerCase().includes(q) ||
      r.product.toLowerCase().includes(q) ||
      r.buyer.toLowerCase().includes(q)
    );
  });

  const columns: ColumnsType<OrderRow> = [
    {
      title: "Order Ref",
      dataIndex: "orderRef",
      key: "orderRef",
      render: (v, r) => (
        <button
          type="button"
          onClick={() => {
            if (r.status === "Pending") onConfirmOrder?.(r);
            else if (r.status === "Confirmed") onMarkDispatched?.(r);
            else if (r.status === "In Transit" || r.status === "Dispatched") onConfirmDelivery?.(r);
            else if (r.status === "Disputed") onResolveDispute?.(r);
          }}
          className="font-bold text-[#0F172A] text-xs sm:text-sm hover:text-[#2563EB] hover:underline"
        >
          {v}
        </button>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs">{v}</span>,
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
      render: (v) => <span className="font-medium text-[#64748B] text-xs">{v}</span>,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (v) => <span className="font-bold text-[#0F172A] text-xs">{v}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (v) => <strong className="font-extrabold text-[#0F172A] text-xs">{v}</strong>,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (v) => (
        <span
          className={`font-bold text-xs ${
            v === "Paid" ? "text-[#059669]" : v === "EasyBuy" ? "text-[#2563EB]" : "text-[#D97706]"
          }`}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => <OrderStatusBadge status={v} />,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (v) => <span className="text-xs text-[#94A3B8]">{v}</span>,
    },
    {
      title: "",
      key: "actions",
      render: (_, r) => (
        <button
          type="button"
          onClick={() => {
            if (r.status === "Pending") onConfirmOrder?.(r);
            else if (r.status === "Confirmed") onMarkDispatched?.(r);
            else if (r.status === "In Transit" || r.status === "Dispatched") onConfirmDelivery?.(r);
            else if (r.status === "Disputed") onResolveDispute?.(r);
          }}
          className="p-1 text-[#94A3B8] hover:text-[#0F172A]"
        >
          <MoreHorizontal className="size-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <SimInventoryTable<OrderRow>
        title="Orders"
        subtitle={`Showing 1–8 of ${total} orders`}
        columns={columns}
        rows={filteredRows}
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search orders, buyers, products..."
        onExportClick={() => {}}
        onFiltersClick={() => {}}
        selectable={false}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
