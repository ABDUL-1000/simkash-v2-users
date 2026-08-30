import { ArrowRight } from "lucide-react";

type OrderItem = {
  id: string;
  orderCode: string;
  desc: string;
  status: "Dispatched" | "Pending" | "Delivered" | "Disputed";
  amount: string;
};

const ORDERS: OrderItem[] = [
  { id: "1", orderCode: "ORD-20241", desc: "DS-2CD2143G2 · Emeka O.", status: "Dispatched", amount: "₦285,000" },
  { id: "2", orderCode: "ORD-20240", desc: "GL300 Tracker · Adaeze A.", status: "Pending", amount: "₦42,000" },
  { id: "3", orderCode: "ORD-20239", desc: "iCrusader 2KVA · Biodun F.", status: "Delivered", amount: "₦380,000" },
  { id: "4", orderCode: "ORD-20238", desc: "EAP225-Outdoor · Khaled A.", status: "Disputed", amount: "₦75,000" },
  { id: "5", orderCode: "ORD-20237", desc: "Cat6 Cable 50m · Obinna U.", status: "Delivered", amount: "₦8,500" },
];

function OrderStatusBadge({ status }: { status: OrderItem["status"] }) {
  if (status === "Dispatched") {
    return <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">Dispatched</span>;
  }
  if (status === "Pending") {
    return <span className="rounded-md bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">Pending</span>;
  }
  if (status === "Delivered") {
    return <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Delivered</span>;
  }
  return <span className="rounded-md bg-[#FFF1F2] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">Disputed</span>;
}

export function RecentOrdersCard({ onViewAll }: { onViewAll?: () => void }) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Orders</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {ORDERS.map((ord, idx) => (
          <div key={ord.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0F172A]">{ord.orderCode}</span>
                <OrderStatusBadge status={ord.status} />
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">{ord.desc}</p>
            </div>

            <strong className="font-extrabold text-[#0F172A] text-xs sm:text-sm">{ord.amount}</strong>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View all orders</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
