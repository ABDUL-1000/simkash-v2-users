import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Inbox, Plus, RefreshCw, Send } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { openNotification } from "@/utils/notifications";
import { useCancelSimRequest, useIncomingSimRequests, useMySimRequests } from "../api";
import { useHierarchyConfig } from "../roles";
import type { SimRequest, SimRequestQuery, SimType } from "../types";
import { SIM_TYPES, simTypeLabel } from "../utils";
import { SimRequestCard } from "../components/SimRequestCard";
import { FilterChips, Pager } from "../components/ui";
import { NewSimRequestModal } from "../Modals/NewSimRequestModal";
import { ApproveSimRequestModal, RejectSimRequestModal } from "../Modals/RespondSimRequestModals";

type Tab = "incoming" | "mine";
type Status = SimRequestQuery["status"];
const PAGE_SIZE = 10;
const STATUS_OPTIONS: { value: Status; label: string; key: "all" | "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" }[] = [
  { value: "all", label: "All", key: "all" },
  { value: "pending", label: "Pending", key: "PENDING" },
  { value: "approved", label: "Approved", key: "APPROVED" },
  { value: "rejected", label: "Declined", key: "REJECTED" },
  { value: "cancelled", label: "Cancelled", key: "CANCELLED" },
];

export default function SimRequestsPage() {
  const config = useHierarchyConfig();
  const [params, setParams] = useSearchParams();
  const supplies = Boolean(config?.requesterLabel);
  // Suppliers land on what's waiting for them; partners only have their own requests.
  const tab: Tab = supplies && params.get("tab") !== "mine" ? "incoming" : "mine";
  const status = (params.get("status") as Status) || (tab === "incoming" ? "pending" : "all");
  const simType = (params.get("type") as SimType) || undefined;
  const page = Math.max(1, Number(params.get("page")) || 1);
  const update = (next: Record<string, string | null>) => setParams((prev) => {
    const p = new URLSearchParams(prev);
    Object.entries(next).forEach(([k, v]) => (v == null ? p.delete(k) : p.set(k, v)));
    return p;
  }, { replace: true });

  const query: SimRequestQuery = { status, page, limit: PAGE_SIZE, ...(simType ? { sim_type: simType } : {}) };
  const mine = useMySimRequests(query, tab === "mine");
  const incoming = useIncomingSimRequests(query, tab === "incoming");
  // Pending count for the Incoming tab label, fetched independently of the active filters.
  const incomingPending = useIncomingSimRequests({ status: "pending", page: 1, limit: 1 }, supplies);
  const active = tab === "mine" ? mine : incoming;
  const cancel = useCancelSimRequest();

  const [newOpen, setNewOpen] = useState(false);
  const [approving, setApproving] = useState<SimRequest | null>(null);
  const [rejecting, setRejecting] = useState<SimRequest | null>(null);

  if (!config) return <AppEmptyState title="SIM requests aren't available" description="SIM requests are for Agency Partners, State Coordinators and Regional Managers." />;

  const data = active.data;
  const counts = data?.counts;
  const pendingIncoming = incomingPending.data?.counts.PENDING ?? 0;
  const onCancel = (request: SimRequest) => cancel.mutateAsync(request.id, {
    onSuccess: () => openNotification({ state: "success", title: "Request cancelled" }),
    onError: (err) => openNotification({ state: "error", title: "Couldn't cancel", description: err.message }),
  });

  return <div className="w-full min-w-0 space-y-4 pb-12 sm:space-y-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-black text-[#0F152A] sm:text-2xl">SIM Requests</h1>
        <p className="mt-0.5 text-xs text-[#8C909B]">
          {supplies ? `Respond to ${config.requesterLabel}s and request stock from ${config.supplierLabel === "Simkash Admin" ? "Simkash Admin" : `your ${config.supplierLabel}`}` : `Request SIM stock from your ${config.supplierLabel}`}
        </p>
      </div>
      <button type="button" onClick={() => setNewOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700">
        <Plus className="size-4" /> Request SIMs
      </button>
    </div>

    {supplies && <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-[#E2ECF6] bg-white p-1.5 shadow-xs sm:inline-grid sm:w-auto">
      {([["incoming", `From ${config.requesterLabel}s`, Inbox], ["mine", "My requests", Send]] as const).map(([value, label, Icon]) =>
        <button key={value} type="button" onClick={() => update({ tab: value === "incoming" ? null : "mine", status: null, page: null })}
          className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${tab === value ? "bg-[#2563EB] text-white" : "text-[#66738C] hover:bg-slate-50"}`}>
          <Icon className="size-4 shrink-0" /><span className="truncate">{label}</span>
          {value === "incoming" && pendingIncoming > 0 && <span className={`rounded-full px-1.5 text-[10px] ${tab === value ? "bg-white/25" : "bg-[#FFFBEB] text-[#D9990D]"}`}>{pendingIncoming}</span>}
        </button>)}
    </div>}

    <div className="space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips value={status} onChange={(v) => update({ status: v, page: null })}
          options={STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label, count: counts?.[o.key] }))} />
        <div className="flex items-center gap-2">
          {active.isFetching && !active.isLoading && <RefreshCw className="size-3.5 animate-spin text-[#2563EB]" />}
          <select aria-label="SIM type" value={simType ?? ""} onChange={(e) => update({ type: e.target.value || null, page: null })}
            className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]">
            <option value="">All SIM types</option>
            {SIM_TYPES.map((t) => <option key={t} value={t}>{simTypeLabel(t)}</option>)}
          </select>
        </div>
      </div>
    </div>

    {active.isLoading ? <div className="grid gap-3 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      : active.error ? <AppEmptyState title="Couldn't load requests" description={active.error.message} actionText="Retry" onAction={() => void active.refetch()} />
      : !data?.requests.length ? <div className="rounded-2xl border border-[#E2ECF6] bg-white py-6 shadow-xs">
          <AppEmptyState
            title={tab === "incoming" ? (status === "pending" ? "Nothing waiting for you" : "No requests found") : "No requests yet"}
            description={tab === "incoming" ? `Requests from your ${config.requesterLabel}s will show up here.` : `Running low? Ask your ${config.supplierLabel} for more SIMs.`}
            {...(tab === "mine" ? { actionText: "Request SIMs", onAction: () => setNewOpen(true) } : {})} />
        </div>
      : <div className="grid gap-3 md:grid-cols-2">
          {data.requests.map((r) => <SimRequestCard key={r.id} request={r} direction={tab}
            onCancel={tab === "mine" ? onCancel : undefined} cancelling={cancel.isPending && cancel.variables === r.id}
            onApprove={setApproving} onReject={setRejecting} />)}
        </div>}

    {data && <Pager page={data.pagination.page || page} totalPages={data.pagination.totalPages} onChange={(p) => update({ page: p > 1 ? String(p) : null })} />}

    {/* After sending, show the new request under My requests. */}
    <NewSimRequestModal open={newOpen} onClose={() => setNewOpen(false)} onSent={() => { if (tab !== "mine") update({ tab: "mine", status: null, page: null }); }} />
    <ApproveSimRequestModal request={approving} onClose={() => setApproving(null)} />
    <RejectSimRequestModal request={rejecting} onClose={() => setRejecting(null)} />
  </div>;
}
