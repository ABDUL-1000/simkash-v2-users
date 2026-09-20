import { Smartphone, Users, Package, Send, Wallet, PlusSquare } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaQuickActionsRowProps {
  onActivateSim?: () => void;
  onViewAps?: () => void;
  onViewStock?: () => void;
  onDistributeStock: () => void;
  onRequestPayout: () => void;
  onRequestStock: () => void;
}

export function CaQuickActionsRow({
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
      bg: "#EFF4F8",
      color: "#2563EB",
      onClick: onActivateSim,
    },
    {
      id: "aps",
      label: "My APs",
      icon: Users,
      bg: "#EBFFF8",
      color: "#10B981",
      onClick: onViewAps,
    },
    {
      id: "stock",
      label: "My Stock",
      icon: Package,
      bg: "#F8FAFC",
      color: "#334155",
      onClick: onViewStock,
    },
    {
      id: "distribute",
      label: "Distribute",
      icon: Send,
      bg: "#F3E8FF",
      color: "#8B5CF6",
      onClick: onDistributeStock,
    },
    {
      id: "payout",
      label: "Payout",
      icon: Wallet,
      bg: "#FFFBEB",
      color: "#D97706",
      onClick: onRequestPayout,
    },
    {
      id: "request",
      label: "Request Stock",
      icon: PlusSquare,
      bg: "#EBFFF8",
      color: "#10B981",
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
