import { useRef, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Select } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { ArrowLeft, ArrowRight, Check, Info, X } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { StateLgaSelect, type StateLgaValue } from "@/components/forms/StateLgaSelect";
import { resolveNigeriaState } from "@/hooks/useNigeriaLocations";
import { useAuthStore } from "@/store/authStore";
import { isValidNgPhone, normalizeNgPhone } from "@/features/bill-payment/utils/detectNetwork";
import { useGetApplicationOptions, useGetApplicationStatus, useSubmitApplication } from "../api/useAgentApplications";
import type { ApplicationRole, ApplicationSubmitResult } from "../types/api";
import { ApplicationTimeline } from "../components/ApplicationTimeline";
import { isOpenApplication, roleFromSlug, roleTitle } from "../utils/applicationStatus";

const STEPS = ["Details", "Identity", "Review & Submit"] as const;
const label = "mb-1.5 block text-sm font-medium text-[#0F152A]";
const input = "w-full rounded-lg border border-[#E2ECF6] bg-white px-3 py-2.5 text-sm text-[#0F152A] outline-none transition placeholder:text-[#94A2B8] focus:border-[#2563EB] read-only:bg-[#EFF4F8]";
const sectionTitle = "text-[11px] font-bold uppercase tracking-wide text-[#0F152A]";

interface FormState {
  fullname: string; email: string; phone: string; gender?: string; dob?: Dayjs | null; location: StateLgaValue; address: string; reason: string;
  business_name: string; estimated_monthly_volume: string; experience: string; coverage_area: string; referred_by: string; idFile?: File | null;
}

function Field({ title, hint, children }: { title: string; hint?: ReactNode; children: ReactNode }) {
  return <label className="block"><span className={label}>{title}</span>{children}{hint && <span className="mt-1 block text-[11px] text-[#8C909B]">{hint}</span>}</label>;
}

