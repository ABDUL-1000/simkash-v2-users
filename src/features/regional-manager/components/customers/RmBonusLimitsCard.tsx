import { Trophy, CheckCircle2, AlertTriangle, PackageX, MinusCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmBonusLimitsCardProps {
  onManageLimits: () => void;
}

export function RmBonusLimitsCard({ onManageLimits }: RmBonusLimitsCardProps) {
  const stats = [
    { label: "Achieved", count: 4, icon: Trophy, color: APP_COLORS.blues.interactiveCta },
    { label: "On Track", count: 4, icon: CheckCircle2, color: APP_COLORS.greens.green },
    { label: "At Risk", count: 3, icon: AlertTriangle, color: APP_COLORS.ambers.amber },
    { label: "None", count: 0, icon: MinusCircle, color: APP_COLORS.texts.slate },
    { label: "Low Inventory", count: 4, icon: PackageX, color: APP_COLORS.reds.red },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs"
      style={{
        borderColor: APP_COLORS.greys.stroke,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      <h3
        className="text-sm font-bold tracking-tight mb-3"
        style={{ color: APP_COLORS.texts.primary }}
      >
        Bonus Status & SIM Limits
      </h3>

      <div className="space-y-2.5 text-xs">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4" style={{ color: st.color }} />
                <span style={{ color: APP_COLORS.texts.slate }}>
                  {st.label}
                </span>
              </div>
              <span
                className="font-bold text-xs"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {st.count}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onManageLimits}
        className="mt-3.5 w-full rounded-xl border py-2 text-center text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
        style={{
          borderColor: APP_COLORS.greys.stroke,
          color: APP_COLORS.texts.primary,
          backgroundColor: APP_COLORS.backgrounds.surface,
        }}
      >
        Manage Bonus & SIM Limits
      </button>
    </div>
  );
}

export default RmBonusLimitsCard;
