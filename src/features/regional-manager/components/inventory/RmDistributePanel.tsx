import { useState } from "react";
import { Input } from "antd";
import { AlertTriangle, ArrowLeftRight, Archive, CheckSquare, Eye, History, Info, Minus, Plus, X } from "lucide-react";
import { useGetRmCoordinatorStockHistory } from "../../api/dashboard";
import { rmSimTypes, emptyRmSims, simsToQuantities } from "../../api/inventory";
import type { RmStateCoordinatorItem } from "../../types/api";
import { RmCoordinatorPicker, RmDesignedDistribute } from "../../Modals/dashboard/RmDesignedDistribute";
import { RmAvatar, RmBadge, RmFlowModal } from "../../Modals/flow/RmFlow";
import { rmFlow } from "../../Modals/flow/rmFlowTokens";
import { RmSimNumberSelect } from "../../Modals/flow/RmSimPicker";
import { activeTypes, firstName, resizeSims, rmSimMeta, sumQuantities, useRmCoordinatorStock, useRmOwnStock, useRmSimOptions } from "../../Modals/flow/rmStock";
import type { RmSimType } from "../../types/dashboard";
import { RmStatus } from "../dashboard/RmDashboardPrimitives";

const card = "overflow-hidden rounded-xl border bg-white";
const SAFETY_THRESHOLD = 10;

function Stepper({ value, max, onChange }: { value: number; max: number; onChange: (value: number) => void }) {
  const disabled = max === 0;
  return <div className="flex items-center" style={{ opacity: disabled ? 0.5 : 1 }}>
    <button type="button" aria-label="Decrease" disabled={disabled || value <= 0} onClick={() => onChange(Math.max(0, value - 1))} className="flex size-9 items-center justify-center rounded-l-lg border bg-white disabled:opacity-50" style={{ borderColor: rmFlow.border }}><Minus className="size-3.5" /></button>
    <input aria-label="Quantity" inputMode="numeric" disabled={disabled} value={value} onChange={event => onChange(Math.min(max, Number(event.target.value.replace(/\D/g, "")) || 0))} className="h-9 w-14 border-y bg-white text-center text-sm font-bold outline-none" style={{ borderColor: rmFlow.border }} />
    <button type="button" aria-label="Increase" disabled={disabled || value >= max} onClick={() => onChange(Math.min(max, value + 1))} className="flex size-9 items-center justify-center rounded-r-lg text-white disabled:opacity-50" style={{ background: rmFlow.navy }}><Plus className="size-3.5" /></button>
  </div>;
}

/** Stepper + SIM-number select for one type, fed by GET /sim-inventory/undistributed. */
function SimStepper({ type, enabled, value, onChange }: { type: RmSimType; enabled: boolean; value: string[]; onChange: (sims: string[]) => void }) {
  const [search, setSearch] = useState("");
  const { options, loading } = useRmSimOptions({ kind: "own" }, type, search, enabled);
  return <div className="space-y-2">
    <Stepper value={value.length} max={enabled ? Math.max(value.length, options.length) : 0} onChange={count => onChange(resizeSims(value, count, options))} />
    {enabled && options.length > 0 && <div className="w-64 max-w-full"><RmSimNumberSelect type={type} source={{ kind: "own" }} value={value} onChange={onChange} options={options} loading={loading} onSearch={setSearch} /></div>}
  </div>;
}

