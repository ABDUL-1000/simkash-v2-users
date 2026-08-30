import { StatCard, StatsGrid } from "@/components/common/StatCard";
import { dashboardStats } from "../dashboard.data";
export function DashboardStats() {
  return (
    <StatsGrid>
      {dashboardStats.map(({ key, icon: Icon, ...stat }) => (
        <StatCard key={key} {...stat} icon={<Icon className="size-4" />} />
      ))}
    </StatsGrid>
  );
}
