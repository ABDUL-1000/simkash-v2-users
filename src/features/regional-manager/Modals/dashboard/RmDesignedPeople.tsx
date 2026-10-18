import { useState } from "react";
import { Checkbox, Form, Input, Select, Skeleton } from "antd";
import { AlertTriangle, Ban, Check, FileWarning, MoreHorizontal, ShieldAlert, TrendingDown, Users } from "lucide-react";
import { useOnboardStateCoordinator, useSendScBonusReminder, useSuspendScAccount } from "../../api/coordinators";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import { rmSimTypes, useRmBatchTransfer, emptyRmQuantities, type RmBatchLine } from "../../api/inventory";
import type { RmProfilePayload, RmTarget } from "../../types/dashboard";
import { RmProfileFields } from "./RmFormFields";
import { RmAvatar, RmBadge, RmFlowModal, RmLabel, RmNote, RmPills, RmProcessingModal, RmReceipt, RmResultModal, RmStepperRow, RmStockBox, RmTotalBar, type RmReceiptRow } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";
import { breakdownText, firstName, rmSimMeta, sumQuantities, useRmOwnStock } from "../flow/rmStock";

const initialsOf = (name = "") => name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();

function OnboardSteps({ step }: { step: 0 | 1 }) {
  const item = (index: 0 | 1, label: string) => {
    const done = step > index; const active = step === index;
    return <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: done ? rmFlow.green : active ? rmFlow.blue : rmFlow.muted }}>
      <span className="flex size-5 items-center justify-center rounded-full text-[10px] text-white" style={{ background: done ? rmFlow.green : active ? rmFlow.blue : rmFlow.border }}>{done ? <Check className="size-3" /> : index + 1}</span>{label}
    </span>;
  };
  return <div className="flex items-center gap-4">{item(0, "SC Details")}<span className="h-px w-6" style={{ background: rmFlow.border }} />{item(1, "Stock & Target")}</div>;
}

