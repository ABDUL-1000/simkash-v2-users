import { Pagination } from "antd";
import { Activity, Bell, Package, Smartphone, Trophy, UserPlus } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmRecentActivity } from "../../api/dashboard";
import { RmQueryState, RmSection, RmStatus } from "./RmDashboardPrimitives";

const icons: Record<string, typeof Activity> = { sim: Smartphone, activation: Smartphone, distribution: Package, box: Package, bonus: Trophy, trophy: Trophy, alert: Bell, onboarding: UserPlus };
export function RmRecentActivityFeed() {
  const pagination = useTablePagination();
  const query = useGetRmRecentActivity({ page: pagination.page, limit: pagination.pageSize });
  return <RmSection title="Recent network activity">
    <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
      {query.data?.activities.length ? <ul className="space-y-4">{query.data.activities.map((event) => {
        const Icon = icons[event.icon] ?? icons[event.type] ?? Activity;
        return <li key={event.id} className="flex gap-3 border-b pb-4" style={{ borderColor: colors.border }}>
          <Icon className="mt-1 size-5 shrink-0" style={{ color: colors.primary }} />
          <div className="min-w-0 flex-1"><p className="font-semibold">{event.title}</p><p className="text-sm" style={{ color: colors.textSecondary }}>{event.subtitle}</p><time className="text-xs" dateTime={event.created_at} title={new Date(event.created_at).toLocaleString()}>{event.time_ago}</time></div>
          <div><RmStatus value={event.badge_text} /></div>
        </li>;
      })}</ul> : <AppEmptyState title="No recent network activity" description="Regional events will appear here as they occur." />}
      <Pagination {...pagination.paginationConfig} total={query.data?.total} responsive />
    </RmQueryState>
  </RmSection>;
}
