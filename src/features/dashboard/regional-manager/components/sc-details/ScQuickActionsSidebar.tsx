import { Package, UserPlus, Bell, Users, AlertTriangle, RefreshCw } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface ScQuickActionsSidebarProps {
  onDistributeSims: () => void;
  onOnboardAp: () => void;
  onSendReminder: () => void;
  onViewAps: () => void;
  onSuspendSc: () => void;
  onRedistributeSims: () => void;
}

export function ScQuickActionsSidebar({
  onDistributeSims,
  onOnboardAp,
  onSendReminder,
  onViewAps,
  onSuspendSc,
  onRedistributeSims,
}: ScQuickActionsSidebarProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs font-bold">
      <h3 className="text-sm font-black text-[#0F152A]">Quick Actions</h3>

      <div className="space-y-2">
        {/* 1. Distribute SIMs (solid green) */}
        <button
          type="button"
          onClick={onDistributeSims}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#10B981] py-2.5 text-white shadow-xs hover:bg-[#059669] transition"
          style={{ backgroundColor: APP_COLORS.greens.green }}
        >
          <Package className="size-3.5" />
          <span>Distribute SIMs</span>
        </button>

        {/* 2. Onboard AP for SC */}
        <button
          type="button"
          onClick={onOnboardAp}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-[#475569] hover:bg-[#F8FAFC] transition"
        >
          <UserPlus className="size-3.5" />
          <span>Onboard AP for SC</span>
        </button>

        {/* 3. Send Reminder */}
        <button
          type="button"
          onClick={onSendReminder}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#F59E0B] bg-white py-2.5 text-[#D97706] hover:bg-[#FFFBEB] transition"
        >
          <Bell className="size-3.5 text-[#F59E0B]" />
          <span>Send Reminder</span>
        </button>

        {/* 4. View SC's APs */}
        <button
          type="button"
          onClick={onViewAps}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-[#475569] hover:bg-[#F8FAFC] transition"
        >
          <Users className="size-3.5" />
          <span>View SC&apos;s APs</span>
        </button>

        {/* 5. Suspend SC */}
        <button
          type="button"
          onClick={onSuspendSc}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#FECACA] bg-white py-2.5 text-[#DC2626] hover:bg-[#FFF1F2] transition"
        >
          <AlertTriangle className="size-3.5 text-[#EF4444]" />
          <span>Suspend SC</span>
        </button>

        {/* 6. Redistribute SIMs */}
        <button
          type="button"
          onClick={onRedistributeSims}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#10B981] bg-white py-2.5 text-[#10B981] hover:bg-[#EBFFF8] transition"
        >
          <RefreshCw className="size-3.5" />
          <span>Redistribute SIMs</span>
        </button>
      </div>
    </div>
  );
}

export default ScQuickActionsSidebar;
