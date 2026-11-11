import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, CalendarClock, ShieldAlert, Wallet } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { APP_COLORS } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import { AgentTopUpButton } from "@/features/wallet/components/AgentTopUpButton";
import { AgentVirtualAccountsCard } from "@/features/wallet/components/AgentVirtualAccountsCard";
import { useInstallerDashboard, useSendReminder } from "../api";
import { Card, Change, JobRow, Kpi, QueryState } from "../ui";
import { clientName, dateText, jobPath, naira } from "../format";

const URGENCY_TONE = { overdue: "text-[#EF4444] bg-red-50", today: "text-[#D9990D] bg-amber-50", soon: "text-[#D9990D] bg-amber-50", ok: "text-[#10B981] bg-emerald-50" } as const;

/** Installer home — GET /installer/dashboard. */
export default function InstallerDashboardPage() {
  const navigate = useNavigate();
  const query = useInstallerDashboard();
  const remind = useSendReminder();
  const data = query.data;
  const k = data?.kpis;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title={`Welcome back, ${data?.greeting?.name ?? "Installer"}`}
        description={data?.greeting?.dateLabel ?? "Track your assigned installations, verification, payouts and reviews"}
        actions={[
          { key: "topup", render: () => <AgentTopUpButton /> },
          { key: "jobs", label: "My Jobs", variant: "outline", onClick: () => navigate(appPaths.installerJobs) },
          { key: "request-payout", label: "Request Payout", icon: <Wallet className="size-3.5" />, onClick: () => navigate(`${appPaths.installerEarnings}?payout=1`), variant: "default",
            style: { backgroundColor: APP_COLORS.blues.interactiveCta, borderColor: APP_COLORS.blues.interactiveCta, color: "#FFFFFF" } },
        ]}
      />

      <AgentVirtualAccountsCard />

      <QueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
        {data && k && <>
          {/* KPI strip */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <Kpi label="Active jobs" value={k.activeJobs?.count ?? 0} hint={`${k.activeJobs?.inProgress ?? 0} in progress · ${naira(k.activeJobs?.potentialEarnings)} potential${k.activeJobs?.onHold ? ` · ${k.activeJobs.onHold} on hold` : ""}`} />
            <Kpi label="Completed this month" value={k.completed?.thisMonth ?? 0} hint={<Change pct={k.completed?.changePercent} />} tone="text-[#10B981]" />
            <Kpi label="Pending verification" value={k.pendingVerification?.count ?? 0} hint={`${naira(k.pendingVerification?.heldAmount)} held`} tone="text-[#7C3AED]" />
            <Kpi label="Earnings this month" value={naira(k.earnings?.thisMonth)} hint={<>Balance {naira(k.earnings?.availableBalance)} · <Change pct={k.earnings?.changePercent} /></>} />
            <Kpi label="Rating" value={k.rating?.average != null ? `${k.rating.average.toFixed(1)} ★` : "—"} hint={`${k.rating?.count ?? 0} reviews`} tone="text-[#F59E0B]" />
          </div>

          {/* Alert cards */}
          {(data.cards?.overdue > 0 || data.cards?.todayJobs > 0 || data.cards?.disputesAwaitingResponse > 0) && <div className="grid gap-3 sm:grid-cols-3">
            {data.cards.todayJobs > 0 && <Link to={appPaths.installerJobs} className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs"><CalendarClock className="size-5 text-[#2563EB]" /><span><b className="block text-base text-[#0F152A]">{data.cards.todayJobs}</b>job{data.cards.todayJobs === 1 ? "" : "s"} scheduled today</span></Link>}
            {data.cards.overdue > 0 && <Link to={appPaths.installerJobs} className="flex items-center gap-3 rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs"><AlertTriangle className="size-5 text-[#EF4444]" /><span><b className="block text-base text-[#EF4444]">{data.cards.overdue}</b>overdue job{data.cards.overdue === 1 ? "" : "s"}</span></Link>}
            {data.cards.disputesAwaitingResponse > 0 && <Link to={appPaths.installerJobsDisputed} className="flex items-center gap-3 rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs"><ShieldAlert className="size-5 text-[#EF4444]" /><span><b className="block text-base text-[#EF4444]">{data.cards.disputesAwaitingResponse}</b>dispute{data.cards.disputesAwaitingResponse === 1 ? "" : "s"} need your response</span></Link>}
          </div>}

          <Card title="Active Jobs" action={<Link to={appPaths.installerJobs} className="text-xs font-bold text-[#2563EB]">View all</Link>}>
            {data.activeJobs?.length ? <div className="space-y-2">{data.activeJobs.map((job) => <JobRow key={job.id} job={job} />)}</div> : <p className="text-xs text-[#8C909B]">No active jobs right now.</p>}
          </Card>

          {/* Quick links */}
          <div className="flex flex-wrap gap-2">
            {[["My Jobs", appPaths.installerJobs], ["Pending Verification", appPaths.installerJobsPending], ["Disputes", appPaths.installerJobsDisputed], ["Completed & Reviews", appPaths.installerJobsCompleted], ["Earnings & Payout", appPaths.installerEarnings]].map(([label, to]) =>
              <Link key={to} to={to} className="rounded-full border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#EFF4F8]">{label}</Link>)}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 min-w-0">
              <Card title="Pending Verification" action={<Link to={appPaths.installerJobsPending} className="text-xs font-bold text-[#2563EB]">View all</Link>}>
                {data.pendingVerification?.length ? <div className="space-y-2">{data.pendingVerification.map((job) => <JobRow key={job.id} job={job}
                  sub={<p className="text-[10px] text-[#7C3AED]">{job.verification?.stage === "awaiting_client" ? `Awaiting customer${job.verification.clientRespondBy ? ` · respond by ${dateText(job.verification.clientRespondBy, true)}` : ""}` : job.verification?.stage === "disputed" ? "Disputed — pay held" : "Awaiting Simkash"}</p>}
                  right={<div className="space-y-1"><p className="font-extrabold text-[#0F152A]">{naira(job.verification?.heldAmount ?? job.payAmount)}</p>
                    {job.verification?.canRemind && <button type="button" disabled={remind.isPending} onClick={(e) => { e.preventDefault(); remind.mutate(job.id); }} className="rounded-lg border border-[#E2ECF6] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">Send reminder</button>}</div>} />)}</div>
                  : <p className="text-xs text-[#8C909B]">Nothing awaiting verification.</p>}
              </Card>

              {data.disputes?.length > 0 && <Card title="Open Disputes" action={<Link to={appPaths.installerJobsDisputed} className="text-xs font-bold text-[#2563EB]">View all</Link>}>
                <div className="space-y-2">{data.disputes.map((d) => <Link key={d.id} to={`${appPaths.installerJobsDisputed}?dispute=${d.id}`} className="block rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs">
                  <p className="font-mono text-[10px] font-bold text-[#EF4444]">{d.job?.jobNumber}</p>
                  <p className="font-bold text-[#0F152A]">{d.job?.title ?? "Installation"} · {clientName(d.job?.client)}</p>
                  <p className="text-[#66738C]">{d.reason}</p>
                  {d.awaitingInstallerResponse && <p className="mt-1 font-bold text-[#EF4444]">Your response is needed</p>}
                </Link>)}</div>
              </Card>}

              <Card title="Recently Completed" action={<Link to={appPaths.installerJobsCompleted} className="text-xs font-bold text-[#2563EB]">View all</Link>}>
                {data.recentlyCompleted?.length ? <div className="divide-y divide-[#E2ECF6] text-xs">{data.recentlyCompleted.map((job) => {
                  const rating = typeof job.rating === "number" ? job.rating : job.rating?.rating;
                  return <Link key={job.id} to={jobPath(job.id)} className="flex items-center justify-between gap-3 py-2.5">
                    <span className="min-w-0"><span className="block font-mono text-[10px] font-bold text-[#2563EB]">{job.jobNumber}</span><span className="block truncate font-bold text-[#0F152A]">{job.title ?? "Installation"} · {clientName(job.client)}</span><span className="text-[#8C909B]">{dateText(job.completedAt)}</span></span>
                    <span className="shrink-0 text-right"><b className="block text-[#10B981]">{naira(job.paidAmount)}</b>{rating ? <span className="text-[#F59E0B]">{"★".repeat(Math.round(rating))}</span> : null}</span>
                  </Link>;
                })}</div> : <p className="text-xs text-[#8C909B]">No completed jobs yet.</p>}
              </Card>
            </div>

            <div className="space-y-6 lg:col-span-1 min-w-0">
              <Card title="Earnings">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-[#8C909B]">Available balance</span><b>{naira(k.earnings?.availableBalance)}</b></div>
                  <div className="flex justify-between"><span className="text-[#8C909B]">This month</span><b>{naira(k.earnings?.thisMonth)}</b></div>
                  <div className="flex justify-between"><span className="text-[#8C909B]">Held for verification</span><b className="text-[#7C3AED]">{naira(k.pendingVerification?.heldAmount)}</b></div>
                  <div className="flex justify-between"><span className="text-[#8C909B]">Total earned</span><b>{naira(k.earnings?.total)}</b></div>
                </div>
                <button type="button" onClick={() => navigate(`${appPaths.installerEarnings}?payout=1`)} className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white">Request Payout</button>
              </Card>

              <Card title="Upcoming Deadlines">
                {data.upcomingDeadlines?.length ? <div className="space-y-2">{data.upcomingDeadlines.map((d) => <Link key={d.id} to={jobPath(d.id)} className="flex items-center justify-between gap-2 text-xs">
                  <span className="min-w-0"><span className="block truncate font-bold text-[#0F152A]">{d.title ?? d.jobNumber}</span><span className="text-[#8C909B]">{clientName(d.client)}{d.onHold ? " · On hold" : ""}</span></span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${URGENCY_TONE[d.urgency] ?? URGENCY_TONE.ok}`}>{d.urgency === "overdue" ? `${Math.abs(d.daysLeft)}d overdue` : d.urgency === "today" ? "Today" : `${d.daysLeft}d left`}</span>
                </Link>)}</div> : <p className="text-xs text-[#8C909B]">No upcoming deadlines.</p>}
              </Card>

              <Card title="Activity">
                {data.activity?.length ? <div className="space-y-2.5">{data.activity.map((a) => <div key={a.id} className="text-xs">
                  <p className="text-[#0F152A]">{a.note ?? a.event}</p>
                  <p className="text-[10px] text-[#8C909B]">{a.job?.jobNumber ? `${a.job.jobNumber} · ` : ""}{dateText(a.at, true)}</p>
                </div>)}</div> : <p className="text-xs text-[#8C909B]">No recent activity.</p>}
              </Card>
            </div>
          </div>
        </>}
      </QueryState>
    </div>
  );
}
