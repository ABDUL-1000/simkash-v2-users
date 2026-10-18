import { useState } from "react";
import { Input, Pagination, Skeleton } from "antd";
import { Boxes, CheckCircle2, Search, Users } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import { rmSimTypes, useRmBatchTransfer, emptyRmQuantities, type RmTypeQuantities } from "../../api/inventory";
import type { RmStateCoordinatorItem } from "../../types/api";
import type { RmTarget } from "../../types/dashboard";
import { RmAvatar, RmFlowModal, RmLabel, RmNote, RmReceipt, RmResultModal, RmStepperRow, RmStockBox, RmTotalBar, type RmReceiptRow } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";
import { activeTypes, breakdownText, firstName, rmSimMeta, stockTone, sumQuantities, useRmCoordinatorStock, useRmOwnStock } from "../flow/rmStock";

type Selected = RmTarget & Partial<Pick<RmStateCoordinatorItem, "state" | "phone" | "initials" | "stock">>;
const initialsOf = (name: string) => name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();

export function RmCoordinatorPicker({ selected, onSelect, exclude }: { selected?: Selected; onSelect: (row: RmStateCoordinatorItem) => void; exclude?: number }) {
  const [search, setSearch] = useState("");
  const pagination = useTablePagination({ initialPageSize: 6 });
  const query = useGetRmStateCoordinators({ page: pagination.page, limit: pagination.pageSize, search, status: "all" });
  const rows = (query.data?.items ?? []).filter(row => row.id !== exclude);
  return <div className="space-y-3">
    <Input prefix={<Search className="size-4" style={{ color: rmFlow.muted }} />} allowClear placeholder="Search SC by name or phone..." onChange={event => { setSearch(event.target.value); pagination.resetPage(); }} />
    {query.error ? <RmNote tone="danger" action={<button type="button" className="font-semibold underline" onClick={() => void query.refetch()}>Retry</button>}>{query.error.message}</RmNote>
      : query.isLoading ? <Skeleton active /> : rows.length ? <div className="divide-y rounded-xl border" style={{ borderColor: rmFlow.border }}>{rows.map(row => {
        const active = selected?.id === row.id; const tone = stockTone(row.stock);
        return <button type="button" key={row.id} onClick={() => onSelect(row)} className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50" style={{ background: active ? rmFlow.blueBg : undefined, borderColor: rmFlow.border }}>
          <RmAvatar initials={row.initials} /><span className="min-w-0 flex-1"><strong className="block truncate text-sm">{row.name}</strong><span className="text-xs" style={{ color: rmFlow.muted }}>{row.state}</span></span>
          <span className="rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ color: tone.color, background: tone.bg }}>{row.stock}</span>
        </button>;
      })}</div> : <AppEmptyState title="No coordinators found" description="Try a different name or phone number." />}
    {(query.data?.total ?? 0) > pagination.pageSize && <Pagination size="small" align="center" {...pagination.paginationConfig} total={query.data?.total} showSizeChanger={false} />}
  </div>;
}

