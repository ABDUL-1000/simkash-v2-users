import { Form, Input } from "antd";
import { StateLgaSelect } from "@/components/forms/StateLgaSelect";

export function AgentProfileFields({ lockPhone = false }: { lockPhone?: boolean } = {}) {
  return <>
    <Form.Item name="fullname" label="Full name" rules={[{ required: true, whitespace: true }]}><Input autoComplete="name" /></Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}><Input type="email" autoComplete="email" /></Form.Item>
    <Form.Item name="phone" label="Phone" normalize={(value: string) => value.replace(/\D/g, "").slice(0, 11)} rules={[{ required: true }, { pattern: /^\d{11}$/, message: "Enter an 11-digit phone number." }]}><Input inputMode="numeric" autoComplete="tel-national" disabled={lockPhone} /></Form.Item>
    <Form.Item name="state" hidden><Input /></Form.Item>
    <Form.Item name="lga" label="State / LGA" rules={[{ required: true, message: "Select a state and LGA." }]}><LocationControl /></Form.Item>
    <Form.Item name="address" label="Address" rules={[{ required: true, whitespace: true }]}><Input.TextArea autoComplete="street-address" /></Form.Item>
  </>;
}

/** Controls `lga` through Form.Item and keeps the sibling `state` field in sync. */
function LocationControl({ value, onChange }: { value?: string; onChange?: (lga?: string) => void }) {
  const form = Form.useFormInstance();
  const state = Form.useWatch("state", form) as string | undefined;
  return <StateLgaSelect size="middle" value={{ state, lga: value }} onChange={(next) => { form.setFieldValue("state", next.state); onChange?.(next.lga); }} />;
}
