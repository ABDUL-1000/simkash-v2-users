import type { JobDetailItem } from "../types";
import { EquipmentChecklist } from "./EquipmentChecklist";

interface JobClientInfoCardProps {
  job: JobDetailItem;
  isPending: boolean;
}

export function JobClientInfoCard({ job, isPending }: JobClientInfoCardProps) {
  return (
    <div className="space-y-4">
      {/* Job Details metadata block */}
      <div className="divide-y divide-[#E2ECF6]/60 rounded-3xl border border-[#E2ECF6] bg-white p-4 text-xs shadow-xs sm:p-5">
        <h4 className="pb-3 text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Job Details
        </h4>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Status</span>
          <span className="font-bold text-[#2563EB]">● {job.status}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Job Ref</span>
          <span className="font-bold text-[#0F152A]">{job.reference}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Type</span>
          <span className="font-bold text-[#0F152A]">{job.title}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Assigned</span>
          <span className="font-bold text-[#0F152A]">
            {job.assignedDate} ({job.assignedDaysAgo.replace("Assigned ", "")})
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Deadline</span>
          <span className="font-bold text-[#0F152A]">
            {job.dueDate} ({job.dueDaysRemaining.split(" ")[0]} days)
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Payment</span>
          <span className="font-black text-[#10B981]">₦{job.fee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[#8C909B]">Paid On</span>
          <span className="font-semibold text-[#0F152A]">Completion + verification</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="text-[#8C909B]">Assigned By</span>
          <span className="font-bold text-[#0F152A]">Super Admin</span>
        </div>

        {/* Client Info Sub-block */}
        <div className="pt-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Client Information
          </span>
          <div className="mt-2 space-y-1 text-xs">
            <div className="font-bold text-[#0F152A]">{job.client.company}</div>
            <div className="text-[11px] text-[#66738C]">
              {job.client.contactName} · {job.client.phone}
            </div>
            <div className="text-[11px] text-[#66738C]">{job.client.email}</div>
            <div className="text-[11px] font-semibold text-[#0F152A]">
              {job.client.address}
            </div>
            <div className="text-[10px] text-[#8C909B]">
              Nearest LM: {job.client.nearestLandmark}
            </div>
          </div>
        </div>
      </div>

      <EquipmentChecklist equipment={job.equipment} readOnly={isPending} />

      {/* Admin Notes */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 text-xs shadow-xs sm:p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Admin Notes
        </h4>
        <div className="mt-3 leading-relaxed rounded-2xl bg-[#F8FAFC] p-3 text-[#66738C]">
          {job.adminNotes}
        </div>
      </div>
    </div>
  );
}
