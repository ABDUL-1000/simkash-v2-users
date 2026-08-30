import { Check, X, Bell } from "lucide-react";

export function ReferralQuickActionsCard({
  onMarkDealLost,
  onApproveCommission,
  onRejectCommission,
}: {
  onMarkDealLost?: () => void;
  onApproveCommission?: () => void;
  onRejectCommission?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {/* Item 1: Mark as Deal Closed */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <Check className="size-4" />
            <span className="font-bold">Mark as Deal Closed</span>
          </div>
          <span className="text-[11px] text-[#94A3B8]">already closed</span>
        </div>

        {/* Item 2: Mark as Deal Lost */}
        <div
          onClick={onMarkDealLost}
          className="flex items-center justify-between pt-3 cursor-pointer group"
        >
          <div className="flex items-center gap-2 text-[#DC2626]">
            <X className="size-4" />
            <span className="font-bold group-hover:underline">Mark as Deal Lost</span>
          </div>
          <span className="text-[#DC2626] font-bold">›</span>
        </div>

        {/* Item 3: Approve Commission */}
        <div className="flex items-center justify-between pt-3">
          <span className="font-bold text-[#0F172A]">Approve Commission</span>
          <button
            type="button"
            onClick={onApproveCommission}
            className="rounded-lg bg-[#10B981] px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-[#059669]"
          >
            Action
          </button>
        </div>

        {/* Item 4: Reject Commission */}
        <div className="flex items-center justify-between pt-3">
          <span className="font-bold text-[#0F172A]">Reject Commission</span>
          <button
            type="button"
            onClick={onRejectCommission}
            className="rounded-lg border border-[#FECACA] bg-[#FFF1F2] px-3 py-1 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
          >
            Action
          </button>
        </div>

        {/* Item 5: Send Reminder to Referrer */}
        <div className="pt-3">
          <button
            type="button"
            className="flex items-center gap-2 font-bold text-[#2563EB] hover:underline"
          >
            <Bell className="size-4" />
            <span>Send Reminder to Referrer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
