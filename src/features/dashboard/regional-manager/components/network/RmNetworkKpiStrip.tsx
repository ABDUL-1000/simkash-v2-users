import {
  Smartphone,
  TrendingUp,
  Users,
  UserCheck,
  XCircle,
  Zap,
  Wallet,
  Store,
  Layers,
  AlertCircle,
} from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { ScNetworkBreakdownItem } from "../../types/regional-manager-network.types";

interface RmNetworkKpiStripProps {
  selectedSc?: ScNetworkBreakdownItem | null;
  onClearSelectedSc?: () => void;
}

export function RmNetworkKpiStrip({
  selectedSc,
  onClearSelectedSc,
}: RmNetworkKpiStripProps) {
  // If an SC is selected for drilldown (Image 3)
  if (selectedSc) {
    const scKpis = [
      {
        id: "sc-acts",
        title: "Activations Today",
        value: selectedSc.activationsToday.toString(),
        subtitle: `${selectedSc.name} · ${selectedSc.state}`,
        subtitleColor: APP_COLORS.blues.interactiveCta,
        isLink: true,
        icon: Zap,
        iconBg: APP_COLORS.blues.surfaceLight,
        iconColor: APP_COLORS.blues.interactiveCta,
      },
      {
        id: "sc-comm",
        title: "Commission",
        value: selectedSc.commissionToday,
        subtitle: "Today",
        subtitleColor: APP_COLORS.greens.secondary,
        icon: Wallet,
        iconBg: APP_COLORS.greens.light,
        iconColor: APP_COLORS.greens.green,
      },
      {
        id: "sc-aps",
        title: "APs Active",
        value: `${selectedSc.apsActiveCount} of ${selectedSc.totalApsCount}`,
        subtitle: `${selectedSc.totalApsCount - selectedSc.apsActiveCount} APs inactive`,
        subtitleColor: APP_COLORS.texts.slate,
        icon: Store,
        iconBg: APP_COLORS.blues.surfaceLight,
        iconColor: APP_COLORS.blues.primary,
      },
      {
        id: "sc-types",
        title: "SIM Types",
        value: "3 Types",
        subtitle: "POS · CCTV · GPS",
        subtitleColor: APP_COLORS.ambers.secondary,
        icon: Layers,
        iconBg: APP_COLORS.ambers.light,
        iconColor: APP_COLORS.ambers.secondary,
      },
      {
        id: "sc-failed",
        title: "Failed",
        value: "1",
        subtitle: "Chukwuma Traders",
        subtitleColor: APP_COLORS.reds.red,
        icon: AlertCircle,
        iconBg: APP_COLORS.reds.light,
        iconColor: APP_COLORS.reds.red,
      },
    ];

    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {scKpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.id}
              className="rounded-2xl border p-4 shadow-xs transition hover:shadow-sm"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex size-9 items-center justify-center rounded-xl"
                  style={{ backgroundColor: kpi.iconBg }}
                >
                  <Icon className="size-4" style={{ color: kpi.iconColor }} />
                </div>
              </div>

              <div className="mt-3">
                <span
                  className="text-2xl font-black tracking-tight block"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  {kpi.value}
                </span>
                <span
                  className="text-[11px] font-bold block mt-0.5"
                  style={{ color: APP_COLORS.texts.slate }}
                >
                  {kpi.title}
                </span>
                <span
                  onClick={kpi.isLink ? onClearSelectedSc : undefined}
                  className={`text-[11px] font-semibold block mt-1 ${
                    kpi.isLink ? "cursor-pointer hover:underline" : ""
                  }`}
                  style={{ color: kpi.subtitleColor }}
                >
                  {kpi.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Global Region KPIs (Images 1 & 2)
  const globalKpis = [
    {
      id: "acts-today",
      title: "Activations Today",
      value: "84",
      subtitle: "+₦84,000",
      subtitleColor: APP_COLORS.greens.secondary,
      icon: Smartphone,
      iconBg: APP_COLORS.blues.surfaceLight,
      iconColor: APP_COLORS.blues.interactiveCta,
    },
    {
      id: "acts-month",
      title: "This Month",
      value: "14,847",
      subtitle: "+₦284,000 commission",
      subtitleColor: APP_COLORS.greens.secondary,
      icon: TrendingUp,
      iconBg: APP_COLORS.greens.light,
      iconColor: APP_COLORS.greens.green,
    },
    {
      id: "scs-active",
      title: "SCs Active Today",
      value: "10 of 12",
      subtitle: "2 SCs no activity",
      subtitleColor: APP_COLORS.texts.slate,
      icon: Users,
      iconBg: APP_COLORS.blues.surfaceLight,
      iconColor: APP_COLORS.blues.primary,
    },
    {
      id: "aps-active",
      title: "APs Active Today",
      value: "187 of 247",
      subtitle: "60 APs no activity",
      subtitleColor: APP_COLORS.texts.slate,
      icon: UserCheck,
      iconBg: APP_COLORS.ambers.light,
      iconColor: APP_COLORS.ambers.secondary,
    },
    {
      id: "failed-acts",
      title: "Failed Activations",
      value: "3",
      subtitle: "Across 2 APs",
      subtitleColor: APP_COLORS.texts.slate,
      icon: XCircle,
      iconBg: APP_COLORS.reds.light,
      iconColor: APP_COLORS.reds.red,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {globalKpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className="rounded-2xl border p-4 shadow-xs transition hover:shadow-sm"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <div className="flex items-center justify-between">
              <div
                className="flex size-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: kpi.iconBg }}
              >
                <Icon className="size-4" style={{ color: kpi.iconColor }} />
              </div>
            </div>

            <div className="mt-3">
              <span
                className="text-2xl font-black tracking-tight block"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {kpi.value}
              </span>
              <span
                className="text-[11px] font-bold block mt-0.5"
                style={{ color: APP_COLORS.texts.slate }}
              >
                {kpi.title}
              </span>
              <span
                className="text-[11px] font-semibold block mt-1"
                style={{ color: kpi.subtitleColor }}
              >
                {kpi.subtitle}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RmNetworkKpiStrip;
