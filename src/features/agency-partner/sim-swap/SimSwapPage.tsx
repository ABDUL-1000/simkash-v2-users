import { useState } from "react";
import { Pagination, Popconfirm } from "antd";
import { Repeat, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useCancelSwap, useSwapRequests, type SwapStatus, type SwapTab } from "./api";
import { SwapSimModal } from "./SwapSimModal";

const TABS: { key: SwapTab; label: string }[] = [{ key: "all", label: "All" }, { key: "pending", label: "Pending" }, { key: "completed", label: "Completed" }, { key: "rejected", label: "Rejected" }, { key: "cancelled", label: "Cancelled" }];
const STATUS_TONE: Record<SwapStatus, string> = { PENDING: "bg-amber-50 text-[#D9990D]", COMPLETED: "bg-emerald-50 text-[#10B981]", REJECTED: "bg-red-50 text-[#EF4444]", CANCELLED: "bg-slate-100 text-[#66738C]" };

/** Partner SIM swap — "Swap SIM" flow + my swap requests (GET /partner/sim-swap) with cancel. */
export default function SimSwapPage() {
  const [tab, setTab] = useState<SwapTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [swapOpen, setSwapOpen] = useState(false);
  const debounced = useDebouncedValue(search.trim(), 300);
  const query = useSwapRequests({ status: tab, search: debounced || undefined, page, limit: 20 });
  const cancel = useCancelSwap();
  const items = query.data?.items ?? [];
  const tabs = query.data?.tabs;

  return <div className="w-full min-w-0 space-y-5 pb-12">
    <PageHeader title="SIM Swap" description="Replace a customer's SIM with a new one of the same type. Requests need admin approval." actions={[{ key: "swap", label: "Swap SIM", icon: <Repeat className="size-3.5" />, onClick: () => setSwapOpen(true) }]} />
    <div className="flex gap-1.5 overflow-x-auto pb-1">{TABS.map((t) => <button key={t.key} type="button" onClick={() => { setTab(t.key); setPage(1); }} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${tab === t.key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{t.label}{tabs ? ` (${tabs[t.key] ?? 0})` : ""}</button>)}</div>
    <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
      <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search reference or SIM number" className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#2563EB]" /></div>

    {query.isLoading ? <div className="h-40 animate-pulse rounded-2xl bg-slate-100" />
      : query.isError ? <AppEmptyState title="Couldn't load swap requests" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
      : items.length === 0 ? <AppEmptyState icon={<Repeat className="size-5" />} title="No swap requests" description="Swap a customer's lost, damaged or poorly-covered SIM." actionText="Swap SIM" onAction={() => setSwapOpen(true)} />
      : <div className={`space-y-2 ${query.isFetching ? "opacity-70" : ""}`}>{items.map((s) => <div key={s.id} className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono font-bold text-[#2563EB]">{s.reference}</span>
          <div className="flex items-center gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.swap_type === "CROSS_NETWORK" ? "bg-purple-50 text-[#7C3AED]" : "bg-blue-50 text-[#2563EB]"}`}>{s.swap_type === "CROSS_NETWORK" ? "Cross-Net" : "Same-Net"}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_TONE[s.status]}`}>{s.status.charAt(0) + s.status.slice(1).toLowerCase()}</span>
          </div>
        </div>
        <p className="font-bold text-[#0F152A]">{s.customer?.name ?? "—"} <span className="font-normal text-[#8C909B]">· {s.customer?.phone}</span></p>
        <p className="font-mono text-[#0F152A]">{s.old_sim.sim_number} ({s.old_sim.network}) → {s.new_sim.sim_number} ({s.new_sim.network})</p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[#66738C]">
          <span>{s.sim_type_label} · {s.reason_label} · {s.fee === 0 ? (s.payer === "WAIVED" ? "Waived" : "Free") : `${s.fee_formatted} (${s.payer === "CUSTOMER" ? "customer" : "my"} wallet)`} · {s.time_ago}</span>
          {s.status === "PENDING" && <Popconfirm title={`Cancel ${s.reference}?`} description={s.fee ? `${s.fee_formatted} will be refunded to the wallet it came from.` : "The replacement SIM goes back to your stock."} okText="Cancel swap" okButtonProps={{ danger: true }}
            onConfirm={() => cancel.mutateAsync(s.id).catch(() => undefined)}>
            <button type="button" disabled={cancel.isPending} className="rounded-lg border border-[#EF4444] px-3 py-1 font-bold text-[#EF4444]">Cancel</button>
          </Popconfirm>}
        </div>
        {s.agent_note && <p className="text-[#8C909B]">Note: {s.agent_note}</p>}
        {s.status === "REJECTED" && s.rejection_reason && <p className="rounded-lg bg-[#FFF7F8] p-2 font-semibold text-[#EF4444]">Rejected: {s.rejection_reason}</p>}
      </div>)}</div>}
    {(query.data?.pagination?.total_pages ?? 1) > 1 && <Pagination current={page} pageSize={20} total={query.data?.pagination.total} onChange={setPage} showSizeChanger={false} />}

    <SwapSimModal open={swapOpen} onClose={() => setSwapOpen(false)} />
  </div>;
}
