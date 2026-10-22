import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetApplicationOptions, useGetApplicationStatus } from "../api/useAgentApplications";
import type { AgentApplication, ApplicationRole } from "../types/api";
import { ApplicationTimeline } from "../components/ApplicationTimeline";
import { applicationTone, isOpenApplication, roleTitle, slugFromRole } from "../utils/applicationStatus";

const ACCENTS: Record<ApplicationRole, { ring: string; button: string; badgeBg: string; badgeText: string; letter: string }> = {
  partner: { ring: "border-[#2563EB]", button: "bg-[#2563EB] hover:bg-blue-700", badgeBg: "bg-[#EFF4F8]", badgeText: "text-[#2563EB]", letter: "U" },
  state: { ring: "border-[#E2ECF6]", button: "bg-[#7E22CE] hover:bg-purple-800", badgeBg: "bg-[#F3E8FF]", badgeText: "text-[#7E22CE]", letter: "S" },
};

function StatusBadge({ status, label }: { status: string; label: string }) {
  const tone = applicationTone(status);
  return <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ color: tone.color, background: tone.bg }}>{label}</span>;
}

export function BecomePartnerPage() {
  const navigate = useNavigate();
  const options = useGetApplicationOptions();
  const status = useGetApplicationStatus();

  const applicationFor = (role: ApplicationRole): AgentApplication | null =>
    role === "partner" ? status.data?.partner_application ?? null : status.data?.state_coordinator_application ?? null;
  const roleStatus = (role: ApplicationRole) => role === "partner" ? status.data?.partner_status : status.data?.state_coordinator_status;
  const applications = status.data?.applications ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Back" onClick={() => navigate(appPaths.dashboard)} className="text-[#2563EB]"><ArrowLeft className="size-5" /></button>
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">Become a Partner</h1>
          <p className="text-xs text-[#8C909B]">Choose how you want to earn with Simkash</p>
        </div>
      </div>

      {/* My applications (GET /user/applications/status) */}
      {applications.length > 0 && (
        <section id="application-status" className="space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-[#0F152A]">My Applications</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {applications.map(app => (
              <div key={app.id} className="space-y-3 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-[#0F152A]">{app.role_label}</p>
                    <p className="text-[#8C909B]">Ref #{app.id} · Applied {app.createdAt_formatted}</p>
                  </div>
                  <StatusBadge status={app.status} label={app.status_label} />
                </div>
                <ApplicationTimeline status={app.status} compact />
                <p className="text-[#66738C]">{app.state} · {app.lga}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {options.isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">{[0, 1].map(index => <div key={index} className="h-96 animate-pulse rounded-2xl bg-slate-100" />)}</div>
      ) : options.error || !options.data ? (
        <AppEmptyState title="Couldn't load partner options" description={options.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void options.refetch()} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {options.data.roles.map(option => {
            const accent = ACCENTS[option.role] ?? ACCENTS.partner;
            const existing = applicationFor(option.role);
            const open = isOpenApplication(roleStatus(option.role)) && existing;
            return (
              <div key={option.role} className={`flex flex-col rounded-2xl border-2 bg-white p-6 shadow-xs ${accent.ring}`}>
                <span className={`flex size-12 items-center justify-center rounded-full text-xl ${accent.badgeBg} ${accent.badgeText}`}>{accent.letter}</span>
                <h3 className="mt-3 text-xl font-bold text-[#0F152A]">{option.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#66738C]">{option.description}</p>
                {/* "What you earn" amounts and badges (Most Popular / High Volume) are not in /user/apply/options. */}

                <hr className="my-4 border-[#E2ECF6]" />
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">WHAT YOU GET</p>
                <ul className="space-y-2 text-xs text-[#0F152A]">
                  {option.benefits.map(benefit => <li key={benefit} className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-[#10B981]" />{benefit}</li>)}
                </ul>

                <p className="mb-2 mt-4 text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">REQUIREMENTS</p>
                <ul className="space-y-2 text-xs text-[#66738C]">
                  {option.requirements.map(requirement => <li key={requirement} className="flex gap-2"><span>·</span>{requirement}</li>)}
                </ul>

                <div className="mt-auto pt-6">
                  {open ? (
                    <div className="flex items-center justify-between rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-4 py-3 text-xs">
                      <span className="text-[#66738C]">Application #{existing.id}</span>
                      <StatusBadge status={existing.status} label={existing.status_label} />
                    </div>
                  ) : (
                    <button type="button" onClick={() => navigate(appPaths.becomePartnerApply(slugFromRole(option.role)).path)} className={`w-full rounded-xl py-3 text-sm font-semibold text-white transition ${accent.button}`}>
                      Apply as {roleTitle(option.role)}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BecomePartnerPage;
