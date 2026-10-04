import { Form, Input, InputNumber, Select } from "antd";
import { useOnboardAgencyPartner, useUpdateScAgent } from "../api/agents";
import type { AgentProfilePayload, OnboardAgentPayload } from "../types/operations";
import { ScActionModal } from "../components/ScActionModal";
import { AgentProfileFields } from "../components/agency-partners/AgentProfileFields";

export function OnboardAgencyPartnerModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<OnboardAgentPayload>();
  const mutation = useOnboardAgencyPartner();
  const quantity = Form.useWatch("initial_sim_quantity", form);
  return <ScActionModal title="Onboard new agency partner" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ ...values, password: values.password || undefined }, { onSuccess: onClose })}>
    <AgentProfileFields />
    <Form.Item name="password" label="Password (optional)" extra="Leave blank for automatic credentials."><Input.Password autoComplete="new-password" /></Form.Item>
    <Form.Item name="initial_sim_quantity" label="Initial SIM quantity" initialValue={0} rules={[{ required: true }, { type: "integer", min: 0 }]}><InputNumber min={0} precision={0} /></Form.Item>
    <Form.Item name="initial_sim_type" label="Initial SIM type" rules={[{ required: quantity > 0, message: "Choose a SIM type for the initial stock." }]}><Select allowClear options={["pos", "cctv", "gps", "router"].map((value) => ({ value, label: value.toUpperCase() }))} /></Form.Item>
  </ScActionModal>;
}

export function EditScAgentModal({ id, profile, onClose }: { id: number; profile: AgentProfilePayload; onClose: () => void }) {
  const [form] = Form.useForm<AgentProfilePayload>();
  const mutation = useUpdateScAgent(id);
  return <ScActionModal title="Edit agency partner" form={form} initialValues={profile} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    <AgentProfileFields />
  </ScActionModal>;
}
