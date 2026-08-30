"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ApproveVendorApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendorName?: string;
  location?: string;
  onApproveSuccess?: () => void;
  onRejectClick?: () => void;
};

export function ApproveVendorApplicationModal({
  open,
  onOpenChange,
  vendorName = "Femi Enterprises Ltd",
  location = "Lagos",
  onApproveSuccess,
  onRejectClick,
}: ApproveVendorApplicationModalProps) {
  const [revenueShare, setRevenueShare] = useState("15");
  const [categories, setCategories] = useState({
    cctv: true,
    gps: false,
    solar: true,
    smartHome: false,
  });

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Approve Vendor Application"
      description={`${vendorName} · ${location}`}
      size="md"
      actions={[
        {
          key: "reject",
          label: "Reject",
          variant: "danger",
          onClick: () => {
            onRejectClick?.();
          },
        },
        {
          key: "approve",
          label: "Approve Vendor",
          variant: "primary",
          onClick: () => {
            onApproveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Vendor Header Card */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB] font-bold text-white shadow-xs">
                FE
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">{vendorName}</p>
                <p className="text-[11px] text-[#64748B]">CAC: BN-20241022-00847 · +234 803 456 7890</p>
              </div>
            </div>
            <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
              CCTV · Solar
            </span>
          </div>
        </div>

        {/* Verification Status */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            VERIFICATION STATUS
          </label>
          <div className="rounded-2xl bg-[#F8FAFC] p-4 text-xs space-y-2.5 divide-y divide-[#F1F5F9]">
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#10B981]" />
                <span className="font-medium text-[#0F172A]">CAC Registration</span>
              </div>
              <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Verified
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#10B981]" />
                <span className="font-medium text-[#0F172A]">BVN Matched</span>
              </div>
              <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Verified
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-[#10B981]" />
                <span className="font-medium text-[#0F172A]">Business Address Verified</span>
              </div>
              <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                Verified
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-[#D97706]" />
                <span className="font-medium text-[#0F172A]">Bank Account</span>
              </div>
              <span className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Share Config */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            REVENUE SHARE CONFIG
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-24">
              <input
                type="number"
                value={revenueShare}
                onChange={(e) => setRevenueShare(e.target.value)}
                className="w-full rounded-xl border-2 border-[#2563EB] bg-[#EFF6FF] px-3.5 py-2 text-center font-extrabold text-[#2563EB] text-base focus:outline-none"
              />
              <span className="absolute right-2 top-2.5 font-bold text-[#2563EB]">%</span>
            </div>
            <div className="text-xs">
              <p className="font-bold text-[#0F172A]">Vendor receives {revenueShare}%</p>
              <p className="text-[11px] text-[#64748B]">Simkash keeps {100 - (Number(revenueShare) || 0)}% platform fee</p>
            </div>
          </div>
        </div>

        {/* Approved Categories */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            APPROVED CATEGORIES
          </label>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={categories.cctv}
                onChange={(e) => setCategories({ ...categories, cctv: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
              />
              <span>SIM-Enabled CCTV</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={categories.gps}
                onChange={(e) => setCategories({ ...categories, gps: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
              />
              <span>GPS Tracking</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={categories.solar}
                onChange={(e) => setCategories({ ...categories, solar: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
              />
              <span>Solar Energy</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={categories.smartHome}
                onChange={(e) => setCategories({ ...categories, smartHome: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
              />
              <span>Smart Home</span>
            </label>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
