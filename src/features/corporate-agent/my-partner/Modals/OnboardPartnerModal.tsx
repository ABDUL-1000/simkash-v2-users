import { useState } from "react";
import { CheckCircle2, Search, UserPlus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { StateLgaSelect } from "@/components/forms/StateLgaSelect";
import { openNotification } from "@/utils/notifications";
import { useCaAddExistingPartner, useCaOnboardPartner, useCaVerifyPartner } from "../api/useCaPartners";

type OnboardPartnerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

const inputClass = "w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none disabled:bg-[#F8FAFC]";
const initialsOf = (name = "") => name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

/**
 * 1. POST /my-partner/verify-partner by phone.
 * 2. isRegistered=true → already an Agency Partner: POST /my-partner/add-partner { phone }.
 *    isRegistered=false, or no account found → POST /my-partner/onboard with the profile (prefilled from verification).
 */
export function OnboardPartnerModal({ open, onOpenChange, onSuccess }: OnboardPartnerModalProps) {
  const [step, setStep] = useState<"verify" | "details">("verify");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState<{ state?: string; lga?: string }>({});
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [reason, setReason] = useState("");
  const [password, setPassword] = useState("");

  const verify = useCaVerifyPartner();
  const addExisting = useCaAddExistingPartner();
  const onboardMutation = useCaOnboardPartner();
  const pending = addExisting.isPending || onboardMutation.isPending;
  const person = verify.data && verify.variables?.phone === phone ? verify.data.data : undefined;
  const canAdd = person?.isRegistered === true;

  const reset = () => {
    setStep("verify"); setPhone(""); setFullName(""); setEmail(""); setLocation({}); setAddress(""); setDob(""); setCountry("Nigeria"); setReason(""); setPassword("");
    verify.reset(); addExisting.reset(); onboardMutation.reset();
  };
  const close = () => { if (pending) return; reset(); onOpenChange(false); };
  const done = () => { onSuccess?.(); reset(); onOpenChange(false); };
  const startOnboarding = () => {
    setFullName(person?.fullname ?? ""); setEmail(person?.email ?? ""); setCountry(person?.country || "Nigeria");
    setStep("details");
  };

  const handleCreateAccount = () => {
    const missing = [[fullName, "Full name"], [email, "Email"], [location.state, "State"], [location.lga, "LGA"], [address, "Street address"], [dob, "Date of birth"], [country, "Country"]]
      .find(([value]) => !String(value ?? "").trim())?.[1];
    if (missing) {
      openNotification({ state: "error", title: "Validation error", description: `${missing} is required.` });
      return;
    }
    onboardMutation.mutate({
      phone, fullname: fullName.trim(), email: email.trim(), state: location.state!, lga: location.lga!, address: address.trim(), dob, country: country.trim(),
      reason: reason.trim() || undefined, password: password || undefined,
    }, { onSuccess: done });
  };

  const verifyActions = [
    { key: "cancel", label: "Cancel", variant: "secondary" as const, disabled: pending, onClick: close },
    canAdd
      ? { key: "add", label: addExisting.isPending ? "Adding..." : "Add to My Network", variant: "primary" as const, disabled: pending, onClick: () => addExisting.mutate({ phone }, { onSuccess: done }) }
      : person || verify.isError
        ? { key: "continue", label: "Continue to Onboarding", variant: "primary" as const, onClick: startOnboarding }
        : { key: "verify", label: verify.isPending ? "Verifying..." : "Verify", variant: "primary" as const, disabled: phone.length !== 11 || verify.isPending, onClick: () => verify.mutate({ phone }) },
  ];
  const detailActions = [
    { key: "back", label: "Back", variant: "secondary" as const, disabled: pending, onClick: () => setStep("verify") },
    { key: "create", label: onboardMutation.isPending ? "Creating..." : "Create Account", variant: "primary" as const, onClick: handleCreateAccount, disabled: pending },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={(value) => { if (!value) close(); }}
      title="Onboard New Agency Partner"
      description={step === "verify" ? "Start by verifying the partner's phone number" : "Create the partner account"}
      size="lg"
      showCloseButton={!pending}
      actions={step === "verify" ? verifyActions : detailActions}
    >
      {step === "verify" ? (
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Partner Phone Number</label>
            <div className="flex gap-2">
              <input type="text" inputMode="numeric" value={phone} disabled={pending} placeholder="e.g. 08120600542" className={inputClass}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 11)); verify.reset(); addExisting.reset(); }} />
              <button type="button" disabled={phone.length !== 11 || verify.isPending || pending} onClick={() => verify.mutate({ phone })}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#2563EB] px-4 font-bold text-[#2563EB] hover:bg-[#EFF6FF] disabled:opacity-50">
                <Search className="size-3.5" />{verify.isPending ? "Checking…" : "Verify"}
              </button>
            </div>
          </div>

          {person && <div className={`flex items-center gap-3 rounded-xl border p-3.5 ${canAdd ? "border-[#A7F3D0] bg-[#ECFDF5]" : "border-[#BFDBFE] bg-[#EFF6FF]"}`}>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-xs font-black text-white">{initialsOf(person.fullname)}</div>
            <div className="min-w-0">
              <p className="truncate font-bold text-[#0F172A]">{person.fullname}</p>
              <p className="text-xs text-[#64748B]">{[person.email, person.gender, person.country].filter(Boolean).join(" · ")}</p>
            </div>
          </div>}
          {canAdd && <p className="flex items-start gap-2 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs font-medium text-[#059669]"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />This person is already an Agency Partner. Add them to your network.</p>}
          {person && !canAdd && <p className="flex items-start gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs font-medium text-[#2563EB]"><UserPlus className="mt-0.5 size-4 shrink-0" />This account isn't an Agency Partner yet. Continue to onboard them; their details are prefilled.</p>}
          {verify.isError && <p className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs font-medium text-[#B45309]">{verify.error.message} · You can onboard them as a new Agency Partner.</p>}
        </div>
      ) : (
        <div className="space-y-5 text-xs sm:text-sm">
          {/* Section 1: PERSONAL DETAILS */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">Personal Details</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Rabiu Sani" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Phone Number</label>
                <input type="text" value={phone} disabled className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. rabiu@email.com" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Date of Birth</label>
                <input type="date" value={dob} max={new Date().toISOString().slice(0, 10)} onChange={(e) => setDob(e.target.value)} className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block font-bold text-[#0F172A]">State & LGA</label>
                <StateLgaSelect value={location} onChange={setLocation} />
              </div>
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Street Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 14 Toyin Street, Ikeja" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Country</label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Section 2: ACCOUNT SETUP */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">Account Setup</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Reason <span className="font-normal text-[#94A3B8]">(Optional)</span></label>
                <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Agency Partner onboarding" className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block font-bold text-[#0F172A]">Password <span className="font-normal text-[#94A3B8]">(Optional)</span></label>
                <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank for automatic credentials" className={inputClass} />
              </div>
            </div>
          </div>

          {/* Identity verification (BVN/NIN/ID), corporate-agent assignment, activation target and PIN sections are removed:
              /my-partner/onboard takes none of those fields. */}
        </div>
      )}
    </AppModal>
  );
}
