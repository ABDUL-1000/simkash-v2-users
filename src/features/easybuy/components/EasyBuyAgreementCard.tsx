import { useNavigate } from "react-router-dom";
import { AlertTriangle, CalendarClock, ChevronRight, Clock, Package, PartyPopper, XCircle } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import type { EasyBuyAgreement } from "../types/api";
import { fmtDueDate, naira, timeLeft } from "../utils";
import { EasyBuyProgress, EasyBuyStatusBadge } from "./EasyBuyStatusBadge";

/** Agreement summary card for the list. Buttons come from `actions`, never from `status`. */
export function EasyBuyAgreementCard({ agreement, now }: { agreement: EasyBuyAgreement; now: number }) {
  const navigate = useNavigate();
  const { amounts, actions, status } = agreement;
  const open = () => navigate(appPaths.easyBuyDetails(String(agreement.id)).path);
  const paying = ["active", "overdue", "defaulted", "completed"].includes(status);
  const overdue = agreement.repayment?.overdueAmount ?? 0;

  const line = (() => {
    switch (status) {
      case "pending_approval": return <span className="flex items-center gap-1.5 text-[#D9990D]"><Clock className="size-3.5" /> Awaiting approval</span>;
      case "approved": {
        const left = timeLeft(agreement.approvalExpiresAt, now);
        return <span className="flex items-center gap-1.5 text-[#2563EB]"><CalendarClock className="size-3.5" /> Pay {naira(amounts.dueNow)}{left ? ` · ${left}` : ""}</span>;
      }
      case "rejected": return <span className="flex items-center gap-1.5 text-[#EF4444]"><XCircle className="size-3.5" /> <span className="line-clamp-1">{agreement.rejectionReason || "Application not approved"}</span></span>;
      case "expired": return <span className="text-[#66738C]">Down payment window closed</span>;
      case "cancelled": return <span className="text-[#66738C]">Cancelled</span>;
      case "completed": return <span className="flex items-center gap-1.5 text-[#10B981]"><PartyPopper className="size-3.5" /> Fully paid</span>;
      default: return overdue > 0
        ? <span className="flex items-center gap-1.5 text-[#EF4444]"><AlertTriangle className="size-3.5" /> {naira(overdue)} overdue</span>
        : <span className="text-[#66738C]">Next due <b className="text-[#0F152A]">{fmtDueDate(agreement.nextDueDate)}</b></span>;
    }
  })();

  return <div role="button" tabIndex={0} onClick={open} onKeyDown={(e) => { if (e.key === "Enter") open(); }}
    className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#C7DAFC] hover:shadow-sm">
    <div className="flex items-start gap-3">
      {agreement.product.image ? <img src={agreement.product.image} alt="" className="size-14 shrink-0 rounded-xl bg-[#F8FAFC] object-cover" />
        : <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC]"><Package className="size-6 text-[#8C909B]" /></div>}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-bold text-[#0F152A]">{agreement.product.name}</h3>
          <EasyBuyStatusBadge status={status} label={agreement.statusLabel} />
        </div>
        <p className="mt-0.5 truncate text-[11px] text-[#8C909B]"><span className="font-mono">{agreement.reference}</span> · {agreement.plan.name}</p>
      </div>
    </div>

    {paying && <div className="space-y-1.5">
      <div className="flex justify-between text-[11px]"><span className="text-[#66738C]">Paid <b className="text-[#0F152A]">{naira(amounts.paid)}</b></span><span className="text-[#66738C]">of {naira(amounts.total)}</span></div>
      <EasyBuyProgress percent={amounts.progressPercent} tone={overdue > 0 ? "red" : "green"} />
    </div>}

    <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#E2ECF6] pt-3 text-xs font-semibold">
      <div className="min-w-0">{line}</div>
      <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {(actions.canPayDownPayment || actions.canPayInstallment) && <button type="button" onClick={() => navigate(`${appPaths.easyBuyDetails(String(agreement.id)).path}?pay=1`)} className="rounded-lg bg-[#2563EB] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700">Pay</button>}
        {(status === "rejected" || status === "expired") && <button type="button" onClick={() => navigate(appPaths.marketplaceDetails(String(agreement.product.id)).path)} className="rounded-lg border border-[#2563EB] px-3 py-1.5 text-[11px] font-bold text-[#2563EB]">Apply again</button>}
        <button type="button" onClick={open} aria-label="View details" className="rounded-lg border border-[#E2ECF6] p-1.5 text-[#66738C] hover:bg-slate-50"><ChevronRight className="size-4" /></button>
      </div>
    </div>
  </div>;
}
