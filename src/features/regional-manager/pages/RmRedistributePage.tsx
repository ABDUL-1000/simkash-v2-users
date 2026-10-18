import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input, Skeleton } from "antd";
import { History, Info, X } from "lucide-react";
import { rmSimTypes, useRmBatchTransfer, emptyRmQuantities, type RmTypeQuantities } from "../api/inventory";
import type { RmStateCoordinatorItem } from "../types/api";
import { RmFormCard, RmModeSelector, RmReasonPicker, RmRedistributeSidebar, RmScSelect, type RedistributeMode } from "../components/redistribute/RmRedistributeParts";
import { reasonOptions } from "../components/redistribute/redistributeOptions";
import { RmConfirmRecallModal, RmConfirmTransferModal, RmForceRecallModal, RmRedistributionHistoryModal, RmTransferResultModal, RECALL_UNAVAILABLE } from "../Modals/redistribute/RmRedistributeModals";
import { RmDesignedDistribute } from "../Modals/dashboard/RmDesignedDistribute";
import { RmLabel, RmNote, RmPills, RmProcessingModal, RmStepperRow, RmStockBox, RmTotalBar } from "../Modals/flow/RmFlow";
import { rmFlow } from "../Modals/flow/rmFlowTokens";
import { breakdownText, firstName, rmSimMeta, sumQuantities, useRmCoordinatorStock, useRmOwnStock } from "../Modals/flow/rmStock";

type Modal = "confirm-transfer" | "confirm-recall" | "force-recall" | "quick" | "history" | null;
const isMode = (value: string | null): value is RedistributeMode => value === "sc-to-sc" || value === "recall" || value === "quick";

function QuantityList({ stock, quantities, onChange, label }: { stock?: RmTypeQuantities; quantities: RmTypeQuantities; onChange: (next: RmTypeQuantities) => void; label: string }) {
  return <div><RmLabel>{label}</RmLabel>{rmSimTypes.map(type => <RmStepperRow key={type} icon={rmSimMeta[type].icon} iconBg={rmSimMeta[type].bg} iconColor={rmSimMeta[type].color} label={rmSimMeta[type].label}
    hint={stock ? `${stock[type]} available` : "Select a source first"} max={stock?.[type] ?? 0} value={quantities[type]} onChange={value => onChange({ ...quantities, [type]: value })} />)}</div>;
}

