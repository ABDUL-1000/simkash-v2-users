import { KpiStrip } from "@/components/common/KpiStrip";
import { DASHBOARD_COLORS } from "@/constants/colors";
import { dashboardKpis } from "../dashboard.data";

export function DashboardKpi() {
  return (
    <KpiStrip
      items={dashboardKpis}
      ariaLabel="Dashboard performance summary"
      backgroundColor={DASHBOARD_COLORS.kpiStripBackground}
      className="rounded-none"
    />
  );
}
