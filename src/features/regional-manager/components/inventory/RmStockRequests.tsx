import { MySimRequestsList } from "@/features/hierarchy-sims/components/MySimRequestsList";

/** Requests to Super Admin. The old `/sim-inventory/requests` list changed shape, so this uses the SIM requests API. */
export function RmStockRequests() {
  return <MySimRequestsList />;
}
