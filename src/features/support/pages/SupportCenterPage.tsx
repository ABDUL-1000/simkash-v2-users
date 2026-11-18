import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, HelpCircle, Infinity as InfinityIcon, Mail, MessageCircle, Phone, Plus, Search, ShieldCheck, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useSupportFaqs, useSupportHome, useSupportTickets } from "../api";
import { useSupportSocket } from "../socket/context";
import { FaqList, FaqTabs } from "../components/FaqList";
import { TicketRow } from "../components/TicketRow";
import type { ContactChannel, TicketStatusFilter } from "../types";
import { STATUS_TABS } from "../utils";

const CATEGORY_ICON: Record<string, { icon: LucideIcon; tone: string }> = {
  billing: { icon: CreditCard, tone: "text-[#2563EB]" },
  sim: { icon: Smartphone, tone: "text-[#10B981]" },
  zerolimit_sim: { icon: InfinityIcon, tone: "text-[#0EA5E9]" },
  orders: { icon: ShoppingBag, tone: "text-[#9333EA]" },
  account: { icon: ShieldCheck, tone: "text-[#F59E0B]" },
  general: { icon: HelpCircle, tone: "text-[#66738C]" },
};
const CHANNEL_ICON: Record<string, LucideIcon> = { chat: MessageCircle, call: Phone, email: Mail, whatsapp: MessageCircle };
const QUICK_LINK_PATH: Record<string, string> = {
  retry_failed_transaction: appPaths.transactions,
  track_order: appPaths.orders,
  renew_sim: appPaths.deviceSim,
  download_statement: appPaths.transactions,
};
const card = "rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-6";

