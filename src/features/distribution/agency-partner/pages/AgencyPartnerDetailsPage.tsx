import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { PartnerDetailsHeader } from "../components/details/PartnerDetailsHeader";
import { PartnerPerformanceOverviewCard } from "../components/details/PartnerPerformanceOverviewCard";
import { PartnerSimStockCard } from "../components/details/PartnerSimStockCard";
import { PartnerSubPartnersCard } from "../components/details/PartnerSubPartnersCard";
import { PartnerRecentActivityCard } from "../components/details/PartnerRecentActivityCard";
import { PartnerQuickActionsCard } from "../components/details/PartnerQuickActionsCard";
import { PartnerAccountDetailsCard } from "../components/details/PartnerAccountDetailsCard";
import { PartnerTargetHistoryCard } from "../components/details/PartnerTargetHistoryCard";

import { DistributeSimsToPartnerModal } from "../Modals/DistributeSimsToPartnerModal";
import { CoachPartnerModal } from "../Modals/CoachPartnerModal";
import { UpgradeToCorporateAgentModal } from "../Modals/UpgradeToCorporateAgentModal";

export default function AgencyPartnerDetailsPage() {
  const { partnerId } = useParams();
    console.log(partnerId)

  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<"distribute" | "coach" | "upgrade" | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.agencyPartner)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Agency Partners</span>
        </button>
      </div>

      {/* Top Header Section */}
      <PartnerDetailsHeader
        partnerName="Rabiu Sani"
        phone="08120600542"
        state="Lagos"
        onUpgrade={() => setActiveModal("upgrade")}
      />

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 min-w-0">
          <PartnerPerformanceOverviewCard />
          <PartnerSimStockCard />
        </div>

        {/* Center Column */}
        <div className="space-y-6 min-w-0">
          <PartnerSubPartnersCard />
          <PartnerRecentActivityCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6 min-w-0">
          <PartnerQuickActionsCard
            onDistribute={() => setActiveModal("distribute")}
            onCoach={() => setActiveModal("coach")}
            onUpgrade={() => setActiveModal("upgrade")}
          />
          <PartnerAccountDetailsCard />
          <PartnerTargetHistoryCard />
        </div>
      </div>

      {/* Action Modals */}
      <DistributeSimsToPartnerModal
        open={activeModal === "distribute"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <CoachPartnerModal
        open={activeModal === "coach"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <UpgradeToCorporateAgentModal
        open={activeModal === "upgrade"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
