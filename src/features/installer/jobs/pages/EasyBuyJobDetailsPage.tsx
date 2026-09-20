import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { EASYBUY_JOB_DETAIL } from "../data/easybuy.data";
import type { JobDetailItem } from "../types";
import { EasyBuyDetailsHeader } from "../components/EasyBuyDetailsHeader";
import { EasyBuyPlanDetailsCol } from "../components/EasyBuyPlanDetailsCol";
import { EasyBuyWorkflowCol } from "../components/EasyBuyWorkflowCol";
import { EasyBuyPlanSidebarCol } from "../components/EasyBuyPlanSidebarCol";
import { StartEasyBuyJobModal } from "../modals/StartEasyBuyJobModal";
import { SubmitEasyBuyJobModal } from "../modals/SubmitEasyBuyJobModal";
import { CustomerEasyBuyPlanModal } from "../modals/CustomerEasyBuyPlanModal";
import { ContactClientModal } from "../modals/ContactClientModal";
import { ReportIssueModal } from "../modals/ReportIssueModal";
import { MapDirectionsModal } from "../modals/MapDirectionsModal";
import { JobStartedSuccessModal } from "../modals/JobStartedSuccessModal";
import { VerificationSubmittedSuccessModal } from "../modals/VerificationSubmittedSuccessModal";

export function EasyBuyJobDetailsPage() {
  const navigate = useNavigate();

  const [job, setJob] = useState<JobDetailItem>(EASYBUY_JOB_DETAIL);

  // Modals state
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reportIssueOpen, setReportIssueOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [startedSuccessOpen, setStartedSuccessOpen] = useState(false);
  const [verificationSuccessOpen, setVerificationSuccessOpen] = useState(false);

  const handleStartSuccess = () => {
    setJob((prev) => ({
      ...prev,
      status: "In Progress",
      progressPercent: 25,
    }));
    setStartedSuccessOpen(true);
  };

  const handleSubmitSuccess = () => {
    setJob((prev) => ({
      ...prev,
      status: "Pending Verification",
      progressPercent: 100,
    }));
    setVerificationSuccessOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header with Back Navigation */}
      <PageHeader
        title="EasyBuy Job Details"
        description="Review installation specifications, EasyBuy payment plan details, and workflow checklists"
        extra={
          <button
            type="button"
            onClick={() => navigate(appPaths.installerJobsEasyBuy)}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC]"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to EasyBuy Jobs</span>
          </button>
        }
      />

      {/* 2. Top Summary Meta Bar & Main Title */}
      <EasyBuyDetailsHeader
        job={job}
        onNavigate={() => setMapModalOpen(true)}
        onContactClient={() => setContactModalOpen(true)}
        onStartJob={() => setStartModalOpen(true)}
      />

      {/* 3. 3-Column Body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Job Details & Payment Breakdown */}
        <div className="space-y-4">
          <EasyBuyPlanDetailsCol job={job} />
        </div>

        {/* Column 2: Workflow & Checklists */}
        <div className="space-y-4">
          <EasyBuyWorkflowCol
            job={job}
            onStartJob={() => setStartModalOpen(true)}
            onSubmitVerification={() => setSubmitModalOpen(true)}
          />
        </div>

        {/* Column 3: Customer Plan & Sidebar */}
        <div className="space-y-4">
          <EasyBuyPlanSidebarCol
            job={job}
            onOpenPlanModal={() => setPlanModalOpen(true)}
            onNavigate={() => setMapModalOpen(true)}
            onContactClient={() => setContactModalOpen(true)}
            onReportIssue={() => setReportIssueOpen(true)}
            onContactAdmin={() => setContactModalOpen(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <StartEasyBuyJobModal
        open={startModalOpen}
        onOpenChange={setStartModalOpen}
        job={job}
        onConfirmStart={handleStartSuccess}
      />
      <SubmitEasyBuyJobModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
        job={job}
        onSubmitSuccess={handleSubmitSuccess}
      />
      <CustomerEasyBuyPlanModal
        open={planModalOpen}
        onOpenChange={setPlanModalOpen}
        plan={job.easyBuyPlan}
      />
      <ContactClientModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        client={job.client}
      />
      <ReportIssueModal
        open={reportIssueOpen}
        onOpenChange={setReportIssueOpen}
        jobRef={job.reference}
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
        open={startedSuccessOpen}
        onOpenChange={setStartedSuccessOpen}
        jobRef={job.reference}
        jobTitle={job.title}
        onGoToJob={() => setStartedSuccessOpen(false)}
      />
      <VerificationSubmittedSuccessModal
        open={verificationSuccessOpen}
        onOpenChange={setVerificationSuccessOpen}
        jobRef={job.reference}
        fee={job.fee}
        onGoToPending={() => navigate(appPaths.installerJobsPending)}
      />
    </div>
  );
}

export default EasyBuyJobDetailsPage;
