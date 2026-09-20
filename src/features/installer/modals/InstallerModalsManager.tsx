import { message } from "antd";
import type { InstallerJob } from "../types";
import { RequestPayoutModal } from "./RequestPayoutModal";
import { PayoutPendingAdminModal } from "./PayoutPendingAdminModal";
import { InstallerReviewsModal } from "./InstallerReviewsModal";
import { DisputeDetailsModal } from "./DisputeDetailsModal";
import { SendVerificationReminderModal } from "./SendVerificationReminderModal";
import { MarkJobCompleteModal } from "./MarkJobCompleteModal";
import { InstallerNotificationsModal } from "./InstallerNotificationsModal";
import { InstallerJobDetailsModal } from "./InstallerJobDetailsModal";
import { JobInProgressModal } from "./JobInProgressModal";
import { JobOnHoldModal } from "./JobOnHoldModal";
import { InstallerBonusTrackerModal } from "./InstallerBonusTrackerModal";
import { UrgentJobDeadlineModal } from "./UrgentJobDeadlineModal";
import { NewReviewReceivedModal } from "./NewReviewReceivedModal";

export interface InstallerModalsState {
  requestPayoutOpen: boolean;
  payoutPendingOpen: boolean;
  reviewsModalOpen: boolean;
  disputeModalOpen: boolean;
  reminderModalOpen: boolean;
  markCompleteModalOpen: boolean;
  notificationsModalOpen: boolean;
  jobDetailsModalOpen: boolean;
  jobInProgressModalOpen: boolean;
  jobOnHoldModalOpen: boolean;
  bonusTrackerModalOpen: boolean;
  urgentDeadlineModalOpen: boolean;
  newReviewModalOpen: boolean;
  selectedJob: InstallerJob | null;
}

interface InstallerModalsManagerProps {
  state: InstallerModalsState;
  setState: React.Dispatch<React.SetStateAction<InstallerModalsState>>;
  onNavigate: (job: InstallerJob) => void;
  onStartJob: (job: InstallerJob) => void;
}

export function InstallerModalsManager({
  state,
  setState,
  onNavigate,
  onStartJob,
}: InstallerModalsManagerProps) {
  const updateState = (key: keyof InstallerModalsState, value: boolean) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <RequestPayoutModal
        open={state.requestPayoutOpen}
        onOpenChange={(open) => updateState("requestPayoutOpen", open)}
        onSubmitSuccess={() => updateState("payoutPendingOpen", true)}
      />

      <PayoutPendingAdminModal
        open={state.payoutPendingOpen}
        onOpenChange={(open) => updateState("payoutPendingOpen", open)}
      />

      <InstallerReviewsModal
        open={state.reviewsModalOpen}
        onOpenChange={(open) => updateState("reviewsModalOpen", open)}
      />

      <DisputeDetailsModal
        open={state.disputeModalOpen}
        onOpenChange={(open) => updateState("disputeModalOpen", open)}
        onUpdate={() => message.info("Dispute details updated")}
        onContactAdmin={() => message.info("Connecting to Super Admin support")}
        onAddEvidence={() => message.info("Upload evidence opened")}
      />

      <SendVerificationReminderModal
        open={state.reminderModalOpen}
        onOpenChange={(open) => updateState("reminderModalOpen", open)}
        onSendSuccess={(channel) =>
          message.success(`Reminder successfully dispatched via ${channel}!`)
        }
      />

      <MarkJobCompleteModal
        open={state.markCompleteModalOpen}
        onOpenChange={(open) => updateState("markCompleteModalOpen", open)}
        onCompleteJob={(jobId) =>
          message.success(`Job ${jobId} submitted for customer verification!`)
        }
      />

      <InstallerNotificationsModal
        open={state.notificationsModalOpen}
        onOpenChange={(open) => updateState("notificationsModalOpen", open)}
        onSelectNotification={() => updateState("newReviewModalOpen", true)}
      />

      <InstallerJobDetailsModal
        open={state.jobDetailsModalOpen}
        onOpenChange={(open) => updateState("jobDetailsModalOpen", open)}
        job={state.selectedJob}
        onNavigate={onNavigate}
        onStartJob={onStartJob}
      />

      <JobInProgressModal
        open={state.jobInProgressModalOpen}
        onOpenChange={(open) => updateState("jobInProgressModalOpen", open)}
        job={state.selectedJob}
        onNavigate={onNavigate}
        onUpdateProgress={() => message.success("Progress updated to 75%")}
        onViewDetails={() => updateState("jobDetailsModalOpen", true)}
        onMarkComplete={() => updateState("markCompleteModalOpen", true)}
      />

      <JobOnHoldModal
        open={state.jobOnHoldModalOpen}
        onOpenChange={(open) => updateState("jobOnHoldModalOpen", open)}
        onContactAdmin={() => message.info("Contacting Super Admin support")}
        onViewFullDetails={() => updateState("jobDetailsModalOpen", true)}
      />

      <InstallerBonusTrackerModal
        open={state.bonusTrackerModalOpen}
        onOpenChange={(open) => updateState("bonusTrackerModalOpen", open)}
        onViewFullTracker={() => message.info("Opening full metrics report")}
      />

      <UrgentJobDeadlineModal
        open={state.urgentDeadlineModalOpen}
        onOpenChange={(open) => updateState("urgentDeadlineModalOpen", open)}
        onMarkComplete={() => updateState("markCompleteModalOpen", true)}
        onNavigate={() => state.selectedJob && onNavigate(state.selectedJob)}
        onContactClient={() => message.info("Dialing client phone: 08012345678")}
        onRemindLater={() => message.info("Reminder set for 2 hours")}
      />

      <NewReviewReceivedModal
        open={state.newReviewModalOpen}
        onOpenChange={(open) => updateState("newReviewModalOpen", open)}
        onViewAllReviews={() => updateState("reviewsModalOpen", true)}
      />
    </>
  );
}
