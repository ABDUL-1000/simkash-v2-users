import { MapPin, Calendar, Coins, Wrench, Shield, Navigation } from "lucide-react";
import type { JobDetailItem } from "../types";

interface ActiveJobMetaGridProps {
  job: JobDetailItem;
}

export function ActiveJobMetaGrid({ job }: ActiveJobMetaGridProps) {
  const isEasyBuy = job.isEasyBuy;
  const commission = job.easyBuyPlan?.commissionAmount ?? 22500;
  const totalPotential = job.fee + commission;

  return (
    <div className="mt-3.5 grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs">
      {/* Location */}
      <div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          <MapPin className="size-3 text-[#2563EB]" /> Location
        </div>
        <div className="mt-0.5 font-bold text-[#0F152A]">{job.client.address.split(",")[0]}</div>
        <div className="text-[10px] text-[#8C909B]">{job.client.address.split(",").slice(1).join(",")}</div>
      </div>

      {/* Deadline */}
      <div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          <Calendar className="size-3 text-[#EA580C]" /> Deadline
        </div>
        <div className="mt-0.5 font-bold text-[#0F152A]">{job.dueDate}</div>
        <div className={`text-[10px] font-semibold ${job.isUrgent ? "text-[#EF4444]" : "text-[#EA580C]"}`}>
          {job.dueDaysRemaining}
        </div>
      </div>

      {/* Payment */}
      <div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          <Coins className="size-3 text-[#10B981]" /> {isEasyBuy ? "Job Fee" : "Payment"}
        </div>
        <div className="mt-0.5 font-bold text-[#10B981]">₦{job.fee.toLocaleString()}</div>
        {isEasyBuy ? (
          <div className="text-[10px] space-y-0.5">
            <span className="text-[#2563EB] font-medium block">
              EasyBuy comm: ₦{commission.toLocaleString()}
            </span>
            <span className="text-[#10B981] font-bold block">
              Total potential: ₦{totalPotential.toLocaleString()}
            </span>
          </div>
        ) : (
          <div className="text-[10px] text-[#8C909B]">On completion</div>
        )}
      </div>

      {/* Job Type */}
      <div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          <Wrench className="size-3 text-[#7C3AED]" /> Job Type
        </div>
        <div className="mt-0.5 font-bold text-[#0F152A]">{job.type}</div>
        <div className="text-[10px] text-[#8C909B]">Installation</div>
      </div>

      {/* Assigned By */}
      <div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          <Shield className="size-3 text-[#0F152A]" /> Assigned By
        </div>
        <div className="mt-0.5 font-bold text-[#0F152A]">Super Admin</div>
        <div className="text-[10px] text-[#8C909B]">Simkash Platform</div>
      </div>

      {/* Distance */}
      <div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          <Navigation className="size-3 text-[#2563EB]" /> Distance
        </div>
        <div className="mt-0.5 font-bold text-[#0F152A]">{job.distanceKm} km</div>
        <div className="text-[10px] text-[#8C909B]">From your location</div>
      </div>
    </div>
  );
}
