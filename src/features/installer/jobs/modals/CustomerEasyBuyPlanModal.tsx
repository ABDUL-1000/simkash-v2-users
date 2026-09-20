import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { EasyBuyPlanDetails } from "../types";

interface CustomerEasyBuyPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: EasyBuyPlanDetails | null;
  onContactAdmin?: () => void;
}

export function CustomerEasyBuyPlanModal({
  open,
  onOpenChange,
  plan,
  onContactAdmin,
}: CustomerEasyBuyPlanModalProps) {
  const customer = plan?.customerName ?? "Chidi Eze";
  const planId = plan?.planId ?? "PLAN-2026-00847";
  const value = plan?.productValue ?? 450000;
  const progress = plan?.planProgress ?? 61.1;
  const paid = plan?.amountPaid ?? 275000;
  const remaining = plan?.amountRemaining ?? 175000;
  const commission = plan?.commissionAmount ?? 22500;
  const rate = plan?.installmentRate ?? "₦8,500/day";
  const daysLeft = plan?.daysRemaining ?? 13;
  const estDate = plan?.estimatedCompletionDate?.replace("~", "") ?? "17 Jul 2026";

  const payments = [
    { num: "#7", date: "21 Jun", amount: 8500, status: "Paid", color: "text-[#10B981]" },
    { num: "#8", date: "22 Jun", amount: 8500, status: "Paid", color: "text-[#10B981]" },
    { num: "#9", date: "23 Jun", amount: 8500, status: "Paid", color: "text-[#10B981]" },
    { num: "#10", date: "24 Jun", amount: 8500, status: "Today", color: "text-[#D97706]" },
    { num: "#11", date: "25 Jun", amount: 8500, status: "Upcoming", color: "text-[#8C909B]" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Customer EasyBuy Plan"
      description={`${customer} · ${planId}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onContactAdmin}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC]"
          >
            Contact Admin
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl bg-[#1E293B] px-6 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-3.5 py-1 text-xs">
        {/* Info callout */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-[11px] text-[#1E40AF]">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <p className="leading-relaxed">
            This is your customer's payment plan. You can monitor progress here. Your EasyBuy commission releases when the plan is complete.
          </p>
        </div>

        {/* Customer card */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#2563EB] font-bold text-xs text-white">
            CE
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#0F172A]">{customer}</h4>
            <p className="text-[11px] text-[#66738C]">Lagos Island</p>
          </div>
        </div>

        {/* Royal Blue Commission Card */}
        <div className="flex items-center justify-between rounded-2xl bg-[#2563EB] p-4 text-white shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">
              Your EasyBuy Commission
            </span>
            <div className="text-2xl font-black text-white">
              ₦{commission.toLocaleString()}
            </div>
            <span className="text-[11px] text-blue-100">
              5% of ₦{value.toLocaleString()} plan value
            </span>
          </div>
          <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold text-[#D97706]">
            Pending
          </span>
        </div>

        {/* Plan Progress Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Plan Progress
          </div>
          <div className="font-bold text-sm text-[#10B981]">
            {progress}% complete
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#ECFDF5]">
            <div
              className="h-full rounded-full bg-[#10B981] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between font-bold text-xs">
            <span className="text-[#10B981]">₦{paid.toLocaleString()} paid</span>
            <span className="text-[#D97706]">₦{remaining.toLocaleString()} remaining</span>
          </div>

          <div className="pt-1 text-center">
            <p className="text-xs text-[#66738C]">Daily plan · {rate}</p>
            <p className="text-[11px] text-[#8C909B]">~{daysLeft} days remaining on plan</p>
          </div>
        </div>

        {/* Recent Payments Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Recent Payments
          </div>

          <div className="divide-y divide-[#E2ECF6]/60 text-xs">
            {payments.map((p) => (
              <div key={p.num} className="grid grid-cols-4 py-1.5 font-medium text-[#0F172A]">
                <span className="font-bold text-[#64748B]">{p.num}</span>
                <span className="text-[#64748B]">{p.date}</span>
                <span className="font-bold">₦{p.amount.toLocaleString()}</span>
                <span className={`text-right font-bold ${p.color}`}>{p.status}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center text-xs font-bold text-[#10B981]">
            Est. completion: {estDate}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
