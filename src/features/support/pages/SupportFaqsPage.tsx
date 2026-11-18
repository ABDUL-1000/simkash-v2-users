import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { useSupportFaqs } from "../api";
import { useSupportSocket } from "../socket/context";
import { FaqList, FaqTabs } from "../components/FaqList";

export default function SupportFaqsPage() {
  const navigate = useNavigate();
  const socket = useSupportSocket();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const [search, setSearch] = useState(q);
  const faqs = useSupportFaqs(category, q);

  // Debounce typing into the URL (which drives the query).
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (search.trim() === q) return;
      setParams((prev) => { if (search.trim()) prev.set("q", search.trim()); else prev.delete("q"); return prev; }, { replace: true });
    }, 350);
    return () => window.clearTimeout(t);
  }, [search, q, setParams]);

  const setCategory = (key: string) => setParams((prev) => { if (key === "all") prev.delete("category"); else prev.set("category", key); return prev; }, { replace: true });

  return <div className="space-y-5">
    <button type="button" onClick={() => navigate(appPaths.support)} className="flex items-center gap-2 text-sm font-semibold text-[#66738C] hover:text-[#2563EB]"><ArrowLeft className="size-4" /> Support Center</button>
    <PageHeader title="Help & FAQs" description="Answers to the most common questions" />

    <div className="relative">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
      <input type="search" autoFocus={Boolean(q)} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for help…"
        className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-10 pr-4 text-xs font-semibold text-[#0F152A] shadow-xs outline-none focus:border-[#2563EB]" />
    </div>

    <div className="space-y-4 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-6">
      {(faqs.data?.categories?.length ?? 0) > 0 && <FaqTabs tabs={faqs.data!.categories} value={category} onChange={setCategory} />}
      {q && !faqs.isLoading && <p className="text-[11px] text-[#8C909B]">{faqs.data?.faqs.length ?? 0} result{faqs.data?.faqs.length === 1 ? "" : "s"} for “{q}”</p>}
      <div className={faqs.isFetching && !faqs.isLoading ? "opacity-70" : ""}>
        <FaqList faqs={faqs.data?.faqs ?? []} loading={faqs.isLoading} emptyText={q ? "No answers matched your search." : "No FAQs in this category yet."} />
      </div>
    </div>

    <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#C7DAFC] bg-[#EFF4F8] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div><p className="text-sm font-bold text-[#0F152A]">Still need help?</p><p className="text-xs text-[#66738C]">Chat with us or create a ticket and we'll get back to you.</p></div>
      <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
        <button type="button" onClick={socket.openChat} className="flex items-center justify-center gap-1.5 rounded-xl bg-[#10B981] px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-600"><MessageCircle className="size-4" /> Live Chat</button>
        <button type="button" onClick={() => socket.openCreateTicket()} className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700">New Ticket</button>
      </div>
    </div>
  </div>;
}
