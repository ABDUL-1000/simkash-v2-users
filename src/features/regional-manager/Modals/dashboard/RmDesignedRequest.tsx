import { useState } from "react";
import { Input, Skeleton } from "antd";
import { rmSimTypes, useRmRequestStockFromSuperAdmin, emptyRmQuantities } from "../../api/inventory";
import type { RmBulkStockPayload } from "../../types/territory";
import { RmBadge, RmFlowModal, RmLabel, RmNote, RmPills, RmReceipt, RmResultModal, RmStepperRow, RmStockBox, RmTotalBar } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";
import { breakdownText, rmSimMeta, sumQuantities, useRmOwnStock } from "../flow/rmStock";

type Urgency = RmBulkStockPayload["urgency"];
interface RequestReceipt { reference?: string; status?: string; response_estimate?: string }

export function RmDesignedRequest({ onClose }: { onClose: () => void }) {
  const own = useRmOwnStock();
  const mutation = useRmRequestStockFromSuperAdmin();
  const [quantities, setQuantities] = useState(emptyRmQuantities);
  const [urgency, setUrgency] = useState<Urgency>("normal");
  const [notes, setNotes] = useState("");
  const total = sumQuantities(quantities);
  const submit = () => mutation.mutate({ pos_quantity: quantities.pos, cctv_quantity: quantities.cctv, gps_quantity: quantities.gps, router_quantity: quantities.router, urgency, notes: notes.trim() });

  if (mutation.isSuccess) {
    const receipt = (mutation.data.data ?? {}) as RequestReceipt;
    return <RmResultModal title="Request Submitted!" subtitle={receipt.response_estimate ? `Average response: ${receipt.response_estimate}` : undefined} onClose={onClose} actions={[{ label: "Done", onClick: onClose }]}>
      <RmReceipt heading="Requested SIM stock" rows={[
        ...rmSimTypes.map(type => [rmSimMeta[type].label, `${quantities[type]} requested`] as [string, string]),
        "divider", [<strong style={{ color: rmFlow.navy }}>Total requested</strong>, <strong style={{ color: rmFlow.navy }}>{total} SIMs</strong>],
      ]} footer={<div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: rmFlow.muted }}><span>Ref: {receipt.reference ?? "—"}</span><RmBadge>{receipt.status ? `${receipt.status[0].toUpperCase()}${receipt.status.slice(1)} Admin` : "Pending Admin"}</RmBadge></div>} />
    </RmResultModal>;
  }

  return <RmFlowModal title="Request SIM Stock" subtitle="Request from Super Admin" onClose={onClose} pending={mutation.isPending}
    secondary={{ label: "Cancel", onClick: onClose, disabled: mutation.isPending }} primary={{ label: "Submit Request", onClick: submit, disabled: total <= 0, loading: mutation.isPending }}>
    {own.query.isLoading ? <Skeleton active paragraph={{ rows: 1 }} /> : <RmStockBox title={`Your current inventory: ${own.total?.toLocaleString() ?? "—"} SIMs`}>{breakdownText(own.byType)}</RmStockBox>}
    <RmNote>Requests go directly to Super Admin. They distribute from the platform's master stock.</RmNote>
    {mutation.error && <RmNote tone="danger">{mutation.error.message}</RmNote>}
    <div>
      <RmLabel>Required quantities</RmLabel>
      {rmSimTypes.map(type => <RmStepperRow key={type} icon={rmSimMeta[type].icon} label={rmSimMeta[type].label} hint={`${own.byType?.[type] ?? "—"} available`} value={quantities[type]} disabled={mutation.isPending}
        onChange={value => setQuantities(current => ({ ...current, [type]: value }))} />)}
    </div>
    <RmTotalBar left={`${total} SIMs requested total`} right={own.total !== undefined ? `Your stock after: ${(own.total + total).toLocaleString()} SIMs` : undefined} />
    <div className="space-y-2">
      <RmLabel>Urgency</RmLabel>
      {/* "Critical" is shown but disabled: request-stock only accepts normal | urgent. */}
      <RmPills<Urgency | "critical"> value={urgency} disabled={mutation.isPending} onChange={value => value !== "critical" && setUrgency(value)}
        options={[{ value: "normal", label: "Normal" }, { value: "urgent", label: "Urgent" }, { value: "critical", label: "Critical", disabled: true }]} />
    </div>
    <label className="block space-y-2"><RmLabel>Justification (optional)</RmLabel>
      <Input.TextArea rows={2} value={notes} disabled={mutation.isPending} onChange={event => setNotes(event.target.value)} placeholder="e.g. 3 SCs running critically low, high demand period in Lagos..." />
    </label>
  </RmFlowModal>;
}
