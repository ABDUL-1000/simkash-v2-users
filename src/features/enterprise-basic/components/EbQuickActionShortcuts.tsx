import React from "react";
import { Smartphone, Users, Package, Video, Sun, Wallet } from "lucide-react";
import { colors } from "@/constants/colors";

interface EbQuickActionShortcutsProps {
  onAssignSim: () => void;
  onMyCustomers: () => void;
  onOrderStock: () => void;
  onSellCctv: () => void;
  onSellSolar: () => void;
  onPayout: () => void;
}

export const EbQuickActionShortcuts: React.FC<EbQuickActionShortcutsProps> = ({
  onAssignSim,
  onMyCustomers,
  onOrderStock,
  onSellCctv,
  onSellSolar,
  onPayout,
}) => {
  const actions = [
    { label: "Assign SIM", icon: Smartphone, onClick: onAssignSim },
    { label: "My Customers", icon: Users, onClick: onMyCustomers },
    { label: "Order Stock", icon: Package, onClick: onOrderStock },
    { label: "Sell CCTV", icon: Video, onClick: onSellCctv },
    { label: "Sell Solar", icon: Sun, onClick: onSellSolar },
    { label: "Payout", icon: Wallet, onClick: onPayout },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.label}
            type="button"
            onClick={act.onClick}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:bg-blue-50/20 transition group text-center"
            style={{ borderColor: colors.border }}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-xs">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-2.5 group-hover:text-blue-600 transition">
              {act.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
