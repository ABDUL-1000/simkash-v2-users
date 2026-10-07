import { Pagination } from "antd";
import {
  Activity,
  Bell,
  Package,
  Smartphone,
  Trophy,
  UserPlus,
} from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmRecentActivity } from "../../api/dashboard";
import { RmQueryState } from "./RmDashboardPrimitives";
import { RmPanel } from "./RmDesign";

const icons: Record<string, typeof Activity> = {
  sim: Smartphone,
  activation: Smartphone,
  distribution: Package,
  box: Package,
  bonus: Trophy,
  trophy: Trophy,
  alert: Bell,
  onboarding: UserPlus,
};
export function RmRecentActivityFeed() {
  const pagination = useTablePagination();
  const query = useGetRmRecentActivity({
    page: pagination.page,
    limit: pagination.pageSize,
  });
  const activities = query.data?.activities ?? [];
  return (
    <RmPanel title="Recent Network Activity">
      <RmQueryState
        loading={query.isLoading}
        error={query.error}
        retry={() => void query.refetch()}
      >
        {activities.length ? (
          <ul className="space-y-4">
            {activities.map((event) => {
              const Icon = icons[event.icon] ?? icons[event.type] ?? Activity;
              const tone = /alert|risk/i.test(event.type) ? colors.danger : /bonus/i.test(event.type) ? colors.warning : /activat/i.test(event.type) ? colors.success : colors.blues.primary;
              return (
                <li
                  key={event.id}
                  className="flex gap-3 border-b pb-4"
                  style={{ borderColor: colors.border }}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ color: tone, background: /activat/i.test(event.type) ? colors.greens.light : colors.blues.surfaceLight }}><Icon size={17} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {event.subtitle}
                    </p>
                    <time
                      className="text-xs"
                      dateTime={event.created_at}
                      title={new Date(event.created_at).toLocaleString()}
                    >
                      {event.time_ago}
                    </time>
                  </div>
                  <div className="self-center text-right text-xs font-semibold" style={{ color: tone }}>
                    {event.badge_text}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <AppEmptyState
            title="No recent network activity"
            description="Regional events will appear here as they occur."
          />
        )}
        <Pagination
          {...pagination.paginationConfig}
          total={query.data?.total}
          responsive
        />
      </RmQueryState>
    </RmPanel>
  );
}
