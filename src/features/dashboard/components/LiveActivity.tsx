import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardActivities } from "../dashboard.data";

export function LiveActivity() {
  return (
    <Card className="flex h-full flex-col rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-3 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">Live Activity</CardTitle>
        <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
          View all
        </button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-5 pb-5 sm:px-6">
        {dashboardActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <article
              key={activity.key}
              className="flex flex-1 items-start gap-3 border-b border-[#E2ECF8] py-4 last:border-b-0"
            >
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl"
                style={{ backgroundColor: activity.iconBackgroundColor, color: activity.iconColor }}
              >
                <Icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-5 text-[#0F1F36]">
                  <strong className="font-bold">{activity.title}</strong>{" "}
                  {activity.detail}
                </p>
                <p className="mt-2 text-[11px] text-[#94A3B8]">{activity.timestamp}</p>
              </div>
              {activity.badge && (
                <span
                  className="shrink-0 text-xs font-bold"
                  style={{ color: activity.badgeColor }}
                >
                  {activity.badge}
                </span>
              )}
              <span className="sr-only">Activity {index + 1}</span>
            </article>
          );
        })}
      </CardContent>
    </Card>
  );
}
