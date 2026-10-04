import { Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useRmDistributeSimStock, useRmRedistributeSimStock, useRmRequestStockFromSuperAdmin } from "../../api/inventory";
import { rmDistributionPayload } from "../../api/distributionPayload";
import type { RmBulkStockPayload, RmInventoryDistribution } from "../../types/territory";
import type { RmRedistributePayload, RmTarget } from "../../types/dashboard";
import { RmActionModal } from "../dashboard/RmActionModal";
import { RmCoordinatorSelect, RmStockFields } from "../dashboard/RmFormFields";

export function RmInventoryDistributeModal({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [form] = Form.useForm<RmInventoryDistribution>();
  const all = Form.useWatch("distribute_to_all_low", form);
  const mutation = useRmDistributeSimStock();
  return <RmActionModal title="Distribute SIM stock" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ ...rmDistributionPayload(values), network: values.network, notes: values.notes }, { onSuccess: onClose })}>
    <Form.Item name="distribute_to_all_low" valuePropName="checked" initialValue={false}><Checkbox>All low-stock coordinators</Checkbox></Form.Item>
    {!all && <Form.Item name="coordinator_ids" label="Coordinators" initialValue={target ? [target.id] : undefined} rules={[{ required: true, type: "array", min: 1 }]}><RmCoordinatorSelect multiple target={target} /></Form.Item>}
    <RmStockFields />
    <Form.Item name="network" label="Network (optional)"><Select allowClear options={["MTN", "AIRTEL", "GLO", "9MOBILE"].map(value => ({ value, label: value }))} /></Form.Item>
    <Form.Item name="notes" label="Notes"><Input.TextArea /></Form.Item>
  </RmActionModal>;
}

export function RmInventoryRedistributeModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmRedistributePayload>();
  const mutation = useRmRedistributeSimStock();
  return <RmActionModal title="Redistribute SIM stock" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    <Form.Item name="from_coordinator_id" label="From coordinator" rules={[{ required: true }]}><RmCoordinatorSelect /></Form.Item>
    <Form.Item name="to_coordinator_id" label="To coordinator" dependencies={["from_coordinator_id"]} rules={[{ required: true }, ({ getFieldValue }) => ({ validator: (_, value) => value === getFieldValue("from_coordinator_id") ? Promise.reject(new Error("Select a different receiving coordinator.")) : Promise.resolve() })]}><RmCoordinatorSelect /></Form.Item>
    <RmStockFields />
    <Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true }]}><Input.TextArea /></Form.Item>
  </RmActionModal>;
}

const quantityFields = ["pos_quantity", "cctv_quantity", "gps_quantity", "router_quantity"] as const;
export function RmInventoryRequestModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<RmBulkStockPayload>();
  const mutation = useRmRequestStockFromSuperAdmin();
  return <RmActionModal title="Request stock from Super Admin" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    {quantityFields.map(name => <Form.Item key={name} name={name} label={name.replace("_quantity", "").toUpperCase() + " SIMs"} initialValue={0}
      dependencies={quantityFields.filter(field => field !== name)} rules={[{ required: true, type: "integer", min: 0 }, ({ getFieldValue }) => ({ validator: () => quantityFields.some(field => Number(getFieldValue(field)) > 0) ? Promise.resolve() : Promise.reject(new Error("Request at least one SIM.")) })]}><InputNumber min={0} precision={0} className="w-full" /></Form.Item>)}
    <Form.Item name="urgency" label="Urgency" initialValue="normal" rules={[{ required: true }]}><Select options={[{ value: "normal", label: "Normal" }, { value: "urgent", label: "Urgent" }]} /></Form.Item>
    <Form.Item name="notes" label="Notes" initialValue=""><Input.TextArea /></Form.Item>
  </RmActionModal>;
}
