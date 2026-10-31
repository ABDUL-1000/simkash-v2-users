import { Wallet, Send, Package, Percent, Users, UserPlus } from "lucide-react";
import { colors } from "@/constants/colors";

interface EpQuickActionToolbarProps {
  onWallet: () => void;
  onOrderStock: () => void;
  onDistribute: () => void;
  onSetPrices: () => void;
  onMyNetwork: () => void;
  onOnboard: () => void;
}

export function EpQuickActionToolbar({
  onWallet,
  onOrderStock,
  onDistribute,
  onSetPrices,
  onMyNetwork,
  onOnboard,
}: EpQuickActionToolbarProps) {
  const actions = [
    {
      label: "My Wallet",
      icon: Wallet,
      onClick: onWallet,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50/80",
    },
    {
      label: "Order Stock",
      icon: Package,
      onClick: onOrderStock,
      iconColor: "text-slate-700",
      bgColor: "bg-slate-100",
    },
    {
      label: "Distribute",
      icon: Send,
      onClick: onDistribute,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50/80",
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
    {
      label: "Onboard SC",
      icon: UserPlus,
      onClick: onOnboard,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50/80",
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
