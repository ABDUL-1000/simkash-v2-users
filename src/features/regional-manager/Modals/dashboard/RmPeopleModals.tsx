import { Form, Input } from "antd";
import { useRmOnboardApForSc, useRmOnboardSc, useRmSendBonusReminder, useRmSuspendSc } from "../../api/dashboard";
import type { RmOnboardScPayload, RmProfilePayload, RmReminderPayload, RmSuspendPayload, RmTarget } from "../../types/dashboard";
import { RmActionModal } from "./RmActionModal";
import { RmProfileFields, RmStockFields } from "./RmFormFields";

export function RmOnboardScForm({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmOnboardScPayload>();
  const quantity = Form.useWatch("initial_sim_quantity", form);
  const mutation = useRmOnboardSc();
  return <RmActionModal title="Onboard state coordinator" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}><RmProfileFields /><RmStockFields initial optionalType={!quantity} /></RmActionModal>;
}
export function RmOnboardApForm({ target, onClose }: { target: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmProfilePayload>();
  const mutation = useRmOnboardApForSc(target.id);
  return <RmActionModal title={`Onboard AP for ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}><RmProfileFields /></RmActionModal>;
}
export function RmReminderForm({ target, onClose }: { target: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmReminderPayload>();
  const mutation = useRmSendBonusReminder();
  return <RmActionModal title={`Send bonus reminder to ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ coordinator_id: target.id, message: values.message }, { onSuccess: onClose })}>
    <Form.Item name="message" label="Message" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
    {/* Commented out: A numeric target gap is not supplied by the coordinator list API. */}
  </RmActionModal>;
}
export function RmSuspendForm({ target, suspended, onClose }: { target: RmTarget; suspended: boolean; onClose: () => void }) {
  const [form] = Form.useForm<RmSuspendPayload>();
  const mutation = useRmSuspendSc(target.id);
  return <RmActionModal title={`${suspended ? "Re-activate" : "Suspend"} ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ suspend: !suspended, reason: values.reason }, { onSuccess: onClose })}>
    <Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
  </RmActionModal>;
}
