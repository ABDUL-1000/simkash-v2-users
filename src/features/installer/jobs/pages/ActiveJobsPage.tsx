import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Briefcase } from "lucide-react";
import { message } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import type { JobDetailItem } from "../types";
import { ACTIVE_JOBS_LIST } from "../data/jobs.data";
import { ActiveJobCard } from "../components/ActiveJobCard";
import { ActiveJobsSidebar } from "../components/ActiveJobsSidebar";
import { StartJobModal } from "../modals/StartJobModal";
import { UpdateProgressModal } from "../modals/UpdateProgressModal";
import { SubmitJobVerificationModal } from "../modals/SubmitJobVerificationModal";
import { ContactClientModal } from "../modals/ContactClientModal";
import { ReportIssueModal } from "../modals/ReportIssueModal";
import { MapDirectionsModal } from "../modals/MapDirectionsModal";
import { GuidelinesModal } from "../modals/GuidelinesModal";
import { JobStartedSuccessModal } from "../modals/JobStartedSuccessModal";
import { VerificationSubmittedSuccessModal } from "../modals/VerificationSubmittedSuccessModal";
import { NewJobAssignedModal } from "../modals/NewJobAssignedModal";
import { StartEasyBuyJobModal } from "../modals/StartEasyBuyJobModal";
import { CustomerEasyBuyPlanModal } from "../modals/CustomerEasyBuyPlanModal";

