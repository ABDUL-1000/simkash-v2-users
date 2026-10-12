import { Smartphone, Users, Package, Send, Wallet, PlusSquare } from "lucide-react";
import { APP_COLORS, CA_DASHBOARD_COLORS } from "@/constants/colors";

interface CaQuickActionsRowProps {
  canPayout: boolean;
  onActivateSim?: () => void;
  onViewAps?: () => void;
  onViewStock?: () => void;
  onDistributeStock: () => void;
  onRequestPayout: () => void;
  onRequestStock: () => void;
}

export function CaQuickActionsRow({
  canPayout,
  onActivateSim,
  onViewAps,
  onViewStock,
  onDistributeStock,
  onRequestPayout,
  onRequestStock,
}: CaQuickActionsRowProps) {
  const actions = [
    {
      id: "activate",
      label: "Activate SIM",
      icon: Smartphone,
      bg: APP_COLORS.blues.surfaceLight,
      color: APP_COLORS.blues.interactiveCta,
      onClick: onActivateSim,
    },
    {
      id: "aps",
      label: "My APs",
      icon: Users,
      bg: APP_COLORS.greens.light,
      color: APP_COLORS.greens.green,
      onClick: onViewAps,
    },
    {
      id: "stock",
      label: "My Stock",
      icon: Package,
      bg: APP_COLORS.backgrounds.surface,
      color: CA_DASHBOARD_COLORS.stockText,
      onClick: onViewStock,
    },
    {
      id: "distribute",
      label: "Distribute",
      icon: Send,
      bg: CA_DASHBOARD_COLORS.distributeBg,
      color: CA_DASHBOARD_COLORS.distributeText,
      onClick: onDistributeStock,
    },
    {
      id: "payout",
      label: "Payout",
      icon: Wallet,
      bg: CA_DASHBOARD_COLORS.payoutBg,
      color: CA_DASHBOARD_COLORS.payoutText,
      onClick: onRequestPayout,
    },
    {
      id: "request",
      label: "Request Stock",
      icon: PlusSquare,
      bg: APP_COLORS.greens.light,
      color: APP_COLORS.greens.green,
      onClick: onRequestStock,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            type="button"
            onClick={act.onClick}
            disabled={!act.onClick || (act.id === "payout" && !canPayout)}
            className="p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 shadow-2xs transition-all hover:scale-[1.02] active:scale-[0.98] bg-white group"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6"
              style={{ backgroundColor: act.bg, color: act.color }}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800">{act.label}</span>
          </button>
        );
      })}
    </div>
  );
}
