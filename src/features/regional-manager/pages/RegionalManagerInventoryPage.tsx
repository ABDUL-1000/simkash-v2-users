import { useState } from "react";
import { Archive, ArrowDownToLine, ClipboardList, Download, Layers, Plus, Share2, TriangleAlert } from "lucide-react";
import { useExportRmInventoryHistory, useGetRmSimInventoryOverview } from "../api/inventory";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmInventoryOverview } from "../components/inventory/RmInventoryOverview";
import { RmAvailableStock } from "../components/inventory/RmAvailableStock";
import { RmInventoryHistory } from "../components/inventory/RmInventoryHistory";
import { RmStockRequests } from "../components/inventory/RmStockRequests";
import { RmDistributePanel } from "../components/inventory/RmDistributePanel";
import { RmDesignedRequest } from "../Modals/dashboard/RmDesignedRequest";
import { rmFlow } from "../Modals/flow/rmFlowTokens";

const inventoryTabs = [
  { key: "available", label: "Available Stock" },
  { key: "distribute", label: "Distribute to SC" },
  { key: "history", label: "Inventory History" },
  { key: "undistributed", label: "Undistributed SIMs" },
  { key: "requests", label: "Stock Requests" },
] as const;
type Tab = typeof inventoryTabs[number]["key"];
const cardStyles: Record<string, { icon: typeof Archive; color: string; bg: string }> = {
  received: { icon: ArrowDownToLine, color: rmFlow.navy, bg: rmFlow.softBlue },
  distributed: { icon: Share2, color: rmFlow.green, bg: rmFlow.greenBg },
  total_available: { icon: Layers, color: rmFlow.ink, bg: rmFlow.base },
  pending_request: { icon: ClipboardList, color: rmFlow.amber, bg: "#FEF3C7" },
  scs_low_on_stock: { icon: TriangleAlert, color: rmFlow.red, bg: rmFlow.redBg },
};
const cardOrder = ["received", "distributed", "total_available", "pending_request", "scs_low_on_stock"] as const;

export function RegionalManagerInventoryPage() {
  const query = useGetRmSimInventoryOverview();
  const exporter = useExportRmInventoryHistory();
  const [tab, setTab] = useState<Tab>("available");
  const [requesting, setRequesting] = useState(false);
  return <main className="mx-auto w-full min-w-0 max-w-400 space-y-5 p-4 sm:p-6" style={{ color: rmFlow.ink }}>
    <header className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: rmFlow.border }}>
      <div><h1 className="text-xl font-bold">SIM Inventory</h1><p className="mt-0.5 text-xs" style={{ color: rmFlow.muted }}>Manage stock received from Super Admin and distribute it across your State Coordinators.</p></div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => exporter.mutate()} disabled={exporter.isPending} className="inline-flex min-h-10 items-center gap-2 rounded-lg border bg-white px-4 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-50" style={{ borderColor: rmFlow.border, color: rmFlow.slate }}><Download className="size-4" />{exporter.isPending ? "Exporting…" : "Export"}</button>
        <button type="button" onClick={() => setRequesting(true)} className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition hover:brightness-110" style={{ background: rmFlow.navy }}><Plus className="size-4" /> Request Stock</button>
      </div>
    </header>

    {query.data && <section aria-label="Inventory summary" className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {cardOrder.map(key => { const card = query.data.summary_cards[key]; const style = cardStyles[key]; const Icon = style.icon;
        return card && <div key={key} className="flex items-center gap-3 rounded-xl border bg-white p-4" style={{ borderColor: rmFlow.border }}>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ background: style.bg, color: style.color }}><Icon className="size-5" /></span>
          <div className="min-w-0"><p className="text-xl font-bold leading-none">{card.count.toLocaleString()}</p><p className="mt-1 truncate text-xs" style={{ color: rmFlow.muted }}>{card.label}</p></div>
        </div>; })}
    </section>}

    <nav aria-label="Inventory sections" className="flex gap-6 overflow-x-auto border-b" style={{ borderColor: rmFlow.border }}>
      {inventoryTabs.map(({ key, label }) => <button key={key} type="button" onClick={() => setTab(key)} aria-current={tab === key ? "page" : undefined}
        className="-mb-px shrink-0 border-b-2 pb-2.5 text-sm font-medium transition" style={{ borderColor: tab === key ? rmFlow.navy : "transparent", color: tab === key ? rmFlow.navy : rmFlow.muted }}>{label}</button>)}
    </nav>

    {tab === "available" ? <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <RmInventoryOverview data={query.data} onDistribute={() => setTab("distribute")} onRequestStock={() => setRequesting(true)} />}</RmQueryState>
      : tab === "distribute" ? <RmDistributePanel onViewHistory={() => setTab("history")} />
        : tab === "history" ? <RmInventoryHistory />
          : tab === "undistributed" ? <RmAvailableStock /> : <RmStockRequests />}

    {requesting && <RmDesignedRequest onClose={() => setRequesting(false)} />}
  </main>;
}
