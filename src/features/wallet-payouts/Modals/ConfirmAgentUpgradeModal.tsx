"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Check } from "lucide-react";

type ConfirmAgentUpgradeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  onUpgradeSuccess?: () => void;
};

export function ConfirmAgentUpgradeModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  onUpgradeSuccess,
}: ConfirmAgentUpgradeModalProps) {
  const [subPartnerOption, setSubPartnerOption] = useState<"keep" | "reassign">("keep");
  const [pin, setPin] = useState(["", "", "", ""]);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Agent Upgrade"
      description={`Upgrade ${agentName} to Corporate Agent`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm_upgrade",
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
        {/* Top Green Info Card */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#10B981] font-bold text-white">
                RS
              </div>
              <div>
                <strong className="font-bold text-[#0F172A] block">{agentName}</strong>
                <span className="text-[11px] text-[#64748B]">Agency Partner → Corporate Agent</span>
              </div>
            </div>
            <span className="rounded-md bg-[#D1FAE5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
              Eligible
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#059669] font-bold pt-1">
            <span className="flex items-center gap-1">
              <Check className="size-3.5" /> 169% target achieved
            </span>
            <span className="flex items-center gap-1">
              <Check className="size-3.5" /> 8 consecutive months
            </span>
            <span className="flex items-center gap-1">
              <Check className="size-3.5" /> Compliance cleared
            </span>
          </div>
        </div>

        {/* WHAT CHANGES Table */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            WHAT CHANGES
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] overflow-x-auto text-xs">
            <table className="w-full min-w-[400px] text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B]">
                  <th className="p-3">Attribute</th>
                  <th className="p-3">Current</th>
                  <th className="p-3 text-[#059669]">After Upgrade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
                <tr>
                  <td className="p-3 text-[#64748B]">Role</td>
                  <td className="p-3">Agency Partner</td>
                  <td className="p-3 font-bold text-[#059669]">Corporate Agent</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#64748B]">Commission Rate</td>
                  <td className="p-3">8%</td>
                  <td className="p-3 font-bold text-[#059669]">12%</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#64748B]">Monthly Target</td>
                  <td className="p-3">50 activations</td>
                  <td className="p-3 font-bold text-[#059669]">100 activations</td>
                </tr>
                <tr>
                  <td className="p-3 text-[#64748B]">Sub-partner Limit</td>
                  <td className="p-3">5</td>
                  <td className="p-3 font-bold text-[#059669]">20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Green Notice Box */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669]">
          <Check className="size-4 shrink-0 text-[#059669] mt-0.5" />
          <p className="leading-relaxed font-medium">
            Upgrade takes effect immediately. New commission rates apply to activations from this point forward.
          </p>
        </div>

        {/* SUB-PARTNER ASSIGNMENT */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            SUB-PARTNER ASSIGNMENT
          </label>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-3">
            <label
              onClick={() => setSubPartnerOption("keep")}
              className={`flex items-start gap-3 cursor-pointer rounded-xl p-2.5 transition-all ${
                subPartnerOption === "keep" ? "bg-[#F3E8FF] border border-[#D8B4FE]" : ""
              }`}
            >
              <input
                type="radio"
                name="subpartner"
                checked={subPartnerOption === "keep"}
                onChange={() => setSubPartnerOption("keep")}
                className="size-4 accent-[#9333EA] mt-0.5"
              />
              <div>
                <strong className="font-bold text-[#0F172A] block text-xs">Keep current sub-partners assigned to {agentName}</strong>
                <span className="text-[11px] text-[#64748B]">They continue under his network</span>
              </div>
            </label>

            <label
              onClick={() => setSubPartnerOption("reassign")}
              className={`flex items-start gap-3 cursor-pointer rounded-xl p-2.5 transition-all ${
                subPartnerOption === "reassign" ? "bg-[#F3E8FF] border border-[#D8B4FE]" : ""
              }`}
            >
              <input
                type="radio"
                name="subpartner"
                checked={subPartnerOption === "reassign"}
                onChange={() => setSubPartnerOption("reassign")}
                className="size-4 accent-[#9333EA] mt-0.5"
              />
              <div>
                <strong className="font-bold text-[#0F172A] block text-xs">Reassign to network manager</strong>
                <span className="text-[11px] text-[#64748B]">Sub-partners moved up in hierarchy</span>
              </div>
            </label>
          </div>
        </div>

        {/* CONFIRM WITH PIN */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px] text-center">
            CONFIRM WITH PIN
          </label>
          <p className="text-[11px] text-[#94A3B8] text-center mb-2">
            Enter your 4-digit admin PIN to authorize this upgrade
          </p>
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                type="password"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => {
                  const newPin = [...pin];
                  newPin[idx] = e.target.value;
                  setPin(newPin);
                }}
                className="size-12 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] py-3 text-center font-bold text-[#0F172A] text-lg focus:border-[#9333EA] focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