export function RmRedistributePage() {
  const [params, setParams] = useSearchParams();
  const mode: RedistributeMode = isMode(params.get("mode")) ? params.get("mode") as RedistributeMode : "sc-to-sc";
  const [from, setFrom] = useState<RmStateCoordinatorItem>();
  const [to, setTo] = useState<RmStateCoordinatorItem>();
  const [quantities, setQuantities] = useState(emptyRmQuantities);
  const [reason, setReason] = useState<string>(reasonOptions[0]);
  const [recallType, setRecallType] = useState<"voluntary" | "force">("voluntary");
  const [notes, setNotes] = useState("");
  const [modal, setModal] = useState<Modal>(null);
  const own = useRmOwnStock();
  const fromStock = useRmCoordinatorStock(from?.id);
  const toStock = useRmCoordinatorStock(to?.id);
  const batch = useRmBatchTransfer();
  const total = sumQuantities(quantities);
  const fullReason = [reason, notes.trim()].filter(Boolean).join(": ");

  const clear = () => { setQuantities(emptyRmQuantities()); setNotes(""); setReason(reasonOptions[0]); };
  const switchMode = (next: RedistributeMode) => { setParams(next === "sc-to-sc" ? {} : { mode: next }, { replace: true }); clear(); setModal(null); };
  const pickFrom = (row?: RmStateCoordinatorItem) => { setFrom(row); setQuantities(emptyRmQuantities()); if (row && row.id === to?.id) setTo(undefined); };
  // Stock counts refetch after success, so the receipt uses the counts captured when the transfer was submitted.
  const [snapshot, setSnapshot] = useState<{ from?: number; to?: number }>({});
  const submitTransfer = () => {
    if (!from || !to) return;
    setSnapshot({ from: fromStock.total, to: toStock.total });
    batch.mutate({ kind: "redistribute", from_coordinator_id: from.id, to_coordinator_id: to.id, quantities, reason: fullReason }, { onSettled: () => setModal(null) });
  };

  // Sidebar preview reflects the active mode.
  const preview = mode === "sc-to-sc"
    ? { from: { name: from?.name, before: fromStock.total, after: fromStock.total !== undefined ? fromStock.total - total : undefined }, to: { name: to?.name, before: toStock.total, after: toStock.total !== undefined ? toStock.total + total : undefined } }
    : mode === "recall"
      ? { from: { name: from?.name, before: fromStock.total, after: fromStock.total !== undefined ? fromStock.total - total : undefined }, to: { name: "Your inventory", before: own.total, after: own.total !== undefined ? own.total + total : undefined } }
      : { from: { name: "Your inventory", before: own.total, after: own.total !== undefined ? own.total - total : undefined }, to: { name: to?.name, before: toStock.total, after: toStock.total !== undefined ? toStock.total + total : undefined } };

  const sourceBox = (row: RmStateCoordinatorItem | undefined, stock: ReturnType<typeof useRmCoordinatorStock>) => row && (stock.query.isLoading ? <Skeleton active paragraph={{ rows: 1 }} />
    : <RmStockBox tone="info" title={`${row.name} has ${stock.total ?? "—"} SIMs`}>{breakdownText(stock.byType)}</RmStockBox>);
  const notesField = <label className="block space-y-2"><RmLabel>Notes (optional)</RmLabel><Input.TextArea rows={2} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Add context for this movement..." /></label>;
  const footer = (label: string, disabled: boolean, onClick: () => void) => <>
    <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-xs font-semibold" style={{ borderColor: rmFlow.border, color: rmFlow.slate }}><X className="size-3.5" /> Clear Form</button>
    <button type="button" disabled={disabled} onClick={onClick} className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-45" style={{ background: rmFlow.navy }}>{label}</button>
  </>;

  return <main className="mx-auto w-full min-w-0 max-w-400 space-y-5 p-4 sm:p-6" style={{ color: rmFlow.ink }}>
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><h1 className="text-xl font-bold">Redistribute SIMs</h1><p className="text-xs" style={{ color: rmFlow.muted }}>Move stock between your State Coordinators or recall stock back to your inventory</p></div>
      <button type="button" onClick={() => setModal("history")} className="inline-flex items-center gap-2 self-start rounded-xl border bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-slate-50 sm:self-auto" style={{ borderColor: rmFlow.border }}><History className="size-4" style={{ color: rmFlow.muted }} /> Redistribution History</button>
    </header>
    <div className="flex items-start gap-3 rounded-2xl border p-4 text-xs" style={{ borderColor: "#DBEAFE", background: rmFlow.blueBg, color: rmFlow.blueInk }}><Info className="mt-0.5 size-4 shrink-0" /><p><strong>Redistribution moves SIMs within your network only.</strong> You can transfer between your SCs, recall stock back to your own inventory, or send stock from your inventory. All movements are logged and visible to Super Admin.</p></div>
    <RmModeSelector mode={mode} onChange={switchMode} />

    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
      {mode === "sc-to-sc" ? <RmFormCard title="SC to SC Transfer" subtitle="Select source SC, destination SC, then enter quantities"
        footer={footer("Preview Transfer →", !from || !to || total <= 0, () => setModal("confirm-transfer"))}>
        <div className="space-y-2"><RmLabel>Transfer from</RmLabel><RmScSelect value={from} onChange={pickFrom} exclude={to?.id} placeholder="Choose the source SC" />{sourceBox(from, fromStock)}</div>
        <div className="space-y-2"><RmLabel>Transfer to</RmLabel><RmScSelect value={to} onChange={setTo} exclude={from?.id} placeholder="Choose the receiving SC" />{to && toStock.total !== undefined && <p className="text-xs" style={{ color: rmFlow.muted }}>{to.name} currently has {toStock.total} SIMs · {breakdownText(toStock.byType)}</p>}</div>
        <QuantityList label="Quantities to transfer" stock={fromStock.byType} quantities={quantities} onChange={setQuantities} />
        <RmTotalBar left={`Transferring: ${total} SIMs`} right={fromStock.total !== undefined && from ? `${firstName(from.name)} after: ${fromStock.total - total} SIMs` : undefined} />
        <div className="space-y-2"><RmLabel>Select reason</RmLabel><RmReasonPicker value={reason} onChange={setReason} /></div>
        {notesField}
      </RmFormCard>

        : mode === "recall" ? <RmFormCard title="Recall from SC" subtitle="Bring stock back from a State Coordinator to your inventory"
          footer={footer("Preview Recall →", !from || total <= 0, () => setModal("confirm-recall"))}>
          <RmNote tone="warning">{RECALL_UNAVAILABLE}</RmNote>
          <div className="space-y-2"><RmLabel>Recall from</RmLabel><RmScSelect value={from} onChange={pickFrom} placeholder="Choose the SC to recall from" />{sourceBox(from, fromStock)}</div>
          <QuantityList label="Quantities to recall" stock={fromStock.byType} quantities={quantities} onChange={setQuantities} />
          <RmTotalBar left={`Recalling: ${total} SIMs`} right={own.total !== undefined ? `Your stock after: ${own.total + total} SIMs` : undefined} />
          <div className="space-y-2"><RmLabel>Recall type</RmLabel><RmPills value={recallType} onChange={setRecallType} options={[{ value: "voluntary", label: "Voluntary (SC confirms)" }, { value: "force", label: "Force recall" }]} /></div>
          <div className="space-y-2"><RmLabel>Select reason</RmLabel><RmReasonPicker value={reason} onChange={setReason} /></div>
          {notesField}
        </RmFormCard>

          : <RmFormCard title="Quick Distribute" subtitle="Send stock from your inventory straight to a State Coordinator"
            footer={footer("Preview Distribution →", !to || total <= 0, () => setModal("quick"))}>
            {own.query.isLoading ? <Skeleton active paragraph={{ rows: 1 }} /> : <RmStockBox tone="success" title={`Your inventory: ${own.total?.toLocaleString() ?? "—"} SIMs`}>{breakdownText(own.byType)}</RmStockBox>}
            <div className="space-y-2"><RmLabel>Distribute to</RmLabel><RmScSelect value={to} onChange={setTo} placeholder="Choose the receiving SC" />{to && toStock.total !== undefined && <p className="text-xs" style={{ color: rmFlow.muted }}>{to.name} currently has {toStock.total} SIMs · {breakdownText(toStock.byType)}</p>}</div>
            <QuantityList label="Quantities to send" stock={own.byType} quantities={quantities} onChange={setQuantities} />
            <RmTotalBar left={`Distributing: ${total} SIMs`} right={own.total !== undefined ? `Your stock after: ${own.total - total} SIMs` : undefined} />
            {notesField}
          </RmFormCard>}

      <RmRedistributeSidebar from={preview.from} to={preview.to} quantity={total} selectedId={from?.id} onPickSc={row => { if (mode === "quick") setTo(row); else pickFrom(row); }} onViewHistory={() => setModal("history")} />
    </div>

    {modal === "confirm-transfer" && from && to && !batch.isPending && <RmConfirmTransferModal from={{ name: from.name, state: from.state, stock: fromStock.total }} to={{ name: to.name, state: to.state, stock: toStock.total }} quantities={quantities} reason={fullReason} pending={batch.isPending} onConfirm={submitTransfer} onEdit={() => setModal(null)} />}
    {batch.isPending && <RmProcessingModal title="Processing Transfer..." subtitle={`Moving ${total} SIMs from ${firstName(from?.name)} to ${firstName(to?.name)}`} />}
    {batch.data && from && to && <RmTransferResultModal lines={batch.data} from={{ name: from.name, state: from.state, stock: snapshot.from }} to={{ name: to.name, state: to.state, stock: snapshot.to }}
      onClose={() => { if (batch.data?.some(line => line.ok)) clear(); batch.reset(); }} onRetry={() => { batch.reset(); setModal("confirm-transfer"); }} onHistory={() => { batch.reset(); clear(); setModal("history"); }}
      onDistributeTo={() => { const source = from; batch.reset(); clear(); setTo(source); switchMode("quick"); }} />}
    {modal === "confirm-recall" && from && <RmConfirmRecallModal sc={{ name: from.name, state: from.state, stock: fromStock.total }} rmStock={own.total} quantities={quantities} mode={recallType} onEdit={() => setModal(null)} onForce={() => setModal("force-recall")} />}
    {modal === "force-recall" && from && <RmForceRecallModal sc={{ name: from.name, state: from.state }} quantities={quantities} onClose={() => setModal(null)} />}
    {modal === "quick" && to && <RmDesignedDistribute target={to} initialQuantities={quantities} initialNotes={notes} onClose={() => setModal(null)} onEdit={() => setModal(null)} onDone={clear} />}
    {modal === "history" && <RmRedistributionHistoryModal onClose={() => setModal(null)} />}
  </main>;
}
export default RmRedistributePage;
