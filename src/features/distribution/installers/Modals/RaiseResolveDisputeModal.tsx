"use client";

import { useState } from "react";
import { Info, Plus, Paperclip } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type RaiseResolveDisputeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobCode?: string;
  installerName?: string;
  onSubmitSuccess?: () => void;
};

export function RaiseResolveDisputeModal({
  open,
  onOpenChange,
  jobCode = "JOB-2026-01042",
  installerName = "Emeka Obi",
  onSubmitSuccess,
}: RaiseResolveDisputeModalProps) {
  const [disputeType, setDisputeType] = useState("Payment Not Received");
  const [description, setDescription] = useState("");
  const [resolutionAction, setResolutionAction] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Raise / Resolve Dispute"
      description={`${jobCode} · Solar Installation · ${installerName}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "submit",
          label: "Submit Resolution",
          variant: "primary",
          onClick: () => {
            onSubmitSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Dispute Type & Status Badge */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
              DISPUTE TYPE
            </label>
            <select
              value={disputeType}
              onChange={(e) => setDisputeType(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="Payment Not Received">Payment Not Received</option>
              <option value="Incomplete Work">Incomplete Work</option>
              <option value="Damaged Equipment">Damaged Equipment</option>
              <option value="Customer Dissatisfaction">Customer Dissatisfaction</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">STATUS</label>
            <span className="inline-block rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-3 py-1 text-xs font-bold text-[#D97706]">
              Open
            </span>
          </div>
        </div>

        {/* Details Box */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 text-xs space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>Job ID</span>
            <strong className="font-bold text-[#0F172A]">{jobCode}</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Installer</span>
            <strong className="font-bold text-[#0F172A]">{installerName}</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Customer</span>
            <strong className="font-bold text-[#0F172A]">Ade Bello</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Job Date</span>
            <strong className="font-bold text-[#0F172A]">15 Jun 2026</strong>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Amount in Dispute</span>
            <strong className="font-bold text-[#0F172A]">₦45,000</strong>
          </div>
        </div>

        {/* Dispute Description */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            DISPUTE DESCRIPTION
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the dispute in detail..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Evidence Attachments */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            EVIDENCE ATTACHMENTS
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs">
              <Paperclip className="size-3.5 text-[#64748B]" />
              <div>
                <p className="font-bold text-[#0F172A]">receipt_june2026.pdf</p>
                <p className="text-[10px] text-[#94A3B8]">156 KB</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs">
              <Paperclip className="size-3.5 text-[#64748B]" />
              <div>
                <p className="font-bold text-[#0F172A]">site_photo.jpg</p>
                <p className="text-[10px] text-[#94A3B8]">2.3 MB</p>
              </div>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#F8FAFC]"
            >
              <Plus className="size-3.5" />
              <span>Add File</span>
            </button>
          </div>
        </div>

        {/* Resolution Action */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            RESOLUTION ACTION
          </label>
          <select
            value={resolutionAction}
            onChange={(e) => setResolutionAction(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="">Select resolution... ▾</option>
            <option value="Release Payment to Installer">Release Payment to Installer</option>
            <option value="Refund Customer">Refund Customer</option>
            <option value="Split Dispute Amount">Split Dispute Amount</option>
          </select>
        </div>

        {/* Admin Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            ADMIN NOTES (INTERNAL)
          </label>
          <textarea
            rows={2}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add internal notes visible only to admin team..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>Resolution notes will be shared with the installer and customer upon submission.</span>
        </div>
      </div>
    </AppModal>
  );
}
