import { useNavigate } from "react-router-dom";
import { ChevronRight, MessageCircle } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import type { KeyLabel, TicketStatusKey, TicketSummary } from "../types";
import { STATUS_TONE, timeAgo } from "../utils";

export function TicketStatusBadge({ status }: { status: KeyLabel<TicketStatusKey> }) {
  return <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${STATUS_TONE[status.key] ?? STATUS_TONE.closed}`}>{status.label}</span>;
}

/** One ticket in a list; opens the ticket detail. */
export function TicketRow({ ticket }: { ticket: TicketSummary }) {
  const navigate = useNavigate();
  return <button type="button" onClick={() => navigate(appPaths.supportTicketDetails(String(ticket.id)).path)}
    className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-3.5 text-left transition hover:bg-[#F8FAFC]">
    <div className="min-w-0 space-y-1">
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[10px] text-[#8C909B]">{ticket.ticketNumber}</span>
        {ticket.channel === "chat" && <span className="flex items-center gap-0.5 rounded bg-[#EBFFF8] px-1.5 py-0.5 text-[9px] font-bold text-[#10B981]"><MessageCircle className="size-2.5" /> Chat</span>}
      </div>
      <h4 className={`line-clamp-2 text-sm text-[#0F152A] ${ticket.unreadCount ? "font-extrabold" : "font-bold"}`}>{ticket.subject}</h4>
      <div className="flex flex-wrap items-center gap-2">
        <span className="sm:hidden"><TicketStatusBadge status={ticket.status} /></span>
        <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">{ticket.category?.label}</span>
        <span className="text-[10px] text-[#8C909B]">Updated {timeAgo(ticket.updatedAt).replace(/^Just now$/, "just now")}</span>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-2">
      {ticket.unreadCount > 0 && <span className="flex min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1.5 py-0.5 text-[10px] font-bold text-white" aria-label={`${ticket.unreadCount} unread`}>{ticket.unreadCount}</span>}
      <span className="hidden sm:inline"><TicketStatusBadge status={ticket.status} /></span>
      <ChevronRight className="size-4 text-[#8C909B]" />
    </div>
  </button>;
}
