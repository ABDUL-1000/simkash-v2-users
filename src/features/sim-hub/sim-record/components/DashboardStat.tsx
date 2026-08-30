import { SimStatCard, SimStatsGrid } from "@/components/common/SimsStatCard";
import { ArrowUp, Smartphone } from "lucide-react";

export function DashboardStats() {
  return (
    <SimStatsGrid>
      <SimStatCard
        title="Total SIM Records"
        value="4,450"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="this week"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="All Types - All networks"
      />
      <SimStatCard
        title="MTN Records"
        value="52,840"
        network="mtn"
        networkLabel="MTN"
        label="93.4%"
        labelColor="#047857"
        description="44% of total stock"
      />
      <SimStatCard
        title="Airtel Records"
        value="22,610"
        network="airtel"
        networkLabel="Airtel"
        label="Ready"
        labelColor="#64748B"
        description="44% of total stock"
      />
      <SimStatCard
        title="GLO Records"
        value="1,255"
        network="glo"
        networkLabel="Glo"
        label="Urgent"
        labelColor="#B91C1C"
        valueColor="#F59E0B"
        description="44% of total stock"
      />
      <SimStatCard
        title="T2 Records"
        value="10,397"
        network="t2"
        networkLabel="T2"
        label="Ready"
        labelColor="#64748B"
        description="7% of total stock"
      />
    </SimStatsGrid>
  );
}
