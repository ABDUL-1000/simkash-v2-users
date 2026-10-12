import { Form, Input, InputNumber, Select } from "antd";
import { useCaRequestStock } from "../api/useCaRequestStock";
import type { CaRequestStockPayload } from "../types/api";
import { CaActionModal, CaConfirmed } from "./CaActionModal";
export function CaDashboardRequestStockModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<CaRequestStockPayload>();
  const mutation = useCaRequestStock();
  if (mutation.isSuccess) return <CaConfirmed title="Stock Request Submitted!" result={mutation.data} onClose={onClose} />;
  return <CaActionModal title="Request SIM Stock" description="Request replenishment from Super Admin" onClose={onClose} onSubmit={() => form.submit()} pending={mutation.isPending} error={mutation.error} submitLabel="Submit Request"><Form form={form} layout="vertical" disabled={mutation.isPending} onFinish={values => { if (!mutation.isPending) mutation.mutate(values); }}>
    <Form.Item name="sim_type" label="SIM type" rules={[{ required: true }]}><Select options={["pos", "cctv", "gps", "router"].map(value => ({ value, label: value.toUpperCase() }))} /></Form.Item>
    <Form.Item name="quantity" label="Quantity" rules={[{ required: true, type: "integer", min: 1 }]}><InputNumber min={1} precision={0} className="!w-full" /></Form.Item>
    <Form.Item name="reason" label="Reason" rules={[{ required: true, whitespace: true }]}><Input.TextArea rows={4} /></Form.Item>
    {/* Urgency and simultaneous multi-type quantities remain commented: request-stock accepts quantity, sim_type and reason only. */}
  </Form></CaActionModal>;
}
