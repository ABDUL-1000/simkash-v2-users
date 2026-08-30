"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type UpgradeToCorporateAgentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerName?: string;
  phone?: string;
  onUpgradeSuccess?: () => void;
};

export function UpgradeToCorporateAgentModal({
  open,
  onOpenChange,
  partnerName = "Rabiu Sani",
  phone = "08120600542",
  onUpgradeSuccess,
}: UpgradeToCorporateAgentModalProps) {
  const [subPartnersHandling, setSubPartnersHandling] = useState<"keep" | "reassign">("keep");
  const [pin, setPin] = useState(["1", "2", "3", "4"]);
      console.log(setPin)


  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Upgrade to Corporate Agent"
      description={`${partnerName} · ${phone}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "upgrade",
          label: "Confirm Upgrade",
          variant: "primary",
          onClick: () => {
            onUpgradeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Eligibility Check Banner */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs text-[#059669] space-y-1">
          <p className="font-bold text-sm">
            ● Eligibility Check: {partnerName} meets all upgrade requirements
          </p>
          <p className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-[#059669]" />
            847 activations completed (minimum 500 required)
          </p>
          <p className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-[#059669]" />
            63 active sub-partners (minimum 50 required)
          </p>
        </div>

        {/* What Changes Table */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">What Changes</p>
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white text-xs">
            <div className="grid grid-cols-3 bg-[#F8FAFC] p-3 font-bold uppercase tracking-wide text-[#64748B]">
              <span></span>
              <span>AGENCY PARTNER</span>
              <span className="text-[#9333EA]">CORPORATE AGENT</span>
            </div>

            <div className="divide-y divide-[#F1F5F9]">
              <div className="grid grid-cols-3 p-3">
                <span className="text-[#64748B]">Role</span>
                <span className="text-[#0F172A]">Agency Partner</span>
                <strong className="font-bold text-[#9333EA]">Corporate Agent</strong>
              </div>

              <div className="grid grid-cols-3 p-3">
                <span className="text-[#64748B]">Dashboard</span>
                <span className="text-[#0F172A]">Standard view</span>
                <strong className="font-bold text-[#9333EA]">Enhanced view</strong>
              </div>

              <div className="grid grid-cols-3 p-3">
                <span className="text-[#64748B]">Can manage</span>
                <span className="text-[#0F172A]">Up to 63 partners</span>
                <strong className="font-bold text-[#9333EA]">Unlimited partners</strong>
              </div>

              <div className="grid grid-cols-3 p-3">
                <span className="text-[#64748B]">SIM requests</span>
                <span className="text-[#0F172A]">Via Corporate Agent</span>
                <strong className="font-bold text-[#9333EA]">Direct from Admin</strong>
              </div>

              <div className="grid grid-cols-3 p-3">
                <span className="text-[#64748B]">Commission</span>
                <span className="text-[#0F172A]">₦2.50/activation</span>
                <strong className="font-bold text-[#9333EA]">₦150/activation + override</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Permanent Upgrade Info Banner */}
        <div className="flex items-start gap-2 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669]">
          <Info className="mt-0.5 size-4 shrink-0 text-[#059669]" />
          <span>
            This upgrade is permanent and cannot be reversed. All Corporate Agent permissions take effect immediately upon confirmation.
          </span>
        </div>

        {/* Sub-Partners Handling Radio Selector */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            SUB-PARTNERS HANDLING
          </p>
          <div className="space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="radio"
                name="handling"
                checked={subPartnersHandling === "keep"}
                onChange={() => setSubPartnersHandling("keep")}
                className="size-4 accent-[#9333EA]"
              />
              <span>Keep all 63 sub-partners under {partnerName}</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="radio"
                name="handling"
                checked={subPartnersHandling === "reassign"}
                onChange={() => setSubPartnersHandling("reassign")}
                className="size-4 accent-[#9333EA]"
              />
              <span>Reassign sub-partners to another Corporate Agent</span>
            </label>
          </div>
        </div>

        {/* Confirm With PIN */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            CONFIRM WITH PIN
          </p>
          <div className="flex gap-3">
            {pin.map((v, i) => (
              <input
                key={i}
                type="password"
                maxLength={1}
                value={v ? "●" : ""}
                readOnly
                className="size-12 rounded-xl border border-[#E2E8F0] bg-white text-center font-bold text-[#0F172A]"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
