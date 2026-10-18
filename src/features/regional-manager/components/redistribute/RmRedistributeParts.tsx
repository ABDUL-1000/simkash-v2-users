import { useState, type ReactNode } from "react";
import { Select, Skeleton } from "antd";
import { ArrowDownLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, RefreshCw, Undo2, Zap, type LucideIcon } from "lucide-react";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import { useGetRmInventoryHistory } from "../../api/inventory";
import type { RmStateCoordinatorItem } from "../../types/api";
import { rmFlow } from "../../Modals/flow/rmFlowTokens";
import { reasonOptions } from "./redistributeOptions";
import { firstName, stockTone } from "../../Modals/flow/rmStock";

export type RedistributeMode = "sc-to-sc" | "recall" | "quick";
const modes: Array<{ key: RedistributeMode; title: string; hint: string; icon: LucideIcon; color: string; bg: string }> = [
  { key: "sc-to-sc", title: "SC to SC Transfer", hint: "Move stock from one SC to another", icon: ArrowLeftRight, color: rmFlow.blue, bg: rmFlow.blueBg },
  { key: "recall", title: "Recall from SC", hint: "Bring stock back to your inventory", icon: Undo2, color: rmFlow.amber, bg: rmFlow.amberBg },
  { key: "quick", title: "Quick Distribute", hint: "Send from your stock to an SC", icon: Zap, color: rmFlow.green, bg: rmFlow.greenBg },
];

export function RmModeSelector({ mode, onChange }: { mode: RedistributeMode; onChange: (mode: RedistributeMode) => void }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{modes.map(item => {
    const active = item.key === mode; const Icon = item.icon;
    return <button key={item.key} type="button" onClick={() => onChange(item.key)} aria-pressed={active} className="flex items-center gap-3 rounded-2xl border-2 bg-white p-4 text-left transition hover:shadow-sm" style={{ borderColor: active ? item.color : rmFlow.border, background: active ? item.bg : rmFlow.white }}>
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ background: active ? item.color : item.bg, color: active ? "#fff" : item.color }}><Icon className="size-5" /></span>
      <span><strong className="block text-sm" style={{ color: rmFlow.ink }}>{item.title}</strong><span className="text-xs" style={{ color: rmFlow.muted }}>{item.hint}</span></span>
    </button>;
  })}</div>;
}

export function RmScSelect({ value, onChange, exclude, placeholder = "Select a State Coordinator", disabled }: { value?: RmStateCoordinatorItem; onChange: (row?: RmStateCoordinatorItem) => void; exclude?: number; placeholder?: string; disabled?: boolean }) {
  const [search, setSearch] = useState("");
  const query = useGetRmStateCoordinators({ page: 1, limit: 30, search, status: "all" });
  const rows = (query.data?.items ?? []).filter(row => row.id !== exclude);
  const byId = new Map(rows.map(row => [row.id, row]));
  if (value) byId.set(value.id, value);
  return <Select size="large" className="w-full" showSearch filterOption={false} onSearch={setSearch} allowClear disabled={disabled} loading={query.isFetching} placeholder={placeholder} value={value?.id}
    onChange={(id?: number) => onChange(id ? byId.get(id) : undefined)}
    options={[...byId.values()].map(row => { const tone = stockTone(row.stock); return { value: row.id, label: <span className="flex items-center justify-between gap-2"><span className="truncate">{row.name} · <span style={{ color: rmFlow.muted }}>{row.state}</span></span><span className="rounded-full px-2 text-xs font-bold" style={{ color: tone.color, background: tone.bg }}>{row.stock}</span></span> }; })}
    notFoundContent={query.isFetching ? "Loading…" : "No coordinators found"} />;
}

export const RmFormCard = ({ title, subtitle, children, footer }: { title: ReactNode; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode }) =>
  <section className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: rmFlow.border }}>
    <header className="border-b px-5 py-4" style={{ borderColor: rmFlow.border }}><h2 className="text-base font-semibold" style={{ color: rmFlow.ink }}>{title}</h2>{subtitle && <p className="mt-0.5 text-xs" style={{ color: rmFlow.muted }}>{subtitle}</p>}</header>
    <div className="space-y-5 px-5 py-5">{children}</div>
    {footer && <footer className="flex items-center justify-between gap-3 border-t px-5 py-4" style={{ borderColor: rmFlow.border }}>{footer}</footer>}
  </section>;

export function RmReasonPicker({ value, onChange, options = reasonOptions }: { value: string; onChange: (value: string) => void; options?: readonly string[] }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{options.map(option => { const active = option === value;
    return <button key={option} type="button" onClick={() => onChange(option)} className="rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition" style={{ borderColor: active ? rmFlow.blue : rmFlow.border, background: active ? rmFlow.blueBg : rmFlow.white, color: active ? rmFlow.blue : rmFlow.ink }}>{option}</button>; })}</div>;
}