function Stepper({ step }: { step: number }) {
  return <ol className="flex items-center justify-between gap-2 rounded-2xl border border-[#E2ECF6] bg-white px-4 py-3">
    {STEPS.map((title, index) => {
      const done = index < step; const current = index === step;
      return <li key={title} className={`flex items-center gap-2 text-xs sm:text-sm ${done ? "text-[#10B981]" : current ? "font-semibold text-[#2563EB]" : "text-[#66738C]"}`}>
        <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-bold ${done ? "bg-[#10B981] text-white" : current ? "bg-[#2563EB] text-white" : "bg-[#EFF4F8] text-[#66738C]"}`}>{done ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}</span>
        <span className="hidden sm:inline">{title}</span>{index < STEPS.length - 1 && <ArrowRight className="hidden size-3.5 sm:block" />}
      </li>;
    })}
  </ol>;
}

function ReviewSection({ title, onEdit, rows }: { title: string; onEdit: () => void; rows: Array<[string, ReactNode]> }) {
  return <div className="rounded-xl bg-[#F8FAFC] p-4">
    <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold text-[#0F152A]">{title}</h3><button type="button" onClick={onEdit} className="text-xs font-semibold text-[#2563EB]">Edit</button></div>
    <dl className="space-y-2 text-xs">{rows.filter(([, value]) => value).map(([key, value]) => <div key={key} className="grid grid-cols-[120px_1fr] gap-3"><dt className="text-[#8C909B]">{key}</dt><dd className="text-[#0F152A]">{value}</dd></div>)}</dl>
  </div>;
}

function Submitted({ result, onStatus, onDashboard }: { result: ApplicationSubmitResult; onStatus: () => void; onDashboard: () => void }) {
  return <div className="mx-auto max-w-lg space-y-6 py-8 text-center">
    <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EFF4F8] text-2xl font-bold text-[#2563EB]">{result.role === "partner" ? "U" : "S"}</span>
    <div><h1 className="text-2xl font-bold text-[#0F152A]">Application Submitted!</h1><p className="mt-2 text-xs text-[#66738C]">Application ref:</p>
      <p className="mx-auto mt-1 inline-block rounded-lg bg-[#F8FAFC] px-3 py-1 text-base font-bold text-[#0F152A]">#{result.application_id}</p></div>
    <p className="text-sm text-[#66738C]">{result.role_label} · <span className="font-semibold text-[#D9990D]">{result.status_label}</span> · {result.createdAt_formatted}</p>
    <div className="mx-auto w-fit text-left"><ApplicationTimeline status={result.status} /></div>
    <p className="text-xs text-[#8C909B]">You'll continue as a Normal User while your application is reviewed.</p>
    {/* "Next steps" (SMS confirmation, sponsor notified) are not shown: the API doesn't confirm these. */}
    <div className="grid grid-cols-2 gap-3">
      <button type="button" onClick={onStatus} className="rounded-lg border border-[#E2ECF6] bg-white py-2.5 text-sm font-medium text-[#0F152A] hover:bg-slate-50">View Application Status</button>
      <button type="button" onClick={onDashboard} className="rounded-lg bg-[#2563EB] py-2.5 text-sm font-medium text-white hover:bg-blue-700">Back to Dashboard</button>
    </div>
  </div>;
}

export function ApplicationFormPage() {
  const { role: slug } = useParams();
  const role = roleFromSlug(slug);
  return role ? <ApplicationForm key={role} role={role} /> : <AppEmptyState title="Unknown application type" description="Choose Agency Partner or State Coordinator." />;
}

function ApplicationForm({ role }: { role: ApplicationRole }) {
  const navigate = useNavigate();
  const options = useGetApplicationOptions();
  const status = useGetApplicationStatus();
  const submit = useSubmitApplication(role);
  const user = useAuthStore(state => state.user);
  const profile = useAuthStore(state => state.userProfile);
  const fileInput = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<ApplicationSubmitResult | null>(null);
  const [form, setForm] = useState<FormState>(() => ({
    fullname: profile?.fullname ?? "", email: user?.email ?? "", phone: normalizeNgPhone(user?.phone ?? ""), gender: profile?.gender || undefined, dob: null,
    location: {}, address: "", reason: "", business_name: "", estimated_monthly_volume: "", experience: "", coverage_area: "", referred_by: "", idFile: null,
  }));
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm(current => ({ ...current, [key]: value }));
  const title = `${roleTitle(role)} Application`;
  const isPartner = role === "partner";
  const lockedFromProfile = { fullname: Boolean(profile?.fullname), email: Boolean(user?.email), phone: Boolean(user?.phone) };

  const existingStatus = isPartner ? status.data?.partner_status : status.data?.state_coordinator_status;
  const existing = isPartner ? status.data?.partner_application : status.data?.state_coordinator_application;
  const opts = options.data;

  // The API's state list ("FCT - Abuja", …) is canonical for submission; the picker uses the shared NG states package.
  const apiState = (picked?: string) => opts?.states.find(state => resolveNigeriaState(state) === picked) ?? picked;
  const referral = form.referred_by.trim();
  const detailsErrors = {
    fullname: !form.fullname.trim(), email: !/^\S+@\S+\.\S+$/.test(form.email.trim()), phone: !isValidNgPhone(form.phone), gender: !form.gender, dob: !form.dob,
    state: !form.location.state, lga: !form.location.lga, address: !form.address.trim(), reason: !form.reason.trim(), referred_by: Boolean(referral) && !/^\d+$/.test(referral),
  };
  const detailsValid = !Object.values(detailsErrors).some(Boolean);
  const showError = (key: keyof typeof detailsErrors) => touched && detailsErrors[key];

  const next = () => {
    if (step === 0) { setTouched(true); if (!detailsValid) return; }
    setStep(current => Math.min(current + 1, STEPS.length - 1));
  };
  const send = () => {
    if (!detailsValid || !form.gender || !form.dob || !form.location.state || !form.location.lga) { setStep(0); setTouched(true); return; }
    const base = {
      fullname: form.fullname.trim(), email: form.email.trim(), phone: form.phone, gender: form.gender, dob: form.dob.format("YYYY-MM-DD"), country: "Nigeria",
      state: apiState(form.location.state) ?? form.location.state, lga: form.location.lga, address: form.address.trim(), reason: form.reason.trim(),
      ...(referral ? { referred_by: Number(referral) } : {}),
      // idCard is omitted: uploads are not stored yet, so the selected file stays on the device.
    };
    const extra = isPartner
      ? { ...(form.business_name.trim() ? { business_name: form.business_name.trim() } : {}), ...(form.estimated_monthly_volume.trim() ? { estimated_monthly_volume: form.estimated_monthly_volume.trim() } : {}) }
      : { ...(form.experience.trim() ? { experience: form.experience.trim() } : {}), ...(form.coverage_area.trim() ? { coverage_area: form.coverage_area.trim() } : {}) };
    submit.mutate({ ...base, ...extra }, { onSuccess: response => setResult(response.data) });
  };

  const header = <div className="flex items-center justify-between gap-3 border-b border-[#E2ECF6] bg-white px-4 py-3 sm:px-6">
    <div className="flex items-center gap-3"><button type="button" aria-label="Back" onClick={() => navigate(appPaths.becomePartner)} className="text-[#2563EB]"><ArrowLeft className="size-5" /></button><h1 className="text-base font-bold text-[#0F152A] sm:text-lg">{title}</h1></div>
    <span className="hidden text-xs text-[#66738C] sm:block">{step === 0 ? `Become a Partner → ${roleTitle(role)}` : `Step ${step + 1} of ${STEPS.length}`}</span>
  </div>;

  if (result) return <div className="rounded-2xl border border-[#E2ECF6] bg-white px-4"><Submitted result={result} onStatus={() => navigate(`${appPaths.becomePartner}#application-status`)} onDashboard={() => navigate(appPaths.dashboard)} /></div>;
  if (options.isLoading || status.isLoading) return <div className="space-y-4"><div className="h-14 animate-pulse rounded-xl bg-slate-100" /><div className="mx-auto h-96 max-w-3xl animate-pulse rounded-2xl bg-slate-100" /></div>;
  if (options.error || !opts) return <AppEmptyState title="Couldn't load the application form" description={options.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void options.refetch()} />;
  if (existing && isOpenApplication(existingStatus)) {
    return <div className="mx-auto max-w-lg space-y-5 py-8 text-center">
      <h1 className="text-xl font-bold text-[#0F152A]">You've already applied</h1>
      <p className="text-sm text-[#66738C]">{existing.role_label} application #{existing.id} · submitted {existing.createdAt_formatted} · <span className="font-semibold">{existing.status_label}</span></p>
      <div className="mx-auto w-fit text-left"><ApplicationTimeline status={existing.status} /></div>
      <button type="button" onClick={() => navigate(appPaths.becomePartner)} className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white">Back to Become a Partner</button>
    </div>;
  }

  return <div className="flex flex-col overflow-hidden rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC]">
    {header}
    <div className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-6">
      <Stepper step={step} />

      <div className="space-y-5 rounded-2xl border border-[#E2ECF6] bg-white p-5 sm:p-6">
        {step === 0 && <>
          <h2 className="text-lg font-bold text-[#0F152A]">Personal Information</h2>
          <Field title="Full Name"><input className={input} readOnly={lockedFromProfile.fullname} value={form.fullname} onChange={event => set("fullname", event.target.value)} /></Field>
          <Field title="Phone"><input className={input} readOnly={lockedFromProfile.phone} inputMode="numeric" maxLength={11} value={form.phone} onChange={event => set("phone", normalizeNgPhone(event.target.value))} /></Field>
          <Field title="Email" hint={<>Information pulled from your account profile<br /><button type="button" onClick={() => navigate(appPaths.settings)} className="font-medium text-[#2563EB]">Update in Settings if incorrect</button></>}>
            <input className={input} readOnly={lockedFromProfile.email} type="email" value={form.email} onChange={event => set("email", event.target.value)} />
          </Field>
          {(showError("fullname") || showError("email") || showError("phone")) && <p className="text-xs text-[#EF4444]">Your name, a valid email and an 11-digit phone number are required.</p>}
          <hr className="border-[#E2ECF6]" />

          <Field title="Gender" hint={showError("gender") && <span className="text-[#EF4444]">Select your gender</span>}>
            <Select className="w-full" size="large" placeholder="Select gender" value={form.gender} onChange={value => set("gender", value)} options={opts.genders.map(gender => ({ value: gender, label: gender }))} />
          </Field>
          <Field title="Date of Birth" hint={showError("dob") && <span className="text-[#EF4444]">Enter your date of birth</span>}>
            <DatePicker className="w-full" size="large" format="DD / MM / YYYY" placeholder="DD / MM / YYYY" value={form.dob} onChange={value => set("dob", value)} disabledDate={date => date.isAfter(dayjs())} />
          </Field>
          <div>
            <div className="mb-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2"><span className="text-sm font-medium text-[#0F152A]">State (required)</span><span className="hidden text-sm font-medium text-[#0F152A] sm:block">LGA (required)</span></div>
            <StateLgaSelect value={form.location} onChange={value => set("location", value)} statePlaceholder="Select state" lgaPlaceholder="Select LGA" />
            {(showError("state") || showError("lga")) && <p className="mt-1 text-[11px] text-[#EF4444]">Select your state and LGA</p>}
          </div>
          <Field title="Full Address (required)" hint={showError("address") && <span className="text-[#EF4444]">Enter your address</span>}>
            <input className={input} value={form.address} onChange={event => set("address", event.target.value)} placeholder="Your current address" />
          </Field>
          {/* Landmark, "Where will you operate?" chips and "How did you hear about us?" are not fields on the apply endpoints. */}
          <hr className="border-[#E2ECF6]" />

          <p className={sectionTitle}>{isPartner ? "Your Business" : "Your Experience"}</p>
          {isPartner ? <>
            <Field title="Business Name (optional)"><input className={input} value={form.business_name} onChange={event => set("business_name", event.target.value)} placeholder="E.g. Chuks Communications & Cyber Cafe" /></Field>
            <Field title="Estimated Monthly Volume (optional)"><input className={input} value={form.estimated_monthly_volume} onChange={event => set("estimated_monthly_volume", event.target.value)} placeholder="E.g. 200-500 SIMs" /></Field>
          </> : <>
            <Field title="Experience (optional)"><input className={input} value={form.experience} onChange={event => set("experience", event.target.value)} placeholder="E.g. 6 years in telecom retail distribution" /></Field>
            <Field title="Coverage Area (optional)"><input className={input} value={form.coverage_area} onChange={event => set("coverage_area", event.target.value)} placeholder="Areas you'll cover in your state" /></Field>
          </>}
          <Field title={`Why do you want to become ${isPartner ? "an Agency Partner" : "a State Coordinator"}? (required)`} hint={showError("reason") && <span className="text-[#EF4444]">Tell us why you're applying</span>}>
            <textarea className={`${input} min-h-24`} value={form.reason} onChange={event => set("reason", event.target.value)} placeholder={isPartner ? "Describe your shop, customers and how you'll distribute SIMs" : "Describe the agents you coordinate and your logistics capacity"} />
          </Field>
          <Field title={isPartner ? "Referral ID (optional)" : "Regional Manager Sponsor ID (optional)"} hint={showError("referred_by") ? <span className="text-[#EF4444]">Enter a numeric ID</span> : isPartner ? "ID of the person who referred you" : "ID of the Regional Manager sponsoring you"}>
            <input className={input} inputMode="numeric" value={form.referred_by} onChange={event => set("referred_by", event.target.value.replace(/\D/g, ""))} placeholder="E.g. 102" />
          </Field>
        </>}

        {step === 1 && <>
          <div><h2 className="text-lg font-bold text-[#0F152A]">Identity Verification</h2><p className="text-xs text-[#66738C]">Required for KYC compliance</p></div>
          <p className="flex items-start gap-2 rounded-lg bg-[#EFF4F8] p-3 text-xs text-[#0F152A]"><Info className="mt-0.5 size-3.5 shrink-0 text-[#2563EB]" /> ID upload is optional for now — documents aren't stored yet, so you can submit without one.</p>
          {/* BVN / NIN verification, ID type and selfie are not part of the apply endpoints. */}
          <p className={sectionTitle}>Upload Valid ID (optional)</p>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,application/pdf" className="hidden" onChange={event => set("idFile", event.target.files?.[0] ?? null)} />
          {form.idFile ? (
            <div className="flex items-center justify-between rounded-lg bg-[#EBFFF8] px-3 py-2 text-xs text-[#0F152A]"><span className="flex items-center gap-2"><Check className="size-3.5 text-[#10B981]" />{form.idFile.name}</span>
              <button type="button" aria-label="Remove file" onClick={() => { set("idFile", null); if (fileInput.current) fileInput.current.value = ""; }}><X className="size-3.5 text-[#EF4444]" /></button></div>
          ) : (
            <button type="button" onClick={() => fileInput.current?.click()} className="w-full rounded-xl border border-dashed border-[#CCD1DE] py-6 text-center transition hover:bg-[#F8FAFC]">
              <span className="block text-sm font-medium text-[#0F152A]">Upload ID document</span><span className="text-[11px] text-[#8C909B]">JPG, PNG or PDF</span>
            </button>
          )}
        </>}

        {step === 2 && <>
          <div><h2 className="text-lg font-bold text-[#0F152A]">Review Your Application</h2><p className="text-xs text-[#66738C]">Check everything before submitting</p></div>
          <ReviewSection title="Personal Information" onEdit={() => setStep(0)} rows={[
            ["Full Name", form.fullname], ["Phone", form.phone], ["Email", form.email], ["Gender", form.gender], ["Date of Birth", form.dob?.format("DD MMM YYYY")],
            ["State", apiState(form.location.state)], ["LGA", form.location.lga], ["Address", form.address],
          ]} />
          <ReviewSection title={isPartner ? "Business" : "Experience"} onEdit={() => setStep(0)} rows={isPartner
            ? [["Business Name", form.business_name], ["Monthly Volume", form.estimated_monthly_volume], ["Reason", form.reason], ["Referral ID", referral]]
            : [["Experience", form.experience], ["Coverage Area", form.coverage_area], ["Reason", form.reason], ["Sponsor RM ID", referral]]} />
          <ReviewSection title="Identity Verification" onEdit={() => setStep(1)} rows={[["ID Document", form.idFile ? `${form.idFile.name} (not uploaded yet)` : "Not provided"]]} />
          {/* Terms & Conditions checkboxes are not sent to the API. */}
          {submit.error && <p className="rounded-lg border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs text-[#EF4444]">{submit.error.message}</p>}
        </>}
      </div>
    </div>

    <div className="sticky bottom-0 flex justify-end gap-3 border-t border-[#E2ECF6] bg-white px-4 py-3 sm:px-6">
      <button type="button" disabled={submit.isPending} onClick={() => step === 0 ? navigate(appPaths.becomePartner) : setStep(step - 1)} className="rounded-lg border border-[#E2ECF6] bg-white px-5 py-2.5 text-sm font-medium text-[#0F152A] hover:bg-slate-50 disabled:opacity-50">
        {step === 0 ? "Cancel" : "← Back"}
      </button>
      {step < STEPS.length - 1
        ? <button type="button" onClick={next} className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Continue →</button>
        : <button type="button" onClick={send} disabled={submit.isPending} className="rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">{submit.isPending ? "Submitting…" : "Submit Application"}</button>}
    </div>
  </div>;
}

export default ApplicationFormPage;
