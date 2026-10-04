import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetApRecentCustomers } from "../api";

export function ApRecentCustomersCard() {
  const { customers, total, isLoading } = useGetApRecentCustomers(4);
  return <section className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs"><h2 className="mb-3 font-bold text-[#0F152A]">Recent Customers <span className="text-[#8C909B]">({total})</span></h2>
    {isLoading ? <p className="text-xs text-[#8C909B]">Loading customers…</p> : customers.length === 0 ? <AppEmptyState title="No customers yet" description="Customers from your activations will appear here." /> : <div className="space-y-3">{customers.map((customer) => <div key={customer.id} className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-full bg-[#EFF4F8] text-xs font-bold text-[#2563EB]">{customer.initials}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-[#0F152A]">{customer.name}</p><p className="text-[11px] text-[#66738C]">{customer.sim_type}</p></div><span className="text-[10px] text-[#66738C]">{customer.status}</span></div>)}</div>}
  </section>;
}
