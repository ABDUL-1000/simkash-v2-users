import { AlertTriangle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmSpecialAlertsCardProps {
  onDistributeSc: (scName: string) => void;
  onContactSc: (scName: string) => void;
  onResolveSc: (scName: string) => void;
  onViewAllDetails: () => void;
}

export function RmSpecialAlertsCard({
  onDistributeSc,
  onContactSc,
  onResolveSc,
  onViewAllDetails,
}: RmSpecialAlertsCardProps) {
  const alerts = [
    {
      id: "alert-1",
      scName: "Ngozi Adeyemi",
      location: "Delta",
      issue: "Account Suspended",
      actionLabel: "Resolve >",
      tone: "danger",
      onAction: () => onResolveSc("Ngozi Adeyemi"),
    },
    {
      id: "alert-2",
      scName: "Chioma Eze",
      location: "Imo",
      issue: "33 SIMs remaining",
      actionLabel: "Distribute >",
      tone: "warning",
      onAction: () => onDistributeSc("Chioma Eze"),
    },
    {
      id: "alert-3",
      scName: "Abubakar Sani",
      location: "Kebbi",
      issue: "9 SIMs remaining",
      actionLabel: "Distribute >",
      tone: "danger",
      onAction: () => onDistributeSc("Abubakar Sani"),
    },
    {
      id: "alert-4",
      scName: "Ibrahim Musa",
      location: "Rivers",
      issue: "At Risk - 421 acts",
      actionLabel: "Contact >",
      tone: "warning",
      onAction: () => onContactSc("Ibrahim Musa"),
    },
    {
      id: "alert-5",
      scName: "Glory Effah",
      location: "Kano",
      issue: "3 SIMs remaining",
      actionLabel: "Distribute >",
      tone: "danger",
      onAction: () => onDistributeSc("Glory Effah"),
    },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs"
      style={{
        borderColor: APP_COLORS.ambers.amber,
        backgroundColor: "#FFFDF7",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle
          className="size-4 shrink-0"
          style={{ color: APP_COLORS.ambers.amber }}
        />
        <h3
          className="text-sm font-bold tracking-tight"
          style={{ color: APP_COLORS.texts.primary }}
        >
          Special Alerts
        </h3>
      </div>

      {/* Alert Items List */}
      <div className="space-y-2 text-xs">
        {alerts.map((al) => {
          const isDanger = al.tone === "danger";
          return (
            <div
              key={al.id}
              className="flex items-center justify-between rounded-xl border p-2.5 transition hover:bg-white"
              style={{
                borderColor: isDanger ? APP_COLORS.reds.primary : APP_COLORS.ambers.light,
                backgroundColor: APP_COLORS.backgrounds.background,
              }}
            >
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 font-bold truncate">
                  <span style={{ color: APP_COLORS.texts.primary }}>
                    {al.scName}
                  </span>
                  <span style={{ color: APP_COLORS.texts.slate }}>-</span>
                  <span style={{ color: APP_COLORS.texts.slate }}>
                    {al.location}
                  </span>
                </div>
                <p
                  className="text-[11px] font-semibold mt-0.5"
                  style={{
                    color: isDanger ? APP_COLORS.reds.red : APP_COLORS.ambers.secondary,
                  }}
                >
                  {al.issue}
                </p>
              </div>

              <button
                type="button"
                onClick={al.onAction}
                className="shrink-0 text-xs font-bold transition hover:underline cursor-pointer"
                style={{
                  color: isDanger ? APP_COLORS.reds.red : APP_COLORS.ambers.secondary,
                }}
              >
                {al.actionLabel}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Button */}
      <button
        type="button"
        onClick={onViewAllDetails}
        className="mt-3.5 w-full rounded-xl border py-2 text-center text-xs font-bold transition hover:bg-amber-50 cursor-pointer"
        style={{
          borderColor: APP_COLORS.ambers.amber,
          color: APP_COLORS.ambers.secondary,
          backgroundColor: APP_COLORS.backgrounds.background,
        }}
      >
        View Details for All 12 SCs &gt;
      </button>
    </div>
  );
}

export default RmSpecialAlertsCard;
