import { useState } from "react";
import { Alert, Checkbox, Form, Input, InputNumber, Select } from "antd";
import { useScDistribute, useScOnboardPartner } from "../api/mutations";
import { useScPartners } from "../api/queries";
import type { ScDistributionPayload, ScOnboardPayload } from "../types/requests";
import { ScActionModal } from "../components/ScActionModal";

const simTypes = ["pos", "cctv", "gps", "router"].map((value) => ({ value, label: value.toUpperCase() }));
type ActionProps = { onClose: () => void; onSuccess: (message: string) => void };

export function ScDistributeForm({ canDistributeAll, onClose, onSuccess }: ActionProps & { canDistributeAll: boolean }) {
  const [form] = Form.useForm<ScDistributionPayload>();
  const [search, setSearch] = useState("");
  const all = Form.useWatch("distribute_to_all_low", form);
  const partners = useScPartners({ page: 1, limit: 20, search });
  const mutation = useScDistribute();
  return <ScActionModal title="Distribute SIM stock" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate({ ...values, partner_id: values.distribute_to_all_low ? undefined : values.partner_id }, { onSuccess: (result) => { onSuccess(result.message); onClose(); } })}>
    {partners.error && <Alert type="error" title={partners.error.message} />}
    <Form.Item name="distribute_to_all_low" initialValue={false} valuePropName="checked"><Checkbox disabled={!canDistributeAll}>Distribute to all partners with low stock</Checkbox></Form.Item>
    {!all && <Form.Item name="partner_id" label="Agency partner" rules={[{ required: true, message: "Select an agency partner." }]}>
      <Select showSearch filterOption={false} onSearch={setSearch} loading={partners.isFetching} options={partners.data?.partners.map((partner) => ({ value: partner.id, label: `${partner.name} · ${partner.phone}` }))} placeholder="Search by name or phone" />
    </Form.Item>}
    <Form.Item name="sim_type" label="SIM type" rules={[{ required: true }]}><Select options={simTypes} /></Form.Item>
    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }, { type: "integer", min: 1 }]}><InputNumber className="w-full" min={1} precision={0} /></Form.Item>
  </ScActionModal>;
}

export function ScOnboardPartnerForm({ onClose, onSuccess }: ActionProps) {
  const [form] = Form.useForm<ScOnboardPayload>();
  const mutation = useScOnboardPartner();
  return <ScActionModal title="Onboard agency partner" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose}
    onSubmit={(values) => mutation.mutate(values, { onSuccess: (result) => { onSuccess(result.message); onClose(); } })}>
    <Form.Item name="fullname" label="Full name" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}><Input type="email" /></Form.Item>
    <Form.Item name="phone" label="Phone" rules={[{ required: true }, { pattern: /^\+?\d{10,15}$/, message: "Enter a valid phone number." }]}><Input type="tel" /></Form.Item>
    <div className="grid grid-cols-2 gap-3">
      <Form.Item name="state" label="State" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
      <Form.Item name="lga" label="LGA" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item>
    </div>
    <Form.Item name="address" label="Address" rules={[{ required: true, whitespace: true }]}><Input.TextArea /></Form.Item>
    <Form.Item name="initial_sims_to_assign" label="Initial SIM quantity" rules={[{ required: true }, { type: "integer", min: 0 }]}><InputNumber min={0} precision={0} /></Form.Item>
    <Form.Item name="sim_type" label="SIM type" rules={[{ required: true }]}><Select options={simTypes} /></Form.Item>
  </ScActionModal>;
}
