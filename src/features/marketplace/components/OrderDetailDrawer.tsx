import { useState } from "react";
import { Drawer, Tag } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetOrderDetail } from "../api/useGetOrderDetail";
import { CancelOrderModal } from "../Modals/CancelOrderModal";

export function OrderDetailDrawer({ id, open, onClose }: { id?: number | string; open: boolean; onClose: () => void }) {
  const [cancelOpen, setCancelOpen] = useState(false);
  const query = useGetOrderDetail(id);
  const order = query.order;
  const canCancel = order && ["pending", "paid"].includes(order.status);
  return <>
    <Drawer title={order?.orderNumber || "Order Details"} placement="right" open={open} onClose={onClose} size="large">
      {query.isLoading ? <div className="h-48 animate-pulse rounded-xl bg-slate-100" /> : !order ? <AppEmptyState title="Order not found" description="We could not load this order." /> : <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2"><Tag>{order.status}</Tag><Tag color={order.paymentStatus === "completed" ? "success" : order.paymentStatus === "failed" ? "error" : "warning"}>{order.paymentStatus}</Tag></div>
        <div className="rounded-xl bg-slate-50 p-3 text-xs"><div className="flex justify-between"><span className="text-[#66738C]">Placed</span><span>{new Date(order.createdAt).toLocaleString()}</span></div><div className="mt-2 flex justify-between"><span className="text-[#66738C]">Payment method</span><span className="capitalize">{order.paymentMethod}</span></div><div className="mt-2 flex justify-between"><span className="text-[#66738C]">Total</span><b>₦{order.totalAmount.toLocaleString("en-NG")}</b></div></div>
        <div><h3 className="mb-2 text-xs font-bold uppercase text-[#8C909B]">Items ({order.totalItems})</h3><div className="divide-y divide-[#E2ECF6]">{order.items?.map((item) => <div key={item.id} className="flex items-center gap-3 py-3"><img src={item.productImage} alt={item.productName} className="size-12 rounded-lg bg-slate-50 object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{item.productName}</p><p className="text-[10px] text-[#66738C]">Qty {item.quantity} · ₦{item.price.toLocaleString("en-NG")}</p></div><b className="text-xs">₦{item.totalPrice.toLocaleString("en-NG")}</b></div>)}</div></div>
        <div className="rounded-xl border border-[#E2ECF6] p-3"><h3 className="text-xs font-bold">Delivery Address</h3><p className="mt-1 text-xs text-[#66738C]">{order.shippingAddress}</p></div>
        {canCancel && <button type="button" onClick={() => setCancelOpen(true)} className="w-full rounded-xl border border-red-200 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50">Cancel Order</button>}
      </div>}
    </Drawer>
    <CancelOrderModal open={cancelOpen} onOpenChange={setCancelOpen} order={order ? { id: order.id, orderNumber: order.orderNumber, totalAmount: order.totalAmount } : null} />
  </>;
}