interface OnboardResult { message: string; status?: string; coordinatorId?: number; lines: RmBatchLine[]; skipped?: string }
export function RmDesignedOnboard({ onClose, onViewAll }: { onClose: () => void; onViewAll?: () => void }) {
  const [form] = Form.useForm<RmProfilePayload>();
  const [profile, setProfile] = useState<RmProfilePayload>();
  const [step, setStep] = useState<0 | 1>(0);
  const [quantities, setQuantities] = useState(emptyRmQuantities);
  const [result, setResult] = useState<OnboardResult>();
  const own = useRmOwnStock();
  const onboard = useOnboardStateCoordinator();
  const batch = useRmBatchTransfer();
  const total = sumQuantities(quantities);
  const pending = onboard.isPending || batch.isPending;
  const restart = () => { form.resetFields(); setProfile(undefined); setQuantities(emptyRmQuantities()); setResult(undefined); setStep(0); onboard.reset(); batch.reset(); };

  // The onboard endpoint takes one `initial_stock` number with no SIM type, so the SC is created first and the
  // per-type quantities are then sent through the regular distribute endpoint using the returned coordinator_id.
  const submit = async () => {
    if (!profile) return;
    const response = await onboard.mutateAsync({ ...profile, initial_stock: 0 }).catch(() => undefined);
    if (!response) return;
    const data = (response.data ?? {}) as { coordinator_id?: number; status?: string };
    const active = !data.status || /active/i.test(data.status);
    let lines: RmBatchLine[] = []; let skipped: string | undefined;
    if (total > 0 && data.coordinator_id && active) lines = await batch.mutateAsync({ kind: "distribute", coordinator_id: data.coordinator_id, quantities, notes: "Initial stock allocation" });
    else if (total > 0) skipped = active ? "The response did not include a coordinator ID." : "Stock can be distributed once the SC account is approved.";
    setResult({ message: response.message, status: data.status, coordinatorId: data.coordinator_id, lines, skipped });
  };

  if (result) {
    const approval = Boolean(result.status && /pending|review|approval/i.test(result.status));
    const sent = result.lines.filter(line => line.ok); const failed = result.lines.find(line => !line.ok);
    const sentTotal = sent.reduce((sum, line) => sum + line.quantity, 0);
    return <RmResultModal status={approval ? "pending" : "success"} iconColor={approval ? undefined : rmFlow.green} title={approval ? "Submitted for Approval!" : "SC Onboarded!"} subtitle={result.message} onClose={onClose}
      actions={[{ label: "Done", onClick: onClose }, ...(onViewAll ? [{ label: "View All SCs", variant: "secondary" as const, onClick: onViewAll }] : []), { label: "Onboard Another", variant: "secondary", onClick: restart }]}>
      <RmReceipt rows={[["Name", profile?.fullname], ["Phone", profile?.phone], ["State", profile?.state],
        ["Stock", sentTotal ? `${sentTotal} SIMs sent` : total ? "Not sent" : "None"], ...(result.status ? [["Status", <RmBadge tone={approval ? "warning" : "success"}>{result.status}</RmBadge>] as RmReceiptRow] : [])]} />
      {approval && <div className="space-y-2 text-left text-xs">{[["Submitted", true], ["Admin reviewing", false], ["SC account created", false]].map(([label, done], index) =>
        <p key={String(label)} className="flex items-center gap-2" style={{ color: done ? rmFlow.green : index === 1 ? rmFlow.blue : rmFlow.muted }}><span className="flex size-4 items-center justify-center rounded-full border" style={{ borderColor: "currentColor" }}>{done ? <Check className="size-2.5" /> : <span className="size-1.5 rounded-full" style={{ background: "currentColor" }} />}</span>{label}</p>)}
        <p className="text-center text-[11px]" style={{ color: rmFlow.muted }}>You'll be notified when approved</p></div>}
      {failed && <RmNote tone="warning">{rmSimMeta[failed.sim_type].label} stock was not sent: {failed.message}</RmNote>}
      {result.skipped && <RmNote tone="warning">{result.skipped}</RmNote>}
    </RmResultModal>;
  }

  return <RmFlowModal title="Onboard State Coordinator" subtitle={step ? "Step 2 — Initial Stock Allocation" : "Step 1 — SC Details"} onClose={onClose} pending={pending}
    secondary={step ? { label: "← Back", onClick: () => setStep(0), disabled: pending } : { label: "Cancel", onClick: onClose }}
    primary={step ? { label: "Submit Onboarding", color: rmFlow.blue, loading: pending, disabled: rmSimTypes.some(type => quantities[type] > (own.byType?.[type] ?? 0)), onClick: () => void submit() } : { label: "Continue →", color: rmFlow.blue, onClick: () => form.submit() }}>
    <OnboardSteps step={step} />
    <Form form={form} layout="vertical" disabled={pending} initialValues={profile} onFinish={values => { setProfile(values); setStep(1); }} style={{ display: step ? "none" : undefined }}><RmProfileFields /></Form>
    {step === 1 && <>
      <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: rmFlow.border }}><RmAvatar initials={initialsOf(profile?.fullname)} /><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{profile?.fullname}</strong><span className="text-xs" style={{ color: rmFlow.muted }}>{profile?.state} · {profile?.phone}</span></div><span className="text-[11px] font-semibold" style={{ color: rmFlow.blue }}>Will become SC in your network</span></div>
      {own.query.isLoading ? <Skeleton active paragraph={{ rows: 1 }} /> : <RmStockBox title={`Your available stock: ${own.total?.toLocaleString() ?? "—"} SIMs`}>{breakdownText(own.byType)}</RmStockBox>}
      {onboard.error && <RmNote tone="danger">{onboard.error.message}</RmNote>}
      <div><RmLabel>How many SIMs to send initially?</RmLabel>{rmSimTypes.map(type => <RmStepperRow key={type} icon={rmSimMeta[type].icon} label={rmSimMeta[type].label} hint={`${own.byType?.[type] ?? "—"} available`} max={own.byType?.[type] ?? 0} value={quantities[type]} disabled={pending} onChange={value => setQuantities(current => ({ ...current, [type]: value }))} />)}</div>
      <RmTotalBar left={`Total: ${total} SIMs`} right={own.total !== undefined ? `Your stock after: ${(own.total - total).toLocaleString()} SIMs` : undefined} />
      {/* Custom bonus target toggle from the design is not shown: the onboard endpoint has no bonus-target field. */}
      <RmNote tone="warning">Stock is sent once the SC account is created. If the account needs Super Admin approval, distribute after it is approved.</RmNote>
    </>}
  </RmFlowModal>;
}

