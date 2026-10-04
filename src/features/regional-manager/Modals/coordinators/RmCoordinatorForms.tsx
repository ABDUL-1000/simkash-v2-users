import { Checkbox, Form, Input, InputNumber } from "antd";
import { useOnboardStateCoordinator, useSendScBonusReminder, useSuspendScAccount } from "../../api/coordinators";
import type { RmNewCoordinatorPayload, RmScReminderPayload } from "../../types/territory";
import type { RmSuspendPayload, RmTarget } from "../../types/dashboard";
import { RmActionModal } from "../dashboard/RmActionModal";
import { RmCoordinatorSelect, RmProfileFields } from "../dashboard/RmFormFields";

export function RmOnboardCoordinatorModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmNewCoordinatorPayload>();
  const mutation = useOnboardStateCoordinator();
  return <RmActionModal title="Onboard state coordinator" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose} onSubmit={values => mutation.mutate(values, { onSuccess: onClose })}>
    <RmProfileFields />
    <Form.Item name="initial_stock" label="Initial stock" initialValue={0} rules={[{ required: true, type: "integer", min: 0 }]}><InputNumber min={0} precision={0} className="w-full" /></Form.Item>
  </RmActionModal>;
}
export function RmCoordinatorReminderModal({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmScReminderPayload>();
  const all = Form.useWatch("remind_all_at_risk", form);
  const mutation = useSendScBonusReminder();
  return <RmActionModal title={target ? `Remind ${target.name}` : "Send bonus reminders"} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={values => mutation.mutate({ message: values.message, ...(target ? { coordinator_id: target.id } : values.remind_all_at_risk ? { remind_all_at_risk: true } : { coordinator_ids: values.coordinator_ids }) }, { onSuccess: onClose })}>
    {!target && <><Form.Item name="remind_all_at_risk" valuePropName="checked" initialValue={true}><Checkbox>Remind all at-risk coordinators</Checkbox></Form.Item>
      {!all && <Form.Item name="coordinator_ids" label="Coordinators" rules={[{ required: true, type: "array", min: 1 }]}><RmCoordinatorSelect multiple /></Form.Item>}</>}
    <Form.Item name="message" label="Reminder message" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
  </RmActionModal>;
}
export function RmCoordinatorSuspendModal({ target, suspended, onClose }: { target: RmTarget; suspended: boolean; onClose: () => void }) {
  const [form] = Form.useForm<RmSuspendPayload>();
  const mutation = useSuspendScAccount(target.id);
  return <RmActionModal title={`${suspended ? "Re-activate" : "Suspend"} ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={values => mutation.mutate({ suspend: !suspended, reason: values.reason }, { onSuccess: onClose })}>
    <p className="mb-4">{suspended ? "Restore this coordinator’s access." : "Suspend this coordinator’s account access."}</p>
    <Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true }]}><Input.TextArea /></Form.Item>
  </RmActionModal>;
}
