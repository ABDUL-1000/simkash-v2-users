import { APP_COLORS } from "@/constants/colors";

interface CaPendingStatsStripProps {
  pendingCount?: number;
  successToday?: number;
  failedToday?: number;
  avgWait?: string;
}

export function CaPendingStatsStrip({
  pendingCount = 3,
  successToday = 8,
  failedToday = 2,
  avgWait = "4m",
}: CaPendingStatsStripProps) {
  const stats = [
    {
      id: "pending",
      value: pendingCount,
      label: "Pending Now",
      valueColor: APP_COLORS.ambers.amber,
    },
    {
      id: "success",
      value: successToday,
      label: "Success Today",
      valueColor: APP_COLORS.greens.green,
    },
    {
      id: "failed",
      value: failedToday,
      label: "Failed Today",
      valueColor: APP_COLORS.reds.red,
    },
    {
      id: "avg",
      value: avgWait,
      label: "Avg Wait",
      valueColor: APP_COLORS.texts.primary,
    },
  ];

  return (
    <div
      className="p-5 rounded-2xl border bg-white shadow-2xs grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {stats.map((item) => (
        <div key={item.id} className="p-3 text-center first:pt-0 last:pb-0 sm:py-0">
          <div
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: item.valueColor }}
          >
            {item.value}
          </div>
          <div
            className="text-xs font-bold mt-1"
            style={{ color: APP_COLORS.texts.slate }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