export default function ActiveJobsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All Active");
  const [search, setSearch] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<JobDetailItem | null>(null);

  // Modals state
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [startEasyBuyModalOpen, setStartEasyBuyModalOpen] = useState(false);
  const [easyBuyPlanModalOpen, setEasyBuyPlanModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);
  const [startedSuccessModalOpen, setStartedSuccessModalOpen] = useState(false);
  const [submitSuccessModalOpen, setSubmitSuccessModalOpen] = useState(false);
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);

  const filterTabs = [
    { label: "All Active", count: 3 },
    { label: "Assigned", count: 1 },
    { label: "In Progress", count: 2 },
    { label: "On Hold", count: 0 },
  ];

  const filteredJobs = useMemo(() => {
    return ACTIVE_JOBS_LIST.filter((job) => {
      if (filter === "Assigned" && job.status !== "Assigned") return false;
      if (filter === "In Progress" && job.status !== "In Progress") return false;
      if (filter === "On Hold" && job.status !== "On Hold") return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          job.reference.toLowerCase().includes(query) ||
          job.title.toLowerCase().includes(query) ||
          job.client.company.toLowerCase().includes(query) ||
          job.client.address.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [filter, search]);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Active Jobs"
        description="All jobs currently assigned to you"
        actions={[
          {
            key: "new-assignment",
            label: "Review New Assignment",
            variant: "outline",
            icon: <Briefcase className="size-3.5 text-[#7C3AED]" />,
            onClick: () => {
              setSelectedJob(ACTIVE_JOBS_LIST[0]);
              setNewJobModalOpen(true);
            },
          },
        ]}
        extra={
          <span className="text-xs font-black text-[#2563EB] sm:text-sm">
            {filteredJobs.length} Active Jobs · ₦185,000 potential
          </span>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setFilter(tab.label)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                filter === tab.label
                  ? "bg-[#0F152A] text-white"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  filter === tab.label ? "bg-white/20 text-white" : "bg-[#EFF4F8] text-[#66738C]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#8C909B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, client, location..."
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-1.5 pl-9 pr-3 text-xs text-[#0F152A] outline-none transition focus:border-[#2563EB]"
            />
          </div>

          <div className="hidden items-center gap-1 rounded-2xl border border-[#E2ECF6] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F152A] sm:flex">
            <span>Sort: Earliest Due</span>
            <ChevronDown className="size-3.5 text-[#8C909B]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {filteredJobs.map((job) => (
            <ActiveJobCard
              key={job.id}
              job={job}
              onViewDetails={() => {
                if (job.isEasyBuy) {
                  navigate(appPaths.installerJobsEasyBuyDetails(job.reference).path);
                } else {
                  navigate(appPaths.installerJobDetails(job.reference).path);
                }
              }}
              onViewPlan={() => {
                setSelectedJob(job);
                setEasyBuyPlanModalOpen(true);
              }}
              onNavigate={() => {
                setSelectedJob(job);
                setMapModalOpen(true);
              }}
              onContactClient={() => {
                setSelectedJob(job);
                setContactModalOpen(true);
              }}
              onStartJob={() => {
                setSelectedJob(job);
                if (job.isEasyBuy) {
                  setStartEasyBuyModalOpen(true);
                } else {
                  setStartModalOpen(true);
                }
              }}
              onUpdateProgress={() => {
                setSelectedJob(job);
                setProgressModalOpen(true);
              }}
              onMarkComplete={() => {
                setSelectedJob(job);
                setSubmitModalOpen(true);
              }}
            />
          ))}
        </div>

        <div className="space-y-4 lg:col-span-1">
          <ActiveJobsSidebar
            jobs={ACTIVE_JOBS_LIST}
            onContactAdmin={() => message.info("Opening Super Admin chat")}
            onReportProblem={() => {
              setSelectedJob(ACTIVE_JOBS_LIST[0]);
              setIssueModalOpen(true);
            }}
            onViewGuidelines={() => setGuidelinesModalOpen(true)}
            onOpenMap={() => {
              setSelectedJob(ACTIVE_JOBS_LIST[0]);
              setMapModalOpen(true);
            }}
          />
        </div>
      </div>

      <StartJobModal
        open={startModalOpen}
        onOpenChange={setStartModalOpen}
        job={selectedJob}
        onStartSuccess={() => setStartedSuccessModalOpen(true)}
      />

      <UpdateProgressModal
        open={progressModalOpen}
        onOpenChange={setProgressModalOpen}
        job={selectedJob}
        onUpdateSuccess={(p) => message.success(`Progress updated to ${p}%!`)}
      />

      <SubmitJobVerificationModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
        job={selectedJob}
        onSubmitSuccess={() => setSubmitSuccessModalOpen(true)}
      />

      <ContactClientModal open={contactModalOpen} onOpenChange={setContactModalOpen} client={selectedJob?.client} />

      <ReportIssueModal
        open={issueModalOpen}
        onOpenChange={setIssueModalOpen}
        jobRef={selectedJob?.reference}
        onSubmitSuccess={() => message.success("Issue submitted to Super Admin dispatch.")}
      />

      <MapDirectionsModal
        open={mapModalOpen}
        onOpenChange={setMapModalOpen}
        address={selectedJob?.client.address}
        clientName={selectedJob?.client.company}
        landmark={selectedJob?.client.nearestLandmark}
        distanceKm={selectedJob?.distanceKm}
      />

      <GuidelinesModal open={guidelinesModalOpen} onOpenChange={setGuidelinesModalOpen} />

      <JobStartedSuccessModal
        open={startedSuccessModalOpen}
        onOpenChange={setStartedSuccessModalOpen}
        jobRef={selectedJob?.reference}
        jobTitle={selectedJob?.title}
        onGoToJob={() => {
          if (selectedJob) navigate(appPaths.installerJobDetails(selectedJob.reference).path);
        }}
      />

      <VerificationSubmittedSuccessModal
        open={submitSuccessModalOpen}
        onOpenChange={setSubmitSuccessModalOpen}
        jobRef={selectedJob?.reference}
        fee={selectedJob?.fee}
        onGoToPending={() => navigate(appPaths.installerJobsPending)}
      />

      <NewJobAssignedModal
        open={newJobModalOpen}
        onOpenChange={setNewJobModalOpen}
        job={selectedJob}
        onAcceptJob={() => message.success("Job accepted! Coordinates logged.")}
        onContactAdmin={() => message.info("Opening admin contact dispatch")}
      />

      <StartEasyBuyJobModal
        open={startEasyBuyModalOpen}
        onOpenChange={setStartEasyBuyModalOpen}
        job={selectedJob}
        onConfirmStart={() => setStartedSuccessModalOpen(true)}
      />

      <CustomerEasyBuyPlanModal
        open={easyBuyPlanModalOpen}
        onOpenChange={setEasyBuyPlanModalOpen}
        plan={selectedJob?.easyBuyPlan}
      />
    </div>
  );
}
