import type { RmDistributePayload } from "../types/dashboard";

export function rmDistributionPayload(values: RmDistributePayload): RmDistributePayload {
  const result: RmDistributePayload = { quantity: values.quantity, sim_type: values.sim_type, distribute_to_all_low: Boolean(values.distribute_to_all_low) };
  if (!values.distribute_to_all_low) {
    if (values.coordinator_ids?.length === 1) result.coordinator_id = values.coordinator_ids[0];
    else if (values.coordinator_ids?.length) result.coordinator_ids = values.coordinator_ids;
    else result.coordinator_id = values.coordinator_id;
  }
  return result;
}
