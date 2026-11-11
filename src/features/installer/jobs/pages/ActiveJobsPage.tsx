import { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { MapPin, Phone, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useInstallerJobs, type JobsTab } from "../../api";
import { QueryState, StatusBadge } from "../../ui";
import { clientName, jobPath, naira } from "../../format";

const TABS: { key: JobsTab; label: string }[] = [
  { key: "all", label: "All" }, { key: "assigned", label: "Assigned" }, { key: "in_progress", label: "In Progress" },
  { key: "on_hold", label: "On Hold" }, { key: "pending_verification", label: "Awaiting verification" }, { key: "completed", label: "Completed" },
];

/** GET /installer/jobs — tabs with counts, search and sort. Open a job to act on it. */
export default function ActiveJobsPage() {
  const [tab, setTab] = useState<JobsTab>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("deadline");
  const [page, setPage] = useState(1);
  const debounced = useDebouncedValue(search.trim());
  const query = useInstallerJobs({ tab, search: debounced || undefined, sort: tab === "completed" && sort === "deadline" ? "recent" : sort, page, limit: 20 });
  const jobs = query.data?.jobs ?? [];
  const counts = query.data?.tabCounts;

  return <div className="space-y-5 pb-12">
    <PageHeader title="My Jobs" description="Every installation assigned to you" />
    <div className="flex gap-1.5 overflow-x-auto pb-1">{TABS.map((item) => <button key={item.key} type="button" onClick={() => { setTab(item.key); setPage(1); }}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${tab === item.key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{item.label}{counts ? ` (${counts[item.key] ?? 0})` : ""}</button>)}</div>
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search job number, client, address, order…" className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#2563EB]" /></div>
      <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2.5 text-xs font-semibold"><option value="deadline">Deadline</option><option value="schedule">Schedule</option><option value="recent">Most recent</option></select>
    </div>
    <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!jobs.length} emptyTitle="No jobs found" emptyDescription="Jobs assigned to you will appear here.">
      <div className={`grid gap-3 md:grid-cols-2 ${query.isFetching ? "opacity-70" : ""}`}>{jobs.map((job) => <Link key={job.id} to={jobPath(job.id)} className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs shadow-xs transition hover:border-[#2563EB]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0"><p className="font-mono text-[10px] font-bold text-[#2563EB]">{job.jobNumber}{job.orderNumber ? ` · ${job.orderNumber}` : ""} · {job.source === "marketplace" ? "Marketplace" : "Direct"}</p>
            <p className="truncate text-sm font-extrabold text-[#0F152A]">{job.title ?? job.jobType?.name ?? "Installation"}</p></div>
          <StatusBadge job={job} />
        </div>
        <p className="text-[#66738C]">{clientName(job.client)}{job.client?.contactName && job.client.company ? ` · ${job.client.contactName}` : ""}</p>
        <p className="flex items-center gap-1 text-[#66738C]"><MapPin className="size-3" /><span className="truncate">{[job.address, job.area].filter(Boolean).join(", ") || "—"}</span></p>
        {job.onHold && job.holdReason && <p className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] text-[#0F152A]">On hold: {job.holdReason}</p>}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-2">
          <span className="text-[#8C909B]">{job.dateLabel ?? "—"}{job.slotLabel ? ` · ${job.slotLabel}` : ""}{job.deadline ? ` · due ${job.deadline}` : ""}</span>
          <span className="font-extrabold text-[#0F152A]">{job.payAmount == null ? <span className="text-[10px] text-[#D9990D]">Pay not set yet</span> : naira(job.payAmount)}</span>
        </div>
        <div className="flex gap-3 text-[11px] font-bold">
          {job.client?.phone && <a href={`tel:${job.client.phone}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-[#2563EB]"><Phone className="size-3" />Call</a>}
          {job.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-[#2563EB]"><MapPin className="size-3" />Directions</a>}
          {typeof job.photoCount === "number" && <span className="ml-auto text-[#8C909B]">{job.photoCount} photo{job.photoCount === 1 ? "" : "s"}</span>}
        </div>
      </Link>)}</div>
      {(query.data?.pagination?.totalPages ?? 1) > 1 && <Pagination current={page} pageSize={20} total={query.data?.pagination.total} onChange={setPage} showSizeChanger={false} />}
    </QueryState>
  </div>;
}
