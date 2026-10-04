import { Form, Input, Select } from "antd";
import { useSendAgentReminder, useSendBulkAtRiskReminders } from "../api/agents";
import type { AgentReminderPayload, BulkReminderPayload, ScPartnerTarget } from "../types/operations";
import { ScActionModal } from "../components/ScActionModal";

export function SendAgentReminderModal({ target, onClose }: { target: ScPartnerTarget; onClose: () => void }) {
  const [form] = Form.useForm<AgentReminderPayload>();
  const mutation = useSendAgentReminder();
  return <ScActionModal title={`Send reminder to ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ ...values, partner_id: target.id }, { onSuccess: onClose })}>
    <Form.Item name="type" label="Reminder type" rules={[{ required: true }]}><Select options={[{ value: "low_stock", label: "Low stock" }, { value: "bonus_target", label: "Bonus target" }]} /></Form.Item>
    <Form.Item name="title" label="Title" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="message" label="Message" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
  </ScActionModal>;
}

export function BulkAtRiskReminderModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<BulkReminderPayload>();
  const mutation = useSendBulkAtRiskReminders();
  return <ScActionModal title="Remind at-risk agency partners" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ ...values, target_at_risk_only: true }, { onSuccess: onClose })}>
    <p className="mb-4 text-sm">This message will be sent to partners at risk of missing their bonus target.</p>
    <Form.Item name="message" label="Message" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
  </ScActionModal>;
}
