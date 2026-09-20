import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Video, AlertCircle, Bell, Briefcase } from "lucide-react";
import { message } from "antd";
import { appPaths } from "@/app/router/paths";
import { ACTIVE_JOBS_LIST, PENDING_VERIFICATION_JOB } from "../data/jobs.data";
import type { JobDetailItem } from "../types";
import { JobDetailsSummaryHeader } from "../components/JobDetailsSummaryHeader";
import { JobProgressStepper } from "../components/JobProgressStepper";
import { CompletionChecklist } from "../components/CompletionChecklist";
import { UploadCompletionPhotos } from "../components/UploadCompletionPhotos";
import { JobClientInfoCard } from "../components/JobClientInfoCard";
import { JobDetailsSidebar } from "../components/JobDetailsSidebar";
import { StartJobModal } from "../modals/StartJobModal";
import { UpdateProgressModal } from "../modals/UpdateProgressModal";
import { SubmitJobVerificationModal } from "../modals/SubmitJobVerificationModal";
import { ContactClientModal } from "../modals/ContactClientModal";
import { ReportIssueModal } from "../modals/ReportIssueModal";
import { SendReminderModal } from "../modals/SendReminderModal";
import { ViewSubmissionModal } from "../modals/ViewSubmissionModal";
import { MapDirectionsModal } from "../modals/MapDirectionsModal";
import { JobStartedSuccessModal } from "../modals/JobStartedSuccessModal";
import { VerificationSubmittedSuccessModal } from "../modals/VerificationSubmittedSuccessModal";
import { NewJobAssignedModal } from "../modals/NewJobAssignedModal";

