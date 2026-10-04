import { Form, Input } from "antd";

export function AgentProfileFields() {
  return <>
    <Form.Item name="fullname" label="Full name" rules={[{ required: true, whitespace: true }]}><Input autoComplete="name" /></Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}><Input type="email" autoComplete="email" /></Form.Item>
    <Form.Item name="phone" label="Phone" normalize={(value: string) => value.replace(/\D/g, "").slice(0, 11)} rules={[{ required: true }, { pattern: /^\d{11}$/, message: "Enter an 11-digit phone number." }]}><Input inputMode="numeric" autoComplete="tel-national" /></Form.Item>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Form.Item name="state" label="State" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
      <Form.Item name="lga" label="LGA" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    </div>
    <Form.Item name="address" label="Address" rules={[{ required: true, whitespace: true }]}><Input.TextArea autoComplete="street-address" /></Form.Item>
  </>;
}
