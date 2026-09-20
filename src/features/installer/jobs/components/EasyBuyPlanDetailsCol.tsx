import { AlertTriangle, FileText } from "lucide-react";
import type { JobDetailItem } from "../types";
import { EquipmentChecklist } from "./EquipmentChecklist";

interface EasyBuyPlanDetailsColProps {
  job: JobDetailItem;
}

export function EasyBuyPlanDetailsCol({ job }: EasyBuyPlanDetailsColProps) {
  const plan = job.easyBuyPlan;
  const commission = plan?.commissionAmount ?? 22500;
  const totalPayout = job.fee + commission;

  return (
    <div className="space-y-4">
      {/* 1. Job Details & Client Card */}
      <div className="divide-y divide-[#E2ECF6]/70 rounded-3xl border border-[#E2ECF6] bg-white p-4 text-xs shadow-xs sm:p-5">
        <h4 className="pb-3 font-extrabold uppercase tracking-wider text-[#0F152A]">
          Job Details
        </h4>

        <div className="space-y-2 py-3">
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Status</span>
            <span className="font-bold text-[#2563EB]">● {job.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Job Ref</span>
            <span className="font-bold text-[#0F152A]">{job.reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Type</span>
            <span className="font-bold text-[#0F152A]">{job.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Assigned</span>
            <span className="font-bold text-[#0F152A]">{job.assignedDate} ({job.assignedDaysAgo.replace("Assigned ", "")})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Deadline</span>
            <span className="font-bold text-[#0F152A]">{job.dueDate} ({job.dueDaysRemaining})</span>
          </div>
        </div>

        {/* Client Details */}
        <div className="pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Client Information
          </span>
          <div className="mt-2 space-y-1.5 text-xs">
            <div className="font-bold text-[#0F152A]">{job.client.company}</div>
            <div className="text-[11px] text-[#66738C]">Contact: {job.client.contactName}</div>
            <div className="text-[11px] font-semibold text-[#2563EB]">Phone: {job.client.phone}</div>
            <div className="text-[11px] text-[#66738C]">Email: {job.client.email}</div>
            <div className="text-[11px] text-[#0F152A]">Address: {job.client.address}</div>
          </div>
        </div>

        {/* EasyBuy Plan Details */}
        <div className="pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            EasyBuy Plan Details
          </span>
          <div className="mt-2 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Plan Type</span>
              <span className="font-bold text-[#0F152A]">{plan?.planType ?? "Daily"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Product</span>
              <span className="font-bold text-[#0F152A]">{plan?.product ?? "Basic CCTV Package"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Product Value</span>
              <span className="font-black text-[#0F152A]">₦{(plan?.productValue ?? 450000).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Customer Plan</span>
              <span className="font-semibold text-[#2563EB]">{plan?.installmentRate ?? "₦8,500/day"} · ~{plan?.daysRemaining ?? 31} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Plan Status</span>
              <span className="font-bold text-[#10B981]">{plan?.planStatus ?? "Active"} · {plan?.planProgress ?? 61}% complete</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Down Payment</span>
              <span className="font-bold text-[#10B981]">₦{(plan?.downPayment ?? 135000).toLocaleString()} · Paid ✓</span>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="pt-3 space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Your Payment Breakdown
          </span>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-xs text-[#0F152A]">₦{job.fee.toLocaleString()} job fee</span>
                <p className="text-[10px] text-[#8C909B]">Paid when Admin confirms completion</p>
              </div>
              <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">Instant</span>
            </div>

            <div className="flex justify-between items-start border-t border-[#E2ECF6] pt-2">
              <div>
                <span className="font-bold text-xs text-[#2563EB]">₦{commission.toLocaleString()} EasyBuy commission</span>
                <p className="text-[10px] text-[#8C909B]">5% of ₦{(plan?.productValue ?? 450000).toLocaleString()} product value · Paid when customer completes plan</p>
              </div>
              <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[9px] font-bold text-[#2563EB]">Deferred</span>
            </div>

            <div className="flex justify-between items-center border-t border-[#E2ECF6] pt-2 font-bold">
              <span className="text-[#0F152A]">Total Potential Payout</span>
              <span className="text-base font-black text-[#10B981]">₦{totalPayout.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-[#FEF3C7] p-2.5 text-[10px] text-[#92400E]">
            <AlertTriangle className="size-3.5 shrink-0 text-[#D97706] mt-0.5" />
            <p>
              EasyBuy commission is separate from your job fee. Job fee pays immediately on verification. EasyBuy commission may take weeks or months (until customer completes their plan).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Equipment Required */}
      <EquipmentChecklist equipment={job.equipment} />

      {/* 3. Admin Notes */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 text-xs">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">Admin Notes</h4>
        <div className="mt-2.5 flex items-start gap-2 rounded-2xl bg-[#F8FAFC] p-3 text-[#66738C] leading-relaxed">
          <FileText className="size-4 shrink-0 text-[#8C909B] mt-0.5" />
          <span>{job.adminNotes}</span>
        </div>
      </div>
    </div>
  );
}
