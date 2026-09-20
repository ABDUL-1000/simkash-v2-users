import { APP_COLORS } from "@/constants/colors";
import { Smartphone, Wallet, Calendar, Percent, Target } from "lucide-react";

interface CaHistoryTopKpisProps {
  allTimeCount?: number;
  allTimeCommission?: number;
  thisMonthCount?: number;
  thisMonthCommission?: number;
  successRate?: number;
  successCount?: number;
  ownContribution?: number;
  targetTotal?: number;
}

export function CaHistoryTopKpis({
  allTimeCount = 2847,
  allTimeCommission = 1708200,
  thisMonthCount = 312,
  thisMonthCommission = 187200,
  successRate = 97.8,
  successCount = 2784,
  ownContribution = 312,
  targetTotal = 3000,
}: CaHistoryTopKpisProps) {
  const cards = [
    {
      id: "all-time",
      icon: Smartphone,
      iconBg: APP_COLORS.blues.surfaceLight,
      iconColor: APP_COLORS.blues.interactiveCta,
      value: allTimeCount.toLocaleString(),
      label: "All Time",
      subtitle: "My own activations",
      subtitleColor: APP_COLORS.texts.slate,
    },
    {
      id: "commission",
      icon: Wallet,
      iconBg: APP_COLORS.greens.light,
      iconColor: APP_COLORS.greens.green,
      value: `₦${allTimeCommission.toLocaleString()}`,
      label: "All Time",
      subtitle: `${allTimeCount.toLocaleString()} × ₦600`,
      subtitleColor: APP_COLORS.texts.slate,
    },
    {
      id: "month",
      icon: Calendar,
      iconBg: APP_COLORS.blues.surfaceLight,
      iconColor: APP_COLORS.blues.interactiveCta,
      value: thisMonthCount.toLocaleString(),
      label: "This Month",
      subtitle: `+₦${thisMonthCommission.toLocaleString()}`,
      subtitleColor: APP_COLORS.greens.green,
    },
    {
      id: "success",
      icon: Percent,
      iconBg: APP_COLORS.greens.light,
      iconColor: APP_COLORS.greens.green,
      value: `${successRate}%`,
      label: "Success Rate",
      subtitle: `${successCount.toLocaleString()} of ${allTimeCount.toLocaleString()}`,
      subtitleColor: APP_COLORS.texts.slate,
    },
    {
      id: "target",
      icon: Target,
      iconBg: APP_COLORS.blues.surfaceLight,
      iconColor: APP_COLORS.blues.interactiveCta,
      value: ownContribution.toLocaleString(),
      label: "Own Contribution",
      subtitle: `Toward ${targetTotal.toLocaleString()} target`,
      subtitleColor: APP_COLORS.texts.slate,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-4 rounded-2xl border bg-white shadow-2xs transition-all"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            {/* Top Icon */}
            <div
              className="size-9 rounded-xl flex items-center justify-center mb-2.5"
              style={{ backgroundColor: card.iconBg, color: card.iconColor }}
            >
              <Icon className="size-4" />
            </div>

            {/* Value */}
            <div
              className="text-xl sm:text-2xl font-black tracking-tight"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {card.value}
            </div>

            {/* Label */}
            <div
              className="text-[11px] font-bold mt-0.5"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {card.label}
            </div>

            {/* Subtitle */}
            <div
              className="text-[10px] font-semibold mt-0.5 truncate"
              style={{ color: card.subtitleColor }}
            >
              {card.subtitle}
            </div>
          </div>
        );
      })}
    </div>
  );
}
