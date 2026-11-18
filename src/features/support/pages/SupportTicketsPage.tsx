import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useSupportHome, useSupportTickets } from "../api";
import { useSupportSocket } from "../socket/context";
import { TicketRow } from "../components/TicketRow";
import type { TicketChannel, TicketStatusFilter } from "../types";
import { STATUS_TABS } from "../utils";

const PAGE_SIZE = 15;

export default function SupportTicketsPage() {
  const navigate = useNavigate();
  const socket = useSupportSocket();
  const [params, setParams] = useSearchParams();
  const status = (params.get("status") ?? "all") as TicketStatusFilter;
  const channel = (params.get("channel") ?? "") as TicketChannel | "";
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const counts = useSupportHome().data?.ticketCounts;
  const tickets = useSupportTickets({ status, channel, q: q || undefined, page, limit: PAGE_SIZE });
  const list = tickets.data?.tickets ?? [];

  useEffect(() => { const t = window.setTimeout(() => { setQ(search.trim()); setPage(1); }, 350); return () => window.clearTimeout(t); }, [search]);
  const setParam = (key: string, value: string) => { setPage(1); setParams((prev) => { if (value && value !== "all") prev.set(key, value); else prev.delete(key); return prev; }, { replace: true }); };

  return <div className="space-y-5">
    <button type="button" onClick={() => navigate(appPaths.support)} className="flex items-center gap-2 text-sm font-semibold text-[#66738C] hover:text-[#2563EB]"><ArrowLeft className="size-4" /> Support Center</button>
    <PageHeader title="My Support Tickets" description="All your tickets and live chats" actions={[{ key: "new", label: "New Ticket", icon: <Plus className="size-4" />, onClick: () => socket.openCreateTicket() }]} />

    <div className="space-y-4 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-6">
      <div className="flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-1">
        {STATUS_TABS.map((t) => <button key={t.key} type="button" onClick={() => setParam("status", t.key)}
          className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold transition ${status === t.key ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"}`}>
          {t.label}{counts ? ` (${counts[t.key] ?? 0})` : ""}
        </button>)}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ticket number or subject" className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#2563EB]" />
        </div>
        <select value={channel} onChange={(e) => setParam("channel", e.target.value)} aria-label="Channel" className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2.5 text-xs font-semibold text-[#0F152A]">
          <option value="">Tickets & chats</option><option value="ticket">Tickets only</option><option value="chat">Live chats only</option>
        </select>
      </div>

      {tickets.isLoading ? <div className="space-y-2">{[0, 1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>
        : tickets.error ? <AppEmptyState title="Couldn't load tickets" description={tickets.error.message} actionText="Retry" onAction={() => void tickets.refetch()} />
          : list.length === 0 ? <AppEmptyState title="No tickets found" description={q ? "Try a different search." : "Tickets and chats you start will appear here."} actionText="Create a ticket" onAction={() => socket.openCreateTicket()} />
            : <div className={`divide-y divide-[#E2ECF6] ${tickets.isFetching ? "opacity-70" : ""}`}>{list.map((t) => <TicketRow key={t.id} ticket={t} />)}</div>}

      {(tickets.data?.pagination?.totalPages ?? 0) > 1 && <div className="flex justify-center pt-2">
        <Pagination current={page} pageSize={PAGE_SIZE} total={tickets.data!.pagination.total} showSizeChanger={false} responsive onChange={setPage} />
      </div>}
    </div>
  </div>;
}
