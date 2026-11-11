import { useState } from "react";
import { Pagination } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useInstallerCompleted, useInstallerReviews } from "../../api";
import { Card, JobRow, Kpi, QueryState } from "../../ui";
import { dateText, naira } from "../../format";

const PERIODS = [["all", "All time"], ["this_month", "This month"], ["last_month", "Last month"], ["last_3_months", "Last 3 months"], ["this_year", "This year"]] as const;

/** GET /installer/completed (verified jobs, totals follow the filters) + GET /installer/reviews. */
export default function CompletedJobsPage() {
  const [period, setPeriod] = useState<string>("all");
  const [jobTypeId, setJobTypeId] = useState<number>();
  const [sort, setSort] = useState("recent");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debounced = useDebouncedValue(search.trim());
  const query = useInstallerCompleted({ period, jobTypeId, sort, search: debounced || undefined, page, limit: 20 });
  const [reviewRating, setReviewRating] = useState<number>();
  const [reviewSort, setReviewSort] = useState("recent");
  const [reviewPage, setReviewPage] = useState(1);
  const reviews = useInstallerReviews({ rating: reviewRating, sort: reviewSort, page: reviewPage, limit: 10 });
  const data = query.data;
  const t = data?.totals;
  const maxEarned = Math.max(1, ...(data?.monthlyEarnings ?? []).map((m) => m.earned));
  const rs = reviews.data?.summary;

  return <div className="space-y-5 pb-12">
    <PageHeader title="Completed Jobs" description="Verified jobs, your earnings and reviews" />
    <div className="flex flex-wrap gap-1.5">{PERIODS.map(([key, label]) => <button key={key} type="button" onClick={() => { setPeriod(key); setPage(1); }} className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${period === key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{label}</button>)}</div>
    <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
      {data && t && <>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Kpi label="Jobs" value={t.jobs} /><Kpi label="Total earned" value={naira(t.totalEarned)} tone="text-[#10B981]" /><Kpi label="Average pay" value={naira(t.averagePay)} />
          <Kpi label="Average rating" value={t.averageRating != null ? `${t.averageRating.toFixed(1)} ★` : "—"} hint={`${t.ratedJobs} rated`} tone="text-[#F59E0B]" />
          <Kpi label="On time" value={t.onTimeRate != null ? `${t.onTimeRate}%` : "—"} hint="Submitted by the deadline" />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card title="Monthly earnings" className="lg:col-span-2">
            <div className="flex h-36 items-end gap-2">{data.monthlyEarnings.map((m) => <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[9px] font-bold text-[#0F152A]">{m.earned ? naira(m.earned) : ""}</span>
              <div className="w-full rounded-t-md bg-[#2563EB]" style={{ height: `${Math.max(4, (m.earned / maxEarned) * 100)}px` }} title={`${m.jobs} jobs`} />
              <span className="text-[10px] text-[#8C909B]">{m.label}</span>
            </div>)}</div>
          </Card>
          <Card title="By job type">
            {data.jobTypeBreakdown.length ? <div className="space-y-2">{data.jobTypeBreakdown.map((b) => <button key={b.jobTypeId} type="button" onClick={() => { setJobTypeId(jobTypeId === b.jobTypeId ? undefined : b.jobTypeId); setPage(1); }} className={`block w-full rounded-lg p-1.5 text-left text-xs ${jobTypeId === b.jobTypeId ? "bg-[#EFF4F8]" : ""}`}>
              <div className="flex justify-between"><span className="font-semibold text-[#0F152A]">{b.name}</span><span className="text-[#8C909B]">{b.jobs} · {naira(b.earned)}</span></div>
              <div className="mt-1 h-1.5 rounded bg-slate-100"><div className="h-full rounded bg-[#10B981]" style={{ width: `${b.percent}%` }} /></div>
            </button>)}</div> : <p className="text-xs text-[#8C909B]">No data yet.</p>}
          </Card>
        </div>
        <Card title="Jobs" action={<div className="flex gap-2">
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search…" className="w-32 rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs sm:w-48" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs"><option value="recent">Recent</option><option value="oldest">Oldest</option><option value="pay_high">Pay: high</option><option value="pay_low">Pay: low</option><option value="rating">Rating</option></select>
        </div>}>
          {data.jobs.length ? <div className="space-y-2">{data.jobs.map((job) => <JobRow key={job.id} job={job}
            sub={<p className="text-[10px] text-[#8C909B]">Completed {dateText(job.completedAt)}{job.onTime === false ? " · late" : job.onTime ? " · on time" : ""}{job.durationHours ? ` · ${job.durationHours}h` : ""}{job.rating ? ` · ${"★".repeat(job.rating.rating)}` : ""}</p>}
            right={<p className="font-extrabold text-[#10B981]">{naira(job.paidAmount)}</p>} />)}</div> : <p className="text-xs text-[#8C909B]">No completed jobs for these filters.</p>}
          {(data.pagination?.totalPages ?? 1) > 1 && <Pagination current={page} pageSize={20} total={data.pagination.total} onChange={setPage} showSizeChanger={false} />}
        </Card>
      </>}
    </QueryState>

    <Card title="Reviews" action={<div className="flex gap-2">
      <select value={reviewRating ?? ""} onChange={(e) => { setReviewRating(Number(e.target.value) || undefined); setReviewPage(1); }} className="rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs"><option value="">All stars</option>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} ★</option>)}</select>
      <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)} className="rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs"><option value="recent">Recent</option><option value="highest">Highest</option><option value="lowest">Lowest</option></select>
    </div>}>
      <QueryState loading={reviews.isLoading} error={reviews.error} retry={() => void reviews.refetch()} empty={!rs || rs.count === 0} emptyTitle="No reviews yet">
        {rs && <div className="flex flex-wrap items-center gap-6">
          <div><p className="text-3xl font-black text-[#0F152A]">{rs.average != null ? rs.average.toFixed(1) : "—"}</p><p className="text-[11px] text-[#8C909B]">{rs.count} reviews · {rs.thisMonth?.count ?? 0} this month</p></div>
          <div className="min-w-48 flex-1 space-y-1 text-[10px]">{rs.breakdown.map((b) => <div key={b.stars} className="flex items-center gap-2"><span className="w-6">{b.stars} ★</span><div className="h-1.5 flex-1 rounded bg-slate-100"><div className="h-full rounded bg-[#F59E0B]" style={{ width: `${b.percent}%` }} /></div><span className="w-6 text-right text-[#8C909B]">{b.count}</span></div>)}</div>
        </div>}
        <div className="divide-y divide-[#E2ECF6]">{(reviews.data?.reviews ?? []).map((r) => <div key={r.id} className="space-y-0.5 py-2.5 text-xs">
          <div className="flex justify-between gap-2"><span className="font-bold text-[#0F152A]">{r.reviewer}{r.recordedBySimkash && <span className="ml-1 font-normal text-[#8C909B]">(via Simkash)</span>}</span><span className="text-[#F59E0B]">{"★".repeat(r.rating)}</span></div>
          {r.comment && <p className="text-[#66738C]">{r.comment}</p>}
          <p className="text-[10px] text-[#8C909B]">{r.job?.jobNumber} · {r.job?.title ?? r.job?.jobType?.name ?? ""} · {dateText(r.createdAt)}</p>
        </div>)}</div>
        {(reviews.data?.pagination?.totalPages ?? 1) > 1 && <Pagination current={reviewPage} pageSize={10} total={reviews.data?.pagination.total} onChange={setReviewPage} showSizeChanger={false} />}
      </QueryState>
    </Card>
  </div>;
}
