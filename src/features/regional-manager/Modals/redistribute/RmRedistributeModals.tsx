import { useState } from "react";
import { Checkbox, Input, Pagination, Skeleton } from "antd";
import { AlertTriangle, ArrowLeft, ArrowRight, Bell, CircleOff, Info, ShieldAlert, UserX } from "lucide-react";
import dayjs from "dayjs";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { rmSimTypes, useExportRmInventoryHistory, useGetRmInventoryHistory, type RmBatchLine, type RmTypeQuantities } from "../../api/inventory";
import { RmFlowFooter, RmFlowModal, RmLabel, RmNote, RmPills, RmReceipt, RmResultModal, type RmReceiptRow } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";
import { firstName, rmSimMeta, sumQuantities } from "../flow/rmStock";

interface Party { name: string; state?: string; stock?: number }
const typeRows = (quantities: RmTypeQuantities, unit = "units"): RmReceiptRow[] => rmSimTypes.map(type => [rmSimMeta[type].label, `${quantities[type]} ${unit}`, quantities[type] ? rmFlow.blue : rmFlow.muted]);

export function RmConfirmTransferModal({ from, to, quantities, reason, pending, onConfirm, onEdit }: { from: Party; to: Party; quantities: RmTypeQuantities; reason: string; pending: boolean; onConfirm: () => void; onEdit: () => void }) {
  const total = sumQuantities(quantities);
  const fromAfter = from.stock !== undefined ? from.stock - total : undefined;
  const toAfter = to.stock !== undefined ? to.stock + total : undefined;
  return <RmFlowModal title="Confirm SC to SC Transfer" subtitle="Review all details before proceeding" onClose={onEdit} pending={pending}
    secondary={{ label: "← Edit Transfer", onClick: onEdit, disabled: pending }} primary={{ label: "Confirm Transfer", color: rmFlow.blue, loading: pending, onClick: onConfirm }}>
    <div className="space-y-3 rounded-2xl border-2 p-4" style={{ borderColor: "#BFDBFE", background: "#FAFCFF" }}>
      <RmLabel>Transfer summary</RmLabel>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-xl border p-3" style={{ background: rmFlow.redBg, borderColor: "#FECACA" }}><p className="text-[10px] font-bold uppercase" style={{ color: rmFlow.red }}>From</p><p className="text-sm font-semibold">{from.name}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{from.state}{from.stock !== undefined ? ` · ${from.stock} SIMs` : ""}</p></div>
        <ArrowRight className="size-5 shrink-0" style={{ color: rmFlow.blue }} />
        <div className="flex-1 rounded-xl border p-3" style={{ background: rmFlow.greenBg, borderColor: "#A7F3D0" }}><p className="text-[10px] font-bold uppercase" style={{ color: rmFlow.green }}>To</p><p className="text-sm font-semibold">{to.name}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{to.state}{to.stock !== undefined ? ` · Was ${to.stock} SIMs` : ""}</p></div>
      </div>
      <RmReceipt rows={[...typeRows(quantities), "divider", [<strong>Total</strong>, <strong>{total} SIMs</strong>]]} />
    </div>
    <div className="rounded-xl p-3 text-xs" style={{ background: rmFlow.base }}><RmLabel>After transfer</RmLabel>
      <p className="mt-1 flex items-center gap-1.5 font-semibold" style={{ color: rmFlow.red }}><AlertTriangle className="size-3.5" />{firstName(from.name)}: {from.stock ?? "—"} → {fromAfter ?? "—"} SIMs</p>
      <p className="mt-1 font-semibold" style={{ color: rmFlow.green }}>✓ {firstName(to.name)}: {to.stock ?? "—"} → {toAfter ?? "—"} SIMs</p>
      <p className="mt-1" style={{ color: rmFlow.muted }}>Your network total is unchanged — stock moves between SCs.</p>
    </div>
    <div className="flex items-center gap-2 rounded-xl p-2.5 text-xs" style={{ background: rmFlow.base }}><Info className="size-4 shrink-0" style={{ color: rmFlow.muted }} /><span><strong>Reason:</strong> {reason}</span></div>
    {fromAfter === 0 && <RmNote tone="warning">{from.name} will have 0 SIMs after this transfer. They cannot activate SIMs until they receive more stock.</RmNote>}
    {/* The design's PIN entry and SMS-notification preview are not shown: redistribute has no PIN field and no notification contract. */}
  </RmFlowModal>;
}

