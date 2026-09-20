import { useState } from "react";
import { message } from "antd";
import { AlertCircle, PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { DISPUTED_JOB } from "../data/jobs.data";
import { DisputedJobCard } from "../components/DisputedJobCard";
import { DisputeDetailModal } from "../modals/DisputeDetailModal";
import { DisputeResponseModal } from "../modals/DisputeResponseModal";
import { DisputeResponseSubmittedModal } from "../modals/DisputeResponseSubmittedModal";
import { DisputeResolvedModal } from "../modals/DisputeResolvedModal";
import { RaiseDisputeModal } from "../modals/RaiseDisputeModal";
import { ContactClientModal } from "../modals/ContactClientModal";

export default function DisputedJobsPage() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  const [resolvedModalOpen, setResolvedModalOpen] = useState(false);
  const [raiseModalOpen, setRaiseModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Disputed Jobs"
        description="Jobs with client or admin disputes requiring resolution"
        actions={[
          {
            key: "raise-dispute",
            label: "Raise New Dispute",
            variant: "outline",
            icon: <PlusCircle className="size-4 text-[#EF4444]" />,
            onClick: () => setRaiseModalOpen(true),
          },
        ]}
        extra={
          <span className="rounded-full bg-[#FEE2E2] px-3.5 py-1 text-xs font-bold text-[#EF4444]">
            1 Disputed
          </span>
        }
      />

      {/* Red Warning Banner */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-4 text-xs font-semibold text-[#B91C1C]">
        <AlertCircle className="size-5 shrink-0 text-[#EF4444]" />
        <span>
          Disputed jobs require resolution before payment can be released. Respond to disputes within 48 hours to avoid account penalties.
        </span>
      </div>

      {/* Disputed card */}
      <div className="max-w-4xl">
        <DisputedJobCard
          job={DISPUTED_JOB}
          onViewDetails={() => setDetailsModalOpen(true)}
          onContactClient={() => setContactModalOpen(true)}
          onUpdateResponse={() => setResponseModalOpen(true)}
          onContactAdmin={() => message.info("Connecting to Super Admin support")}
          onViewResolution={() => setResolvedModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <DisputeDetailModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        job={DISPUTED_JOB}
        onUpdateResponse={() => setResponseModalOpen(true)}
        onContactAdmin={() => message.info("Connecting to Super Admin support")}
        onUploadEvidence={() => message.info("Opening evidence upload dialog")}
      />

      <DisputeResponseModal
        open={responseModalOpen}
        onOpenChange={setResponseModalOpen}
        onSubmitSuccess={() => setSubmittedModalOpen(true)}
      />

      <DisputeResponseSubmittedModal
        open={submittedModalOpen}
        onOpenChange={setSubmittedModalOpen}
        jobRef={DISPUTED_JOB.reference}
      />

      <DisputeResolvedModal
        open={resolvedModalOpen}
        onOpenChange={setResolvedModalOpen}
        onViewWallet={() => message.info("Opening wallet view")}
      />

      <RaiseDisputeModal
        open={raiseModalOpen}
        onOpenChange={setRaiseModalOpen}
        jobRef={DISPUTED_JOB.reference}
        jobTitle={DISPUTED_JOB.title}
        onSubmitDispute={() => message.success("Dispute submitted to Super Admin for investigation.")}
      />

      <ContactClientModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        client={{
          company: "Access Bank HQ",
          category: "Commercial Banking",
          contactName: "Manager Emeka Okonkwo",
          phone: "08034567890",
          email: "emeka.okonkwo@accessbankplc.com",
          address: "Access Bank HQ, Marina, Lagos",
        }}
      />
    </div>
  );
}
