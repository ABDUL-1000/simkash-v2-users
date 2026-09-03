import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface PaymentOverdueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRepayNowClick: () => void;
  onContactSupportClick?: () => void;
  overdueAmount?: number;
  dueDate?: string;
  daysOverdue?: number;
}

export function PaymentOverdueModal({
  open,
  onOpenChange,
  onRepayNowClick,
  onContactSupportClick,
  overdueAmount = 11900,
  dueDate = "30 Jun 2026",
  daysOverdue = 3,
}: PaymentOverdueModalProps) {
  const handleRepayNow = () => {
    onOpenChange(false);
    onRepayNowClick();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Payment Overdue"
      description="Your PayLater balance is past due"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Top Red Accent Banner */}
        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-[#EF4444] font-extrabold text-xs">
            <AlertTriangle className="size-4" /> OVERDUE
          </div>
          <h3 className="text-base font-extrabold text-[#EF4444]">
            ₦{overdueAmount.toLocaleString()} was due {dueDate}
          </h3>
          <p className="text-xs font-semibold text-[#EF4444]">
            {daysOverdue} days overdue
          </p>
        </div>

        {/* Suspended Notice Card */}
        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs font-medium text-[#EF4444] leading-relaxed">
          Your PayLater credit is currently suspended. You cannot make new credit purchases until your outstanding balance is repaid.
        </div>

        {/* Total Overdue Amount Big Text */}
        <div className="text-center py-2 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            TOTAL OVERDUE AMOUNT
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#EF4444]">
            ₦{overdueAmount.toLocaleString()}
          </h2>
        </div>

        {/* Amount Breakdown Card */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
          <div className="flex justify-between py-2 first:pt-0">
            <span className="text-[#8C909B]">Original amount</span>
            <span className="font-bold text-[#0F152A]">₦{overdueAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Late fee</span>
            <span className="font-bold text-[#0F152A]">₦0</span>
          </div>
          <div className="flex justify-between py-2 last:pb-0 font-extrabold text-sm">
            <span className="text-[#0F152A]">Total due</span>
            <span className="text-[#EF4444]">₦{overdueAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleRepayNow}
            className="w-full rounded-xl bg-[#EF4444] py-3 text-xs font-bold text-white shadow-md transition hover:bg-red-600"
          >
            Repay Now — ₦{overdueAmount.toLocaleString()}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onContactSupportClick}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
