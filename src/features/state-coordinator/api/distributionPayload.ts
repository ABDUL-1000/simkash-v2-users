import type { DistributionPayload } from "../types/operations";

export function distributionPayload(values: DistributionPayload, source: "inventory" | "agents"): DistributionPayload {
  const payload: DistributionPayload = {
    sim_type: values.sim_type,
    quantity: values.quantity,
    distribute_to_all_low: Boolean(values.distribute_to_all_low),
  };
  if (!values.distribute_to_all_low) {
    if (source === "inventory") payload.partner_id = values.partner_id;
    else payload.partner_ids = values.partner_ids;
  }
  return payload;
}
