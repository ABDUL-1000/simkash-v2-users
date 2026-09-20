import type { JobDetailItem } from "../types";

interface JobDetailsSummaryHeaderProps {
  job: JobDetailItem;
}

export function JobDetailsSummaryHeader({ job }: JobDetailsSummaryHeaderProps) {
  const getStatusColor = () => {
    switch (job.status) {
      case "Assigned":
        return "text-[#2563EB]";
      case "In Progress":
        return "text-[#7C3AED]";
      case "Pending Verification":
        return "text-[#D97706]";
      case "Completed":
        return "text-[#10B981]";
      case "Disputed":
        return "text-[#EF4444]";
      default:
        return "text-[#66738C]";
    }
  };

  return (
    <div className="grid grid-cols-2 divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs shadow-xs sm:grid-cols-3 lg:grid-cols-6 sm:divide-y-0 sm:divide-x">
      {/* 1. Status */}
      <div className="p-2 sm:p-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Status
        </span>
        <div className={`mt-0.5 flex items-center gap-1.5 font-bold ${getStatusColor()}`}>
          <span className="size-2 rounded-full bg-current" />
          {job.status}
        </div>
      </div>

      {/* 2. Payment */}
      <div className="p-2 sm:p-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Payment
        </span>
        <div className="mt-0.5 font-black text-[#10B981]">
          ₦{job.fee.toLocaleString()}
        </div>
      </div>

      {/* 3. Type */}
      <div className="p-2 sm:p-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Type
        </span>
        <div className="mt-0.5 font-bold text-[#7C3AED]">{job.type}</div>
      </div>

      {/* 4. Client */}
      <div className="p-2 sm:p-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Client
        </span>
        <div className="mt-0.5 truncate font-bold text-[#0F152A]">
          {job.client.company.split(" ")[0]} {job.client.company.split(" ")[1] ?? ""}
        </div>
      </div>

      {/* 5. Due */}
      <div className="p-2 sm:p-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Due
        </span>
        <div className="mt-0.5 font-bold text-[#D97706]">
          {job.dueDate.split(" ").slice(0, 2).join(" ")} · {job.dueDaysRemaining.split(" ")[0]} days
        </div>
      </div>

      {/* 6. Distance */}
      <div className="p-2 sm:p-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Distance
        </span>
        <div className="mt-0.5 font-bold text-[#0F152A]">
          {job.distanceKm} km away
        </div>
      </div>
    </div>
  );
}
