import { AlertTriangle } from "lucide-react";
import { CRITICAL_ALERT_COLORS } from "@/constants/colors";
import type { SimDetails, OnSimAction } from "@/types/sim-details.types";

export function CriticalAlertSection({ sim, onAction }: { sim: SimDetails; onAction: OnSimAction }) {
  if (sim.daysRemaining > 3) return null;

  return (
    <div className="rounded-2xl border p-5 sm:p-6" style={{ backgroundColor: CRITICAL_ALERT_COLORS.bg, borderColor: CRITICAL_ALERT_COLORS.border }}>
      <div className="mb-2 flex items-center gap-2">
        <AlertTriangle className="size-5" style={{ color: CRITICAL_ALERT_COLORS.text }} />
        <p className="text-base font-bold" style={{ color: CRITICAL_ALERT_COLORS.text }}>
          Critical — Expires in {sim.daysRemaining} Days
        </p>
      </div>
      <p className="mb-4 text-sm" style={{ color: CRITICAL_ALERT_COLORS.text }}>
        This SIM expires in {sim.daysRemaining} days. Renew immediately to prevent service interruption for the customer.
      </p>

 

      <button
        type="button"
        onClick={() => onAction("renew")}
        className="w-full rounded-xl py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: CRITICAL_ALERT_COLORS.button }}
      >
        Renew Now — Before Expiry
      </button>
    </div>
  );
}