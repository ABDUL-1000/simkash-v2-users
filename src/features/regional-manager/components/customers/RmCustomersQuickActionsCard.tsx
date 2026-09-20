import { Plus, Send, Bell, Download, Activity, ArrowRightLeft } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmCustomersQuickActionsCardProps {
  onOnboardSc: () => void;
  onDistributeAll: () => void;
  onRedistributeStock?: () => void;
  onSendBulkReminder: () => void;
  onExportNetwork: () => void;
  onViewNetworkActivity: () => void;
}

export function RmCustomersQuickActionsCard({
  onOnboardSc,
  onDistributeAll,
  onRedistributeStock,
  onSendBulkReminder,
  onExportNetwork,
  onViewNetworkActivity,
}: RmCustomersQuickActionsCardProps) {
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
        Quick Actions
      </h3>

      <div className="space-y-2 text-xs">
        {/* + Onboard New SC (Primary Button) */}
        <button
          type="button"
          onClick={onOnboardSc}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-xs transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
          style={{ backgroundColor: APP_COLORS.blues.primary }}
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>+ Onboard New SC</span>
        </button>

        {/* Distribute SIMs to All SCs */}
        <button
          type="button"
          onClick={onDistributeAll}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.greens.green,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <Send className="size-3.5" />
          <span>Distribute SIMs to All SCs</span>
        </button>

        {/* Redistribute Stock */}
        {onRedistributeStock && (
          <button
            type="button"
            onClick={onRedistributeStock}
            className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.blues.interactiveCta,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <ArrowRightLeft className="size-3.5" />
            <span>Redistribute Stock</span>
          </button>
        )}

        {/* Send Bulk Reminder */}
        <button
          type="button"
          onClick={onSendBulkReminder}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.ambers.secondary,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <Bell className="size-3.5" />
          <span>Send Bulk Reminder</span>
        </button>

        {/* Export Network */}
        <button
          type="button"
          onClick={onExportNetwork}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.texts.slate,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <Download className="size-3.5" />
          <span>Export Network</span>
        </button>

        {/* Network Activity */}
        <button
          type="button"
          onClick={onViewNetworkActivity}
          className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.texts.slate,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          <Activity className="size-3.5" />
          <span>Network Activity</span>
        </button>
      </div>
    </div>
  );
}

export default RmCustomersQuickActionsCard;
