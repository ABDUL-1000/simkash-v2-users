import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { InstallerJob, JobStatus } from "./api/types";
import { clientName, jobPath, naira } from "./format";


const STATUS_TONE: Record<JobStatus, string> = {
  assigned: "bg-blue-50 text-[#2563EB]", en_route: "bg-amber-50 text-[#D9990D]", in_progress: "bg-amber-50 text-[#D9990D]",
  pending_verification: "bg-purple-50 text-[#7C3AED]", disputed: "bg-red-50 text-[#EF4444]", completed: "bg-emerald-50 text-[#10B981]",
  failed: "bg-red-50 text-[#EF4444]", cancelled: "bg-slate-100 text-[#66738C]",
};
export function StatusBadge({ job }: { job: Pick<InstallerJob, "status" | "statusLabel" | "onHold" | "holdReason"> & { isOverdue?: boolean } }) {
  return <span className="inline-flex flex-wrap items-center gap-1">
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_TONE[job.status] ?? "bg-slate-100 text-[#66738C]"}`}>{job.statusLabel}</span>
    {job.onHold && <span title={job.holdReason ?? undefined} className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">On hold</span>}
    {job.isOverdue && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">Overdue</span>}
  </span>;
}

export function Card({ title, action, children, className = "" }: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 ${className}`}>
    {(title || action) && <div className="flex items-center justify-between gap-2"><h3 className="text-sm font-bold text-[#0F152A]">{title}</h3>{action}</div>}
    {children}
  </section>;
}

export function QueryState({ loading, error, retry, empty, emptyTitle = "Nothing here yet", emptyDescription, children }: { loading: boolean; error: Error | null; retry: () => void; empty?: boolean; emptyTitle?: string; emptyDescription?: string; children: ReactNode }) {
  if (loading) return <div className="space-y-3 animate-pulse"><div className="h-24 rounded-2xl bg-slate-100" /><div className="h-40 rounded-2xl bg-slate-100" /></div>;
  if (error) {
    const forbidden = /403|forbidden|not.*installer/i.test(error.message);
    return <AppEmptyState title={forbidden ? "Your account is not set up as an installer" : "Couldn't load this"} description={forbidden ? "Log out and log in again. If it persists, contact support." : error.message} actionText="Retry" onAction={retry} />;
  }
  if (empty) return <AppEmptyState title={emptyTitle} description={emptyDescription} />;
  return <>{children}</>;
}

/** Compact job row used on the dashboard, verification and completed lists. */
export function JobRow({ job, right, sub }: { job: InstallerJob & { isOverdue?: boolean }; right?: ReactNode; sub?: ReactNode }) {
  return <Link to={jobPath(job.id)} className="flex items-start justify-between gap-3 rounded-xl border border-[#E2ECF6] p-3 text-xs transition hover:bg-[#F8FAFC]">
    <div className="min-w-0 space-y-0.5">
      <p className="font-mono text-[10px] font-bold text-[#2563EB]">{job.jobNumber}{job.orderNumber ? ` · ${job.orderNumber}` : ""}</p>
      <p className="truncate font-bold text-[#0F152A]">{job.title ?? job.jobType?.name ?? "Installation"}</p>
      <p className="truncate text-[#66738C]">{clientName(job.client)}{job.area ? ` · ${job.area}` : ""}{job.dateLabel ? ` · ${job.dateLabel}${job.slotLabel ? `, ${job.slotLabel}` : ""}` : ""}</p>
      {sub}
    </div>
    <div className="shrink-0 space-y-1 text-right"><StatusBadge job={job} />{right ?? <p className="font-extrabold text-[#0F152A]">{job.payAmount == null ? <span className="text-[10px] font-semibold text-[#D9990D]">Pay not set yet</span> : naira(job.payAmount)}</p>}</div>
  </Link>;
}

export function Kpi({ label, value, hint, tone = "text-[#0F152A]" }: { label: string; value: ReactNode; hint?: ReactNode; tone?: string }) {
  return <div className="min-w-0 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
    <p className="text-[11px] font-semibold text-[#8C909B]">{label}</p>
    <p className={`mt-1 truncate text-xl font-black sm:text-2xl ${tone}`}>{value}</p>
    {hint && <p className="mt-0.5 text-[11px] text-[#66738C]">{hint}</p>}
  </div>;
}
export function Change({ pct }: { pct: number | null | undefined }) {
  return pct == null ? null : <span className={pct >= 0 ? "text-[#10B981]" : "text-[#EF4444]"}>{pct >= 0 ? "↑" : "↓"} {Math.abs(pct)}% vs last month</span>;
}
