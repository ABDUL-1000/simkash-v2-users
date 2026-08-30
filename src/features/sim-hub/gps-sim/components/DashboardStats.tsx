import { SimStatCard, SimStatsGrid } from "@/components/common/SimsStatCard";
import {
  Smartphone,
  CheckCircle2,
  Clock,
  TriangleAlert,
  ArrowUp,
} from "lucide-react";
export function GpsSimDashboardStats() {
  return (
    <SimStatsGrid>
      <SimStatCard
        title="Total GPS SIMs"
        value="72,104"
        icon={<Smartphone />}
        iconBackgroundColor="#E8EEFC"
        iconColor="#2563EB"
        label="this week"
        labelIcon={<ArrowUp className="size-4" />}
        labelColor="#059669"
        description="All networks combined"
      />
      <SimStatCard
        title="Activated"
        value="38,210"
        icon={<CheckCircle2 />}
        iconBackgroundColor="#D1FAE5"
        iconColor="#059669"
        label="93.4%"
        labelColor="#0F172A"
        description="Live with customers"
      />
      <SimStatCard
        title="In Stock"
        value="18,940"
        icon={<Clock />}
        iconBackgroundColor="#FEF3C7"
        iconColor="#D97706"
        label="Ready"
        labelColor="#64748B"
        description="Available to distribute"
      />
      <SimStatCard
        title="Expiring ≤30 Days"
        value="1,102"
        icon={<TriangleAlert />}
        iconBackgroundColor="#FEE2E2"
        iconColor="#DC2626"
        label="Urgent"
        labelColor="#B91C1C"
        action={{
          label: "View Renewal Monitoring",
          href: "/admin/renewal-monitoring",
        }}
      />
      <SimStatCard
        title="Expiring ≤30 Days"
        value="1,102"
        icon={<TriangleAlert />}
        iconBackgroundColor="#FEE2E2"
        iconColor="#DC2626"
        label="Urgent"
        labelColor="#B91C1C"
        action={{
          label: "View Renewal Monitoring",
          href: "/admin/renewal-monitoring",
        }}
      />
    </SimStatsGrid>
  );
}
