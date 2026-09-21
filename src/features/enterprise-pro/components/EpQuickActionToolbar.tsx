import { TrendingUp, RefreshCw, Landmark, Package, Percent, Users } from "lucide-react";
import { colors } from "@/constants/colors";

interface EpQuickActionToolbarProps {
  onMyInvestment: () => void;
  onReinvest: () => void;
  onPayBalance: () => void;
  onOrderSims: () => void;
  onSetPrices: () => void;
  onMyNetwork: () => void;
}

export function EpQuickActionToolbar({
  onMyInvestment,
  onReinvest,
  onPayBalance,
  onOrderSims,
  onSetPrices,
  onMyNetwork,
}: EpQuickActionToolbarProps) {
  const actions = [
    {
      label: "My Investment",
      icon: TrendingUp,
      onClick: onMyInvestment,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50/80",
    },
    {
      label: "Reinvest",
      icon: RefreshCw,
      onClick: onReinvest,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50/80",
    },
    {
      label: "Pay Balance",
      icon: Landmark,
      onClick: onPayBalance,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50/80",
    },
    {
      label: "Order SIMs",
      icon: Package,
      onClick: onOrderSims,
      iconColor: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      label: "Set Prices",
      icon: Percent,
      onClick: onSetPrices,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50/80",
    },
    {
      label: "My Network",
      icon: Users,
      onClick: onMyNetwork,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50/80",
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 rounded-2xl border bg-white p-3 shadow-2xs"
      style={{ borderColor: colors.border }}
    >
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.label}
            type="button"
            onClick={act.onClick}
            className="flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition hover:bg-slate-50 hover:shadow-2xs active:scale-98"
          >
            <div className={`flex size-11 items-center justify-center rounded-2xl ${act.bgColor} ${act.iconColor}`}>
              <Icon className="size-5" />
            </div>
            <span className="text-xs font-bold text-slate-800">{act.label}</span>
          </button>
        );
      })}
    </div>
  );
}
