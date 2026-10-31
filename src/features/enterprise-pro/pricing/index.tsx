import { SimPricingPage } from "@/features/sim-pricing/SimPricingPage";

export function EnterpriseProPricingPage() {
  return <SimPricingPage apiPath="/enterprise/sim-prices" title="Commission & Pricing" description="Set your selling price and partner commission for each SIM type" />;
}
