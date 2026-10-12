import { Form, Input, InputNumber } from "antd";
import { useCaOnboardAp } from "../api/useCaOnboardAp";
import type { CaOnboardApPayload } from "../types/api";
import { CaActionModal, CaConfirmed } from "./CaActionModal";
export function OnboardAgencyPartnerModal({ available, onClose }: { available?: number; onClose: () => void }) {
  const [form] = Form.useForm<CaOnboardApPayload>();
  const mutation = useCaOnboardAp();
  if (mutation.isSuccess) return <CaConfirmed title="Agency Partner Onboarded!" result={mutation.data} onClose={onClose} />;
  return <CaActionModal title="Onboard Agency Partner" description="Add an AP to your corporate network" onClose={onClose} onSubmit={() => form.submit()} pending={mutation.isPending} error={mutation.error} submitLabel="Onboard AP">
    <Form form={form} layout="vertical" disabled={mutation.isPending} initialValues={{ initial_sims_to_assign: 0 }} onFinish={values => { if (!mutation.isPending) mutation.mutate(values); }}>
      <Form.Item name="fullname" label="Full name" rules={[{ required: true, whitespace: true }]}><Input autoComplete="name" /></Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}><Input type="email" autoComplete="email" /></Form.Item>
      <Form.Item name="phone" label="Phone" normalize={(value: string) => value.replace(/\D/g, "").slice(0, 11)} rules={[{ required: true }, { pattern: /^\d{11}$/, message: "Enter an 11-digit phone number." }]}><Input inputMode="numeric" maxLength={11} /></Form.Item>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Form.Item name="state" label="State" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item><Form.Item name="lga" label="LGA" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item></div>
      <Form.Item name="initial_sims_to_assign" label="Initial SIMs to assign" rules={[{ required: true, type: "integer", min: 0, max: available }]}><InputNumber min={0} max={available} precision={0} className="!w-full" /></Form.Item>
      {/* Existing-user search, per-type allocation and custom bonus targets are commented: not supported by onboard-ap. */}
    </Form>
  </CaActionModal>;
}
