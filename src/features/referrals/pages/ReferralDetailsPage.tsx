import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { EntityDetailsHeader } from "@/components/common/EntityDetailsHeader";

import { ReferralTimelineCard } from "../components/details/ReferralTimelineCard";
import { OrganisationDetailsCard } from "../components/details/OrganisationDetailsCard";
import { ReferrerDetailsCard } from "../components/details/ReferrerDetailsCard";
import { CommissionDetailsCard } from "../components/details/CommissionDetailsCard";
import { ProgrammeSettingsCard } from "../components/details/ProgrammeSettingsCard";
import { ReferralQuickActionsCard } from "../components/details/ReferralQuickActionsCard";
import { OtherReferralsByReferrerCard } from "../components/details/OtherReferralsByReferrerCard";
import { ActivityLogCard } from "../components/details/ActivityLogCard";

import { ApproveReferralCommissionModal } from "../Modals/ApproveReferralCommissionModal";
import { MarkDealClosedModal } from "../Modals/MarkDealClosedModal";
import { MarkDealLostModal } from "../Modals/MarkDealLostModal";
import { RejectCommissionModal } from "../Modals/RejectCommissionModal";
import { ReferralProgrammeSettingsModal } from "../Modals/ReferralProgrammeSettingsModal";

export default function ReferralDetailsPage() {
  const { id } = useParams();
    console.log(id)

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.referrals)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Referrals</span>
        </button>
      </div>

      {/* Top 4 Overview Metadata Bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-4 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">REFERRED BY</p>
          <p className="mt-1 font-bold text-[#0F172A] text-sm">Bukhari Mohammed</p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-4 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">DATE REFERRED</p>
          <p className="mt-1 font-bold text-[#0F172A] text-sm">20 Jun 2026</p>
        </div>

        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-4 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">SEGMENT</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#10B981]" />
            <span className="font-bold text-[#0F172A] text-sm">Estate</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-4 shadow-xs">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">COMMISSION</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-extrabold text-[#059669] text-sm">₦50,000</span>
            <span className="text-[11px] font-bold text-[#D97706]">Pending Approval</span>
          </div>
        </div>
      </div>

      {/* Main Details Header using EntityDetailsHeader */}
      <EntityDetailsHeader
        name="Lagos Estate Ltd"
        phone="Contact: 08065942373"
        location="Lagos"
        avatarInitials="LE"
        avatarBg="#06B6D4"
        badges={[
          { label: "Estate", variant: "success" },
          { label: "DEAL CLOSED", variant: "success" },
          { label: "COMMISSION PENDING", variant: "amber" },
        ]}
        actions={[
          {
            key: "approve",
            label: "Approve Commission",
            variant: "primary",
            onClick: () => setActiveModal("approve_commission"),
          },
          {
            key: "reject",
            label: "Reject",
            variant: "danger",
            onClick: () => setActiveModal("reject_commission"),
          },
        ]}
      />

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Left */}
        <div className="space-y-6 min-w-0">
          <ReferralTimelineCard />
          <OrganisationDetailsCard />
        </div>

        {/* Column 2: Center */}
        <div className="space-y-6 min-w-0">
          <ReferrerDetailsCard />
          <CommissionDetailsCard
            onApprove={() => setActiveModal("approve_commission")}
            onReject={() => setActiveModal("reject_commission")}
          />
          <ProgrammeSettingsCard
            onEditSettings={() => setActiveModal("settings")}
          />
        </div>

        {/* Column 3: Right */}
        <div className="space-y-6 min-w-0">
          <ReferralQuickActionsCard
            onMarkDealLost={() => setActiveModal("mark_lost")}
            onApproveCommission={() => setActiveModal("approve_commission")}
            onRejectCommission={() => setActiveModal("reject_commission")}
          />
          <OtherReferralsByReferrerCard />
          <ActivityLogCard />
        </div>
      </div>

      {/* Action Modals */}
      <ApproveReferralCommissionModal
        open={activeModal === "approve_commission"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        referrerName="Bukhari Mohammed"
        orgName="Lagos Estate Ltd"
        commissionAmount="₦50,000"
      />

      <MarkDealClosedModal
        open={activeModal === "mark_closed"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orgName="Lagos Estate Ltd"
      />

      <MarkDealLostModal
        open={activeModal === "mark_lost"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orgName="Lagos Estate Ltd"
      />

      <RejectCommissionModal
        open={activeModal === "reject_commission"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        referrerName="Bukhari Mohammed"
        orgName="Lagos Estate Ltd"
      />

      <ReferralProgrammeSettingsModal
        open={activeModal === "settings"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