export function RmTransferResultModal({ lines, from, to, onClose, onRetry, onHistory, onDistributeTo }: { lines: RmBatchLine[]; from: Party; to: Party; onClose: () => void; onRetry: () => void; onHistory: () => void; onDistributeTo: () => void }) {
  const sent = lines.filter(line => line.ok); const failed = lines.find(line => !line.ok);
  const moved = sent.reduce((sum, line) => sum + line.quantity, 0);
  if (!sent.length) return <RmResultModal status="failed" iconColor={rmFlow.red} title="Transfer Failed" subtitle="Stock was not moved. Both SCs' inventories are unchanged." onClose={onClose}
    actions={[{ label: "Try Again", onClick: onRetry }, { label: "Cancel", variant: "text", onClick: onClose }]}><RmNote tone="warning">Reason: {failed?.message}</RmNote></RmResultModal>;
  const fromNow = from.stock !== undefined ? from.stock - moved : undefined;
  return <RmResultModal title={failed ? "Transfer Partially Complete" : "Transfer Complete!"} iconColor={failed ? rmFlow.amber : undefined} onClose={onClose}
    actions={[{ label: "Done", onClick: onClose }, { label: "View History", variant: "secondary", onClick: onHistory }, { label: `Distribute to ${firstName(from.name)}`, variant: "secondary", onClick: onDistributeTo }]}>
    <RmReceipt heading="Transfer receipt" rows={[["From", `${from.name}${from.state ? ` (${from.state})` : ""}`], ["To", `${to.name}${to.state ? ` (${to.state})` : ""}`], "divider",
      ...sent.map(line => [rmSimMeta[line.sim_type].label, `${line.quantity} units transferred`] as RmReceiptRow),
      [`${firstName(from.name)} now`, fromNow !== undefined ? `${fromNow} SIMs` : "—", rmFlow.red], [`${firstName(to.name)} now`, to.stock !== undefined ? `${to.stock + moved} SIMs` : "—", rmFlow.green]]}
      footer={<p className="text-[11px]" style={{ color: rmFlow.muted }}>Ref: {sent.map(line => line.reference).filter(Boolean).join(", ") || "—"}</p>} />
    {failed && <RmNote tone="warning">{rmSimMeta[failed.sim_type].label} was not moved: {failed.message}</RmNote>}
    {fromNow === 0 && <RmNote tone="warning" action={<button type="button" className="font-semibold underline" onClick={onDistributeTo}>Distribute to {firstName(from.name)}</button>}>{from.name} is now out of stock. Consider distributing more from your inventory soon.</RmNote>}
  </RmResultModal>;
}

// No recall endpoint exists on the RM API (GET/POST /regional-manager/*), so recall flows render the design for review
// but cannot be submitted. Wire `onConfirm` once the backend exposes a recall route.
export const RECALL_UNAVAILABLE = "Recall from SC is coming soon. You can preview the form, but recalls can't be submitted yet.";

export function RmConfirmRecallModal({ sc, rmStock, quantities, mode, onEdit, onForce }: { sc: Party; rmStock?: number; quantities: RmTypeQuantities; mode: "voluntary" | "force"; onEdit: () => void; onForce: () => void }) {
  const total = sumQuantities(quantities);
  const scAfter = sc.stock !== undefined ? sc.stock - total : undefined;
  return <AppModal open size="xl" title={<span style={{ color: rmFlow.navy }}>Confirm Stock Recall</span>} description="Bring stock back to your inventory" onOpenChange={open => { if (!open) onEdit(); }}
    footer={<RmFlowFooter secondary={{ label: <span className="inline-flex items-center gap-1"><ArrowLeft className="size-3.5" />Edit</span>, onClick: onEdit }} primary={{ label: mode === "force" ? "Continue to Force Recall" : "Confirm Recall", color: mode === "force" ? rmFlow.red : rmFlow.green, disabled: mode !== "force", onClick: onForce }} />}>
    <div className="space-y-4 border-t pt-4" style={{ borderColor: rmFlow.border }}>
      <RmLabel>Recall summary</RmLabel>
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-xl border p-3" style={{ borderColor: rmFlow.border }}><p className="text-[10px] font-bold uppercase" style={{ color: rmFlow.muted }}>From SC</p><p className="text-sm font-semibold">{sc.name}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{sc.state}{sc.stock !== undefined ? ` · ${sc.stock} SIMs` : ""}</p></div>
        <ArrowLeft className="size-5 shrink-0" style={{ color: rmFlow.green }} />
        <div className="flex-1 rounded-xl border-2 p-3" style={{ borderColor: rmFlow.green, background: rmFlow.greenBg }}><p className="text-[10px] font-bold uppercase" style={{ color: rmFlow.green }}>To your inventory</p><p className="text-sm font-semibold">Your stock</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{rmStock ?? "—"} → {rmStock !== undefined ? rmStock + total : "—"} SIMs</p></div>
      </div>
      <RmReceipt rows={[...typeRows(quantities).filter(row => row !== "divider" && !String(row[1]).startsWith("0 ")), "divider", [<strong>Total</strong>, <strong>{total} SIMs</strong>]]} />
      <span className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: mode === "force" ? rmFlow.redBg : rmFlow.greenBg, color: mode === "force" ? rmFlow.red : rmFlow.green }}>{mode === "force" ? "Force recall" : "Voluntary"}</span>
      <div className="flex flex-wrap justify-between gap-2 text-xs font-semibold"><span style={{ color: rmFlow.red }}>▲ {firstName(sc.name)}: {sc.stock ?? "—"} → {scAfter ?? "—"} SIMs</span><span style={{ color: rmFlow.green }}>✓ Your stock: {rmStock ?? "—"} → {rmStock !== undefined ? rmStock + total : "—"} SIMs</span></div>
      {scAfter === 0 && <RmNote tone="warning">{sc.name} will have 0 SIMs after recall. Their APs cannot activate until they receive new stock.</RmNote>}
      {mode === "voluntary" && <RmNote icon={Bell}>{sc.name} would receive a request to confirm this recall. Stock moves when they confirm.</RmNote>}
      <RmNote tone="danger" icon={CircleOff}>{RECALL_UNAVAILABLE}</RmNote>
    </div>
  </AppModal>;
}

