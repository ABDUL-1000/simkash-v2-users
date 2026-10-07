import { useState } from "react";
import { Archive, ClipboardList, History, Package, Plus, Send, Boxes } from "lucide-react";
import { useGetRmSimInventoryOverview } from "../api/inventory";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmInventoryOverview } from "../components/inventory/RmInventoryOverview";
import { RmAvailableStock } from "../components/inventory/RmAvailableStock";
import { RmInventoryHistory } from "../components/inventory/RmInventoryHistory";
import { RmStockRequests } from "../components/inventory/RmStockRequests";
import { RmInventoryDistributeModal, RmInventoryRedistributeModal, RmInventoryRequestModal } from "../Modals/inventory/RmInventoryForms";

const inventoryTabs = [
  { key: "available", label: "Available stock", icon: Package },
  { key: "distribute", label: "Distribute to SC", icon: Send },
  { key: "history", label: "Inventory history", icon: History },
  { key: "undistributed", label: "Undistributed SIMs", icon: Boxes },
  { key: "requests", label: "Stock requests", icon: ClipboardList },
] as const;

export function RegionalManagerInventoryPage({ initialModal = null }: { initialModal?: "redistribute" | null }) {
  const query = useGetRmSimInventoryOverview();
  const [tab, setTab] = useState("available");
  const [modal, setModal] = useState<"distribute" | "redistribute" | "request" | null>(initialModal);
  const close = () => setModal(null);
  return <main className="mx-auto w-full min-w-0 max-w-[1600px] space-y-5 p-4 sm:p-6">
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Regional operations</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">SIM Inventory</h1>
        <p className="mt-1 text-sm text-slate-500">Manage stock received from Super Admin and distribute it across your State Coordinators.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setModal("request")} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
          <Plus className="size-4" /> Request stock
        </button>
        <button type="button" onClick={() => setModal("redistribute")} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
          <Archive className="size-4" /> Redistribute
        </button>
        <button type="button" onClick={() => setModal("distribute")} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#203c64] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#172f50]">
          <Send className="size-4" /> Distribute to SC
        </button>
      </div>
    </header>

    {query.data && <section aria-label="Inventory summary" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {Object.entries(query.data.summary_cards).map(([key, card], index) => {
        const accents = ["text-[#203c64]", "text-emerald-600", "text-blue-600", "text-amber-600", "text-rose-500"];
        const icons = [Package, Send, Boxes, History, ClipboardList];
        const Icon = icons[index] ?? Package;
        return <div key={key} className="flex min-h-23.5 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-50"><Icon className={`size-5 ${accents[index] ?? "text-slate-600"}`} /></span>
          <div className="min-w-0"><p className="text-2xl font-bold leading-none text-slate-900">{card.count.toLocaleString()}</p><p className="mt-1 truncate text-xs font-semibold text-slate-700">{card.label}</p><p className="mt-0.5 truncate text-[11px] text-slate-400">{card.subtext}</p></div>
        </div>;
      })}
    </section>}

    <nav aria-label="Inventory sections" className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-1">
      {inventoryTabs.map(({ key, label, icon: Icon }) => <button key={key} type="button" onClick={() => setTab(key)} aria-current={tab === key ? "page" : undefined}
        className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${tab === key ? "bg-white text-[#203c64] shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
        <Icon className="size-4" />{label}
      </button>)}
    </nav>

    {tab === "available" ? <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <RmInventoryOverview data={query.data} onDistribute={() => setModal("distribute")} onRequestStock={() => setModal("request")} />}</RmQueryState> : tab === "undistributed" ? <RmAvailableStock /> : tab === "history" ? <RmInventoryHistory /> : tab === "distribute" ? <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 border-b border-slate-100 pb-4"><h2 className="text-lg font-semibold text-slate-900">Distribute SIMs to a State Coordinator</h2><p className="mt-1 text-sm text-slate-500">Choose a coordinator, SIM type, and quantity. The server validates available stock when submitted.</p></div>
        <button type="button" onClick={() => setModal("distribute")} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#203c64] px-5 text-sm font-semibold text-white transition hover:bg-[#172f50]"><Send className="size-4" /> Open distribution form</button>
      </section>
      <aside className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5"><h3 className="text-sm font-semibold text-slate-900">Distribution activity</h3><p className="mt-2 text-sm leading-6 text-slate-600">Distributions are recorded against the selected coordinator and update your inventory summary after the API confirms the request.</p><button type="button" onClick={() => setTab("history")} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#203c64] hover:underline"><History className="size-4" /> View inventory history</button></aside>
    </div> : <RmStockRequests />}

    {modal === "distribute" && <RmInventoryDistributeModal onClose={close} />}
    {modal === "redistribute" && <RmInventoryRedistributeModal onClose={close} />}
    {modal === "request" && <RmInventoryRequestModal onClose={close} />}
  </main>;
}
