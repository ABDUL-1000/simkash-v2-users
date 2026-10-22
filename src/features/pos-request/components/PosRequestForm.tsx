import { useState } from "react";
import { Skeleton } from "antd";
import { StateLgaSelect, type StateLgaValue } from "@/components/forms/StateLgaSelect";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useAuthStore } from "@/store/authStore";
import { isValidNgPhone, normalizeNgPhone } from "@/features/bill-payment/utils/detectNetwork";
import { useCreatePosRequest, useGetPosRequestOptions } from "../api/usePosRequests";
import type { PosRequestDetail } from "../types/api";

const sectionLabel = "text-[11px] font-bold uppercase tracking-wide text-[#8C909B]";
const fieldLabel = "mb-2 block text-[11px] font-bold uppercase tracking-wide text-[#1F3A5F]";
const input = "w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F152A] outline-none transition placeholder:text-[#94A2B8] focus:border-[#2563EB] disabled:opacity-60";

function Pills({ options, value, onChange, disabled }: { options: string[]; value?: string; onChange: (value: string) => void; disabled?: boolean }) {
  return <div className="flex flex-wrap gap-2">{options.map(option => {
    const active = option === value;
    return <button key={option} type="button" disabled={disabled} onClick={() => onChange(option)} aria-pressed={active}
      className={`rounded-lg border px-4 py-2 text-sm transition disabled:opacity-60 ${active ? "border-[#2563EB] bg-[#2563EB] font-semibold text-white" : "border-[#E2ECF6] bg-white text-[#0F152A] hover:border-[#2563EB]"}`}>{option}</button>;
  })}</div>;
}

export function PosRequestForm({ onSubmitted }: { onSubmitted: (request: PosRequestDetail) => void }) {
  const options = useGetPosRequestOptions();
  const create = useCreatePosRequest();
  const profileName = useAuthStore(state => state.userProfile?.fullname) ?? "";
  const userPhone = useAuthStore(state => state.user?.phone) ?? "";

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<string>();
  const [volume, setVolume] = useState<string>();
  const [location, setLocation] = useState<StateLgaValue>({});
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<string>();
  const [fullname, setFullname] = useState(profileName);
  const [phone, setPhone] = useState(normalizeNgPhone(userPhone));
  const [notes, setNotes] = useState("");
  const pending = create.isPending;

  const clear = () => {
    setBusinessName(""); setBusinessType(undefined); setVolume(undefined); setLocation({}); setAddress(""); setProvider(undefined);
    setFullname(profileName); setPhone(normalizeNgPhone(userPhone)); setNotes(""); create.reset();
  };
  const phoneInvalid = phone.length === 11 && !isValidNgPhone(phone);
  const valid = Boolean(businessName.trim() && businessType && volume && location.state && location.lga && provider && fullname.trim() && isValidNgPhone(phone));
  const submit = () => {
    if (!valid || !businessType || !volume || !provider || !location.state || !location.lga) return;
    create.mutate({
      business_name: businessName.trim(), business_type: businessType, estimated_monthly_transactions: volume, state: location.state, lga: location.lga,
      business_address: address.trim() || undefined, preferred_pos_provider: provider, fullname: fullname.trim(), phone, additional_notes: notes.trim() || undefined,
    }, { onSuccess: response => { onSubmitted(response.data); clear(); } });
  };

  if (options.isLoading) return <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6"><Skeleton active paragraph={{ rows: 10 }} /></div>;
  if (options.error || !options.data) return <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6"><AppEmptyState title="Couldn't load the request form" description={options.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void options.refetch()} /></div>;
  const opts = options.data;

  return <div className="space-y-5 rounded-2xl border border-[#E2ECF6] bg-white p-5 sm:p-6">
    <p className={sectionLabel}>Your business details</p>
    <label className="block"><span className={fieldLabel}>Business / Store name *</span><input className={input} disabled={pending} value={businessName} onChange={event => setBusinessName(event.target.value)} placeholder="e.g. Chidi's Provisions Store" /></label>
    <div><span className={fieldLabel}>Business type *</span><Pills options={opts.business_types} value={businessType} onChange={setBusinessType} disabled={pending} /></div>
    <div><span className={fieldLabel}>Estimated monthly transactions *</span><Pills options={opts.estimated_monthly_transactions} value={volume} onChange={setVolume} disabled={pending} /></div>
    <div>
      <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2"><span className={`${fieldLabel} mb-0!`}>State *</span><span className={`${fieldLabel} mb-0! hidden sm:block`}>LGA / Area *</span></div>
      <StateLgaSelect value={location} onChange={setLocation} disabled={pending} className="grid grid-cols-1 gap-4 sm:grid-cols-2" lgaPlaceholder="Select your LGA or area" />
    </div>
    <label className="block"><span className={fieldLabel}>Business address (optional)</span><input className={input} disabled={pending} value={address} onChange={event => setAddress(event.target.value)} placeholder="Street address" /></label>
    <div><span className={fieldLabel}>Preferred POS provider *</span><Pills options={opts.preferred_pos_providers} value={provider} onChange={setProvider} disabled={pending} /></div>

    <hr className="border-[#E2ECF6]" />
    <p className={sectionLabel}>Contact details</p>
    <label className="block"><span className={fieldLabel}>Full name *</span><input className={input} disabled={pending} value={fullname} onChange={event => setFullname(event.target.value)} placeholder="Your full name" /></label>
    <label className="block"><span className={fieldLabel}>Phone number *</span>
      <input className={`${input} ${phoneInvalid ? "border-[#EF4444]" : ""}`} disabled={pending} inputMode="numeric" maxLength={11} value={phone} onChange={event => setPhone(normalizeNgPhone(event.target.value))} placeholder="08012345678" />
      <span className={`mt-1 block text-[11px] italic ${phoneInvalid ? "text-[#EF4444]" : "text-[#8C909B]"}`}>{phoneInvalid ? "Enter a valid 11-digit Nigerian number" : "Your phone number to receive provider's contact"}</span>
    </label>
    <p className="rounded-xl bg-[#EFF4F8] px-4 py-3 text-xs font-semibold text-[#2563EB]">Your phone number will be shared with the assigned POS provider so they can contact you directly.</p>

    <hr className="border-[#E2ECF6]" />
    <label className="block"><span className={sectionLabel}>Additional notes (optional)</span><textarea className={`${input} mt-2 min-h-24`} disabled={pending} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Any specific requirements for your POS terminal..." /></label>

    {create.error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">{create.error.message}</p>}
    <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-5">
      <button type="button" onClick={clear} disabled={pending} className="px-4 py-2 text-sm font-semibold text-[#8C909B] hover:text-[#0F152A] disabled:opacity-50">Clear Form</button>
      <button type="button" onClick={submit} disabled={!valid || pending} className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50">{pending ? "Submitting…" : "Submit Request"}</button>
    </div>
  </div>;
}
