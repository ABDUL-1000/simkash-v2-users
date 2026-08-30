import { ArrowRight } from "lucide-react";

export type AlertItem = {
  id: string;
  name: string;
  location: string;
  time: string;
  status: "OFFLINE" | "TAMPER" | "WARNING";
};

const ALERTS: AlertItem[] = [
  {
    id: "1",
    name: "CAM-003-KAN",
    location: "Kano, North Gate",
    time: "02:14",
    status: "OFFLINE",
  },
  {
    id: "2",
    name: "CAM-004-PHC",
    location: "Port Harcourt, Terminal",
    time: "06:52",
    status: "TAMPER",
  },
];

export function RecentAlertsCard({
  onAlertClick,
  onViewAllClick,
}: {
  onAlertClick?: (alert: AlertItem) => void;
  onViewAllClick?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
          Recent Alerts
        </h3>
        <button
          type="button"
          onClick={onViewAllClick}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="mt-4 space-y-3 divide-y divide-[#F1F5F9]">
        {ALERTS.map((alert, idx) => {
          const isOffline = alert.status === "OFFLINE";
          return (
            <div
              key={alert.id}
              onClick={() => onAlertClick?.(alert)}
              className={`flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F8FAFC] p-1.5 rounded-xl transition-colors ${
                idx > 0 ? "pt-3" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${
                    isOffline ? "bg-[#FEE2E2]" : "bg-[#FEF3C7]"
                  }`}
                >
                  <span
                    className={`size-3 rounded-full ${
                      isOffline ? "bg-[#EF4444]" : "bg-[#F59E0B]"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">{alert.name}</p>
                  <p className="text-xs text-[#64748B]">
                    {alert.location} · {alert.time}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${
                  isOffline
                    ? "bg-[#FFF1F2] text-[#EF4444]"
                    : "bg-[#FEF3C7] text-[#92400E]"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    isOffline ? "bg-[#EF4444]" : "bg-[#F59E0B]"
                  }`}
                />
                {alert.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
