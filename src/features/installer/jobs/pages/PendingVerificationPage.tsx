import { useState } from "react";
import { Pagination } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { useInstallerVerification, useSendReminder } from "../../api";
import { JobRow, Kpi, QueryState } from "../../ui";
import { dateText, naira } from "../../format";

const STAGES = [["all", "All"], ["awaiting_client", "Awaiting customer"], ["awaiting_admin", "Awaiting Simkash"], ["disputed", "Disputed"]] as const;

/** GET /installer/verification + POST /verification/:jobId/remind (one per 12h; 429 says when). */
export default function PendingVerificationPage() {
  const [stage, setStage] = useState<string>("all");
  const [page, setPage] = useState(1);
  const query = useInstallerVerification({ stage, page, limit: 20 });
  const remind = useSendReminder();
  const s = query.data?.summary;
  const jobs = query.data?.jobs ?? [];

  return <div className="space-y-5 pb-12">
    <PageHeader title="Pending Verification" description="Submitted jobs waiting for the customer or Simkash to verify. Pay is released to your wallet once verified." />
    {s && <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Kpi label="Awaiting customer" value={s.awaitingClient} />
      <Kpi label="Awaiting Simkash" value={s.awaitingAdmin} />
      <Kpi label="Disputed" value={s.disputed} tone="text-[#EF4444]" />
      <Kpi label="Pay held" value={naira(s.heldAmount)} tone="text-[#7C3AED]" hint={s.payNotSet ? `${s.payNotSet} job${s.payNotSet === 1 ? "" : "s"} with pay not set yet` : undefined} />
    </div>}
    <div className="flex gap-1.5 overflow-x-auto pb-1">{STAGES.map(([key, label]) => <button key={key} type="button" onClick={() => { setStage(key); setPage(1); }} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${stage === key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{label}</button>)}</div>
    <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!jobs.length} emptyTitle="Nothing awaiting verification" emptyDescription="Jobs you submit will appear here until they're verified.">
      <div className="space-y-2">{jobs.map((job) => {
        const v = job.verification;
        return <JobRow key={job.id} job={job}
          sub={<div className="space-y-0.5 pt-1 text-[10px]">
            <p className="text-[#7C3AED]">{v?.stage === "awaiting_client" ? "Awaiting customer" : v?.stage === "awaiting_admin" ? "Awaiting Simkash" : v?.stage === "disputed" ? "Disputed — pay held until resolved" : "Verified"} · submitted {dateText(v?.submittedAt, true)}{job.waitingHours ? ` · waiting ${job.waitingHours}h` : ""}</p>
            {v?.clientRespondBy && <p className="text-[#8C909B]">Customer has until {dateText(v.clientRespondBy, true)}; after that Simkash can verify.</p>}
            {!v?.canRemind && v?.nextReminderAt && <p className="text-[#8C909B]">Next reminder from {dateText(v.nextReminderAt, true)}</p>}
          </div>}
          right={<div className="space-y-1">
            <p className="font-extrabold text-[#0F152A]">{job.payAmount == null ? <span className="text-[10px] text-[#D9990D]">Pay not set yet</span> : naira(v?.heldAmount ?? job.payAmount)}</p>
            {v?.canRemind && <button type="button" disabled={remind.isPending} onClick={(e) => { e.preventDefault(); remind.mutate(job.id); }} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-[10px] font-bold text-[#2563EB]">Send reminder</button>}
          </div>} />;
      })}</div>
      {(query.data?.pagination?.totalPages ?? 1) > 1 && <Pagination current={page} pageSize={20} total={query.data?.pagination.total} onChange={setPage} showSizeChanger={false} />}
    </QueryState>
  </div>;
}
