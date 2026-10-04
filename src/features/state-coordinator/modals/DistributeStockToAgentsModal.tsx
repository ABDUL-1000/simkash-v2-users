import { useState } from "react";
import { Alert, Button, Checkbox, Form, InputNumber, Select } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetScAgencyPartnersOverview, useDistributeStockToAgents } from "../api/agents";
import { useDistributeInventoryStock } from "../api/inventory";
import { distributionPayload } from "../api/distributionPayload";
import type { DistributionPayload, ScPartnerTarget } from "../types/operations";
import { ScActionModal } from "../components/ScActionModal";

export function DistributeStockToAgentsModal({ source = "agents", target, allLow = false, canDistributeAll, onClose }: {
  source?: "inventory" | "agents"; target?: ScPartnerTarget; allLow?: boolean; canDistributeAll: boolean; onClose: () => void;
}) {
  const [form] = Form.useForm<DistributionPayload>();
  const [search, setSearch] = useState("");
  const all = Form.useWatch("distribute_to_all_low", form);
  const partners = useGetScAgencyPartnersOverview({ page: 1, limit: 20, search, status: "all" });
  const inventoryMutation = useDistributeInventoryStock();
  const agentMutation = useDistributeStockToAgents();
  const mutation = source === "inventory" ? inventoryMutation : agentMutation;
  const options = new Map<number, string>(partners.data?.partners.map((partner) => [partner.id, partner.name]));
  if (target) options.set(target.id, target.name);
  const submit = (values: DistributionPayload) => {
    mutation.mutate(distributionPayload(values, source), { onSuccess: onClose });
  };
  return <ScActionModal title="Distribute SIM stock" form={form} pending={mutation.isPending} error={mutation.error} onClose={onClose} onSubmit={submit}>
    {partners.error && <Alert type="error" title="Unable to load partners" description={partners.error.message} action={<Button onClick={() => void partners.refetch()}>Retry</Button>} />}
    <Form.Item name="distribute_to_all_low" initialValue={allLow && canDistributeAll} valuePropName="checked"><Checkbox disabled={!canDistributeAll}>Distribute to all partners with low stock</Checkbox></Form.Item>
    {!all && <Form.Item name={source === "inventory" ? "partner_id" : "partner_ids"}
      initialValue={target ? source === "inventory" ? target.id : [target.id] : undefined}
      rules={[{ required: true, message: "Select at least one partner." }]} label="Agency partners">
      <Select mode={source === "agents" ? "multiple" : undefined} showSearch filterOption={false} onSearch={setSearch} loading={partners.isFetching}
        options={Array.from(options, ([value, label]) => ({ value, label }))} placeholder="Search name, phone or location"
        notFoundContent={<AppEmptyState title={partners.isFetching ? "Loading partners" : "No partners found"} description="Search by name, phone or location." />} />
    </Form.Item>}
    <Form.Item name="sim_type" label="SIM type" rules={[{ required: true }]}><Select options={["pos", "cctv", "gps", "router"].map((value) => ({ value, label: value.toUpperCase() }))} /></Form.Item>
    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }, { type: "integer", min: 1 }]}><InputNumber min={1} precision={0} className="w-full" /></Form.Item>
  </ScActionModal>;
}
