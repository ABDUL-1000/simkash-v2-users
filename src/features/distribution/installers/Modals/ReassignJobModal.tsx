"use client";

import { useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ReassignJobModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobCode?: string;
  currentInstaller?: string;
  onReassignSuccess?: () => void;
};

export function ReassignJobModal({
  open,
  onOpenChange,
  jobCode = "JOB-2026-00847",
  currentInstaller = "Emeka Obi",
  onReassignSuccess,
}: ReassignJobModalProps) {
  const [reason, setReason] = useState("");
  const [installerSearch, setInstallerSearch] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reassign Job"
      description={`${jobCode} · currently assigned to ${currentInstaller}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "reassign",
          label: "Confirm Reassignment",
          variant: "primary",
          onClick: () => {
            onReassignSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Warning Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs text-[#92400E]">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#D97706]" />
          <div>
            <p className="font-bold text-sm">{currentInstaller} — On Job since 2 hours ago</p>
            <p className="text-xs text-[#78350F]">
              Reassigning will notify the installer and log the action
            </p>
          </div>
        </div>

        {/* Reason for Reassignment */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            REASON FOR REASSIGNMENT
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="">Select reason... ▾</option>
            <option value="Installer unavailable">Installer unavailable</option>
            <option value="Customer request">Customer request</option>
            <option value="Performance issue">Performance issue</option>
            <option value="Location mismatch">Location mismatch</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Select New Installer */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            SELECT NEW INSTALLER
          </label>
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={installerSearch}
              onChange={(e) => setInstallerSearch(e.target.value)}
              placeholder="Search available installer by name, skills, state..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          {/* Selected New Installer Box */}
          <div className="flex items-center justify-between rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#8B5CF6] font-bold text-white">
                FA
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">Fatima Abdullahi</p>
                <p className="text-xs text-[#64748B]">
                  CCTV · Kano · ★ 4.6 · 12 jobs
                </p>
              </div>
            </div>

            <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
              Available
            </span>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
