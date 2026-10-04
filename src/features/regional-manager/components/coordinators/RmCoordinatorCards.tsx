import { Progress } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { RmMyScOverviewData } from "../../types/coordinators";
import { RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";
export type CoordinatorRow = RmMyScOverviewData["coordinators"][number];
export function RmCoordinatorCards({ rows, onView, onDistribute, onRemind, onSuspend }: {
  rows: CoordinatorRow[]; onView: (row: CoordinatorRow) => void; onDistribute: (row: CoordinatorRow) => void;
  onRemind: (row: CoordinatorRow) => void; onSuspend: (row: CoordinatorRow) => void;
}) {
  if (!rows.length) return <AppEmptyState title="No state coordinators" description="Onboard a coordinator or adjust your filters." />;
  return <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{rows.map(row => <RmSection key={row.id} title={row.name} description={`${row.phone} · ${row.state}`} actions={[
    { key: "view", label: "View profile", variant: "outline", onClick: () => onView(row) },
    { key: "stock", label: "Distribute", onClick: () => onDistribute(row) },
    { key: "remind", label: "Remind", variant: "outline", onClick: () => onRemind(row) },
    { key: "suspend", label: row.status.toLowerCase() === "suspended" ? "Re-activate" : "Suspend", variant: row.status.toLowerCase() === "suspended" ? "outline" : "destructive", onClick: () => onSuspend(row) },
  ]}>
    <RmStatus value={row.status} />
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" style={{ color: colors.textSecondary }}><p>{row.sub_stats.aps_label}</p><p>{row.sub_stats.stock_label}</p><p>{row.sub_stats.activations_label}</p><p>Bonus: {row.sub_stats.bonus_status}</p></div>
    <p>{row.target_progress.text}</p><Progress percent={row.target_progress.percentage} strokeColor={colors.primary} />
  </RmSection>)}</div>;
}
