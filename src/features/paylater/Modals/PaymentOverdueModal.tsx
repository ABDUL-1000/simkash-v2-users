import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useGetPayLaterTransactions } from "../api/usePayLater";

interface PaymentOverdueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRepayNowClick: () => void;
  onContactSupportClick?: () => void;
  overdueAmount: number;
  overdueCount?: number;
  /** Account status from GET /paylater/account (e.g. "active", "suspended"). */
  accountStatus?: string;
}

export function PaymentOverdueModal({ open, onOpenChange, onRepayNowClick, onContactSupportClick, overdueAmount, overdueCount, accountStatus }: PaymentOverdueModalProps) {
  // Overdue bills give the breakdown, due dates and late fees (penalty).
  const overdue = useGetPayLaterTransactions({ status: "overdue", page: 1, limit: 50 }, open);
  const items = overdue.data?.items ?? [];
  const lateFees = items.reduce((sum, item) => sum + (item.penalty ?? 0), 0);
  const originalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const earliestDue = items.map(item => item.due_date_formatted ?? item.due_date).at(-1);
  const suspended = /suspend|frozen|blocked/i.test(accountStatus ?? "");

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
            ₦{overdueAmount.toLocaleString()}{earliestDue ? ` was due ${earliestDue}` : " is past due"}
          </h3>
          {overdueCount !== undefined && overdueCount > 0 && (
            <p className="text-xs font-semibold text-[#EF4444]">
              {overdueCount} overdue bill{overdueCount === 1 ? "" : "s"}
            </p>
          )}
          {/* "N days overdue" is not shown: the transactions list doesn't return days overdue. */}
        </div>

        {/* Suspended Notice Card — only when the account is actually suspended */}
        {suspended && (
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs font-medium text-[#EF4444] leading-relaxed">
            Your PayLater credit is currently suspended. You cannot make new credit purchases until your outstanding balance is repaid.
          </div>
        )}

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
        {overdue.isLoading ? <div className="h-24 animate-pulse rounded-2xl bg-slate-100" /> : items.length > 0 && (
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
            {items.map(item => (
              <div key={item.id} className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">{item.service} · due {item.due_date_formatted ?? item.due_date}</span>
                <span className="font-bold text-[#0F152A]">{item.total_outstanding_formatted ?? item.amount_formatted}</span>
              </div>
            ))}
            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Original amount</span>
              <span className="font-bold text-[#0F152A]">₦{originalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Late fee</span>
              <span className="font-bold text-[#0F152A]">₦{lateFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 last:pb-0 font-extrabold text-sm">
              <span className="text-[#0F152A]">Total due</span>
              <span className="text-[#EF4444]">₦{overdueAmount.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleRepayNow}
            className="w-full rounded-xl bg-[#EF4444] py-3 text-xs font-bold text-white shadow-md transition hover:bg-red-600"
          >
            Repay Now — ₦{overdueAmount.toLocaleString()}
          </button>

          {onContactSupportClick && (
            <div className="text-center">
              <button
                type="button"
                onClick={onContactSupportClick}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Contact Support
              </button>
            </div>
          )}
        </div>
      </div>
    </AppModal>
  );
}
