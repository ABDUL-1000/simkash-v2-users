import { SimStatCard, SimStatsGrid } from "@/components/common/SimsStatCard";
import { ArrowUp, Smartphone } from "lucide-react";

export function DashboardStats() {
  return (
    <SimStatsGrid cols={4}>
      <SimStatCard
        title="Total Partners"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="127 this month"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />
      <SimStatCard
        title="Upgrade Eligible"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label=""
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="Partners near 100% target"
      />
      <SimStatCard
        title="Activations This Month"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label=" 1,204 today"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />
      <SimStatCard
        title="Total Commission"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="₦4.2M this month"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />

    </SimStatsGrid>
  );
}