interface PreviewSide { name?: string; before?: number; after?: number }
export function RmRedistributeSidebar({ from, to, quantity, selectedId, onPickSc, onViewHistory }: { from: PreviewSide; to: PreviewSide; quantity: number; selectedId?: number; onPickSc: (row: RmStateCoordinatorItem) => void; onViewHistory: () => void }) {
  const network = useGetRmStateCoordinators({ page: 1, limit: 12, status: "all" });
  const history = useGetRmInventoryHistory({ page: 1, limit: 5, sortBy: "newest" });
  const movements = history.data?.grouped_history.flatMap(group => group.items).slice(0, 5) ?? [];
  const side = (label: string, data: PreviewSide, color: string) => <div className="flex-1 rounded-xl p-3" style={{ background: rmFlow.base }}>
    <p className="text-[10px] font-semibold uppercase" style={{ color }}>{label}</p><p className="truncate text-sm font-semibold">{data.name ?? "—"}</p>
    <p className="text-xs" style={{ color: rmFlow.muted }}>{data.before ?? "—"} → <strong style={{ color }}>{data.after ?? "—"}</strong> SIMs</p></div>;
  return <aside className="space-y-4">
    <section className="rounded-2xl border bg-white p-4" style={{ borderColor: rmFlow.border }}>
      <h3 className="mb-3 text-sm font-semibold">Transfer Preview</h3>
      <div className="flex items-center gap-2">{side("From", from, rmFlow.red)}<ArrowRight className="size-4 shrink-0" style={{ color: rmFlow.blue }} />{side("To", to, rmFlow.green)}</div>
      <p className="mt-3 text-center text-xs" style={{ color: rmFlow.muted }}><strong style={{ color: rmFlow.navy }}>{quantity} SIMs</strong> will move</p>
    </section>
    <section className="rounded-2xl border bg-white p-4" style={{ borderColor: rmFlow.border }}>
      <h3 className="text-sm font-semibold">SC Network Map</h3><p className="mb-3 text-[11px]" style={{ color: rmFlow.muted }}>Tap an SC to select it as the source</p>
      {network.isLoading ? <Skeleton active paragraph={{ rows: 3 }} /> : <div className="grid grid-cols-3 gap-2">{(network.data?.items ?? []).map(row => { const tone = stockTone(row.stock); const active = row.id === selectedId;
        return <button key={row.id} type="button" onClick={() => onPickSc(row)} className="rounded-xl border p-2 text-center transition hover:shadow-sm" style={{ borderColor: active ? rmFlow.blue : rmFlow.border, background: tone.bg }}>
          <p className="truncate text-[11px] font-semibold">{firstName(row.name)}</p><p className="text-base font-bold" style={{ color: tone.color }}>{row.stock}</p><p className="truncate text-[10px]" style={{ color: rmFlow.muted }}>{row.state}</p></button>; })}</div>}
      <div className="mt-3 flex flex-wrap gap-3 text-[10px]" style={{ color: rmFlow.muted }}>{[["Healthy", rmFlow.green], ["Low", rmFlow.amber], ["Empty", rmFlow.red]].map(([label, color]) => <span key={label} className="flex items-center gap-1"><span className="size-2 rounded-full" style={{ background: color }} />{label}</span>)}</div>
    </section>
    <section className="rounded-2xl border bg-white p-4" style={{ borderColor: rmFlow.border }}>
      <div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold">Recent Movements</h3><button type="button" className="text-xs font-semibold" style={{ color: rmFlow.blue }} onClick={onViewHistory}>View all</button></div>
      {history.isLoading ? <Skeleton active paragraph={{ rows: 3 }} /> : movements.length ? <ul className="divide-y" style={{ borderColor: rmFlow.border }}>{movements.map(item => { const credit = item.quantity_delta >= 0; const Icon = item.event_type === "adjusted" ? RefreshCw : credit ? ArrowDownLeft : ArrowUpRight;
        return <li key={item.id} className="flex items-center gap-3 py-2.5" style={{ borderColor: rmFlow.border }}><span className="flex size-8 items-center justify-center rounded-full" style={{ background: credit ? rmFlow.greenBg : rmFlow.blueBg, color: credit ? rmFlow.green : rmFlow.blue }}><Icon className="size-4" /></span>
          <div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">{item.party_info}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{item.time}</p></div><strong className="text-xs" style={{ color: credit ? rmFlow.green : rmFlow.red }}>{item.quantity_formatted}</strong></li>; })}</ul>
        : <p className="text-xs" style={{ color: rmFlow.muted }}>No stock movements yet.</p>}
    </section>
  </aside>;
}