export default function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const initialJob =
    ACTIVE_JOBS_LIST.find((j) => j.reference === jobId || j.id === jobId) ??
    (jobId?.includes("844") ? PENDING_VERIFICATION_JOB : ACTIVE_JOBS_LIST[0]);

  const [job, setJob] = useState<JobDetailItem>(initialJob);

  // Modal triggers
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [startedSuccessModalOpen, setStartedSuccessModalOpen] = useState(false);
  const [submitSuccessModalOpen, setSubmitSuccessModalOpen] = useState(false);
  const [assignedOfferModalOpen, setAssignedOfferModalOpen] = useState(false);

  const isPending = job.status === "Pending Verification";
  const isInProgress = job.status === "In Progress";
  const isAssigned = job.status === "Assigned";

  return (
    <div className="space-y-5 pb-12">
      <JobDetailsSummaryHeader job={job} />

      {/* Page Sub-Header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#F1EAFE] text-[#7C3AED]">
            <Video className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#0F152A] sm:text-lg">{job.title}</h2>
            <p className="text-xs text-[#8C909B]">{job.reference} · {job.assignedDaysAgo}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isAssigned && (
            <>
              <button
                type="button"
                onClick={() => setAssignedOfferModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-[#7C3AED] bg-[#F1EAFE] px-3.5 py-2 text-xs font-bold text-[#7C3AED] hover:bg-[#E9D5FF]"
              >
                <Briefcase className="size-3.5" />
                <span>Assignment Offer</span>
              </button>
              <button
                type="button"
                onClick={() => setMapModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Navigate to Site
              </button>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Contact Client
              </button>
              <button
                type="button"
                onClick={() => setStartModalOpen(true)}
                className="rounded-xl bg-[#7C3AED] px-5 py-2 text-xs font-bold text-white hover:bg-[#6D28D9]"
              >
                Start Job
              </button>
            </>
          )}

          {isInProgress && (
            <>
              <button
                type="button"
                onClick={() => setMapModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Navigate
              </button>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Contact Client
              </button>
              <button
                type="button"
                onClick={() => setSubmitModalOpen(true)}
                className="rounded-xl bg-[#10B981] px-5 py-2 text-xs font-bold text-white hover:bg-[#059669]"
              >
                Mark as Complete
              </button>
            </>
          )}

          {isPending && (
            <>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Contact Client
              </button>
              <button
                type="button"
                onClick={() => setReminderModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#D97706] bg-white px-4 py-2 text-xs font-bold text-[#D97706] hover:bg-[#FEF3C7]"
              >
                <Bell className="size-3.5" /> Send Reminder
              </button>
              <button
                type="button"
                onClick={() => setSubmissionModalOpen(true)}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                View Submission
              </button>
            </>
          )}
        </div>
      </div>

      {isPending && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FEF9C3]/80 p-4 text-xs text-[#92400E]">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
          <div>
            <span className="font-bold">Job submitted · Awaiting verification</span>
            <p className="mt-0.5 text-[11px]">Both client and Simkash Admin must verify before payment is released.</p>
            <span className="mt-1 block text-[10px] text-[#8C909B]">Submitted: 24 Jun 2026 · 3:47 PM</span>
          </div>
        </div>
      )}

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <JobClientInfoCard job={job} isPending={isPending} />
        </div>

        <div className="space-y-4">
          <JobProgressStepper
            job={job}
            onStartJob={() => setStartModalOpen(true)}
            onMarkComplete={() => setSubmitModalOpen(true)}
          />
          <CompletionChecklist items={job.completionChecklist} readOnly={isPending} />
          <UploadCompletionPhotos job={job} onUploadPhoto={() => message.info("Opening photo upload dialog")} />
        </div>

        <div className="space-y-4">
          <JobDetailsSidebar
            job={job}
            onNavigateMap={() => setMapModalOpen(true)}
            onOpenGoogleMaps={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.client.address)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            onReportIssue={() => setIssueModalOpen(true)}
            onContactAdmin={() => message.info("Opening Super Admin support line")}
          />
        </div>
      </div>

      <StartJobModal
        open={startModalOpen}
        onOpenChange={setStartModalOpen}
        job={job}
        onStartSuccess={() => {
          setJob({ ...job, status: "In Progress" });
          setStartedSuccessModalOpen(true);
        }}
      />
      <UpdateProgressModal
        open={progressModalOpen}
        onOpenChange={setProgressModalOpen}
        job={job}
        onUpdateSuccess={(p) => setJob({ ...job, progressPercent: p })}
      />
      <SubmitJobVerificationModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
        job={job}
        onSubmitSuccess={() => {
          setJob({ ...job, status: "Pending Verification" });
          setSubmitSuccessModalOpen(true);
        }}
      />
      <ContactClientModal open={contactModalOpen} onOpenChange={setContactModalOpen} client={job.client} />
      <ReportIssueModal
        open={issueModalOpen}
        onOpenChange={setIssueModalOpen}
        jobRef={job.reference}
        onSubmitSuccess={() => message.success("Issue submitted.")}
      />
      <SendReminderModal
        open={reminderModalOpen}
        onOpenChange={setReminderModalOpen}
        jobRef={job.reference}
        clientName={job.client.contactName}
        clientLocation={job.client.company}
        amount={job.fee}
        onSendSuccess={(ch) => message.success(`Reminder sent to ${job.client.contactName} via ${ch}!`)}
      />
      <ViewSubmissionModal
        open={submissionModalOpen}
        onOpenChange={setSubmissionModalOpen}
        jobRef={job.reference}
        jobTitle={job.title}
        clientName={job.client.company}
        fee={job.fee}
      />
      <MapDirectionsModal
        open={mapModalOpen}
        onOpenChange={setMapModalOpen}
        address={job.client.address}
        clientName={job.client.company}
        landmark={job.client.nearestLandmark}
        distanceKm={job.distanceKm}
      />
      <JobStartedSuccessModal
        open={startedSuccessModalOpen}
        onOpenChange={setStartedSuccessModalOpen}
        jobRef={job.reference}
        jobTitle={job.title}
      />
      <VerificationSubmittedSuccessModal
        open={submitSuccessModalOpen}
        onOpenChange={setSubmitSuccessModalOpen}
        jobRef={job.reference}
        fee={job.fee}
        onGoToPending={() => navigate(appPaths.installerJobsPending)}
      />
      <NewJobAssignedModal
        open={assignedOfferModalOpen}
        onOpenChange={setAssignedOfferModalOpen}
        job={job}
        onAcceptJob={() => message.success("Job assignment accepted!")}
        onContactAdmin={() => message.info("Opening admin contact dispatch")}
      />
    </div>
  );
}
