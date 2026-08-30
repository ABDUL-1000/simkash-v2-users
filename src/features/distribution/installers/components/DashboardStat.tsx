import { SimStatCard, SimStatsGrid } from "@/components/common/SimsStatCard";
import { ArrowUp, Smartphone } from "lucide-react";

export function DashboardStats() {
  return (
    <SimStatsGrid cols={4}>
      <SimStatCard
        title="Total Installers"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="127 this month"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="Registered on platform"
      />
      <SimStatCard
        title="Jobs Completed This Month"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label=""
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="↑ 18% vs last month"
      />
      <SimStatCard
        title="Avg Rating"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label=" 1,204 today"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="Based on 2,847 reviews"
      />
      <SimStatCard
        title="Commission Paid"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="₦4.2M this month"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="This month total"
      />

    </SimStatsGrid>
  );
}
