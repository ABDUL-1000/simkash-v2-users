import { TrendingUp, AlertTriangle, PackageX } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmPerformanceInsightsCards() {
  const cards = [
    {
      title: "TOP PERFORMER",
      icon: TrendingUp,
      iconColor: APP_COLORS.greens.green,
      text: "Aminat Okafor is your highest performing SC this month with 1,847 activations — 53% above the network average.",
    },
    {
      title: "NEEDS ATTENTION",
      icon: AlertTriangle,
      iconColor: APP_COLORS.ambers.amber,
      text: "3 SCs (Ibrahim, Glory, Abubakar) are at risk of missing their bonus target with 15 days remaining. Send reminders to motivate their APs.",
    },
    {
      title: "STOCK ALERT",
      icon: PackageX,
      iconColor: APP_COLORS.reds.red,
      text: "4 SCs have low or critical stock. Glory (3 SIMs) and Ngozi (0 SIMs) need urgent distribution to avoid activation downtime.",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((c, idx) => {
        const Icon = c.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border p-4 shadow-xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className="size-4 shrink-0" style={{ color: c.iconColor }} />
              <h4
                className="text-xs font-black tracking-wider uppercase"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {c.title}
              </h4>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {c.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default RmPerformanceInsightsCards;
