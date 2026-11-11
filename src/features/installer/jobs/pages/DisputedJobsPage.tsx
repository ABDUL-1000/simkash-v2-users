import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { AppModal } from "@/components/common/AppModal";
import { useInstallerDispute, useInstallerDisputes, useRespondDispute } from "../../api";
import { Kpi, QueryState } from "../../ui";
import { clientName, dateText, jobPath, naira } from "../../format";

const FILTERS = [["all", "All"], ["open", "Open"], ["awaiting_response", "Needs my response"], ["resolved", "Resolved"]] as const;
const RESOLUTION_NOTE: Record<string, string> = { release: "Full pay credited", reduce_pay: "Reduced pay credited", rework: "Back to In Progress — fix and resubmit", cancel: "Job cancelled, no pay" };

/** GET /installer/disputes, /disputes/:id, POST /disputes/:id/respond (once, 10+ characters). */
export default function DisputedJobsPage() {
  const [params, setParams] = useSearchParams();
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const query = useInstallerDisputes({ status, page, limit: 20 });
  const openId = Number(params.get("dispute")) || undefined;
  const s = query.data?.summary;
  const disputes = query.data?.disputes ?? [];

  return <div className="space-y-5 pb-12">
    <PageHeader title="Disputes" description="Problems reported by a customer or Simkash. Pay for a disputed job is held until Simkash resolves it." />
    {s && <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Kpi label="Open" value={s.open} tone="text-[#EF4444]" /><Kpi label="Need your response" value={s.awaitingResponse} tone="text-[#D9990D]" />
      <Kpi label="Resolved" value={s.resolved} tone="text-[#10B981]" /><Kpi label="Pay held" value={naira(s.heldAmount)} tone="text-[#7C3AED]" />
    </div>}
    <div className="flex gap-1.5 overflow-x-auto pb-1">{FILTERS.map(([key, label]) => <button key={key} type="button" onClick={() => { setStatus(key); setPage(1); }} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${status === key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{label}</button>)}</div>
    <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!disputes.length} emptyTitle="No disputes" emptyDescription="Great work — no problems reported.">
      <div className="space-y-2">{disputes.map((d) => <button key={d.id} type="button" onClick={() => setParams({ dispute: String(d.id) })} className={`block w-full rounded-2xl border p-4 text-left text-xs ${d.status === "open" ? "border-[#F7D2D7] bg-[#FFF7F8]" : "border-[#E2ECF6] bg-white"}`}>
        <div className="flex items-start justify-between gap-2"><p className="font-mono text-[10px] font-bold text-[#2563EB]">{d.job?.jobNumber}{d.job?.orderNumber ? ` · ${d.job.orderNumber}` : ""}</p>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${d.status === "open" ? "bg-red-100 text-[#EF4444]" : "bg-emerald-50 text-[#10B981]"}`}>{d.status === "open" ? "Open" : d.resolutionLabel ?? "Resolved"}</span></div>
        <p className="font-bold text-[#0F152A]">{d.job?.title ?? "Installation"} · {clientName(d.job?.client)}</p>
        <p className="text-[#66738C]">{d.reason}</p>
        <p className="mt-1 text-[10px] text-[#8C909B]">Raised by {d.raisedBy === "simkash" ? "Simkash" : "the customer"} · {dateText(d.createdAt)}{d.awaitingInstallerResponse ? " · " : ""}{d.awaitingInstallerResponse && <b className="text-[#EF4444]">your response is needed</b>}</p>
      </button>)}</div>
      {(query.data?.pagination?.totalPages ?? 1) > 1 && <Pagination current={page} pageSize={20} total={query.data?.pagination.total} onChange={setPage} showSizeChanger={false} />}
    </QueryState>
    {openId && <DisputeDetailModal id={openId} onClose={() => setParams({}, { replace: true })} />}
  </div>;
}

function DisputeDetailModal({ id, onClose }: { id: number; onClose: () => void }) {
  const query = useInstallerDispute(id);
  const respond = useRespondDispute();
  const [response, setResponse] = useState("");
  const d = query.data;
  return <AppModal open onOpenChange={(v) => !v && onClose()} title="Dispute details" description={d?.job?.jobNumber} size="md" footer={null}>
    <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!d}>
      {d && <div className="space-y-3 text-xs">
        <div className="rounded-xl bg-[#FFF7F8] p-3"><p className="font-bold text-[#EF4444]">Reported by {d.raisedBy === "simkash" ? "Simkash" : "the customer"}</p><p className="text-[#0F152A]">{d.reason}</p></div>
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div><span className="text-[#8C909B]">Job</span><Link to={jobPath(d.job.id)} className="block font-bold text-[#2563EB]">{d.job.title ?? d.job.jobNumber}</Link></div>
          <div><span className="text-[#8C909B]">Pay</span><p className="font-bold">{naira(d.job.payAmount)}</p></div>
        </div>
        {d.evidence?.photos?.length ? <div><p className="mb-1 font-bold text-[#0F152A]">Your photos</p><div className="grid grid-cols-4 gap-1.5">{d.evidence.photos.map((p) => <img key={p.id} src={p.url} alt={p.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />)}</div></div> : null}
        {d.evidence?.checklist?.length ? <div><p className="mb-1 font-bold text-[#0F152A]">Checklist</p>{d.evidence.checklist.map((c) => <p key={c.id} className={c.isChecked ? "text-[#10B981]" : "text-[#8C909B]"}>{c.isChecked ? "✓" : "○"} {c.label}</p>)}</div> : null}
        {d.installerResponse ? <div className="rounded-xl bg-[#F8FAFC] p-3"><p className="font-bold text-[#0F152A]">Your response · {dateText(d.respondedAt, true)}</p><p className="text-[#66738C]">{d.installerResponse}</p></div>
          : d.status === "open" && <div className="space-y-2">
            <textarea rows={4} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Explain your side (at least 10 characters). You can respond once." className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]" />
            <button type="button" disabled={response.trim().length < 10 || respond.isPending} onClick={() => respond.mutate({ id: d.id, response: response.trim() })} className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white disabled:opacity-50">{respond.isPending ? "Sending…" : "Send response"}</button>
          </div>}
        {d.status === "resolved" && <div className="rounded-xl bg-emerald-50 p-3"><p className="font-bold text-[#10B981]">{d.resolutionLabel ?? "Resolved"}{d.resolution ? ` — ${RESOLUTION_NOTE[d.resolution]}` : ""}</p>
          {d.resolvedAmount != null && <p>Amount: {naira(d.resolvedAmount)}</p>}{d.resolutionNote && <p className="text-[#66738C]">{d.resolutionNote}</p>}</div>}
      </div>}
    </QueryState>
  </AppModal>;
}
