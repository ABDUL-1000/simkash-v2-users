import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardAlerts } from "../dashboard.data";

export function AlertsCenter() {
  return (
    <Card className="flex h-full min-h-0 flex-col rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">
          Alerts Centre
        </CardTitle>
        <button
          type="button"
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View all
        </button>
      </CardHeader>

      <CardContent className="grid flex-1 gap-3 px-5 pb-5 sm:px-6 xl:grid-rows-5">
        {dashboardAlerts.map((alert) => (
          <article
            key={alert.key}
            className="flex min-h-24 items-start gap-3 rounded-xl border p-3.5"
            style={{
              backgroundColor: alert.backgroundColor,
              borderColor: alert.borderColor,
            }}
          >
            <span
              className="mt-1.5 size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: alert.indicatorColor }}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs leading-5 text-[#0F1F36]">
                <strong className="font-bold">{alert.title}</strong>{" "}
                {alert.detail}
              </p>
              <p className="mt-1 text-[11px] leading-4 text-[#94A3B8]">
                {alert.meta}
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 text-xs font-bold text-[#2563EB] hover:underline"
            >
              {alert.actionLabel}
            </button>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
