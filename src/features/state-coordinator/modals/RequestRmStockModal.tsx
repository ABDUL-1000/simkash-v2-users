import { Form, Input, InputNumber, Select } from "antd";
import { useRequestStockFromRm } from "../api/inventory";
import type { StockRequestPayload } from "../types/operations";
import { ScActionModal } from "../components/ScActionModal";

export function RequestRmStockModal({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm<StockRequestPayload>();
  const mutation = useRequestStockFromRm();
  return <ScActionModal title="Request stock from RM" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: onClose })}>
    <Form.Item name="sim_type" label="SIM type" rules={[{ required: true }]}><Select options={["pos", "cctv", "gps", "router"].map((value) => ({ value, label: value.toUpperCase() }))} /></Form.Item>
    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }, { type: "integer", min: 1 }]}><InputNumber min={1} precision={0} className="w-full" /></Form.Item>
    <Form.Item name="urgency" label="Urgency" initialValue="normal" rules={[{ required: true }]}><Select options={[{ value: "normal", label: "Normal" }, { value: "urgent", label: "Urgent" }]} /></Form.Item>
    <Form.Item name="notes" label="Notes" initialValue=""><Input.TextArea rows={3} /></Form.Item>
  </ScActionModal>;
}