const forceReasons = [
  { value: "SC Not Responding", hint: "SC hasn't responded to voluntary recall within time limit", icon: UserX },
  { value: "Suspected Stock Misuse", hint: "Possible unauthorised use of SIMs", icon: ShieldAlert },
  { value: "Preparing SC Suspension", hint: "Reclaiming stock before suspending", icon: AlertTriangle },
  { value: "Other (specify below)", hint: "", icon: Info },
];
export function RmForceRecallModal({ sc, quantities, onClose }: { sc: Party; quantities: RmTypeQuantities; onClose: () => void }) {
  const [reason, setReason] = useState(forceReasons[0].value);
  const [details, setDetails] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const total = sumQuantities(quantities);
  return <RmFlowModal title="Force Recall Stock" subtitle="Bypass SC approval" onClose={onClose} secondary={{ label: "Cancel", onClick: onClose }}
    primary={{ label: "Force Recall Now", color: rmFlow.red, disabled: true, onClick: () => undefined }}>
    <RmNote tone="danger" icon={ShieldAlert}><strong>This action bypasses SC approval and is immediately logged with Super Admin for review.</strong></RmNote>
    <RmReceipt rows={[["Recalling from", `${sc.name}${sc.state ? ` (${sc.state})` : ""}`], ["Amount", `${total} SIMs`], ["Type", "Force Recall", rmFlow.red]]} />
    <div className="space-y-2"><RmLabel>Why are you force recalling?</RmLabel>{forceReasons.map(option => { const active = option.value === reason; const Icon = option.icon;
      return <button key={option.value} type="button" onClick={() => setReason(option.value)} className="flex w-full items-center gap-3 rounded-xl border p-3 text-left" style={{ borderColor: active ? rmFlow.blue : rmFlow.border, background: active ? rmFlow.blueBg : rmFlow.white }}>
        <Icon className="size-4" style={{ color: rmFlow.red }} /><span className="flex-1"><strong className="block text-xs">{option.value}</strong>{option.hint && <span className="text-[11px]" style={{ color: rmFlow.muted }}>{option.hint}</span>}</span>
        <span className="flex size-4 items-center justify-center rounded-full border" style={{ borderColor: active ? rmFlow.blue : rmFlow.border }}>{active && <span className="size-2 rounded-full" style={{ background: rmFlow.blue }} />}</span></button>; })}</div>
    <div><Input.TextArea rows={3} value={details} onChange={event => setDetails(event.target.value)} placeholder="Describe the reason for force recall in detail..." /><p className="mt-1 text-[11px]" style={{ color: rmFlow.muted }}>Minimum 30 characters</p></div>
    <Checkbox checked={confirmed} onChange={event => setConfirmed(event.target.checked)}><span className="text-xs">I confirm this force recall is justified and understand it will be reviewed by Super Admin.</span></Checkbox>
    <RmNote tone="danger" icon={CircleOff}>{RECALL_UNAVAILABLE}</RmNote>
  </RmFlowModal>;
}

