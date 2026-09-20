import { Users, ShieldCheck, AlertTriangle, ShieldBan } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmCustomersKpiStripProps {
  totalScs?: number;
  activeScs?: number;
  atRiskScs?: number;
  suspendedScs?: number;
  agencyPartners?: number;
}

export function RmCustomersKpiStrip({
  totalScs = 12,
  activeScs = 10,
  atRiskScs = 2,
  suspendedScs = 1,
  agencyPartners = 247,
}: RmCustomersKpiStripProps) {
  const cards = [
    {
      label: "State Coordinators",
      value: totalScs,
      subtitle: "All active in South-West",
      icon: Users,
      iconColor: APP_COLORS.blues.primary,
      iconBg: APP_COLORS.blues.surfaceLight,
    },
    {
      label: "Active SCs",
      value: activeScs,
      subtitle: "Operating normally",
      icon: ShieldCheck,
      iconColor: APP_COLORS.greens.green,
      iconBg: APP_COLORS.greens.light,
    },
    {
      label: "At Risk",
      value: atRiskScs,
      subtitle: "Below activation target",
      icon: AlertTriangle,
      iconColor: APP_COLORS.ambers.amber,
      iconBg: APP_COLORS.ambers.light,
    },
    {
      label: "Suspended",
      value: suspendedScs,
      subtitle: "Action required",
      icon: ShieldBan,
      iconColor: APP_COLORS.reds.red,
      iconBg: APP_COLORS.reds.light,
    },
    {
      label: "Agency Partners",
      value: agencyPartners,
      subtitle: "Across all 12 SC networks",
      icon: Users,
      iconColor: APP_COLORS.blues.interactiveCta,
      iconBg: APP_COLORS.blues.surfaceLight,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`rounded-2xl border p-4 shadow-xs transition hover:shadow-sm ${
              idx === 4 ? "col-span-2 sm:col-span-1" : ""
            }`}
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            {/* Icon */}
            <div
              className="flex size-9 items-center justify-center rounded-xl mb-3"
              style={{
                backgroundColor: card.iconBg,
                color: card.iconColor,
              }}
            >
              <Icon className="size-4.5" />
            </div>

            {/* Value */}
            <h3
              className="text-2xl font-black tracking-tight"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {card.value}
            </h3>

            {/* Label */}
            <p
              className="text-xs font-bold mt-0.5"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {card.label}
            </p>

            {/* Subtitle */}
            <p
              className="text-[11px] mt-0.5 truncate"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default RmCustomersKpiStrip;
