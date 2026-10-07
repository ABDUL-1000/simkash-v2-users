import { useState } from "react";
import { Alert, Checkbox, Form, Input, Radio, Segmented, Steps } from "antd";
import { useOnboardStateCoordinator, useSendScBonusReminder, useSuspendScAccount } from "../../api/coordinators";
import { useGetRmSimInventoryOverview } from "../../api/inventory";
import { RmCoordinatorSelect, RmProfileFields } from "./RmFormFields";
import { RmConfirmed, RmDesignModal, RmQuantityRow } from "./RmDesignModal";
import { RmStockSummary } from "../../components/dashboard/RmDesign";
import { RmQueryState } from "../../components/dashboard/RmDashboardPrimitives";
import type { RmProfilePayload, RmTarget } from "../../types/dashboard";
import { colors } from "@/constants/colors";

export function RmDesignedOnboard({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmProfilePayload>();
  const [profile, setProfile] = useState<RmProfilePayload>();
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const inventory = useGetRmSimInventoryOverview();
  const mutation = useOnboardStateCoordinator();
  if (mutation.isSuccess) return <RmConfirmed title="Onboarding Submitted!" result={mutation.data} rows={[{ label: "Name", value: profile?.fullname }, { label: "Phone", value: profile?.phone }, { label: "State", value: profile?.state }, { label: "Initial stock", value: `${quantity} SIMs` }]} onClose={onClose} />;
  return <RmDesignModal title="Onboard State Coordinator" subtitle={step ? "Step 2 — Initial stock allocation" : "Step 1 — SC details"} onClose={onClose} pending={mutation.isPending} error={mutation.error} submitLabel={step ? "Submit Onboarding" : "Continue →"} onBack={step ? () => setStep(0) : undefined}
    disabled={step === 1 && (!Number.isSafeInteger(quantity) || quantity < 0 || (quantity > 0 && (!inventory.data || quantity > inventory.data.summary_cards.total_available.count)))}
    onSubmit={() => { if (step === 0) form.submit(); else if (profile) mutation.mutate({ ...profile, initial_stock: quantity }); }}>
    <Steps size="small" current={step} items={[{ title: "SC Details" }, { title: "Stock Allocation" }]} />
    <Form form={form} layout="vertical" disabled={mutation.isPending} initialValues={profile} onFinish={values => { setProfile(values); setStep(1); }} style={{ display: step ? "none" : undefined }}><RmProfileFields /></Form>
    {step === 1 && <><div className="rounded-lg p-3 text-sm" style={{ background: colors.blues.surfaceLight }}><strong>{profile?.fullname}</strong><p className="text-xs">{profile?.state} · {profile?.phone}</p></div>
      <RmQueryState loading={inventory.isLoading} error={inventory.error} retry={() => void inventory.refetch()}>{inventory.data && <RmStockSummary total={inventory.data.summary_cards.total_available.count}>{inventory.data.current_inventory.map(stock => `${stock.label}: ${stock.available}`).join(" · ")}</RmStockSummary>}</RmQueryState>
      <p className="text-xs font-semibold">HOW MANY SIMs TO SEND INITIALLY?</p><RmQuantityRow label="Initial SIM stock" value={quantity} max={inventory.data?.summary_cards.total_available.count} onChange={setQuantity} disabled={mutation.isPending} />
      {/* Per-type initial quantities and custom bonus targets remain commented out: onboarding accepts initial_stock only. Approval status is shown only when returned by the API. */}
      <Alert type="info" showIcon title="Review these details before adding this coordinator to your network." />
    </>}
  </RmDesignModal>;
}

export function RmDesignedReminder({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [mode, setMode] = useState("one");
  const [id, setId] = useState<number | undefined>(target?.id);
  const [message, setMessage] = useState("");
  const mutation = useSendScBonusReminder();
  if (mutation.isSuccess) return <RmConfirmed title="Reminder Sent!" result={mutation.data} onClose={onClose} />;
  return <RmDesignModal title="Send Bonus Reminder" subtitle="Motivate your SCs to hit targets" submitColor={colors.warning} onClose={onClose} pending={mutation.isPending} error={mutation.error} submitLabel="Send Reminder" disabled={!message.trim() || (mode === "one" && !id)} onSubmit={() => mutation.mutate({ message: message.trim(), ...(mode === "all" ? { remind_all_at_risk: true } : { coordinator_id: id }) })}>
    <p className="text-xs font-semibold">SEND TO</p><Segmented disabled={mutation.isPending} value={mode} onChange={setMode} options={[{ label: "One SC", value: "one" }, { label: "All At-Risk SCs", value: "all" }]} />
    {mode === "one" && <RmCoordinatorSelect disabled={mutation.isPending} target={target} value={id} onChange={value => setId(value as number)} />}
    {/* SMS/push channel selector and numeric bonus-gap hints remain commented out: the API accepts a message and recipient mode only. */}
    <label className="block text-xs">MESSAGE TEXT<Input.TextArea className="mt-2" rows={5} value={message} disabled={mutation.isPending} onChange={event => setMessage(event.target.value)} placeholder="Write a bonus milestone reminder…" /></label>
  </RmDesignModal>;
}

export function RmDesignedSuspend({ target, suspended, onClose }: { target: RmTarget; suspended: boolean; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const mutation = useSuspendScAccount(target.id);
  if (mutation.isSuccess) return <RmConfirmed title={suspended ? "Coordinator Reactivated" : "Suspension Submitted"} result={mutation.data} rows={[{ label: "State Coordinator", value: target.name }, { label: "Reason", value: `${reason}${notes ? `: ${notes}` : ""}` }]} onClose={onClose} />;
  return <RmDesignModal title={suspended ? "Reactivate State Coordinator" : "Suspend State Coordinator"} subtitle={target.name} submitColor={suspended ? colors.success : colors.danger} onClose={onClose} pending={mutation.isPending} error={mutation.error} submitLabel={suspended ? "Reactivate SC" : "Submit Suspension"} disabled={!confirmed || !reason || (reason === "Other" && !notes.trim())}
    onSubmit={() => mutation.mutate({ suspend: !suspended, reason: `${reason}${notes.trim() ? `: ${notes.trim()}` : ""}` })}>
    <Alert showIcon type={suspended ? "info" : "warning"} title={suspended ? "This restores the coordinator's account access." : "This action pauses the coordinator's account access."} />
    <p className="text-xs font-semibold">REASON FOR {suspended ? "REACTIVATION" : "SUSPENSION"}</p>
    <Radio.Group disabled={mutation.isPending} value={reason} onChange={event => setReason(event.target.value)} className="w-full space-y-2">{(suspended ? ["Issue Resolved", "Verification Complete", "Other"] : ["Fraudulent Activity", "KYC / Verification Issue", "Poor Performance", "Policy Violation", "Other"]).map(value => <div key={value} className="rounded-lg border p-3" style={{ borderColor: reason === value ? colors.primary : colors.border }}><Radio value={value}>{value}</Radio></div>)}</Radio.Group>
    <Input.TextArea aria-label="Reason details" placeholder="Provide specific details…" rows={3} value={notes} onChange={event => setNotes(event.target.value)} disabled={mutation.isPending} />
    {/* Duration, suspension-until and approval timeline are not submitted: the contract accepts suspend + reason only. */}
    <Checkbox checked={confirmed} disabled={mutation.isPending} onChange={event => setConfirmed(event.target.checked)}>I confirm this account action for {target.name}.</Checkbox>
  </RmDesignModal>;
}
