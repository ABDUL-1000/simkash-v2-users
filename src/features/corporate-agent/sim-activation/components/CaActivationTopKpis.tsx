import { APP_COLORS } from "@/constants/colors";
import { Smartphone, TrendingUp, Package, Trophy } from "lucide-react";
import type { CaActivationTopKpiData } from "../types/ca-sim-activation.types";

interface CaActivationTopKpisProps {
  data: CaActivationTopKpiData;
  isLowStockState?: boolean;
}

export function CaActivationTopKpis({
  data,
  isLowStockState = false,
}: CaActivationTopKpisProps) {
  const simsCount = isLowStockState ? 40 : data.simsInStock;
  const simsSubtitle = isLowStockState
    ? "Low — request more stock"
    : data.simsInStockLabel;

  const kpiCards = [
    {
      id: "today",
      icon: Smartphone,
      iconBg: APP_COLORS.blues.surfaceLight,
      iconColor: APP_COLORS.blues.interactiveCta,
      value: String(data.activationsToday),
      label: "Activations Today",
      subtitle: `+₦${data.activationsTodayCommission.toLocaleString()} commission`,
      subtitleColor: APP_COLORS.greens.green,
    },
    {
      id: "month",
      icon: TrendingUp,
      iconBg: APP_COLORS.greens.light,
      iconColor: APP_COLORS.greens.green,
      value: String(data.thisMonthCount),
      label: "This Month",
      subtitle: `+₦${data.thisMonthCommission.toLocaleString()} commission`,
      subtitleColor: APP_COLORS.greens.green,
    },
    {
      id: "stock",
      icon: Package,
      iconBg: isLowStockState ? APP_COLORS.ambers.light : APP_COLORS.backgrounds.surface,
      iconColor: isLowStockState ? APP_COLORS.ambers.secondary : APP_COLORS.texts.slate,
      value: String(simsCount),
      label: "SIMs in Stock",
      subtitle: simsSubtitle,
      subtitleColor: isLowStockState ? APP_COLORS.ambers.secondary : APP_COLORS.texts.slate,
    },
    {
      id: "target",
      icon: Trophy,
      iconBg: "#FEF9C3",
      iconColor: "#CA8A04",
      value: `${data.combinedTargetCurrent.toLocaleString()}/${data.combinedTargetTotal.toLocaleString()}`,
      label: "Combined Target",
      subtitle: `${data.combinedTargetPercentage}% · Own ${data.ownActivationsCount} + APs ${data.apNetworkActivationsCount.toLocaleString()}`,
      subtitleColor: APP_COLORS.texts.slate,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-4 sm:p-5 rounded-2xl border transition-all bg-white shadow-2xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            {/* Top Icon */}
            <div
              className="size-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: card.iconBg, color: card.iconColor }}
            >
              <Icon className="size-5" />
            </div>

            {/* Value */}
            <div
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {card.value}
            </div>

            {/* Label */}
            <div
              className="text-xs font-bold mt-1"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {card.label}
            </div>

            {/* Subtitle */}
            <div
              className="text-[11px] font-bold mt-1 truncate"
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
