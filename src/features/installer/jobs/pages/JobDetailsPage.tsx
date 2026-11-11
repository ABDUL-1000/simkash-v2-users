import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Camera, CheckCircle2, Circle, MapPin, Phone, Trash2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";
import {
  useDeletePhoto, useFailJob, useHoldJob, useInstallerJob, useMarkEnRoute, useReportIssue, useStartJob, useSubmitJob,
  useToggleChecklist, useToggleEquipment, useUpdateProgress, useUploadPhotos, type IssueCategory,
} from "../../api";
import { Card, QueryState, StatusBadge } from "../../ui";
import { clientName, dateText, naira } from "../../format";

const ISSUES: { key: IssueCategory; label: string }[] = [
  { key: "equipment_missing", label: "Equipment missing" }, { key: "equipment_faulty", label: "Equipment faulty" }, { key: "site_not_ready", label: "Site not ready" },
  { key: "client_unavailable", label: "Client unavailable" }, { key: "access_denied", label: "Access denied" }, { key: "safety", label: "Safety concern" }, { key: "other", label: "Other" },
];
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

/** Shrinks photos on the device before upload (longest side 1600px, JPEG ~80%). */
async function compress(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return file;
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = Object.assign(document.createElement("canvas"), { width: Math.round(bitmap.width * scale), height: Math.round(bitmap.height * scale) });
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8));
  return blob && blob.size < file.size ? new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : file;
}

type Dialog = "hold" | "issue" | "fail" | "submit" | null;

