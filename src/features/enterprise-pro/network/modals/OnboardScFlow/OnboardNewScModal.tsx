import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { StateLgaSelect } from "@/components/forms/StateLgaSelect";
import { CheckCircle2, Search, UserPlus, Send } from "lucide-react";
import type { OnboardScResult } from '../../types/api';
import { useAddExistingCoordinator, useOnboardStateCoordinator, useVerifyCoordinator } from '../../api/mutations';
import { colors } from '@/constants/colors';

interface OnboardNewScModalProps {
  onClose: () => void;
  onOnboarded: (result: OnboardScResult) => void;
}

const input = "w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600 disabled:opacity-70";

/**
 * 1. POST /verify-coordinator by phone.
 * 2. Already a State Coordinator → POST /add-coordinator { phone }.
 *    Otherwise (not found, or a user who isn't an SC yet) → POST /onboard, prefilled from verification.
 */
export const OnboardNewScModal: React.FC<OnboardNewScModalProps> = ({ onClose, onOnboarded }) => {
  const [step, setStep] = useState<"verify" | "details">("verify");
  const [phone, setPhone] = useState("");
  const [form, setForm] = useState({ fullname: "", email: "", address: "", country: "Nigeria", dob: "", gender: "Male", reason: "", password: "", initialStock: "" });
  const [location, setLocation] = useState<{ state?: string; lga?: string }>({});
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const verify = useVerifyCoordinator();
  const addExisting = useAddExistingCoordinator();
  const onboard = useOnboardStateCoordinator();
  const person = verify.data && verify.variables?.phone === phone ? verify.data : undefined;
  const canAdd = Boolean(person?.exists && person.is_state_coordinator);
  const pending = addExisting.isPending || onboard.isPending;
  const close = () => { if (!pending) onClose(); };
  const valid = Boolean(form.fullname.trim() && form.email.trim() && location.state && location.lga && form.address.trim() && form.country.trim() && form.dob);

  const startOnboarding = () => {
    setForm((prev) => ({ ...prev, fullname: person?.name ?? "", email: person?.email ?? "" }));
    setLocation(person?.state ? { state: person.state } : {});
    setStep("details");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || pending) return;
    onboard.mutate({
      phone, fullname: form.fullname.trim(), email: form.email.trim(), state: location.state!, lga: location.lga!, address: form.address.trim(), country: form.country.trim(), dob: form.dob, gender: form.gender,
      initial_stock: Number(form.initialStock) || undefined, reason: form.reason.trim() || undefined, password: form.password || undefined,
    }, { onSuccess: onOnboarded });
  };

  return (
    <AppModal open onOpenChange={(open) => { if (!open) close(); }} size="lg" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Onboard State Coordinator</h3>
            <p className="text-xs text-slate-500">{step === "verify" ? "Start by verifying the phone number" : `Register ${phone} as a new coordinator`}</p>
          </div>
        </div>

        {step === "verify" ? <>
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number</label>
            <div className="flex gap-2">
              <input type="tel" inputMode="numeric" placeholder="08012345678" value={phone} disabled={pending} className={input}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 11)); verify.reset(); addExisting.reset(); }} />
              <button type="button" disabled={phone.length !== 11 || verify.isPending || pending} onClick={() => verify.mutate({ phone })} className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#1F3A5F] px-4 font-bold text-[#1F3A5F] hover:bg-slate-50 disabled:opacity-50">
                <Search className="size-3.5" />{verify.isPending ? "Checking…" : "Verify"}
              </button>
            </div>
          </div>

          {person?.exists && <div className={`p-3.5 rounded-xl border ${canAdd ? "bg-emerald-50 border-emerald-200" : "bg-blue-50 border-blue-200"}`}>
            <p className="font-bold text-slate-900">{person.name}</p>
            <p className="text-[11px] text-slate-500">{[person.email, person.state, person.status].filter(Boolean).join(" · ")}</p>
          </div>}
          {canAdd && <p className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 font-medium text-emerald-700"><CheckCircle2 className="mt-0.5 size-4 shrink-0" />{person?.message || "This person is already a State Coordinator."} Add them to your network.</p>}
          {person && !canAdd && <p className="flex items-start gap-2 rounded-xl bg-blue-50 p-3 font-medium text-blue-700"><UserPlus className="mt-0.5 size-4 shrink-0" />{person.exists ? "This account isn't a State Coordinator yet. Continue to onboard them; their details are prefilled." : "No account found for this number. Continue to onboard a new State Coordinator."}</p>}
          {verify.isError && <p className="rounded-xl bg-amber-50 p-3 font-medium text-amber-700">{verify.error.message} · You can onboard them as a new State Coordinator.</p>}

          <div className="flex items-center gap-3 pt-2">
            <button type="button" disabled={pending} onClick={close} className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
            {canAdd
              ? <button type="button" disabled={pending} onClick={() => addExisting.mutate({ phone }, { onSuccess: onClose })} className="flex-1 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 disabled:opacity-50">{addExisting.isPending ? "Adding…" : "Add to My State Coordinators"}</button>
              : <button type="button" disabled={!person && !verify.isError} onClick={startOnboarding} className="flex-1 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 disabled:opacity-50">Continue to Onboarding</button>}
          </div>
        </> : <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Full Name</label>
              <input type="text" required placeholder="e.g. Chidi Eze" value={form.fullname} onChange={set("fullname")} className={input} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input type="tel" value={phone} disabled className={input} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Email Address</label>
              <input type="email" required placeholder="name@simkash.ng" value={form.email} onChange={set("email")} className={input} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Date of Birth</label>
              <input type="date" required value={form.dob} max={new Date().toISOString().slice(0, 10)} onChange={set("dob")} className={input} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Assigned State & LGA</label>
              <StateLgaSelect value={location} onChange={setLocation} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Address</label>
              <input type="text" required placeholder="e.g. 12 Ogui Road, Enugu" value={form.address} onChange={set("address")} className={input} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Gender</label>
              <select value={form.gender} onChange={set("gender")} className={input}><option>Male</option><option>Female</option></select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Country</label>
              <input type="text" required value={form.country} onChange={set("country")} className={input} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Initial Stock (optional)</label>
              <input inputMode="numeric" placeholder="e.g. 50" value={form.initialStock} onChange={(e) => setForm((prev) => ({ ...prev, initialStock: e.target.value.replace(/\D/g, "") }))} className={input} />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Reason (optional)</label>
              <input type="text" placeholder="Registered by Enterprise" value={form.reason} onChange={set("reason")} className={input} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Password (optional)</label>
              <input type="password" autoComplete="new-password" placeholder="Leave blank for automatic credentials" value={form.password} onChange={set("password")} className={input} />
            </div>
          </div>

          {onboard.error && <p role="alert" className="text-xs" style={{ color: colors.danger }}>{onboard.error.message}</p>}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" disabled={pending} onClick={() => setStep("verify")} className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">Back</button>
            <button type="submit" disabled={!valid || pending} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 disabled:opacity-50">
              <Send className="w-4 h-4" />
              <span>{onboard.isPending ? "Onboarding…" : "Onboard State Coordinator"}</span>
            </button>
          </div>
        </form>}
      </div>
    </AppModal>
  );
};
