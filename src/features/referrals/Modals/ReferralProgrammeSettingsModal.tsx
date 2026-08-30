"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ReferralProgrammeSettingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess?: () => void;
};

export function ReferralProgrammeSettingsModal({
  open,
  onOpenChange,
  onSaveSuccess,
}: ReferralProgrammeSettingsModalProps) {
  const [rate, setRate] = useState("50,000");

  const [segments, setSegments] = useState({
    companies: true,
    corporate: true,
    estates: true,
    government: true,
  });

  const [whoCanRefer, setWhoCanRefer] = useState({
    agencyPartner: true,
    corporateAgent: true,
    enterprise: true,
    normalUser: true,
    installer: true,
    superAdmin: false,
  });

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Referral Programme Settings"
      description="Configure commission rate and eligibility"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save",
          label: "Save Programme Settings",
          variant: "primary",
          onClick: () => {
            onSaveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Commission Per Closed Deal */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            COMMISSION PER CLOSED DEAL
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-bold text-[#0F172A]">₦</span>
            <input
              type="text"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-8 pr-3.5 py-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
          <span className="mt-1 block text-[11px] text-[#94A3B8]">
            This rate applies to all roles and all eligible segments
          </span>
        </div>

        {/* Qualifying Referral Segments */}
        <div>
          <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B]">
            QUALIFYING REFERRAL SEGMENTS
          </label>
          <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-[#0F172A]">Companies & Businesses</span>
              <input
                type="checkbox"
                checked={segments.companies}
                onChange={(e) => setSegments({ ...segments, companies: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Corporate White-Label</span>
              <input
                type="checkbox"
                checked={segments.corporate}
                onChange={(e) => setSegments({ ...segments, corporate: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Estates</span>
              <input
                type="checkbox"
                checked={segments.estates}
                onChange={(e) => setSegments({ ...segments, estates: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Government Institutions</span>
              <input
                type="checkbox"
                checked={segments.government}
                onChange={(e) => setSegments({ ...segments, government: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>
          </div>
        </div>

        {/* What Counts As A Closed Deal Box */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            WHAT COUNTS AS A CLOSED DEAL
          </label>
          <div className="rounded-xl bg-[#EFF6FF] p-3 text-xs text-[#0F172A] leading-relaxed">
            Organisation completes registration AND makes a qualifying purchase or commitment on the platform.
          </div>
        </div>

        {/* Who Can Refer */}
        <div>
          <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B]">
            WHO CAN REFER
          </label>
          <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-[#0F172A]">Agency Partner</span>
              <input
                type="checkbox"
                checked={whoCanRefer.agencyPartner}
                onChange={(e) => setWhoCanRefer({ ...whoCanRefer, agencyPartner: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Corporate Agent</span>
              <input
                type="checkbox"
                checked={whoCanRefer.corporateAgent}
                onChange={(e) => setWhoCanRefer({ ...whoCanRefer, corporateAgent: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Enterprise</span>
              <input
                type="checkbox"
                checked={whoCanRefer.enterprise}
                onChange={(e) => setWhoCanRefer({ ...whoCanRefer, enterprise: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Normal User</span>
              <input
                type="checkbox"
                checked={whoCanRefer.normalUser}
                onChange={(e) => setWhoCanRefer({ ...whoCanRefer, normalUser: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Installer</span>
              <input
                type="checkbox"
                checked={whoCanRefer.installer}
                onChange={(e) => setWhoCanRefer({ ...whoCanRefer, installer: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F172A]">Super Admin (Internal)</span>
              <input
                type="checkbox"
                checked={whoCanRefer.superAdmin}
                onChange={(e) => setWhoCanRefer({ ...whoCanRefer, superAdmin: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#10B981]"
              />
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p className="leading-relaxed">
            Changes apply to new referrals only. Existing pending commissions use the rate at time of referral.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