export function RmDesignedReminder({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [mode, setMode] = useState<"one" | "all">("one");
  const [id, setId] = useState<number | undefined>(target?.id);
  const [message, setMessage] = useState("");
  const atRisk = useGetRmStateCoordinators({ page: 1, limit: 20, status: "at_risk" });
  const everyone = useGetRmStateCoordinators({ page: 1, limit: 50, status: "all" }, mode === "one");
  const mutation = useSendScBonusReminder();
  const options = new Map((everyone.data?.items ?? []).map(row => [row.id, row]));
  const chosen = id ? options.get(id) : undefined;
  const chosenName = chosen?.name ?? (target?.id === id ? target?.name : undefined);
  const others = (atRisk.data?.items ?? []).filter(row => row.id !== id).slice(0, 4);
  const template = (name?: string) => `Hi ${name ? firstName(name) : "there"}, you're close to your monthly bonus target. Push your APs to activate more SIMs this week to qualify!`;
  const pick = (value: number) => { setId(value); if (!message.trim() || message.startsWith("Hi ")) setMessage(template(options.get(value)?.name)); };

  if (mutation.isSuccess) {
    const data = (mutation.data.data ?? {}) as { recipients_count?: number; message?: string };
    return <RmResultModal iconColor={rmFlow.green} title="Reminder Sent!" subtitle={mode === "one" && chosenName ? `Message sent to ${chosenName}` : data.message ?? mutation.data.message} onClose={onClose}
      actions={[{ label: "Done", color: rmFlow.navy, onClick: onClose }, { label: "Send Another", variant: "secondary", onClick: () => { mutation.reset(); setMessage(""); } }]}>
      {data.recipients_count !== undefined && <RmNote>{data.recipients_count} recipient{data.recipients_count === 1 ? "" : "s"} notified</RmNote>}
    </RmResultModal>;
  }
  return <RmFlowModal title="Send Bonus Reminder" subtitle="Motivate your SCs to hit targets" onClose={onClose} pending={mutation.isPending}
    secondary={{ label: "Cancel", onClick: onClose, disabled: mutation.isPending }}
    primary={{ label: "Send Reminder", color: rmFlow.amber, loading: mutation.isPending, disabled: !message.trim() || (mode === "one" && !id), onClick: () => mutation.mutate({ message: message.trim(), ...(mode === "all" ? { remind_all_at_risk: true } : { coordinator_id: id }) }) }}>
    <div className="space-y-2"><RmLabel>Send to</RmLabel><RmPills value={mode} disabled={mutation.isPending} onChange={setMode} options={[{ value: "one", label: "One SC" }, { value: "all", label: `All At-Risk SCs${atRisk.data ? ` (${atRisk.data.total})` : ""}` }]} /></div>
    {mode === "one" && <Select className="w-full" size="large" showSearch optionFilterProp="label" placeholder="Choose a State Coordinator" value={id} loading={everyone.isLoading} disabled={mutation.isPending} onChange={pick}
      options={[...options.values()].map(row => ({ value: row.id, label: `${row.name} · ${row.state}` })).concat(target && !options.has(target.id) ? [{ value: target.id, label: target.name }] : [])} />}
    <div className="space-y-2"><RmLabel>{mode === "one" ? "Other at-risk State Coordinators" : "At-risk State Coordinators"}</RmLabel>
      {atRisk.isLoading ? <Skeleton active paragraph={{ rows: 2 }} /> : (mode === "one" ? others : atRisk.data?.items ?? []).length ? <div className="divide-y rounded-xl border" style={{ borderColor: rmFlow.border }}>
        {(mode === "one" ? others : atRisk.data!.items).map(row => <div key={row.id} className="flex items-center justify-between gap-3 px-3 py-2 text-xs" style={{ borderColor: rmFlow.border }}><strong>{row.name}</strong><span style={{ color: rmFlow.amberInk }}>{row.activations_text}</span><span style={{ color: rmFlow.muted }}>{row.bonus_status}</span></div>)}
      </div> : <p className="text-xs" style={{ color: rmFlow.muted }}>No State Coordinators are currently at risk.</p>}
    </div>
    {/* Message channel (SMS / Push / Both) and per-SC target progress from the design are not shown: the remind endpoint accepts a message and recipients only. */}
    <label className="block space-y-2"><RmLabel right={<span>{message.length}/500</span>}>Message text</RmLabel>
      <Input.TextArea rows={4} maxLength={500} value={message} disabled={mutation.isPending} onChange={event => setMessage(event.target.value)} placeholder="Write a bonus milestone reminder..." /></label>
    {mutation.error && <RmNote tone="danger">{mutation.error.message}</RmNote>}
  </RmFlowModal>;
}

const suspendReasons = [
  { value: "Fraudulent Activity", hint: "Suspected fraud or SIM abuse", icon: ShieldAlert, color: rmFlow.red, bg: rmFlow.redBg },
  { value: "KYC / Verification Issue", hint: "Documents expired or invalid", icon: FileWarning, color: rmFlow.amber, bg: rmFlow.amberBg },
  { value: "Poor Performance", hint: "Consistent underperformance", icon: TrendingDown, color: rmFlow.amber, bg: rmFlow.amberBg },
  { value: "Policy Violation", hint: "Breach of Simkash terms", icon: Ban, color: "#7C3AED", bg: "#F1EAFE" },
  { value: "Other", hint: "Specify below", icon: MoreHorizontal, color: rmFlow.slate, bg: rmFlow.base },
];
const reactivateReasons = [
  { value: "Issue Resolved", hint: "The reason for suspension has been addressed", icon: Check, color: rmFlow.green, bg: rmFlow.greenBg },
  { value: "Verification Complete", hint: "KYC documents verified", icon: ShieldAlert, color: rmFlow.blue, bg: rmFlow.blueBg },
  { value: "Other", hint: "Specify below", icon: MoreHorizontal, color: rmFlow.slate, bg: rmFlow.base },
];

export function RmDesignedSuspend({ target, suspended, onClose, details }: { target: RmTarget; suspended: boolean; onClose: () => void; details?: { phone?: string; state?: string; aps?: string; activations?: string } }) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const mutation = useSuspendScAccount(target.id);
  const reasons = suspended ? reactivateReasons : suspendReasons;
  const fullReason = `${reason}${notes.trim() ? `: ${notes.trim()}` : ""}`;
  if (mutation.isPending) return <RmProcessingModal title={suspended ? "Submitting reactivation..." : "Submitting suspension request..."} subtitle="Please wait" />;
  if (mutation.isSuccess) {
    const data = (mutation.data.data ?? {}) as { status?: string };
    const awaiting = Boolean(data.status && /pending|review|approval/i.test(data.status));
    return <RmResultModal status={awaiting ? "pending" : "success"} iconColor={awaiting ? undefined : suspended ? rmFlow.green : rmFlow.navy} title={suspended ? "Coordinator Reactivated" : awaiting ? "Suspension Request Submitted" : "Coordinator Suspended"} subtitle={mutation.data.message} onClose={onClose}
      actions={[{ label: "Done", color: rmFlow.navy, onClick: onClose }]}>
      <RmReceipt rows={[["SC", target.name], ["Reason", reason], ...(data.status ? [["Status", <RmBadge tone={awaiting ? "warning" : suspended ? "success" : "danger"}>{data.status}</RmBadge>] as RmReceiptRow] : [])]} />
    </RmResultModal>;
  }
  return <RmFlowModal size="md" title={suspended ? "Reactivate State Coordinator" : "Suspend State Coordinator"} subtitle={`${target.name}${details?.state ? ` · ${details.state}` : ""}`} onClose={onClose}
    secondary={{ label: "Cancel", onClick: onClose }}
    primary={{ label: suspended ? "Reactivate SC" : "Submit Request", color: suspended ? rmFlow.green : rmFlow.red, disabled: !confirmed || !reason || (reason === "Other" && !notes.trim()), onClick: () => mutation.mutate({ suspend: !suspended, reason: fullReason }) }}>
    {suspended ? <RmNote>This restores the coordinator's account access and lets their Agency Partners activate SIMs again.</RmNote>
      : <RmNote tone="warning" icon={AlertTriangle}>Suspending this SC will prevent them and their Agency Partners from activating SIMs until restored.</RmNote>}
    <div className="rounded-xl border p-3" style={{ borderColor: rmFlow.border }}><strong className="text-sm">{target.name}{details?.phone ? ` · ${details.phone}` : ""}</strong>{(details?.aps || details?.activations) && <p className="mt-0.5 text-xs" style={{ color: rmFlow.muted }}>{[details.aps, details.activations].filter(Boolean).join(" · ")}</p>}</div>
    {!suspended && <RmNote tone="danger" icon={Users} title={`Impact: ${details?.aps ? `${details.aps} will` : "Their Agency Partners will"} be unable to activate SIMs`}>Their stock will be frozen during suspension</RmNote>}
    <div className="space-y-2"><RmLabel>Reason for {suspended ? "reactivation" : "suspension"}</RmLabel>
      {reasons.map(option => { const active = reason === option.value; const Icon = option.icon;
        return <button type="button" key={option.value} onClick={() => setReason(option.value)} className="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition" style={{ borderColor: active ? rmFlow.blue : rmFlow.border, background: active ? rmFlow.blueBg : rmFlow.white }}>
          <span className="flex size-8 items-center justify-center rounded-lg" style={{ background: option.bg, color: option.color }}><Icon className="size-4" /></span>
          <span className="min-w-0 flex-1"><strong className="block text-xs">{option.value}</strong><span className="text-[11px]" style={{ color: rmFlow.muted }}>{option.hint}</span></span>
          <span className="flex size-4 items-center justify-center rounded-full border" style={{ borderColor: active ? rmFlow.blue : rmFlow.border }}>{active && <span className="size-2 rounded-full" style={{ background: rmFlow.blue }} />}</span>
        </button>; })}
    </div>
    <div><Input.TextArea rows={3} maxLength={500} value={notes} onChange={event => setNotes(event.target.value)} placeholder={`Provide specific details about the ${suspended ? "reactivation" : "suspension"} reason...`} /><p className="mt-1 text-right text-[11px]" style={{ color: rmFlow.muted }}>{notes.length}/500</p></div>
    {/* Suspension duration / "suspend until" from the design are not shown: the suspend endpoint accepts suspend + reason only. */}
    {mutation.error && <RmNote tone="danger">{mutation.error.message}</RmNote>}
    <Checkbox checked={confirmed} onChange={event => setConfirmed(event.target.checked)}><span className="text-xs">I confirm this action for {target.name} is justified.</span></Checkbox>
  </RmFlowModal>;
}
