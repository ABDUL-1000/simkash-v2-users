import { Clock, CheckCircle2, MapPin, ArrowRight } from "lucide-react";
import type { JobDetailItem } from "../types";

interface ActiveJobsSidebarProps {
  jobs: JobDetailItem[];
  onContactAdmin?: () => void;
  onReportProblem?: () => void;
  onViewGuidelines?: () => void;
  onOpenMap?: () => void;
}

export function ActiveJobsSidebar({
  jobs,
  onContactAdmin,
  onReportProblem,
  onViewGuidelines,
  onOpenMap,
}: ActiveJobsSidebarProps) {
  const totalPotential = jobs.reduce((acc, j) => acc + j.fee, 0);

  return (
    <div className="space-y-4">
      {/* Potential Earnings */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#66738C]">
          Potential Earnings
        </h4>
        <div className="mt-3 space-y-2 text-xs">
          {jobs.map((j) => (
            <div key={j.id} className="flex items-center justify-between">
              <span className="text-[#66738C]">{j.reference}</span>
              <span className="font-bold text-[#10B981]">₦{j.fee.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#E2ECF6] pt-3">
          <span className="text-xs font-bold text-[#0F152A]">Total</span>
          <span className="text-base font-black text-[#10B981]">
            ₦{totalPotential.toLocaleString()}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#10B981]">
          <CheckCircle2 className="size-3.5" /> All {jobs.length} jobs on track
        </div>
      </div>

      {/* Deadline Overview */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#66738C]">
          Deadline Overview
        </h4>
        <div className="mt-3 space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-3.5 shrink-0 text-[#EF4444]" />
            <div>
              <div className="font-bold text-[#0F152A]">CCTV - Ikeja</div>
              <div className="text-[11px] font-semibold text-[#EF4444]">Due: 26 Jun · 2 days left!</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-3.5 shrink-0 text-[#EA580C]" />
            <div>
              <div className="font-bold text-[#0F152A]">Solar CCTV - Lagos Island</div>
              <div className="text-[11px] font-semibold text-[#EA580C]">Due: 28 Jun · 4 days left!</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 size-3.5 shrink-0 text-[#10B981]" />
            <div>
              <div className="font-bold text-[#0F152A]">Solar + CCTV - VI</div>
              <div className="text-[11px] font-semibold text-[#10B981]">Due: 30 Jun · 6 days left!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Locations Map Teaser */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs text-center">
        <h4 className="text-left text-xs font-bold uppercase tracking-wider text-[#66738C]">
          Job Locations
        </h4>
        <div className="mt-3 flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] py-6 border border-[#E2ECF6]">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-[#0F152A] shadow-xs">
            <MapPin className="size-5 text-[#2563EB]" />
          </div>
          <p className="mt-2 text-xs font-bold text-[#0F152A]">{jobs.length} jobs in Lagos</p>
          <div className="mt-1 flex gap-1 text-[#7C3AED]">
            <span className="size-1.5 rounded-full bg-[#7C3AED]" />
            <span className="size-1.5 rounded-full bg-[#7C3AED]" />
            <span className="size-1.5 rounded-full bg-[#7C3AED]" />
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenMap}
          className="mt-3 text-xs font-bold text-[#2563EB] hover:underline"
        >
          Open Full Map
        </button>
      </div>

      {/* Quick Links */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#66738C]">
          Quick Links
        </h4>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={onContactAdmin}
            className="flex w-full items-center justify-between rounded-xl border border-[#E2ECF6] p-2.5 text-left text-xs font-semibold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Contact Super Admin <ArrowRight className="size-3 text-[#8C909B]" />
          </button>
          <button
            type="button"
            onClick={onReportProblem}
            className="flex w-full items-center justify-between rounded-xl border border-[#E2ECF6] p-2.5 text-left text-xs font-semibold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Report a Problem <ArrowRight className="size-3 text-[#8C909B]" />
          </button>
          <button
            type="button"
            onClick={onViewGuidelines}
            className="flex w-full items-center justify-between rounded-xl border border-[#E2ECF6] p-2.5 text-left text-xs font-semibold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View Job Guidelines <ArrowRight className="size-3 text-[#8C909B]" />
          </button>
        </div>
      </div>
    </div>
  );
}
