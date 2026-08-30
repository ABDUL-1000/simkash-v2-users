"use client";

import { useState } from "react";
import { Info, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type AssignInstallationJobModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  installerName?: string;
  onAssignSuccess?: () => void;
};

export function AssignInstallationJobModal({
  open,
  onOpenChange,
  installerName = "Emeka Obi",
  onAssignSuccess,
}: AssignInstallationJobModalProps) {
  const [jobSearch, setJobSearch] = useState("");
  const [scheduledDate, setScheduledDate] = useState("Jul 3, 2026");
  const [timeSlot, setTimeSlot] = useState<"morning" | "afternoon" | "evening">("morning");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Assign Installation Job"
      description="Select job and confirm installer assignment"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Assignment",
          variant: "primary",
          onClick: () => {
            onAssignSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Selected Installer Header Card */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">INSTALLER</label>
          <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB] font-bold text-white">
                EO
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">{installerName}</p>
                <p className="text-xs text-[#64748B]">CCTV + Solar · Lagos</p>
              </div>
            </div>

            <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
              ● Available
            </span>
          </div>
        </div>

        {/* Select Job Search & Card */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">SELECT JOB</label>
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
              placeholder="Search by job ref, customer, location..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          {/* Selected Job Card */}
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A] text-sm">JOB-2026-00901</span>
              <span className="rounded-full border border-[#BFDBFE] bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">
                CCTV Installation
              </span>
            </div>

            <div className="flex justify-between text-[#64748B]">
              <span>Customer</span>
              <strong className="font-bold text-[#0F172A]">Chidi Eze · Lagos, Ikeja</strong>
            </div>

            <div className="flex justify-between text-[#64748B]">
              <span>Device</span>
              <strong className="font-bold text-[#0F172A]">CAM-001-LOS · Priority: High</strong>
            </div>

            <p className="text-[11px] text-[#92400E] font-medium pt-1">
              Created 2 days ago — currently unassigned
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>
            The system auto-assigns based on installer state/location match and availability. Manual assignment overrides auto-assignment.
          </span>
        </div>

        {/* Schedule & Time Slot */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">SCHEDULE</label>
          <select
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Jul 3, 2026">Jul 3, 2026 (select preferred date)</option>
            <option value="Jul 4, 2026">Jul 4, 2026</option>
          </select>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-bold text-[#64748B]">Time slot:</span>
            <button
              type="button"
              onClick={() => setTimeSlot("morning")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                timeSlot === "morning"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B]"
              }`}
            >
              Morning
            </button>
            <button
              type="button"
              onClick={() => setTimeSlot("afternoon")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                timeSlot === "afternoon"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B]"
              }`}
            >
              Afternoon
            </button>
            <button
              type="button"
              onClick={() => setTimeSlot("evening")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                timeSlot === "evening"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B]"
              }`}
            >
              Evening
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