export function RmDistributePanel({ onViewHistory }: { onViewHistory: () => void }) {
  const [sc, setSc] = useState<RmStateCoordinatorItem>();
  const [picking, setPicking] = useState(false);
  const [sims, setSims] = useState(emptyRmSims);
  const quantities = simsToQuantities(sims);
  const [notes, setNotes] = useState("");
  const [confirming, setConfirming] = useState(false);
  const own = useRmOwnStock();
  const scStock = useRmCoordinatorStock(sc?.id);
  const history = useGetRmCoordinatorStockHistory(sc?.id ?? 0);
  const total = sumQuantities(quantities);
  const types = activeTypes(quantities);
  const name = sc?.name ?? "";
  const last = history.data?.items[0];
  const lowAfter = rmSimTypes.filter(type => own.byType && own.byType[type] > 0 && own.byType[type] - quantities[type] < SAFETY_THRESHOLD);
  const clear = () => { setSims(emptyRmSims()); setNotes(""); };

  return <div className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.9fr)]">
    <section className={card} style={{ borderColor: rmFlow.border }}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-4" style={{ borderColor: rmFlow.border }}>
        <h2 className="flex items-center gap-2 text-base font-semibold" style={{ color: rmFlow.ink }}><ArrowLeftRight className="size-4" /> Distribute SIMs to SC</h2>
        {sc && total > 0 && <RmBadge>{name} · {total} SIMs queued</RmBadge>}
      </header>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3 text-xs" style={{ borderColor: rmFlow.border, background: rmFlow.base }}>
        <span className="flex items-center gap-2 font-semibold" style={{ color: rmFlow.slate }}><Archive className="size-4" /> Available Stock:</span>
        <span className="flex flex-wrap gap-4" style={{ color: rmFlow.muted }}>{rmSimTypes.map(type => <span key={type}>{rmSimMeta[type].short} <strong style={{ color: rmFlow.ink }}>{own.byType?.[type] ?? "—"}</strong></span>)}</span>
      </div>
      <div className="border-b px-5 py-4" style={{ borderColor: rmFlow.border }}>
        <p className="mb-2 text-sm font-semibold">State Coordinator</p>
        {sc ? <div className="flex items-center gap-3 rounded-xl border-2 p-3" style={{ borderColor: rmFlow.blue, background: rmFlow.blueBg }}>
          <RmAvatar initials={sc.initials} size={40} /><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{sc.name}</strong><span className="text-xs" style={{ color: rmFlow.muted }}>{sc.state} · {sc.aps_text}</span></div>
          <button type="button" onClick={() => setPicking(true)} className="rounded-lg px-4 py-1.5 text-xs font-semibold text-white" style={{ background: rmFlow.navy }}>Change</button>
        </div> : <button type="button" onClick={() => setPicking(true)} className="w-full rounded-xl border-2 border-dashed p-4 text-sm font-semibold transition hover:bg-slate-50" style={{ borderColor: rmFlow.border, color: rmFlow.blue }}>+ Select a State Coordinator</button>}
      </div>
      <div className="flex justify-between px-5 pt-4 text-xs font-semibold" style={{ color: rmFlow.slate }}><span>SIM Type</span><span>Quantity to Distribute</span></div>
      <div className="divide-y px-5" style={{ borderColor: rmFlow.border }}>{rmSimTypes.map(type => {
        const meta = rmSimMeta[type]; const available = own.byType?.[type] ?? 0; const before = scStock.byType?.[type]; const Icon = meta.icon;
        return <div key={type} className="flex flex-wrap items-start gap-3 py-3.5" style={{ borderColor: rmFlow.border, opacity: available ? 1 : 0.55 }}>
          <span className="flex size-10 items-center justify-center rounded-lg" style={{ background: rmFlow.base, color: rmFlow.navy }}><Icon className="size-4.5" /></span>
          <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{meta.device}</p><p className="text-xs" style={{ color: rmFlow.muted }}>Available: {available}</p></div>
          {sc && quantities[type] > 0 && before !== undefined && <div className="text-right text-[11px] leading-tight"><p style={{ color: rmFlow.muted }}>After distribution</p><p className="font-semibold" style={{ color: rmFlow.green }}>{firstName(name)}: {before} → {before + quantities[type]}</p></div>}
          <SimStepper type={type} enabled={Boolean(sc) && available > 0} value={sims[type]} onChange={next => setSims(current => ({ ...current, [type]: next }))} />
        </div>;
      })}</div>
      <div className="flex items-center justify-between border-y px-5 py-3.5" style={{ borderColor: rmFlow.border, background: rmFlow.base }}><strong className="text-sm">Distribution Total</strong><span className="text-sm"><strong style={{ color: rmFlow.navy }}>{total} SIMs</strong> <span className="text-xs" style={{ color: rmFlow.muted }}>across {types.length} type{types.length === 1 ? "" : "s"}</span></span></div>
      <div className="px-5 py-4"><p className="mb-2 text-sm font-semibold">Note (optional)</p><Input.TextArea rows={3} value={notes} onChange={event => setNotes(event.target.value)} placeholder="e.g. Monthly stock refresh for Q3 targets" /></div>
      <footer className="flex items-center justify-between gap-3 border-t px-5 py-4" style={{ borderColor: rmFlow.border }}>
        <button type="button" onClick={clear} disabled={!total && !notes} className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold disabled:opacity-40" style={{ borderColor: rmFlow.border, color: rmFlow.slate }}><X className="size-3.5" /> Clear</button>
        <button type="button" disabled={!sc || total <= 0} onClick={() => setConfirming(true)} className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-45" style={{ background: rmFlow.navy }}><Eye className="size-4" /> Preview Distribution</button>
      </footer>
    </section>

    <aside className="space-y-4">
      <section className={card} style={{ borderColor: rmFlow.border, borderLeft: `4px solid ${rmFlow.green}` }}>
        <header className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: rmFlow.border }}><h3 className="flex items-center gap-2 text-sm font-semibold"><CheckSquare className="size-4" style={{ color: rmFlow.green }} /> Distribution Preview</h3><span className="text-xs" style={{ color: rmFlow.muted }}>{name}</span></header>
        <div className="space-y-3 px-4 py-3">{types.length ? types.map(type => <div key={type} className="flex justify-between text-xs"><div><p className="font-semibold">{rmSimMeta[type].device}</p><p style={{ color: rmFlow.muted }}>Current stock: {scStock.byType?.[type] ?? "—"}</p></div><div className="text-right"><p className="font-bold" style={{ color: rmFlow.navy }}>{quantities[type]} units</p>{scStock.byType && <p style={{ color: rmFlow.green }}>→ {scStock.byType[type] + quantities[type]} total</p>}</div></div>)
          : <p className="py-2 text-xs" style={{ color: rmFlow.muted }}>{sc ? "Add quantities to preview this distribution." : "Select a State Coordinator to begin."}</p>}</div>
        <div className="flex items-center justify-between border-t px-4 py-3" style={{ borderColor: rmFlow.border }}><strong className="text-sm">Total Distribution</strong><span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: rmFlow.greenBg, color: rmFlow.green }}>{total} SIMs</span></div>
      </section>

      {sc && <section className={card} style={{ borderColor: rmFlow.border }}>
        <header className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: rmFlow.border }}><h3 className="flex items-center gap-2 text-sm font-semibold"><Info className="size-4" /> SC Quick Info</h3><RmStatus value={sc.stock_status === "out" ? "Out of stock" : sc.bonus_status} /></header>
        <dl className="space-y-2.5 px-4 py-3 text-xs">{[["Agency Partners", sc.aps_text], ["Current SIM Stock", `${scStock.total ?? sc.stock} SIMs`], ["Activations", sc.activations_text], ["Last Active", sc.last_active], ["Last Distribution", last?.time_ago ?? "—"]].map(([label, value]) =>
          <div key={label} className="flex justify-between gap-3"><dt style={{ color: rmFlow.muted }}>{label}</dt><dd className="font-semibold" style={{ color: label === "Last Distribution" ? rmFlow.amber : rmFlow.ink }}>{value}</dd></div>)}</dl>
      </section>}

      {lowAfter.length > 0 && <section className="rounded-xl border p-4" style={{ borderColor: "#FCD34D", background: rmFlow.amberBg }}>
        <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: rmFlow.ink }}><span className="flex size-6 items-center justify-center rounded-full text-white" style={{ background: rmFlow.amber }}><AlertTriangle className="size-3.5" /></span> Stock Safety Check</h3>
        <ul className="mt-2 space-y-1 text-xs" style={{ color: rmFlow.amberInk }}>{lowAfter.map(type => <li key={type}>{rmSimMeta[type].device} will have {own.byType![type] - quantities[type]} units left. Safety threshold is {SAFETY_THRESHOLD} units.</li>)}</ul>
      </section>}

      {sc && <section className={card} style={{ borderColor: rmFlow.border }}>
        <header className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: rmFlow.border }}><h3 className="flex items-center gap-2 text-sm font-semibold"><History className="size-4" /> Last Distribution</h3><button type="button" className="text-xs font-semibold" style={{ color: rmFlow.blue }} onClick={onViewHistory}>View all</button></header>
        {last ? <dl className="space-y-2.5 px-4 py-3 text-xs">{[["Date", last.time_ago], ["Coordinator", name], ["Breakdown", last.breakdown_text], ["Total SIMs", last.total_sims_text]].map(([label, value]) =>
          <div key={label} className="flex justify-between gap-3"><dt style={{ color: rmFlow.muted }}>{label}</dt><dd className="text-right font-semibold" style={{ color: label === "Total SIMs" ? rmFlow.green : rmFlow.ink }}>{value}</dd></div>)}</dl>
          : <p className="px-4 py-3 text-xs" style={{ color: rmFlow.muted }}>{history.isLoading ? "Loading…" : "No previous distribution to this SC."}</p>}
      </section>}
    </aside>

    {picking && <RmFlowModal title="Change State Coordinator" subtitle="Select who receives this distribution" onClose={() => setPicking(false)}>
      <RmCoordinatorPicker selected={sc} onSelect={row => { setSc(row); setSims(emptyRmSims()); setPicking(false); }} />
    </RmFlowModal>}
    {confirming && sc && <RmDesignedDistribute target={sc} initialSims={sims} initialNotes={notes} onClose={() => setConfirming(false)} onEdit={() => setConfirming(false)} onDone={clear} />}
  </div>;
}
