import { useState } from "react";
import { Alert, Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import type { RmTarget } from "../../types/dashboard";

export function RmProfileFields() {
  return <>
    <Form.Item name="fullname" label="Full name" rules={[{ required: true, whitespace: true }]}><Input autoComplete="name" /></Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}><Input type="email" autoComplete="email" /></Form.Item>
    <Form.Item name="phone" label="Phone" normalize={(value: string) => value.replace(/\D/g, "").slice(0, 11)} rules={[{ required: true }, { pattern: /^\d{11}$/, message: "Enter an 11-digit phone number." }]}><Input inputMode="numeric" /></Form.Item>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><Form.Item name="state" label="State" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item><Form.Item name="lga" label="LGA" rules={[{ required: true, whitespace: true }]}><Input /></Form.Item></div>
    <Form.Item name="address" label="Address" rules={[{ required: true, whitespace: true }]}><Input.TextArea /></Form.Item>
  </>;
}
export function RmStockFields({ initial = false, optionalType = false }: { initial?: boolean; optionalType?: boolean }) {
  return <>
    <Form.Item name={initial ? "initial_sim_quantity" : "quantity"} label={initial ? "Initial SIM quantity" : "Quantity"} initialValue={initial ? 0 : undefined} rules={[{ required: true }, { type: "integer", min: initial ? 0 : 1 }]}><InputNumber className="w-full" precision={0} min={initial ? 0 : 1} /></Form.Item>
    <Form.Item name={initial ? "initial_sim_type" : "sim_type"} label="SIM type" rules={[{ required: !optionalType, message: "Choose a SIM type." }]}><Select allowClear={optionalType} options={["pos", "cctv", "gps", "router"].map((value) => ({ value, label: value.toUpperCase() }))} /></Form.Item>
  </>;
}

export function RmCoordinatorSelect({ value, onChange, multiple, target, label = "Coordinator" }: {
  value?: number | number[]; onChange?: (value: number | number[]) => void; multiple?: boolean; target?: RmTarget; label?: string;
}) {
  const [search, setSearch] = useState("");
  const query = useGetRmStateCoordinators({ page: 1, limit: 20, search, status: "all" });
  const options = new Map((query.data?.coordinators ?? []).map((item) => [item.id, `${item.name} · ${item.state}`]));
  if (target) options.set(target.id, target.name);
  return <div className="space-y-2">
    {query.error && <Alert type="error" title="Unable to load coordinators" description={query.error.message} action={<Button onClick={() => void query.refetch()}>Retry</Button>} />}
    <Select className="w-full" aria-label={label} value={value} onChange={onChange} mode={multiple ? "multiple" : undefined} showSearch filterOption={false} onSearch={setSearch} loading={query.isFetching}
      options={Array.from(options, ([id, name]) => ({ value: id, label: name }))} placeholder="Search coordinator name, state or phone"
      notFoundContent={query.isFetching ? <Spin size="small" /> : <AppEmptyState title="No coordinators found" description="Search by name, state or phone." />} />
  </div>;
}
