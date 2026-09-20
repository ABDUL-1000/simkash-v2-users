import { CreditCard, CheckCircle2 } from "lucide-react";
import type { EasyBuyPlanDetails } from "../types";

interface ActiveJobEasyBuySectionProps {
  plan?: EasyBuyPlanDetails;
}

export function ActiveJobEasyBuySection({ plan }: ActiveJobEasyBuySectionProps) {
  if (!plan) return null;

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* Product & Plan Pill */}
      <div className="flex items-center gap-2 rounded-xl bg-[#EFF6FF] px-3 py-2 text-[#2563EB]">
        <CreditCard className="size-4 shrink-0" />
        <span className="font-bold text-[11px]">
          EasyBuy: {plan.product} ({plan.planType ?? "Daily"} plan)
        </span>
      </div>

      {/* Plan Details Grid */}
      <div className="rounded-2xl border border-[#BFDBFE] bg-[#F0F7FF] p-3 text-xs">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB]">
          EasyBuy Plan Details
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div>
            <span className="text-[10px] text-[#8C909B]">Customer plan</span>
            <div className="font-bold text-[#0F152A]">{plan.installmentRate}</div>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B]">Down paid</span>
            <div className="flex items-center gap-1 font-bold text-[#10B981]">
              ₦{plan.downPayment.toLocaleString()}
              <CheckCircle2 className="size-3" />
            </div>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B]">Plan status</span>
            <div className="font-bold text-[#10B981]">
              {plan.planStatus} · {plan.planProgress}% paid
            </div>
          </div>
          <div>
            <span className="text-[10px] text-[#8C909B]">Commission</span>
            <div className="font-bold text-[#2563EB]">
              ₦{plan.commissionAmount.toLocaleString()} · On completion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