export function RmDesignedDistribute({ target, onClose, onViewProfile, initialQuantities, initialNotes = "", onEdit, onDone }: {
  target?: Selected; onClose: () => void; onViewProfile?: (id: number) => void;
  /** When supplied (inline Distribute page), the modal opens on the confirm step; onEdit returns to the page form. */
  initialQuantities?: RmTypeQuantities; initialNotes?: string; onEdit?: () => void; onDone?: () => void;
}) {
  const [step, setStep] = useState(initialQuantities ? 2 : target ? 1 : 0);
  const [selected, setSelected] = useState<Selected | undefined>(target);
  const [quantities, setQuantities] = useState(() => initialQuantities ?? emptyRmQuantities());
  const [notes, setNotes] = useState(initialNotes);
  const own = useRmOwnStock();
  const sc = useRmCoordinatorStock(selected?.id);
  const batch = useRmBatchTransfer();
  const total = sumQuantities(quantities);
  const valid = Boolean(selected) && total > 0 && rmSimTypes.every(type => quantities[type] <= (own.byType?.[type] ?? 0));
  const name = selected?.name ?? "";
  const reset = () => { batch.reset(); setQuantities(emptyRmQuantities()); setNotes(""); setStep(0); setSelected(undefined); };

  if (batch.data) {
    const sent = batch.data.filter(line => line.ok); const failed = batch.data.find(line => !line.ok);
    const sentTotal = sent.reduce((sum, line) => sum + line.quantity, 0);
    if (!sent.length) return <RmResultModal status="failed" title="Distribution Failed" subtitle="No stock was moved. Your inventory is unchanged." onClose={onClose}
      actions={[{ label: "Try Again", onClick: () => { batch.reset(); setStep(2); } }, { label: "Cancel", variant: "text", onClick: onClose }]}><RmNote tone="warning">Reason: {failed?.message}</RmNote></RmResultModal>;
    const done = () => { onDone?.(); onClose(); };
    return <RmResultModal title={failed ? "Partially Distributed" : "Stock Distributed!"} iconColor={failed ? rmFlow.amber : rmFlow.green} onClose={done}
      actions={[{ label: "Done", onClick: done }, ...(onViewProfile && selected ? [{ label: "View Profile", variant: "secondary" as const, onClick: () => onViewProfile(selected.id) }] : []), { label: "Distribute More", variant: "secondary", onClick: onDone ? done : reset }]}>
      <RmReceipt heading="Distribution receipt" rows={[["Recipient", name], ...sent.map(line => [rmSimMeta[line.sim_type].label, `${line.quantity} SIMs`] as RmReceiptRow), "divider",
        [<strong>Total Sent</strong>, <strong>{sentTotal} SIMs</strong>], ["Your Stock Left", own.total !== undefined ? `${own.total.toLocaleString()} SIMs` : "—"]]}
        footer={<p className="text-[11px]" style={{ color: rmFlow.muted }}>Ref: {sent.map(line => line.reference).filter(Boolean).join(", ") || "—"}</p>} />
      {failed && <RmNote tone="warning">{rmSimMeta[failed.sim_type].label} was not sent: {failed.message}</RmNote>}
    </RmResultModal>;
  }

  const ownBox = own.query.isLoading ? <Skeleton active paragraph={{ rows: 1 }} /> : <RmStockBox tone="success" icon={Boxes} title={`Your inventory: ${own.total?.toLocaleString() ?? "—"} SIMs`}>{breakdownText(own.byType)}</RmStockBox>;
  if (step === 0) return <RmFlowModal title="Distribute SIM Stock" subtitle="Select a State Coordinator" onClose={onClose}
    secondary={{ label: "Cancel", onClick: onClose }} primary={{ label: "Continue →", color: rmFlow.blue, disabled: !selected, onClick: () => setStep(1) }}>
    <RmStockBox title={`Your stock: ${own.total?.toLocaleString() ?? "—"} SIMs available`} icon={Boxes}>{breakdownText(own.byType)}</RmStockBox>
    <RmLabel>Select State Coordinator</RmLabel>
    <RmCoordinatorPicker selected={selected} onSelect={row => setSelected(row)} />
    {selected && <div className="rounded-xl p-3" style={{ background: rmFlow.base }}><RmLabel>Distributing to:</RmLabel><div className="mt-1.5 flex items-center gap-3"><RmAvatar initials={selected.initials ?? initialsOf(name)} size={30} /><div className="min-w-0 flex-1 text-xs"><strong className="block text-sm">{name}{selected.state ? ` · ${selected.state}` : ""}</strong>{selected.stock !== undefined && <span style={{ color: rmFlow.muted }}>Current stock: {selected.stock} SIMs</span>}</div><button type="button" className="text-xs font-semibold" style={{ color: rmFlow.blue }} onClick={() => setSelected(undefined)}>Change</button></div></div>}
  </RmFlowModal>;

  if (step === 1) return <RmFlowModal title="Distribute SIM Stock" subtitle={`To: ${name}${selected?.state ? ` · ${selected.state}` : ""}`} onClose={onClose}
    secondary={{ label: "← Back", onClick: () => setStep(0) }} primary={{ label: "Preview Distribution →", color: rmFlow.blue, disabled: !valid, onClick: () => setStep(2) }}>
    {ownBox}
    <RmStockBox tone="info" icon={Users} title={`${firstName(name)} currently has: ${sc.total ?? "—"} SIMs`}>{breakdownText(sc.byType)}</RmStockBox>
    <div><RmLabel>SIM type quantities</RmLabel>{rmSimTypes.map(type => {
      const before = sc.byType?.[type];
      return <div key={type}><RmStepperRow icon={rmSimMeta[type].icon} iconBg={rmSimMeta[type].bg} iconColor={rmSimMeta[type].color} label={rmSimMeta[type].label} hint={`${own.byType?.[type] ?? "—"} available`} max={own.byType?.[type] ?? 0} value={quantities[type]} onChange={value => setQuantities(current => ({ ...current, [type]: value }))} />
        {before !== undefined && <p className="-mt-1 pb-1 pl-13 text-[11px] font-medium" style={{ color: quantities[type] ? rmFlow.green : rmFlow.muted }}>{firstName(name)}: {before} → {before + quantities[type]} SIMs</p>}</div>;
    })}</div>
    <RmTotalBar left={`Distributing: ${total} SIMs total`} right={own.total !== undefined ? `Your stock after: ${(own.total - total).toLocaleString()} SIMs` : undefined} />
    <label className="block space-y-2"><RmLabel>Note (optional)</RmLabel><Input.TextArea rows={2} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Add a note to this distribution..." /></label>
  </RmFlowModal>;

  const after = own.total !== undefined ? own.total - total : undefined;
  return <RmFlowModal title="Confirm Distribution" subtitle="Review before sending" onClose={onClose} pending={batch.isPending}
    secondary={{ label: "← Edit Quantities", onClick: () => onEdit ? onEdit() : setStep(1), disabled: batch.isPending }}
    primary={{ label: `Distribute ${total} SIMs`, color: rmFlow.green, loading: batch.isPending, disabled: !valid, onClick: () => selected && batch.mutate({ kind: "distribute", coordinator_id: selected.id, quantities, notes: notes.trim() || undefined }) }}>
    <RmReceipt highlight heading="Distribution summary" rows={[
      [<span className="text-[11px] uppercase">Recipient</span>, ""],
      [<strong style={{ color: rmFlow.navy }}>{name} (SC){selected?.state ? ` · ${selected.state}` : ""}</strong>, selected?.phone ?? ""], "divider",
      ...rmSimTypes.map(type => [rmSimMeta[type].label, `${quantities[type]} SIMs`, quantities[type] ? rmFlow.ink : rmFlow.muted] as RmReceiptRow), "divider",
      [<strong>Total</strong>, <strong>{total} SIMs</strong>], "divider",
      [<span className="text-[11px] uppercase">Impact</span>, ""], ["Your stock after", after !== undefined ? `${after.toLocaleString()} SIMs` : "—"],
      [`${firstName(name)} after`, sc.total !== undefined ? `${sc.total + total} SIMs` : "—"],
    ]} />
    {after !== undefined && <RmNote tone={after > 0 ? "success" : "warning"} icon={CheckCircle2}>{after > 0 ? "Your stock remains healthy after this distribution" : "This uses all of your remaining stock."}</RmNote>}
    {activeTypes(quantities).length > 1 && <p className="text-[11px]" style={{ color: rmFlow.muted }}>Each SIM type is sent as its own distribution and gets its own reference.</p>}
    {/* PIN entry from the design is not shown: the distribute endpoint has no PIN field to verify it. */}
  </RmFlowModal>;
}
