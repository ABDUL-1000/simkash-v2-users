import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { PENDING_VERIFICATION_JOB } from "../data/jobs.data";
import { PendingVerificationJobCard } from "../components/PendingVerificationJobCard";
import { SendReminderModal } from "../modals/SendReminderModal";
import { ViewSubmissionModal } from "../modals/ViewSubmissionModal";
import { ContactClientModal } from "../modals/ContactClientModal";

export default function PendingVerificationPage() {
  const navigate = useNavigate();
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Pending Verification"
        description="Jobs awaiting client and admin sign-off before payment"
        extra={
          <span className="rounded-full bg-[#FEF3C7] px-3.5 py-1 text-xs font-bold text-[#D97706]">
            1 Pending
          </span>
        }
      />

      {/* Amber Notice Banner */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FEF9C3]/80 p-4 text-xs font-semibold text-[#92400E]">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#D97706] text-[10px] font-bold text-white">
          i
        </span>
        <span>
          Payment is held until both client and Super Admin verify completion. Clients have 48 hours to verify before Admin can override.
        </span>
      </div>

      {/* Cards list */}
      <div className="space-y-4">
        <PendingVerificationJobCard
          job={PENDING_VERIFICATION_JOB}
          onContactClient={() => setContactModalOpen(true)}
          onSendReminder={() => setReminderModalOpen(true)}
          onViewDetails={() =>
            navigate(appPaths.installerJobDetails(PENDING_VERIFICATION_JOB.reference).path)
          }
          onViewSubmission={() => setSubmissionModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <SendReminderModal
        open={reminderModalOpen}
        onOpenChange={setReminderModalOpen}
        jobRef={PENDING_VERIFICATION_JOB.reference}
        clientName={PENDING_VERIFICATION_JOB.client.contactName}
        clientLocation={PENDING_VERIFICATION_JOB.client.company}
        amount={PENDING_VERIFICATION_JOB.fee}
        onSendSuccess={(channel) =>
          message.success(`Reminder sent to ${PENDING_VERIFICATION_JOB.client.contactName} via ${channel}!`)
        }
      />

      <ViewSubmissionModal
        open={submissionModalOpen}
        onOpenChange={setSubmissionModalOpen}
        jobRef={PENDING_VERIFICATION_JOB.reference}
        jobTitle={PENDING_VERIFICATION_JOB.title}
        clientName={PENDING_VERIFICATION_JOB.client.company}
        fee={PENDING_VERIFICATION_JOB.fee}
      />

      <ContactClientModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        client={PENDING_VERIFICATION_JOB.client}
      />
    </div>
  );
}
