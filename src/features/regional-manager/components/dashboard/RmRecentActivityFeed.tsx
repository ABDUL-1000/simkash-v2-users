import { Pagination } from "antd";
import { Activity, AlertTriangle, CheckCircle2, Package, Smartphone, Trophy, UserPlus } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmRecentActivity } from "../../api/dashboard";
import { RmQueryState } from "./RmDashboardPrimitives";
import { RmPanel } from "./RmDesign";

const icons: Record<string, typeof Activity> = {
  sim: Smartphone, activation: Smartphone, check: CheckCircle2, batch_activation: CheckCircle2,
  box: Package, distribution: Package, trophy: Trophy, bonus: Trophy,
  alert: AlertTriangle, user: UserPlus, onboard: UserPlus, onboarding: UserPlus,
};
// badge_color from the API mapped onto design tokens.
const badgeTones: Record<string, { color: string; bg: string }> = {
  green: { color: colors.success, bg: colors.greens.light },
  teal: { color: "#0D9488", bg: "#E6FFFA" },
  blue: { color: colors.primary, bg: colors.blues.surfaceLight },
  yellow: { color: colors.ambers.secondary, bg: "#FEF6E0" },
  red: { color: colors.danger, bg: colors.reds.light },
};

export function RmRecentActivityFeed() {
  const pagination = useTablePagination();
  const query = useGetRmRecentActivity({ page: pagination.page, limit: pagination.pageSize });
  const activities = query.data?.items ?? [];
  return (
    <RmPanel title="Recent Network Activity" description={query.data && query.data.total > 0 ? `${query.data.total} events` : undefined}>
      <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
        {activities.length ? (
          <ul>
            {activities.map((event) => {
              const Icon = icons[event.icon] ?? icons[event.type] ?? Activity;
              const tone = badgeTones[event.badge_color] ?? badgeTones.blue;
              return (
                <li key={event.id} className="flex items-center gap-3 border-b py-3.5 last:border-0" style={{ borderColor: colors.border }}>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full" style={{ color: tone.color, background: tone.bg }}><Icon size={17} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="truncate text-xs" style={{ color: colors.textSecondary }}>{event.subtitle}</p>
                    <time className="text-[11px]" style={{ color: colors.texts.muted }} dateTime={event.created_at} title={new Date(event.created_at).toLocaleString()}>{event.time_ago}</time>
                  </div>
                  <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ color: tone.color, background: tone.bg }}>{event.badge_text}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <AppEmptyState title="No recent network activity" description="Regional events will appear here as they occur." />
        )}
        {(query.data?.total ?? 0) > pagination.pageSize && <Pagination className="mt-3" align="center" {...pagination.paginationConfig} total={query.data?.total} responsive />}
      </RmQueryState>
    </RmPanel>
  );
}
