"use client";

import { useState } from "react";
import { Info, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type OnboardPartnerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function OnboardPartnerModal({
  open,
  onOpenChange,
  onSuccess,
}: OnboardPartnerModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [dob, setDob] = useState("");
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [idType, setIdType] = useState("National ID");
  const [idNumber, setIdNumber] = useState("");
  const [targetFrequency, setTargetFrequency] = useState<"monthly" | "quarterly" | "lifetime">("lifetime");
  const [pin, setPin] = useState(["1", "2", "3", "4"]);
  console.log(setPin)

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Onboard New Agency Partner"
      description="Create account and set activation target"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "create",
          label: "Create Account",
          variant: "primary",
          onClick: () => {
            onSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5 text-xs sm:text-sm">
        {/* Section 1: PERSONAL DETAILS */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Personal Details
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rabiu Sani"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 08120600542"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              >
                <option value="">Select state ▾</option>
                <option value="Lagos">Lagos</option>
                <option value="Kano">Kano</option>
                <option value="Abuja">Abuja</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">LGA</label>
              <input
                type="text"
                value={lga}
                onChange={(e) => setLga(e.target.value)}
                placeholder="Local Government Area"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">Date of Birth</label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="DD / MM / YYYY"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: IDENTITY VERIFICATION */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Identity Verification
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">
                BVN <span className="font-normal text-[#94A3B8]">(Required)</span>
              </label>
              <input
                type="text"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                placeholder="11-digit BVN"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">
                NIN <span className="font-normal text-[#94A3B8]">(Optional)</span>
              </label>
              <input
                type="text"
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                placeholder="11-digit NIN"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">ID Type</label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              >
                <option value="National ID">National ID / Passport / Driver's Licence / Voter's Card</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">ID Number</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Enter ID number"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: ASSIGN TO CORPORATE AGENT */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Assign to Corporate Agent
          </p>

          <input
            type="text"
            placeholder="Search Corporate Agent by name or phone..."
            className="mb-2 w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />

          {/* Selected Corporate Agent Box */}
          <div className="flex items-center justify-between rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5">
            <div>
              <p className="font-bold text-[#0F172A]">Usman Bello</p>
              <p className="text-xs text-[#64748B]">
                Corporate Agent · Kano · Managing 23 Agency Partners
              </p>
            </div>
            <span className="flex size-5 items-center justify-center rounded-md bg-[#10B981] text-white">
              <Check className="size-3.5 stroke-[3]" />
            </span>
          </div>

          <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB]">
            <Info className="mt-0.5 size-4 shrink-0" />
            <span>
              If this partner is being onboarded by an existing Agency Partner (sub-partner flow), search for the parent Agency Partner instead.
            </span>
          </div>

          <div className="mt-3">
            <label className="mb-1 block font-bold text-[#0F172A]">Parent Partner (optional)</label>
            <input
              type="text"
              placeholder="Search Agency Partner (if sub-partner)..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
            <span className="mt-1 block text-xs text-[#94A3B8]">
              Leave blank if this is a direct partner under a Corporate Agent
            </span>
          </div>
        </div>

        {/* Section 4: ACTIVATION TARGET */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Activation Target
          </p>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">
              Target SIM Activations
            </span>
            <p className="mt-1 text-3xl font-extrabold text-[#0F172A]">500</p>
            <p className="mt-1 text-xs text-[#64748B]">
              Partners reaching 500 activations + 50 sub-partners become eligible for upgrade to Corporate Agent
            </p>

            <div className="mt-3 flex items-center justify-center gap-4 text-xs font-bold">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="freq"
                  checked={targetFrequency === "monthly"}
                  onChange={() => setTargetFrequency("monthly")}
                  className="accent-[#2563EB]"
                />
                <span>Monthly</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="freq"
                  checked={targetFrequency === "quarterly"}
                  onChange={() => setTargetFrequency("quarterly")}
                  className="accent-[#2563EB]"
                />
                <span>Quarterly</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="freq"
                  checked={targetFrequency === "lifetime"}
                  onChange={() => setTargetFrequency("lifetime")}
                  className="accent-[#2563EB]"
                />
                <span>Lifetime</span>
              </label>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669]">
            <Check className="size-4 shrink-0 text-[#059669] stroke-[3]" />
            <span>
              <strong className="font-bold">Commission: ₦1,000 per SIM activation</strong> · This rate is fixed platform-wide and cannot be changed per partner
            </span>
          </div>
        </div>

        {/* Section 5: ACCOUNT SETUP */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Account Setup
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">Create PIN</label>
              <div className="flex gap-2">
                {pin.map((v, i) => (
                  <input
                    key={i}
                    type="password"
                    maxLength={1}
                    value={v ? "●" : ""}
                    readOnly
                    className="size-10 rounded-xl border border-[#E2E8F0] bg-white text-center font-bold text-[#0F172A]"
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-bold text-[#0F172A]">Confirm PIN</label>
              <div className="flex gap-2">
                {pin.map((v, i) => (
                  <input
                    key={i}
                    type="password"
                    maxLength={1}
                    value={v ? "●" : ""}
                    readOnly
                    className="size-10 rounded-xl border border-[#E2E8F0] bg-white text-center font-bold text-[#0F172A]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