export default function SupportCenterPage() {
  const navigate = useNavigate();
  const socket = useSupportSocket();
  const home = useSupportHome();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TicketStatusFilter>("all");
  const [faqTab, setFaqTab] = useState("all");
  const tickets = useSupportTickets({ status: tab, page: 1, limit: 5 });
  const faqs = useSupportFaqs(faqTab, "");
  const data = home.data;
  const counts = data?.ticketCounts;
  const liveChat = data?.contactChannels.find((c) => c.key === "live_chat" || c.action?.type === "chat");
  const online = socket.online ?? liveChat?.online ?? false;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`${appPaths.supportFaqs}${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
  };

  const channelHref = (c: ContactChannel) => {
    const value = c.value ?? "";
    if (c.action.type === "call") return `tel:${value.replace(/[^\d+]/g, "")}`;
    if (c.action.type === "email") return `mailto:${value}`;
    if (c.action.type === "whatsapp") return `https://wa.me/${value.replace(/\D/g, "")}`;
    return undefined;
  };

  if (home.error && !data) return <AppEmptyState title="Couldn't load Support" description={home.error.message} actionText="Retry" onAction={() => void home.refetch()} />;

  return <div className="space-y-6">
    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-[#0F152A] sm:text-2xl">Support Center</h1>
        <p className="mt-0.5 text-xs text-[#8C909B]">How can we help you today?</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        <button type="button" onClick={socket.openChat} className="flex items-center justify-center gap-2 rounded-xl border border-[#10B981] bg-white px-4 py-2.5 text-xs font-bold text-[#10B981] hover:bg-emerald-50">
          <span className={`size-2 rounded-full ${online ? "bg-[#10B981]" : "bg-slate-300"}`} /> Live Chat
        </button>
        <button type="button" onClick={() => socket.openCreateTicket()} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"><Plus className="size-4" /> New Ticket</button>
      </div>
    </div>

    {/* Search */}
    <form onSubmit={submitSearch} className="relative w-full">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
      <input type="search" placeholder="Search for help, FAQs, or describe your issue..." value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-10 pr-24 text-xs font-semibold text-[#0F152A] shadow-xs outline-none focus:border-[#2563EB]" />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[#2563EB] px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700">Search</button>
    </form>

    {/* Category cards */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {home.isLoading ? Array.from({ length: 6 }, (_, i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100" />)
        : (data?.categories ?? []).map((cat) => {
          const meta = CATEGORY_ICON[cat.key] ?? CATEGORY_ICON.general;
          return <button key={cat.key} type="button" onClick={() => socket.openCreateTicket(cat.key)}
            className="flex flex-col gap-2 rounded-2xl border border-[#E2ECF6] bg-white p-4 text-left shadow-xs transition hover:border-[#2563EB]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC]"><meta.icon className={`size-5 ${meta.tone}`} /></span>
            <span className="text-sm font-extrabold text-[#0F152A]">{cat.label}</span>
            {cat.description && <span className="line-clamp-2 text-[11px] text-[#8C909B]">{cat.description}</span>}
            <span className="mt-auto text-xs font-bold text-[#2563EB]">Get help →</span>
          </button>;
        })}
    </div>

    <div className="grid gap-6 lg:grid-cols-12">
      {/* My tickets */}
      <div className="min-w-0 lg:col-span-8">
        <div className={`${card} space-y-4`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#0F152A]">My Support Tickets</h3>
            <button type="button" onClick={() => navigate(appPaths.supportTickets)} className="text-xs font-bold text-[#2563EB] hover:underline">View all</button>
          </div>
          <div className="flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-1">
            {STATUS_TABS.map((t) => <button key={t.key} type="button" onClick={() => setTab(t.key)}
              className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold transition ${tab === t.key ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"}`}>
              {t.label}{counts ? ` (${counts[t.key] ?? 0})` : ""}
            </button>)}
          </div>
          {tickets.isLoading ? <div className="space-y-2">{[0, 1, 2].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>
            : (tickets.data?.tickets.length ?? 0) === 0 ? <AppEmptyState title={tab === "all" ? "No tickets yet" : "No tickets here"} description="When you contact support, your tickets and chats appear here." actionText="Create a ticket" onAction={() => socket.openCreateTicket()} />
              : <div className={`divide-y divide-[#E2ECF6] ${tickets.isFetching ? "opacity-70" : ""}`}>{tickets.data!.tickets.map((t) => <TicketRow key={t.id} ticket={t} />)}</div>}
        </div>
      </div>

      {/* Sidebar */}
      <div className="min-w-0 space-y-6 lg:col-span-4">
        <div className={`${card} space-y-3 text-xs`}>
          <h4 className="font-extrabold text-[#0F152A]">Reach Us Directly</h4>
          {home.isLoading ? <div className="h-40 animate-pulse rounded-xl bg-slate-100" /> : <div className="divide-y divide-[#E2ECF6]">
            {(data?.contactChannels ?? []).map((c) => {
              const isChat = c.action.type === "chat";
              const Icon = CHANNEL_ICON[c.action.type] ?? HelpCircle;
              const href = channelHref(c);
              const button = isChat
                ? <button type="button" onClick={socket.openChat} className={`mt-2 w-full rounded-xl py-2.5 font-bold text-white shadow-xs ${online ? "bg-[#10B981] hover:bg-emerald-600" : "bg-[#2563EB] hover:bg-blue-700"}`}>{online ? c.action.label || "Start Chat" : "Leave a Message"}</button>
                : <a href={href} target={c.action.type === "whatsapp" ? "_blank" : undefined} rel="noreferrer" className="mt-2 block w-full rounded-xl border border-[#E2ECF6] py-2 text-center font-bold text-[#0F152A] hover:bg-slate-50">{c.action.label}</a>;
              return <div key={c.key} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="flex items-center gap-1.5 font-bold text-[#0F152A]"><Icon className="size-3.5 text-[#2563EB]" /> {c.label}</h5>
                  {isChat && <span className={`text-[10px] font-bold ${online ? "text-[#10B981]" : "text-[#8C909B]"}`}>● {online ? "Online" : "Offline"}</span>}
                </div>
                {c.value && <p className="mt-0.5 break-words text-[11px] font-semibold text-[#0F152A]">{c.value}</p>}
                {c.description && <p className="text-[10px] text-[#8C909B]">{c.description}</p>}
                {button}
              </div>;
            })}
          </div>}
        </div>

        {(data?.responseTimes?.length ?? 0) > 0 && <div className={`${card} space-y-3 text-xs`}>
          <h4 className="font-extrabold text-[#0F152A]">Avg Response Times</h4>
          <div className="divide-y divide-[#E2ECF6] text-[11px]">
            {data!.responseTimes.map((r) => <div key={r.channel} className="flex justify-between gap-3 py-2 first:pt-0 last:pb-0"><span className="text-[#8C909B]">{r.label}</span><span className="font-bold text-[#10B981]">{r.value}</span></div>)}
          </div>
        </div>}

        {(data?.quickLinks?.length ?? 0) > 0 && <div className={`${card} space-y-3 text-xs`}>
          <h4 className="font-extrabold text-[#0F152A]">Fix It Yourself</h4>
          <div className="space-y-2 font-bold text-[#2563EB]">
            {data!.quickLinks.filter((l) => QUICK_LINK_PATH[l.key]).map((l) => <button key={l.key} type="button" onClick={() => navigate(QUICK_LINK_PATH[l.key])} className="block text-left hover:underline">{l.label} →</button>)}
          </div>
        </div>}
      </div>
    </div>

    {/* FAQs */}
    <div className={`${card} space-y-4`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-[#0F152A]">Frequently Asked Questions</h3>
        <button type="button" onClick={() => navigate(appPaths.supportFaqs)} className="text-xs font-bold text-[#2563EB] hover:underline">View all →</button>
      </div>
      {(faqs.data?.categories?.length ?? 0) > 0 && <FaqTabs tabs={faqs.data!.categories} value={faqTab} onChange={setFaqTab} />}
      <FaqList faqs={(faqs.data?.faqs ?? []).slice(0, 8)} loading={faqs.isLoading} />
    </div>
  </div>;
}
