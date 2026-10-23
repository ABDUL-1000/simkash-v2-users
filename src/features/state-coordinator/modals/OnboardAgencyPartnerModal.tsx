import { useState } from "react";
import { Alert, Form, Input } from "antd";
import { CheckCircle2, Search, UserPlus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useAddExistingPartner, useOnboardAgencyPartner, useUpdateScAgent, useVerifyPartner } from "../api/agents";
import type { AgentProfilePayload, OnboardAgentPayload } from "../types/operations";
import { ScActionModal } from "../components/ScActionModal";
import { AgentProfileFields } from "../components/agency-partners/AgentProfileFields";

const initialsOf = (name = "") => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

/**
 * Onboard an Agency Partner:
 * 1. POST /my-agent/verify-partner by phone.
 * 2. isRegistered=true → already an Agency Partner: POST /my-agent/add-partner { phone } adds them to your network.
 *    isRegistered=false, or no account found → POST /my-agent/onboard with the full profile (prefilled from verification).
 */
export function OnboardAgencyPartnerModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<OnboardAgentPayload>();
  const [step, setStep] = useState<"verify" | "details">("verify");
  const [phone, setPhone] = useState("");
  const verify = useVerifyPartner();
  const addExisting = useAddExistingPartner();
  const onboard = useOnboardAgencyPartner();
  const pending = addExisting.isPending || onboard.isPending;
  const person = verify.data && verify.variables?.phone === phone ? verify.data : undefined;
  const canAdd = person?.isRegistered === true;
  const close = () => { if (!pending) onClose(); };

  const startOnboarding = () => {
    form.setFieldsValue({ phone, fullname: person?.fullname, email: person?.email, country: person?.country || "Nigeria", reason: "Agency Partner onboarding" });
    setStep("details");
  };
  const submit = (values: OnboardAgentPayload) => onboard.mutate({ ...values, phone, password: values.password || undefined, reason: values.reason || undefined }, { onSuccess: onClose });

  if (step === "details") return (
    <ScActionModal title="Onboard new agency partner" form={form} pending={onboard.isPending} error={onboard.error} onClose={onClose} onSubmit={submit}>
      <p className="mb-4 text-xs text-[#66738C]">Phone <strong className="text-[#0F152A]">{phone}</strong> · <button type="button" className="font-bold text-[#2563EB] hover:underline" onClick={() => setStep("verify")}>Change</button></p>
      <AgentProfileFields lockPhone />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Form.Item name="dob" label="Date of birth" rules={[{ required: true, message: "Enter a date of birth." }]}><Input type="date" max={new Date().toISOString().slice(0, 10)} /></Form.Item>
        <Form.Item name="country" label="Country" initialValue="Nigeria" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
      </div>
      <Form.Item name="reason" label="Reason (optional)"><Input placeholder="Agency Partner onboarding" /></Form.Item>
      <Form.Item name="password" label="Password (optional)" extra="Leave blank for automatic credentials."><Input.Password autoComplete="new-password" /></Form.Item>
    </ScActionModal>
  );

  return (
    <AppModal open title="Onboard new agency partner" description="Start by verifying the partner's phone number" onOpenChange={(open) => { if (!open) close(); }} showCloseButton={!pending}
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", disabled: pending, onClick: close },
        canAdd
          ? { key: "add", label: "Add to My Network", loading: addExisting.isPending, onClick: () => addExisting.mutate({ phone }, { onSuccess: onClose }) }
          : person || verify.isError
            ? { key: "onboard", label: "Continue to Onboarding", onClick: startOnboarding }
            : { key: "verify", label: "Verify", loading: verify.isPending, disabled: phone.length !== 11, onClick: () => verify.mutate({ phone }) },
      ]}>
      <div className="space-y-4 text-xs">
        <label className="block space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Partner phone number</span>
          <div className="flex gap-2">
            <Input size="large" inputMode="numeric" placeholder="e.g. 08012345678" value={phone} disabled={pending}
              onChange={(event) => { setPhone(event.target.value.replace(/\D/g, "").slice(0, 11)); verify.reset(); addExisting.reset(); }} />
            <button type="button" disabled={phone.length !== 11 || verify.isPending || pending} onClick={() => verify.mutate({ phone })}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#2563EB] px-4 font-bold text-[#2563EB] hover:bg-[#EFF4F8] disabled:opacity-50">
              <Search className="size-3.5" />{verify.isPending ? "Checking…" : "Verify"}
            </button>
          </div>
        </label>

        {person && <div className={`flex items-center gap-3 rounded-2xl border p-3 ${canAdd ? "border-[#10B981]/30 bg-[#EBFFF8]" : "border-[#E2ECF6] bg-[#F8FAFC]"}`}>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-xs font-black text-white">{initialsOf(person.fullname)}</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-[#0F152A]">{person.fullname}</p>
            <p className="text-[#66738C]">{[person.email, person.gender, person.country].filter(Boolean).join(" · ")}</p>
          </div>
        </div>}
        {canAdd && <p className="flex items-start gap-2 rounded-2xl bg-[#EBFFF8] p-3 font-medium text-[#10B981]"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />This person is already an Agency Partner. Add them to your network.</p>}
        {person && !canAdd && <p className="flex items-start gap-2 rounded-2xl bg-[#EFF4F8] p-3 font-medium text-[#2563EB]"><UserPlus className="mt-0.5 size-4 shrink-0" />This account isn't an Agency Partner yet. Continue to onboard them; their details are prefilled.</p>}
        {verify.isError && <Alert type="warning" showIcon title={verify.error.message} description="You can onboard them as a new Agency Partner." />}
        {addExisting.error && <Alert type="error" showIcon title={addExisting.error.message} />}
      </div>
    </AppModal>
  );
}

export function EditScAgentModal({ id, profile, onClose }: { id: number; profile: AgentProfilePayload; onClose: () => void }) {
  const [form] = Form.useForm<AgentProfilePayload>();
  const mutation = useUpdateScAgent(id);
  return <ScActionModal title="Edit agency partner" form={form} initialValues={profile} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    <AgentProfileFields />
  </ScActionModal>;
}
