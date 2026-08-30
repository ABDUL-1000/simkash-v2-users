import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, Plus } from "lucide-react";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";

import { ReferralTable, type ReferralRow } from "../components/ReferralTable";
import { ReferralFunnelCard } from "../components/ReferralFunnelCard";
import { BreakdownBySegmentCard } from "../components/BreakdownBySegmentCard";
import { CommissionsPendingApprovalCard } from "../components/CommissionsPendingApprovalCard";
import { TopReferrersCard } from "../components/TopReferrersCard";

import { ApproveReferralCommissionModal } from "../Modals/ApproveReferralCommissionModal";
import { MarkDealClosedModal } from "../Modals/MarkDealClosedModal";
import { MarkDealLostModal } from "../Modals/MarkDealLostModal";
import { RejectCommissionModal } from "../Modals/RejectCommissionModal";
import { ReferralProgrammeSettingsModal } from "../Modals/ReferralProgrammeSettingsModal";

export default function ReferralsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedReferral, setSelectedReferral] = useState<ReferralRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Referrals & Partner Growth"
        description="Track organization referrals, deal conversions, and commission payouts"
        actions={[
          {
            key: "export-dashboard",
            label: "Export Report",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
          {
            key: "register-referral",
            label: "Register Referral",
            icon: <Plus className="size-4" />,
            variant: "default",
          },
        ]}
      />

      {/* Top Metric Dashboard Stats */}
      <DashboardStats />

      {/* Main Referrals Inventory Table */}
      <ReferralTable
        onSelectRow={(r) => setSelectedReferral(r)}
        onApprovePayout={(r) => {
          setSelectedReferral(r);
          setActiveModal("approve_commission");
        }}
        onMarkClosed={(r) => {
          setSelectedReferral(r);
          setActiveModal("mark_closed");
        }}
      />

      {/* Bottom 4 Analytics Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ReferralFunnelCard />
        <BreakdownBySegmentCard />
        <CommissionsPendingApprovalCard
          onApprove={() => setActiveModal("approve_commission")}
        />
        <TopReferrersCard />
      </div>

      {/* Modals */}
      <ApproveReferralCommissionModal
        open={activeModal === "approve_commission"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        referrerName={selectedReferral?.referredBy || "Bukhari Mohammed"}
        orgName={selectedReferral?.organisationName || "Lagos Estate Ltd"}
        commissionAmount={selectedReferral?.commission !== "—" ? selectedReferral?.commission : "₦50,000"}
      />

      <MarkDealClosedModal
        open={activeModal === "mark_closed"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orgName={selectedReferral?.organisationName || "Lagos Estate Ltd"}
      />

      <MarkDealLostModal
        open={activeModal === "mark_lost"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orgName={selectedReferral?.organisationName || "Lagos Estate Ltd"}
      />

      <RejectCommissionModal
        open={activeModal === "reject_commission"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        referrerName={selectedReferral?.referredBy || "Bukhari Mohammed"}
        orgName={selectedReferral?.organisationName || "Lagos Estate Ltd"}
      />

      <ReferralProgrammeSettingsModal
        open={activeModal === "settings"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
