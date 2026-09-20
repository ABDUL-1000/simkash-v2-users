import { useState } from "react";
import { Wallet, Bell } from "lucide-react";
import { message } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { APP_COLORS } from "@/constants/colors";
import type { InstallerJob, InstallerCompletedJob } from "../types";
import { ACTIVE_JOBS } from "../data/installer.data";
import { InstallerStatsHeader } from "../components/InstallerStatsHeader";
import { InstallerMetricCards } from "../components/InstallerMetricCards";
import { UrgentJobAlertBanner } from "../components/UrgentJobAlertBanner";
import { ActiveJobsList } from "../components/ActiveJobsList";
import { JobStatusTabs, type InstallerTabType } from "../components/JobStatusTabs";
import { PendingVerificationCard } from "../components/PendingVerificationCard";
import { DisputedJobCard } from "../components/DisputedJobCard";
import { RecentlyCompletedTable } from "../components/RecentlyCompletedTable";
import { InstallerEarningsSidebar } from "../components/InstallerEarningsSidebar";
import { InstallerRatingBreakdown } from "../components/InstallerRatingBreakdown";
import { UpcomingDeadlinesCard } from "../components/UpcomingDeadlinesCard";
import { BonusTrackerSidebarCard } from "../components/BonusTrackerSidebarCard";
import { ActivityFeedCard } from "../components/ActivityFeedCard";
import { InstallerModalsManager, type InstallerModalsState } from "../modals/InstallerModalsManager";

export default function InstallerDashboardPage() {
  const [activeTab, setActiveTab] = useState<InstallerTabType>("jobs");
  const [modalsState, setModalsState] = useState<InstallerModalsState>({
    requestPayoutOpen: false,
    payoutPendingOpen: false,
    reviewsModalOpen: false,
    disputeModalOpen: false,
    reminderModalOpen: false,
    markCompleteModalOpen: false,
    notificationsModalOpen: false,
    jobDetailsModalOpen: false,
    jobInProgressModalOpen: false,
    jobOnHoldModalOpen: false,
    bonusTrackerModalOpen: false,
    urgentDeadlineModalOpen: false,
    newReviewModalOpen: false,
    selectedJob: ACTIVE_JOBS[0],
  });

  const openModal = (key: keyof InstallerModalsState, job?: InstallerJob) => {
    setModalsState((prev) => ({
      ...prev,
      [key]: true,
      ...(job ? { selectedJob: job } : {}),
    }));
  };

  const handleStartJob = (job: InstallerJob) => {
    message.success(`Job ${job.reference} marked as Started!`);
  };

  const handleNavigate = (job: InstallerJob) => {
    message.info(`Navigating to ${job.address}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Installer Workspace"
        description="Track your assigned CCTV & Solar installations, payouts, and customer reviews"
        actions={[
          {
            key: "notifications",
            label: "Notifications",
            icon: <Bell className="size-3.5" />,
            onClick: () => openModal("notificationsModalOpen"),
            variant: "outline",
          },
          {
            key: "request-payout",
            label: "Request Payout",
            icon: <Wallet className="size-3.5" />,
            onClick: () => openModal("requestPayoutOpen"),
            variant: "default",
            style: {
              backgroundColor: APP_COLORS.blues.interactiveCta,
              borderColor: APP_COLORS.blues.interactiveCta,
              color: "#FFFFFF",
            },
          },
        ]}
      />

      {/* Top KPI Metric Strip */}
      <InstallerStatsHeader onRequestPayout={() => openModal("requestPayoutOpen")} />

      {/* 4 Metric Cards */}
      <InstallerMetricCards />

      {/* Urgent Job Alert Banner */}
      <UrgentJobAlertBanner
        onViewJob={() => openModal("urgentDeadlineModalOpen", ACTIVE_JOBS[1])}
      />

      {/* Active Jobs Section */}
      <ActiveJobsList
        onViewJob={(job) =>
          job.status === "In Progress"
            ? openModal("jobInProgressModalOpen", job)
            : openModal("jobDetailsModalOpen", job)
        }
        onNavigate={handleNavigate}
        onStartJob={handleStartJob}
        onMarkComplete={() => openModal("markCompleteModalOpen")}
      />

      {/* Quick Action Filter Tabs */}
      <JobStatusTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === "complete") openModal("markCompleteModalOpen");
        }}
        onRequestPayout={() => openModal("requestPayoutOpen")}
        onOpenReviews={() => openModal("reviewsModalOpen")}
      />

      {/* 2-Column Split Body */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          <PendingVerificationCard onSendReminder={() => openModal("reminderModalOpen")} />
          <DisputedJobCard onViewDispute={() => openModal("disputeModalOpen")} />
          <RecentlyCompletedTable
            onViewAll={() => openModal("reviewsModalOpen")}
            onSelectJob={(job: InstallerCompletedJob) =>
              message.info(`Selected completed job: ${job.jobRef}`)
            }
          />
        </div>

        {/* Right Column (1 col) */}
        <div className="space-y-6 lg:col-span-1">
          <InstallerEarningsSidebar onRequestPayout={() => openModal("requestPayoutOpen")} />
          <InstallerRatingBreakdown onOpenReviews={() => openModal("reviewsModalOpen")} />
          <UpcomingDeadlinesCard
            onSelectDeadline={(dl) => {
              const matched = ACTIVE_JOBS.find((j) => j.reference === dl.jobRef);
              if (matched) {
                if (dl.urgency === "urgent") openModal("urgentDeadlineModalOpen", matched);
                else openModal("jobDetailsModalOpen", matched);
              }
            }}
          />
          <BonusTrackerSidebarCard
            onViewTracker={() => openModal("bonusTrackerModalOpen")}
          />
          <ActivityFeedCard
            onSelectItem={(item) => {
              if (item.type === "review") openModal("newReviewModalOpen");
              else if (item.type === "dispute") openModal("disputeModalOpen");
              else if (item.type === "verification") openModal("reminderModalOpen");
              else openModal("jobDetailsModalOpen");
            }}
          />
        </div>
      </div>

      {/* Modals Manager */}
      <InstallerModalsManager
        state={modalsState}
        setState={setModalsState}
        onNavigate={handleNavigate}
        onStartJob={handleStartJob}
      />
    </div>
  );
}
