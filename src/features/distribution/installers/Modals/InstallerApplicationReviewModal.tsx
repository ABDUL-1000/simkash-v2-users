"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type InstallerApplicationReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantName?: string;
  phone?: string;
  location?: string;
  onApproveSuccess?: () => void;
  onRejectSuccess?: () => void;
};

export function InstallerApplicationReviewModal({
  open,
  onOpenChange,
  applicantName = "Bukhari Mohammed",
  phone = "08120600542",
  location = "Kano",
  onApproveSuccess,
  onRejectSuccess,
}: InstallerApplicationReviewModalProps) {
  const [approveCctv, setApproveCctv] = useState(true);
  const [approveSolar, setApproveSolar] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Installer Application Review"
      description={`${applicantName} · ${phone} · ${location}`}
      size="lg"
      actions={[
        {
          key: "reject",
          label: "Reject Application",
          variant: "danger",
          onClick: () => {
            onRejectSuccess?.();
          },
          closeOnClick: true,
        },
        {
          key: "approve",
          label: "Approve Installer",
          variant: "primary",
          onClick: () => {
            onApproveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Info Banner */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[#64748B]">Applied 2 days ago — Jun 28, 2026</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[#64748B]">Skills applied for:</span>
            <span className="rounded-full border border-[#BFDBFE] bg-[#DBEAFE] px-2.5 py-0.5 text-[11px] font-bold text-[#2563EB]">
              CCTV Installation
            </span>
            <span className="rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">
              Solar Installation
            </span>
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-[#64748B]">State · LGA</span>
            <strong className="font-bold text-[#0F172A]">Kano · Nassarawa</strong>
          </div>
        </div>

        {/* Verification Status */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            VERIFICATION STATUS
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Identity Verification (NIN)</span>
              <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 font-bold text-[#059669]">
                Verified
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">BVN Verification</span>
              <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 font-bold text-[#059669]">
                Verified
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Guarantor Details</span>
              <span className="rounded-full bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-0.5 font-bold text-[#D97706]">
                Pending
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#64748B]">Background Check</span>
              <span className="rounded-full bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-0.5 font-bold text-[#D97706]">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            UPLOADED DOCUMENTS
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
              <div>
                <p className="font-bold text-[#0F172A]">passport_id.jpg</p>
                <p className="text-[11px] text-[#94A3B8]">Jun 29, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="font-bold text-[#2563EB] hover:underline">
                  View
                </button>
                <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[11px] font-bold text-[#059669]">
                  Verified
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
              <div>
                <p className="font-bold text-[#0F172A]">guarantor_letter.pdf</p>
                <p className="text-[11px] text-[#94A3B8]">Jun 29, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="font-bold text-[#2563EB] hover:underline">
                  View
                </button>
                <span className="rounded-full bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 text-[11px] font-bold text-[#D97706]">
                  Pending
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-3">
              <div>
                <p className="font-bold text-[#0F172A]">cctv_certification.pdf</p>
                <p className="text-[11px] text-[#94A3B8]">Jun 28, 2026</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" className="font-bold text-[#2563EB] hover:underline">
                  View
                </button>
                <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[11px] font-bold text-[#059669]">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills to Approve */}
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            SKILLS TO APPROVE
          </p>
          <p className="mb-2 text-[11px] text-[#D97706]">
            Only approve skills with verified certifications
          </p>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3">
              <label className="flex items-center gap-2.5 cursor-pointer font-bold text-[#059669]">
                <input
                  type="checkbox"
                  checked={approveCctv}
                  onChange={(e) => setApproveCctv(e.target.checked)}
                  className="size-4 rounded accent-[#059669]"
                />
                <span>CCTV Installation</span>
              </label>
              <span className="flex items-center gap-1 font-bold text-[#059669]">
                <Check className="size-4 stroke-[3]" />
                Approve
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3">
              <label className="flex items-center gap-2.5 cursor-pointer font-bold text-[#059669]">
                <input
                  type="checkbox"
                  checked={approveSolar}
                  onChange={(e) => setApproveSolar(e.target.checked)}
                  className="size-4 rounded accent-[#059669]"
                />
                <span>Solar Installation</span>
              </label>
              <span className="flex items-center gap-1 font-bold text-[#059669]">
                <Check className="size-4 stroke-[3]" />
                Approve
              </span>
            </div>
          </div>
        </div>

        {/* Fixed Commission Box */}
        <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669]">
          <p className="font-bold">Commission: ₦40,000 per completed job</p>
          <p className="text-[11px] text-[#059669]/80">Fixed platform rate — cannot be changed per installer</p>
        </div>
      </div>
    </AppModal>
  );
}
