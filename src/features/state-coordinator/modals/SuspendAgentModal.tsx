import { Form, Input } from "antd";
import { useSuspendAgencyPartner } from "../api/agents";
import type { ScPartnerTarget, SuspendAgentPayload } from "../types/operations";
import { ScActionModal } from "../components/ScActionModal";

export function SuspendAgentModal({ target, suspended, onClose }: { target: ScPartnerTarget; suspended: boolean; onClose: () => void }) {
  const [form] = Form.useForm<SuspendAgentPayload>();
  const mutation = useSuspendAgencyPartner(target.id);
  return <ScActionModal title={`${suspended ? "Re-activate" : "Suspend"} ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ ...values, suspend: !suspended }, { onSuccess: onClose })}>
    <p className="mb-4 text-sm">Confirm this partner's status change by providing a reason.</p>
    <Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
  </ScActionModal>;
}
