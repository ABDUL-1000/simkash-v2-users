import { Checkbox, Form, Input, Select } from "antd";
import { useRmDistributeStock, useRmQuickDistributeToSc, useRmRedistributeStock, useRmRequestStockFromAdmin } from "../../api/dashboard";
import { rmDistributionPayload } from "../../api/distributionPayload";
import type { RmDistributePayload, RmQuickDistributePayload, RmRedistributePayload, RmStockRequestPayload, RmTarget } from "../../types/dashboard";
import { RmActionModal } from "./RmActionModal";
import { RmCoordinatorSelect, RmStockFields } from "./RmFormFields";

export function RmDistributeModal({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmDistributePayload>();
  const all = Form.useWatch("distribute_to_all_low", form);
  const mutation = useRmDistributeStock();
  return <RmActionModal title="Distribute stock to coordinators" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(rmDistributionPayload(values), { onSuccess: onClose })}>
    <Form.Item name="distribute_to_all_low" valuePropName="checked" initialValue={false}><Checkbox>Distribute to all low-stock coordinators</Checkbox></Form.Item>
    {!all && <Form.Item name="coordinator_ids" label="State coordinators" initialValue={target ? [target.id] : undefined} rules={[{ required: true, type: "array", min: 1, message: "Select at least one coordinator." }]}><RmCoordinatorSelect multiple target={target} /></Form.Item>}
    <RmStockFields />
  </RmActionModal>;
}
export function RmQuickDistributeModal({ target, onClose }: { target: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmQuickDistributePayload>();
  const mutation = useRmQuickDistributeToSc(target.id);
  return <RmActionModal title={`Distribute stock to ${target.name}`} form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}><RmStockFields /></RmActionModal>;
}
export function RmRedistributeModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmRedistributePayload>();
  const mutation = useRmRedistributeStock();
  return <RmActionModal title="Redistribute between coordinators" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    <Form.Item name="from_coordinator_id" label="From coordinator" rules={[{ required: true }]}><RmCoordinatorSelect label="From coordinator" /></Form.Item>
    <Form.Item name="to_coordinator_id" label="To coordinator" dependencies={["from_coordinator_id"]} rules={[{ required: true }, ({ getFieldValue }) => ({ validator: (_, value) => value && value === getFieldValue("from_coordinator_id") ? Promise.reject(new Error("Choose a different receiving coordinator.")) : Promise.resolve() })]}><RmCoordinatorSelect label="To coordinator" /></Form.Item>
    <RmStockFields /><Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true }]}><Input.TextArea /></Form.Item>
  </RmActionModal>;
}
export function RmAdminStockModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmStockRequestPayload>();
  const mutation = useRmRequestStockFromAdmin();
  return <RmActionModal title="Request stock from Admin" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    <RmStockFields />
    <Form.Item name="urgency" label="Urgency" initialValue="normal" rules={[{ required: true }]}><Select options={[{ value: "normal", label: "Normal" }, { value: "urgent", label: "Urgent" }]} /></Form.Item>
    <Form.Item name="notes" label="Notes" initialValue=""><Input.TextArea /></Form.Item>
  </RmActionModal>;
}
