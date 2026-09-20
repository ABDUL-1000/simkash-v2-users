import { MapPin, Phone, MessageSquare } from "lucide-react";
import type { JobDetailItem } from "../types";

interface JobDetailsSidebarProps {
  job: JobDetailItem;
  onNavigateMap: () => void;
  onOpenGoogleMaps: () => void;
  onReportIssue: () => void;
  onContactAdmin: () => void;
}

export function JobDetailsSidebar({
  job,
  onNavigateMap,
  onOpenGoogleMaps,
  onReportIssue,
  onContactAdmin,
}: JobDetailsSidebarProps) {
  return (
    <div className="space-y-4">
      {/* Job Location Map Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 text-center shadow-xs sm:p-5">
        <h4 className="text-left text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Job Location
        </h4>
        <div className="mt-3 flex flex-col items-center justify-center rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-6">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-[#7C3AED] shadow-xs">
            <MapPin className="size-5" />
          </div>
          <p className="mt-2 text-xs font-bold text-[#0F152A]">
            {job.client.address.split(",")[0]}
          </p>
          <p className="text-[10px] text-[#8C909B]">
            {job.client.address.split(",")[1] ?? "Lagos"}
          </p>
        </div>
        <div className="mt-3 flex justify-center gap-4 text-xs font-bold text-[#2563EB]">
          <button
            type="button"
            onClick={onNavigateMap}
            className="cursor-pointer hover:underline"
          >
            Navigate
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onOpenGoogleMaps}
            className="cursor-pointer hover:underline"
          >
            Open in Google Maps
          </button>
        </div>
      </div>

      {/* Payment Details Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
        <div className="rounded-2xl bg-[#0F152A] p-4 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Job Payment
          </span>
          <div className="mt-1 text-2xl font-black text-white">
            ₦{job.fee.toLocaleString()}
          </div>
          <p className="mt-0.5 text-[11px] text-[#94A3B8]">On successful completion</p>
        </div>
        <div className="mt-4 space-y-2 text-xs text-[#66738C]">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#10B981]" /> Mark complete
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#CBD5E1]" /> Client verifies
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#CBD5E1]" /> Admin confirms + pays
          </div>
        </div>
      </div>

      {/* Contact Client Actions */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Contact Client
        </h4>
        <div className="mt-3 space-y-2">
          <a
            href={`tel:${job.client.phone}`}
            className="flex items-center justify-between rounded-xl bg-[#EBFFF8] p-3 text-xs font-bold text-[#065F46] hover:bg-[#D1FAE5]"
          >
            <span className="flex items-center gap-2">
              <Phone className="size-4 text-[#10B981]" /> Call
            </span>
            <span>{job.client.phone}</span>
          </a>
          <a
            href={`https://wa.me/${job.client.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl bg-[#EBFFF8] p-3 text-xs font-bold text-[#065F46] hover:bg-[#D1FAE5]"
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="size-4 text-[#10B981]" /> WhatsApp
            </span>
            <span>Send Message</span>
          </a>
        </div>
      </div>

      {/* Having a problem */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#66738C]">
          Having a problem?
        </h4>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={onReportIssue}
            className="w-full cursor-pointer rounded-xl border border-[#EF4444] py-2 text-xs font-bold text-[#EF4444] hover:bg-[#FFF7F8]"
          >
            Report Issue
          </button>
          <button
            type="button"
            onClick={onContactAdmin}
            className="w-full cursor-pointer rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Contact Admin
          </button>
        </div>
      </div>
    </div>
  );
}
