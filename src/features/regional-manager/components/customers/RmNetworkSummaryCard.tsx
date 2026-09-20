import { Users, TrendingUp } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmNetworkSummaryCard() {
  const items = [
    { label: "Total SCs", value: "12", isHeader: true },
    { label: "Active", value: "10", dotColor: APP_COLORS.greens.green },
    { label: "At Risk", value: "2", dotColor: APP_COLORS.ambers.amber },
    { label: "Suspended", value: "1", dotColor: APP_COLORS.reds.red },
    { label: "Total APs", value: "247", icon: Users, iconColor: APP_COLORS.blues.interactiveCta },
    { label: "Total Activations", value: "8,427", icon: TrendingUp, iconColor: APP_COLORS.greens.green, isBold: true },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs"
      style={{
        borderColor: APP_COLORS.greys.stroke,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      <h3
        className="text-sm font-bold tracking-tight mb-3"
        style={{ color: APP_COLORS.texts.primary }}
      >
        Network Summary
      </h3>

      <div className="space-y-2.5 text-xs">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center justify-between ${
                item.isHeader ? "pb-2 border-b font-bold" : ""
              }`}
              style={item.isHeader ? { borderColor: APP_COLORS.greys.stroke } : {}}
            >
              <div className="flex items-center gap-2">
                {item.dotColor && (
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: item.dotColor }}
                  />
                )}
                {Icon && (
                  <Icon className="size-3.5" style={{ color: item.iconColor }} />
                )}
                <span
                  style={{
                    color: item.isHeader
                      ? APP_COLORS.texts.primary
                      : APP_COLORS.texts.slate,
                  }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className={`font-bold ${item.isBold ? "text-sm text-green-600" : ""}`}
                style={{
                  color: item.isBold
                    ? APP_COLORS.greens.green
                    : APP_COLORS.texts.primary,
                }}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RmNetworkSummaryCard;