export default function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const query = useInstallerJob(jobId);
  const job = query.data;
  const enRoute = useMarkEnRoute(); const start = useStartJob(); const progress = useUpdateProgress();
  const equipment = useToggleEquipment(); const checklist = useToggleChecklist();
  const upload = useUploadPhotos(); const removePhoto = useDeletePhoto();
  const submit = useSubmitJob(); const hold = useHoldJob(); const issue = useReportIssue(); const fail = useFailJob();
  const [dialog, setDialog] = useState<Dialog>(null);
  const [text, setText] = useState("");
  const [category, setCategory] = useState<IssueCategory>("equipment_missing");
  const [holdToo, setHoldToo] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const close = () => { setDialog(null); setText(""); setHoldToo(false); };
  const id = job?.id ?? jobId ?? "";
  const a = job?.actions ?? {};
  const busy = [enRoute, start, progress, equipment, checklist, upload, removePhoto, submit, hold, issue, fail].some((m) => m.isPending);

  const onFiles = async (list: FileList | null) => {
    setPhotoError(null);
    if (!list?.length || !job) return;
    const files = [...list];
    const bad = files.find((f) => !ACCEPTED.includes(f.type));
    if (bad) { setPhotoError("Only JPG, PNG or WEBP photos are allowed."); return; }
    const room = (job.readiness?.maxPhotos ?? 20) - (job.photos?.length ?? 0);
    if (files.length > Math.min(10, room)) { setPhotoError(`You can add up to ${Math.min(10, room)} more photo${Math.min(10, room) === 1 ? "" : "s"}.`); return; }
    const ready = await Promise.all(files.map(compress));
    if (ready.some((f) => f.size > 10 * 1024 * 1024)) { setPhotoError("Each photo must be under 10MB."); return; }
    upload.mutate({ jobId: id, files: ready });
    if (fileInput.current) fileInput.current.value = "";
  };

  const btn = "rounded-xl px-4 py-2.5 text-xs font-bold disabled:opacity-50";
  return <div className="space-y-5 pb-12">
    <Link to={appPaths.installerJobs} className="flex items-center gap-2 text-xs font-semibold text-[#66738C]"><ArrowLeft className="size-4" /> My Jobs</Link>
    <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!job} emptyTitle="Job not found" emptyDescription="This job may have been reassigned or removed.">
      {job && <>
        {/* Header */}
        <div className="flex flex-col gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:flex-row sm:items-start sm:justify-between sm:p-5">
          <div className="min-w-0 space-y-1">
            <p className="font-mono text-xs font-bold text-[#2563EB]">{job.jobNumber}{job.orderNumber ? ` · ${job.orderNumber}` : ""} · {job.source === "marketplace" ? "Marketplace" : "Direct"}</p>
            <h1 className="text-xl font-extrabold text-[#0F152A]">{job.title ?? job.jobType?.name ?? "Installation"}</h1>
            <StatusBadge job={job} />
            <p className="text-xs text-[#66738C]">{job.dateLabel ?? "—"}{job.slotLabel ? ` · ${job.slotLabel}` : ""}{job.deadline ? ` · deadline ${job.deadline}` : ""}</p>
          </div>
          <div className="text-left sm:text-right"><p className="text-[11px] text-[#8C909B]">Your pay</p><p className="text-2xl font-black text-[#0F152A]">{job.payAmount == null ? <span className="text-sm text-[#D9990D]">Pay not set yet</span> : naira(job.payAmount)}</p></div>
        </div>

        {job.adminNotes && <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 text-sm font-semibold text-[#92400E]">📌 {job.adminNotes}</div>}
        {job.onHold && <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4 text-xs"><b className="text-[#0F152A]">On hold{job.holdBy === "admin" ? " by Simkash" : ""}:</b> {job.holdReason ?? "—"}{job.holdBy === "admin" && <p className="mt-1 text-[#66738C]">Contact support to resume this job.</p>}</div>}

        {/* Primary actions */}
        <div className="flex flex-wrap gap-2">
          {a.canMarkEnRoute && <button type="button" disabled={busy} onClick={() => enRoute.mutate({ jobId: id })} className={`${btn} border border-[#2563EB] text-[#2563EB]`}>I'm on the way</button>}
          {a.canStart && <button type="button" disabled={busy} onClick={() => start.mutate({ jobId: id })} className={`${btn} bg-[#2563EB] text-white`}>Start job</button>}
          {a.canResume && <button type="button" disabled={busy} onClick={() => hold.mutate({ jobId: id, onHold: false })} className={`${btn} bg-[#10B981] text-white`}>Resume job</button>}
          {a.canHold && <button type="button" disabled={busy} onClick={() => setDialog("hold")} className={`${btn} border border-[#E2ECF6]`}>Put on hold</button>}
          {a.canReportIssue && <button type="button" disabled={busy} onClick={() => setDialog("issue")} className={`${btn} border border-[#E2ECF6]`}>Report issue</button>}
          {a.canFail && <button type="button" disabled={busy} onClick={() => setDialog("fail")} className={`${btn} border border-[#EF4444] text-[#EF4444]`}>Can't complete</button>}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2 min-w-0">
            {/* Progress stepper */}
            <Card title="Progress">
              <div className="grid grid-cols-4 gap-2">{(job.progress?.steps ?? []).map((step) => {
                const clickable = a.canUpdateProgress && step.step >= 1 && step.step <= 3 && !step.current;
                return <button key={step.key} type="button" disabled={!clickable || busy} onClick={() => progress.mutate({ jobId: id, step: step.step })}
                  className={`rounded-xl border p-2 text-center text-[11px] font-bold transition ${step.done ? "border-[#10B981] bg-emerald-50 text-[#10B981]" : step.current ? "border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]" : "border-[#E2ECF6] text-[#8C909B]"} ${clickable ? "hover:border-[#2563EB]" : "cursor-default"}`}>
                  {step.done ? <CheckCircle2 className="mx-auto mb-1 size-4" /> : <Circle className="mx-auto mb-1 size-4" />}{step.label}
                </button>;
              })}</div>
            </Card>

            <Card title={`Equipment (${job.readiness?.equipmentInstalled ?? 0}/${job.readiness?.equipmentTotal ?? job.equipment?.length ?? 0} installed)`}>
              {job.equipment?.length ? <div className="space-y-1.5">{job.equipment.map((item) => <label key={item.id} className="flex items-center gap-2.5 rounded-xl border border-[#E2ECF6] p-2.5 text-xs">
                <input type="checkbox" checked={item.isInstalled} disabled={!a.canEditChecklist || busy} onChange={(e) => equipment.mutate({ jobId: id, equipmentId: item.id, installed: e.target.checked })} />
                <span className="flex-1 font-semibold text-[#0F152A]">{item.name}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</span>
                {item.installedAt && <span className="text-[10px] text-[#8C909B]">{dateText(item.installedAt, true)}</span>}
              </label>)}</div> : <p className="text-xs text-[#8C909B]">No equipment listed.</p>}
            </Card>

            <Card title={`Checklist (${job.readiness?.checklistDone ?? 0}/${job.readiness?.checklistTotal ?? job.checklist?.length ?? 0})`}>
              {job.checklist?.length ? <div className="space-y-1.5">{job.checklist.map((item) => <label key={item.id} className="flex items-center gap-2.5 rounded-xl border border-[#E2ECF6] p-2.5 text-xs">
                <input type="checkbox" checked={item.isChecked} disabled={!a.canEditChecklist || busy} onChange={(e) => checklist.mutate({ jobId: id, itemId: item.id, checked: e.target.checked })} />
                <span className="flex-1 text-[#0F152A]">{item.label}{item.isRequired && <span className="ml-1 text-[#EF4444]">*</span>}</span>
              </label>)}</div> : <p className="text-xs text-[#8C909B]">No checklist for this job.</p>}
            </Card>

            <Card title={`Photos (${job.photos?.length ?? 0}/${job.readiness?.maxPhotos ?? 20})`} action={a.canUploadPhotos && <button type="button" disabled={busy} onClick={() => fileInput.current?.click()} className="flex items-center gap-1 text-xs font-bold text-[#2563EB]"><Camera className="size-3.5" />{upload.isPending ? "Uploading…" : "Add photos"}</button>}>
              <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple capture="environment" className="hidden" onChange={(e) => void onFiles(e.target.files)} />
              {photoError && <p className="text-xs font-semibold text-[#EF4444]">{photoError}</p>}
              {job.photos?.length ? <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{job.photos.map((photo) => <div key={photo.id} className="relative">
                <img src={photo.url} alt={photo.caption ?? "Job photo"} className="aspect-square w-full rounded-xl object-cover" />
                {a.canUploadPhotos && <button type="button" aria-label="Remove photo" disabled={busy} onClick={() => removePhoto.mutate({ jobId: id, photoId: photo.id })} className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-[#EF4444]"><Trash2 className="size-3" /></button>}
              </div>)}</div> : <p className="text-xs text-[#8C909B]">Add at least {job.readiness?.minPhotos ?? 3} photos of the finished work.</p>}
            </Card>

            {/* Submit */}
            {a.canSubmit && <Card title="Submit for verification">
              {job.readiness?.blockers?.length > 0 && <ul className="space-y-1 text-[11px] font-semibold text-[#D9990D]">{job.readiness.blockers.map((b) => <li key={b}>• {b}</li>)}</ul>}
              <button type="button" disabled={!job.readiness?.canSubmit || busy} onClick={() => setDialog("submit")} className={`${btn} w-full bg-[#10B981] text-white`}>Submit for verification</button>
            </Card>}
          </div>

          <div className="space-y-5 min-w-0">
            <Card title="Client">
              <div className="space-y-1 text-xs">
                <p className="font-bold text-[#0F152A]">{clientName(job.client)}</p>
                {job.client?.contactName && <p className="text-[#66738C]">{job.client.contactName}</p>}
                {job.client?.email && <p className="text-[#66738C]">{job.client.email}</p>}
                <p className="flex items-start gap-1 text-[#66738C]"><MapPin className="mt-0.5 size-3 shrink-0" />{[job.address, job.area].filter(Boolean).join(", ") || "—"}{job.landmark ? ` (near ${job.landmark})` : ""}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {job.client?.phone && <a href={`tel:${job.client.phone}`} className="flex items-center justify-center gap-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#2563EB]"><Phone className="size-3.5" />Call</a>}
                {job.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#2563EB]"><MapPin className="size-3.5" />Directions</a>}
              </div>
            </Card>
            {job.description && <Card title="Job description"><p className="whitespace-pre-line text-xs text-[#66738C]">{job.description}</p></Card>}
            <Card title="Timeline">
              {job.timeline?.length ? <div className="space-y-2.5">{job.timeline.map((t) => <div key={t.id} className="text-xs"><p className="font-semibold text-[#0F152A]">{t.note ?? t.event}</p><p className="text-[10px] text-[#8C909B]">{dateText(t.at, true)}</p></div>)}</div> : <p className="text-xs text-[#8C909B]">No events yet.</p>}
            </Card>
          </div>
        </div>
      </>}
    </QueryState>

    {/* Dialogs */}
    <AppModal open={dialog !== null} onOpenChange={(v) => !v && close()} size="sm" footer={null}
      title={dialog === "hold" ? "Put job on hold" : dialog === "issue" ? "Report an issue" : dialog === "fail" ? "Can't complete this job" : "Submit for verification"}>
      <div className="space-y-3 text-xs">
        {dialog === "issue" && <select value={category} onChange={(e) => setCategory(e.target.value as IssueCategory)} className="w-full rounded-xl border border-[#E2ECF6] px-3 py-2.5">{ISSUES.map((i) => <option key={i.key} value={i.key}>{i.label}</option>)}</select>}
        <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]"
          placeholder={dialog === "hold" ? "Why are you pausing this job?" : dialog === "issue" ? "Describe the issue (at least 5 characters)" : dialog === "fail" ? "Why can't the job be completed? (required)" : "Notes for the verifier (optional)"} />
        {dialog === "issue" && a.canHold && <label className="flex items-center gap-2 text-[#66738C]"><input type="checkbox" checked={holdToo} onChange={(e) => setHoldToo(e.target.checked)} /> Also put the job on hold</label>}
        <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3">
          <button type="button" onClick={close} className={`${btn} border border-[#E2ECF6]`}>Cancel</button>
          <button type="button" disabled={busy || (dialog === "hold" && !text.trim()) || (dialog === "issue" && text.trim().length < 5) || (dialog === "fail" && !text.trim())}
            onClick={() => {
              const done = { onSuccess: close };
              if (dialog === "hold") hold.mutate({ jobId: id, onHold: true, reason: text.trim() }, done);
              if (dialog === "issue") issue.mutate({ jobId: id, category, description: text.trim(), hold: holdToo || undefined }, done);
              if (dialog === "fail") fail.mutate({ jobId: id, notes: text.trim() }, done);
              if (dialog === "submit") submit.mutate({ jobId: id, notes: text.trim() || undefined }, done);
            }}
            className={`${btn} ${dialog === "fail" ? "bg-[#EF4444]" : "bg-[#2563EB]"} text-white`}>{busy ? "Saving…" : "Confirm"}</button>
        </div>
      </div>
    </AppModal>
  </div>;
}
