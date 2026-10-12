import { Checkbox, Form, InputNumber, Select } from "antd";
import { useCaDistributeStock } from "../api/useCaDistributeStock";
import type { CaDistributePayload, CaManagedPartnerItem } from "../types/api";
import { CaActionModal, CaConfirmed } from "./CaActionModal";
import { CaPartnerSelect } from "./CaPartnerSelect";
export function CaDistributeStockModal({ target, allLow = false, available, onClose }: { target?: CaManagedPartnerItem; allLow?: boolean; available?: number; onClose: () => void }) {
  const [form] = Form.useForm<CaDistributePayload>();
  const all = Form.useWatch("distribute_to_all_low", form);
  const mutation = useCaDistributeStock();
  if (mutation.isSuccess) return <CaConfirmed title="Stock Distributed!" result={mutation.data} onClose={onClose} />;
  return <CaActionModal title="Distribute SIM Stock" description="Send stock from your inventory to agency partners" onClose={onClose} onSubmit={() => form.submit()} pending={mutation.isPending} error={mutation.error} submitLabel="Distribute Stock">
    {available !== undefined && <div className="p-3 rounded-xl bg-slate-50 text-xs font-bold">Your inventory: {available.toLocaleString()} SIMs available</div>}
    <Form form={form} layout="vertical" disabled={mutation.isPending} initialValues={{ partner_id: target?.id, distribute_to_all_low: allLow, sim_type: "pos" }} onFinish={values => { if (!mutation.isPending) mutation.mutate({ quantity: values.quantity, sim_type: values.sim_type, ...(values.distribute_to_all_low ? { distribute_to_all_low: true } : { partner_id: values.partner_id, distribute_to_all_low: false }) }); }}>
      <Form.Item name="distribute_to_all_low" valuePropName="checked"><Checkbox>Distribute to all low-stock APs</Checkbox></Form.Item>
      {!all && <Form.Item name="partner_id" label="Agency Partner" rules={[{ required: true }]}><CaPartnerSelect target={target} disabled={mutation.isPending} /></Form.Item>}
      <Form.Item name="sim_type" label="SIM type" rules={[{ required: true }]}><Select options={["pos", "cctv", "gps", "router"].map(value => ({ value, label: value.toUpperCase() }))} /></Form.Item>
      <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: "integer", min: 1, max: available }]}><InputNumber min={1} max={available} precision={0} className="!w-full" /></Form.Item>
      {/* Per-type live limits and simultaneous type counters remain commented: dashboard supplies only total stock; distribute accepts one sim_type. */}
    </Form>
  </CaActionModal>;
}