type Period = "this_month" | "last_3_months" | "all";
const periodStart: Record<Period, string | undefined> = { this_month: dayjs().startOf("month").format("YYYY-MM-DD"), last_3_months: dayjs().subtract(3, "month").format("YYYY-MM-DD"), all: undefined };
const eventLabel: Record<string, { label: string; color: string; bg: string }> = {
  distributed: { label: "Distributed", color: rmFlow.blue, bg: rmFlow.blueBg }, received: { label: "Received", color: rmFlow.green, bg: rmFlow.greenBg },
  returned: { label: "Returned", color: rmFlow.amberInk, bg: rmFlow.amberBg }, adjusted: { label: "Adjusted", color: rmFlow.slate, bg: rmFlow.base },
};
// Redistribution history uses the inventory history endpoint — there is no dedicated redistribution-history route.
export function RmRedistributionHistoryModal({ onClose }: { onClose: () => void }) {
  const [event, setEvent] = useState("all");
  const [period, setPeriod] = useState<Period>("this_month");
  const pagination = useTablePagination({ initialPageSize: 8 });
  const today = dayjs().format("YYYY-MM-DD");
  const query = useGetRmInventoryHistory({ page: pagination.page, limit: pagination.pageSize, event_type: event, sim_type: "all", sortBy: "newest", start_date: periodStart[period], end_date: periodStart[period] ? today : undefined });
  const exporter = useExportRmInventoryHistory();
  const rows = query.data?.grouped_history.flatMap(group => group.items) ?? [];
  const cards = query.data?.summary_cards;
  return <AppModal open size="lg" title={<span style={{ color: rmFlow.navy }}>Redistribution History</span>} description="All stock movements within your network" onOpenChange={open => { if (!open) onClose(); }}
    footer={<div className="flex items-center justify-between gap-3 border-t pt-4" style={{ borderColor: rmFlow.border }}><button type="button" className="text-sm font-semibold disabled:opacity-50" style={{ color: rmFlow.slate }} disabled={exporter.isPending} onClick={() => exporter.mutate()}>{exporter.isPending ? "Exporting…" : "Export History"}</button><button type="button" onClick={onClose} className="min-h-10 rounded-xl px-10 text-sm font-semibold text-white" style={{ background: rmFlow.navy }}>Close</button></div>}>
    <div className="space-y-4 border-t pt-4" style={{ borderColor: rmFlow.border }}>
      <div className="grid grid-cols-3 gap-3">{[["Distributed", cards?.total_distributed?.count, "SIMs sent"], ["Received", cards?.total_received?.count, "SIMs received"], ["In stock", cards?.currently_in_stock?.count, "SIMs available"]].map(([label, value, sub]) =>
        <div key={String(label)} className="rounded-xl p-3" style={{ background: rmFlow.base }}><p className="text-[10px] font-semibold uppercase" style={{ color: rmFlow.muted }}>{label}</p><p className="text-xl font-bold" style={{ color: rmFlow.navy }}>{value?.toLocaleString() ?? "—"}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{sub}</p></div>)}</div>
      <RmPills value={event} onChange={value => { setEvent(value); pagination.resetPage(); }} options={[{ value: "all", label: "All" }, { value: "distributed", label: "Distributed" }, { value: "returned", label: "Returned" }, { value: "received", label: "Received" }]} />
      <div className="flex gap-2">{([["this_month", "This Month"], ["last_3_months", "Last 3 Months"], ["all", "All Time"]] as const).map(([value, label]) => <button key={value} type="button" onClick={() => { setPeriod(value); pagination.resetPage(); }} className="rounded-md px-2.5 py-1 text-xs font-semibold" style={{ background: period === value ? rmFlow.base : "transparent", color: period === value ? rmFlow.ink : rmFlow.muted }}>{label}</button>)}</div>
      {query.isLoading ? <Skeleton active /> : rows.length ? <div className="overflow-x-auto"><table className="w-full min-w-150 text-xs">
        <thead><tr className="border-b text-left text-[10px] uppercase" style={{ borderColor: rmFlow.border, color: rmFlow.muted }}>{["Date", "Type", "From / To", "Qty", "SIM", "Ref"].map(head => <th key={head} className="px-2 py-2 font-semibold">{head}</th>)}</tr></thead>
        <tbody>{rows.map(row => { const tone = eventLabel[row.event_type] ?? eventLabel.adjusted;
          return <tr key={row.id} className="border-b" style={{ borderColor: rmFlow.border }}><td className="px-2 py-2.5">{row.time}</td><td className="px-2 py-2.5"><span className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ background: tone.bg, color: tone.color }}>{tone.label}</span></td>
            <td className="px-2 py-2.5">{row.party_info}</td><td className="px-2 py-2.5 font-bold" style={{ color: row.quantity_delta >= 0 ? rmFlow.green : rmFlow.red }}>{row.quantity_formatted}</td><td className="px-2 py-2.5 uppercase">{row.sim_type}</td><td className="px-2 py-2.5" style={{ color: rmFlow.muted }}>{row.reference}</td></tr>; })}</tbody>
      </table></div> : <AppEmptyState title="No stock movements" description="No movements match this period." />}
      {(query.data?.total ?? 0) > pagination.pageSize && <Pagination size="small" align="center" {...pagination.paginationConfig} total={query.data?.total} showSizeChanger={false} />}
    </div>
  </AppModal>;
}
