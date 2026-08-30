import { SimStatCard, SimStatsGrid } from "@/components/common/SimsStatCard";
import { ArrowUp, Smartphone } from "lucide-react";

export function DashboardStats() {
  return (
    <SimStatsGrid cols={4}>
      <SimStatCard
        title="CCTV Devices"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="12%"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />
      <SimStatCard
        title="GPS Devices"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="12%"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />
      <SimStatCard
        title="Router Devices"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="12%"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />
      <SimStatCard
        title="Solar"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="12%"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="4,891 online · 951 offline"
      />

    </SimStatsGrid>
  );
}
