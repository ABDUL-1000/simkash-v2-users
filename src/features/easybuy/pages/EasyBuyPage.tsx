import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";
import { CalendarClock, CheckCircle2, ClipboardCheck, ShoppingBag, Truck } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useGetEasyBuyList } from "../api/easybuy";
import { EasyBuyAgreementCard } from "../components/EasyBuyAgreementCard";
import type { EasyBuyStatus } from "../types/api";
import { STATUS_TABS } from "../utils";

const PAGE_SIZE = 12;

const STEPS = [
  { icon: ShoppingBag, title: "Pick a plan", text: "Choose an EasyBuy product and plan. Nothing is charged." },
  { icon: ClipboardCheck, title: "Get approved", text: "We review it. You then have 72 hours to pay the down payment." },
  { icon: Truck, title: "Get it delivered", text: "Pay the down payment plus delivery and your order ships." },
  { icon: CalendarClock, title: "Pay over time", text: "Installments are auto-debited at 08:00. Pay early anytime." },
];

export default function EasyBuyPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const status = (params.get("status") ?? "") as EasyBuyStatus | "";
  const [page, setPage] = useState(1);
  const [now, setNow] = useState(() => Date.now());
  const query = useGetEasyBuyList({ status, page, limit: PAGE_SIZE });
  const agreements = query.data?.agreements ?? [];
  const pagination = query.data?.pagination;

  // Refresh countdowns every minute.
  useEffect(() => { const t = window.setInterval(() => setNow(Date.now()), 60_000); return () => window.clearInterval(t); }, []);

  const setStatus = (next: EasyBuyStatus | "") => { setPage(1); setParams(next ? { status: next } : {}, { replace: true }); };
  const browse = () => navigate(`${appPaths.marketplace}?easyBuy=1`);

  return <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-5 p-4 sm:p-6">
    <PageHeader title="EasyBuy" description="Buy now and pay in installments. Track your applications and repayments."
      actions={[{ key: "browse", label: "Browse EasyBuy products", icon: <ShoppingBag className="size-4" />, onClick: browse }]} />

    {/* How it works */}
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step, i) => <div key={step.title} className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-xs"><step.icon className="size-4" /></span>
        <div className="min-w-0"><p className="text-xs font-extrabold text-[#0F152A]">{i + 1}. {step.title}</p><p className="text-[11px] leading-relaxed text-[#66738C]">{step.text}</p></div>
      </div>)}
    </div>

    {/* Status tabs */}
    <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      {STATUS_TABS.map((tab) => <button key={tab.key || "all"} type="button" onClick={() => setStatus(tab.key)}
        className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${status === tab.key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{tab.label}</button>)}
    </div>

    {query.isLoading ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="h-44 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      : query.error ? <AppEmptyState title="Couldn't load EasyBuy" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
        : agreements.length === 0 ? <div className="rounded-2xl border border-[#E2ECF6] bg-white">
          <AppEmptyState icon={<CheckCircle2 className="size-6" />} title={status ? "Nothing here" : "No EasyBuy yet"}
            description={status ? "You have no EasyBuy agreements with this status." : "Find a product with the EasyBuy badge, pick a plan and pay in installments."}
            actionText="Browse EasyBuy products" onAction={browse} />
        </div>
          : <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${query.isFetching ? "opacity-70" : ""}`}>
            {agreements.map((agreement) => <EasyBuyAgreementCard key={agreement.id} agreement={agreement} now={now} />)}
          </div>}

    {pagination && pagination.totalPages > 1 && <div className="flex justify-center">
      <Pagination current={page} pageSize={PAGE_SIZE} total={pagination.total} showSizeChanger={false} responsive onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
    </div>}
  </div>;
}
