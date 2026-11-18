import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";
import { openNotification } from "@/utils/notifications";
import { useCreateTicket, useSupportHome } from "../api";
import { AttachmentPicker } from "../components/AttachmentPicker";
import type { TicketPriority } from "../types";
import { DEFAULT_RULES, LIMITS } from "../utils";

const PRIORITIES: { key: TicketPriority; label: string }[] = [{ key: "low", label: "Low" }, { key: "medium", label: "Medium" }, { key: "high", label: "High" }];
const input = "w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]";
const label = "text-[10px] font-bold uppercase tracking-wider text-[#8C909B]";

/** Create Support Ticket (multipart). Opens the new ticket on success. */
export function CreateTicketModal({ open, onClose, initialCategory, initialRelatedRef }: {
  open: boolean; onClose: () => void; initialCategory?: string; initialRelatedRef?: string;
}) {
  const navigate = useNavigate();
  const home = useSupportHome();
  const create = useCreateTicket();
  const categories = home.data?.categories ?? [];
  const rules = home.data?.attachmentRules ?? DEFAULT_RULES;
  const [category, setCategory] = useState(initialCategory ?? "");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [relatedRef, setRelatedRef] = useState(initialRelatedRef ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const valid = category && subject.trim() && description.trim();
  const close = () => { if (!create.isPending) onClose(); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setError(null);
    create.mutate({ category, subject: subject.trim(), description: description.trim(), priority, relatedRef: relatedRef.trim() || undefined, attachments: files }, {
      onSuccess: (ticket) => {
        openNotification({ state: "success", title: `Ticket ${ticket.ticketNumber} created`, description: "We'll reply here and notify you." });
        onClose();
        navigate(appPaths.supportTicketDetails(String(ticket.id)).path);
      },
      onError: (err) => setError(err.message),
    });
  };

  return <AppModal open={open} onOpenChange={(v) => { if (!v) close(); }} title="Create Support Ticket" description="Tell us what's wrong and we'll get back to you." size="md">
    <form onSubmit={submit} className="space-y-4 pt-1">
      <div className="space-y-1.5">
        <p className={label}>Category</p>
        {home.isLoading ? <div className="h-10 animate-pulse rounded-xl bg-slate-100" /> :
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((c) => <button key={c.key} type="button" onClick={() => setCategory(c.key)}
              className={`rounded-xl border px-3 py-2.5 text-left text-xs font-bold transition ${category === c.key ? "border-[#2563EB] bg-[#EFF4F8] text-[#2563EB] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] hover:border-[#C7DAFC]"}`}>{c.label}</button>)}
          </div>}
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between"><p className={label}>Subject</p><span className="text-[10px] text-[#8C909B]">{subject.length}/{LIMITS.subject}</span></div>
        <input value={subject} maxLength={LIMITS.subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Wallet top up not reflecting" className={input} />
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between"><p className={label}>Describe the issue</p><span className="text-[10px] text-[#8C909B]">{description.length}/{LIMITS.description}</span></div>
        <textarea value={description} maxLength={LIMITS.description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="What happened, when, and what you expected" className={`${input} resize-y`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className={label}>Priority</p>
          <div className="flex gap-1 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-1">
            {PRIORITIES.map((p) => <button key={p.key} type="button" onClick={() => setPriority(p.key)}
              className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition ${priority === p.key ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B]"}`}>{p.label}</button>)}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className={label}>Reference (optional)</p>
          <input value={relatedRef} onChange={(e) => setRelatedRef(e.target.value)} placeholder="ORD-…, EB-…, phone or ICCID" className={input} />
        </div>
      </div>

      <div className="space-y-1.5">
        <p className={label}>Attachments (optional)</p>
        <AttachmentPicker files={files} onChange={setFiles} rules={rules} />
      </div>

      {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}

      <div className="flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end">
        <button type="button" disabled={create.isPending} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={!valid || create.isPending} className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">{create.isPending ? "Submitting…" : "Submit Ticket"}</button>
      </div>
    </form>
  </AppModal>;
}
