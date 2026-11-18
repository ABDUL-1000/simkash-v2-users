import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Popconfirm } from "antd";
import { ArrowLeft, Link2, Loader2, MessageCircle, RotateCcw, Send } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";
import { openNotification } from "@/utils/notifications";
import { supportKeys, useCloseTicket, useReopenTicket, useReplyTicket, useSupportHome, useSupportTicket } from "../api";
import { useSupportSocket } from "../socket/context";
import { AttachmentPicker } from "../components/AttachmentPicker";
import { Conversation } from "../components/Conversation";
import { TicketStatusBadge } from "../components/TicketRow";
import type { RelatedRecord } from "../types";
import { DEFAULT_RULES, LIMITS, PRIORITY_TONE, fmtDateTime, fmtShort, timeAgo } from "../utils";

const card = "rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-6";
const RELATED: Record<string, { label: string; href: string }> = {
  sim: { label: "View SIM", href: appPaths.deviceSim },
  order: { label: "Track Order", href: appPaths.orders },
  easybuy: { label: "View EasyBuy", href: appPaths.easyBuy },
  transaction: { label: "View Transactions", href: appPaths.transactions },
  request: { label: "Track Request", href: appPaths.deviceSim },
};

export default function SupportTicketDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const client = useQueryClient();
  const socket = useSupportSocket();
  const ticketQuery = useSupportTicket(id);
  const ticket = ticketQuery.data;
  const rules = useSupportHome().data?.attachmentRules ?? DEFAULT_RULES;
  const reply = useReplyTicket();
  const closeTicket = useCloseTicket();
  const reopen = useReopenTicket();
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<{ message: string; closed?: boolean } | null>(null);
  const [reopenOpen, setReopenOpen] = useState(false);
  const [reason, setReason] = useState("");

  // Opening the ticket marks support's messages read: refresh unread badges.
  const loadedId = ticket?.id;
  useEffect(() => {
    if (!loadedId) return;
    void client.invalidateQueries({ queryKey: ["support", "tickets"] });
    void client.invalidateQueries({ queryKey: supportKeys.home });
    void client.invalidateQueries({ queryKey: ["user-notifications"] });
  }, [loadedId, client]);

  // New support messages arriving live while the ticket is open: mark them read.
  const supportCount = ticket?.conversation.filter((c) => c.kind === "message" && !c.sender?.isMe).length ?? 0;
  const { emit, connected } = socket;
  useEffect(() => { if (loadedId && connected && supportCount > 0) emit("message:read", { ticketId: loadedId }).catch(() => undefined); }, [supportCount, loadedId, connected, emit]);

  if (ticketQuery.isLoading) return <div className="animate-pulse space-y-4"><div className="h-10 w-72 rounded bg-slate-100" /><div className="grid gap-6 lg:grid-cols-12"><div className="h-96 rounded-2xl bg-slate-100 lg:col-span-8" /><div className="h-72 rounded-2xl bg-slate-100 lg:col-span-4" /></div></div>;
  if (!ticket) return <AppEmptyState title="Ticket not found" description={ticketQuery.error?.message ?? "We couldn't load this ticket."} actionText="Back to Support" onAction={() => navigate(appPaths.support)} />;

  const { actions } = ticket;
  const isLiveChat = ticket.channel === "chat" && socket.activeChat?.ticketId === ticket.id;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && files.length === 0) return;
    setError(null);
    reply.mutate({ id: ticket.id, message: text.trim(), attachments: files }, {
      onSuccess: () => { setText(""); setFiles([]); },
      onError: (err) => setError({ message: err.message, closed: /closed/i.test(err.message) }),
    });
  };
  const doClose = () => closeTicket.mutateAsync(ticket.id)
    .then(() => openNotification({ state: "success", title: "Ticket closed" }))
    .catch((err: Error) => openNotification({ state: "error", title: "Couldn't close ticket", description: err.message }));
  const doReopen = () => reopen.mutate({ id: ticket.id, reason: reason.trim() || undefined }, {
    onSuccess: () => { setReopenOpen(false); setReason(""); openNotification({ state: "success", title: "Ticket reopened" }); },
    onError: (err) => openNotification({ state: "error", title: "Couldn't reopen", description: err.message }),
  });

  const closeButton = (full = false) => actions.canClose && <Popconfirm title="Close this ticket?" description="You can reopen it within 7 days." okText="Close ticket" okButtonProps={{ danger: true }} onConfirm={doClose}>
    <button type="button" disabled={closeTicket.isPending} className={`rounded-xl border border-[#EF4444] bg-white px-4 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50 disabled:opacity-50 ${full ? "w-full" : ""}`}>Close Ticket</button>
  </Popconfirm>;

  return <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <button type="button" aria-label="Back" onClick={() => navigate(appPaths.support)} className="shrink-0 rounded-xl border border-[#E2ECF6] bg-white p-2 text-[#0F152A] hover:bg-slate-50"><ArrowLeft className="size-4" /></button>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="break-words text-lg font-extrabold text-[#0F152A] sm:text-2xl">{ticket.subject}</h1>
            <TicketStatusBadge status={ticket.status} />
          </div>
          <p className="mt-0.5 text-xs text-[#8C909B]"><span className="font-mono">{ticket.ticketNumber}</span> · Opened {fmtDateTime(ticket.createdAt)}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {actions.canReopen && <button type="button" onClick={() => setReopenOpen(true)} className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"><RotateCcw className="size-3.5" /> Reopen</button>}
        {closeButton()}
      </div>
    </div>

    {isLiveChat && <div className="flex flex-col gap-3 rounded-2xl border border-[#BFF0DD] bg-[#EBFFF8] p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-2 text-xs font-semibold text-[#0F152A]"><MessageCircle className="size-4 text-[#10B981]" /> This live chat is still active.</p>
      <button type="button" onClick={socket.openChat} className="rounded-xl bg-[#10B981] px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600">Open chat</button>
    </div>}

    <div className="grid gap-6 lg:grid-cols-12">
      {/* Conversation */}
      <div className="min-w-0 lg:col-span-8">
        <div className={`${card} space-y-5`}>
          <h3 className="text-base font-bold text-[#0F152A]">Conversation</h3>
          <Conversation items={ticket.conversation ?? []} typing={socket.typing[ticket.id]} awaiting={ticket.awaitingSupportResponse} />

          {actions.canReply ? <form onSubmit={send} className="space-y-3 border-t border-[#E2ECF6] pt-4">
            {ticket.status.key === "resolved" && <p className="text-[11px] text-[#8C909B]">Replying will reopen this ticket.</p>}
            <textarea rows={3} maxLength={LIMITS.message} placeholder="Type your reply..." value={text} onChange={(e) => setText(e.target.value)}
              className="w-full resize-y rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]" />
            {error && <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">
              <span>{error.message}</span>
              {error.closed && <button type="button" onClick={() => socket.openCreateTicket(ticket.category?.key)} className="rounded-lg bg-[#2563EB] px-3 py-1.5 font-bold text-white">Create New Ticket</button>}
            </div>}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1"><AttachmentPicker compact files={files} onChange={setFiles} rules={rules} /></div>
              <button type="submit" disabled={(!text.trim() && files.length === 0) || reply.isPending} className="flex shrink-0 items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
                {reply.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />} Send Reply
              </button>
            </div>
          </form> : <div className="flex flex-col gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[#66738C]">{actions.canReopen ? "This ticket is closed. Reopen it to continue the conversation." : "This ticket is closed. Need more help? Start a new ticket."}</p>
            {actions.canReopen
              ? <button type="button" onClick={() => setReopenOpen(true)} className="shrink-0 rounded-xl bg-[#2563EB] px-4 py-2 font-bold text-white">Reopen</button>
              : <button type="button" onClick={() => socket.openCreateTicket(ticket.category?.key)} className="shrink-0 rounded-xl bg-[#2563EB] px-4 py-2 font-bold text-white">Create New Ticket</button>}
          </div>}
        </div>
      </div>

      {/* Sidebar */}
      <div className="min-w-0 space-y-6 lg:col-span-4">
        <div className={`${card} text-xs`}>
          <div className="divide-y divide-[#E2ECF6]">
            {([
              ["Ticket ID", <span className="font-mono">{ticket.ticketNumber}</span>],
              ["Status", <TicketStatusBadge status={ticket.status} />],
              ["Channel", ticket.channel === "chat" ? "Live chat" : "Ticket"],
              ["Category", ticket.category?.label],
              ["Priority", <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${PRIORITY_TONE[ticket.priority?.key] ?? PRIORITY_TONE.medium}`}>{ticket.priority?.label}</span>],
              ["Created", fmtDateTime(ticket.createdAt)],
              ["Last Update", timeAgo(ticket.updatedAt)],
              ["Assigned To", ticket.assignedTo ?? "Not yet assigned"],
            ] as [string, React.ReactNode][]).map(([label, value]) => <div key={label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="text-[#8C909B]">{label}</span><span className="text-right font-bold text-[#0F152A]">{value}</span>
            </div>)}
          </div>
        </div>

        {ticket.related ? <RelatedCard related={ticket.related} onOpen={(href) => navigate(href)} />
          : ticket.relatedRef && <div className={`${card} space-y-1 text-xs`}><h4 className="font-bold text-[#0F152A]">Reference</h4><p className="font-mono text-[#66738C]">{ticket.relatedRef}</p></div>}

        <div className="space-y-2">
          <div className="hidden lg:block">{closeButton(true)}</div>
          <button type="button" onClick={() => socket.openCreateTicket()} className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Create New Ticket</button>
        </div>

        {ticket.history?.length > 0 && <div className={`${card} space-y-3 text-xs`}>
          <h4 className="font-bold text-[#0F152A]">Ticket History</h4>
          <div className="divide-y divide-[#E2ECF6] text-[11px]">
            {ticket.history.map((h, i) => <div key={`${h.type}-${h.at}-${i}`} className="flex justify-between gap-3 py-2 first:pt-0 last:pb-0"><span className="text-[#8C909B]">{h.label}</span><span className="shrink-0 font-bold text-[#0F152A]">{fmtShort(h.at)}</span></div>)}
          </div>
        </div>}
      </div>
    </div>

    <AppModal open={reopenOpen} onOpenChange={(v) => { if (!v && !reopen.isPending) setReopenOpen(false); }} title="Reopen ticket" description={ticket.ticketNumber} size="sm">
      <div className="space-y-4 pt-1">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">What's still wrong? (optional)</p>
          <textarea value={reason} maxLength={LIMITS.message} onChange={(e) => setReason(e.target.value)} rows={3} placeholder="This is posted as a message on the ticket" className="w-full resize-none rounded-xl border border-[#E2ECF6] px-3 py-2 text-xs outline-none focus:border-[#2563EB]" />
        </div>
        <div className="flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end">
          <button type="button" disabled={reopen.isPending} onClick={() => setReopenOpen(false)} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A]">Cancel</button>
          <button type="button" disabled={reopen.isPending} onClick={doReopen} className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">{reopen.isPending ? "Reopening…" : "Reopen ticket"}</button>
        </div>
      </div>
    </AppModal>
  </div>;
}

function RelatedCard({ related, onOpen }: { related: RelatedRecord; onOpen: (href: string) => void }) {
  const link = RELATED[related.type];
  return <div className={`${card} space-y-3 text-xs`}>
    <h4 className="flex items-center gap-1.5 font-bold text-[#0F152A]"><Link2 className="size-4 text-[#2563EB]" /> Related to this Ticket</h4>
    <div className="space-y-1 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
      <div className="flex items-start justify-between gap-2">
        <span className="font-bold text-[#0F152A]">{related.title}</span>
        {related.status && <span className="shrink-0 rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[9px] font-bold capitalize text-[#D9990D]">{related.status.replace(/_/g, " ")}</span>}
      </div>
      {related.subtitle && <p className="text-[11px] text-[#66738C]">{related.subtitle}</p>}
      <p className="font-mono text-[10px] text-[#8C909B]">{related.reference}</p>
      {link && <button type="button" onClick={() => onOpen(link.href)} className="pt-1 text-[11px] font-bold text-[#2563EB] hover:underline">{link.label} →</button>}
    </div>
  </div>;
}
