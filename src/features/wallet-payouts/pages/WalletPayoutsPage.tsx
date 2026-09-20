import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, CheckCircle } from "lucide-react";
import { DashboardStats } from "@/features/agency-partner/components/DashboardStat";

import { CommissionAnalyticsCard } from "../components/CommissionAnalyticsCard";
import { TotalReadyToPayoutCard } from "../components/TotalReadyToPayoutCard";
import { PayoutRequestsTable, type PayoutRow } from "../components/PayoutRequestsTable";

import { PlatformWalletCard } from "../components/PlatformWalletCard";
import { BulkApprovePendingCard } from "../components/BulkApprovePendingCard";
import { PayoutStatisticsCard } from "../components/PayoutStatisticsCard";
import { RecentActivityCard } from "../components/RecentActivityCard";
import { SearchByAgentCard } from "../components/SearchByAgentCard";

import { ApprovePayoutRequestModal } from "../Modals/ApprovePayoutRequestModal";
import { BulkApprovePayoutsModal } from "../Modals/BulkApprovePayoutsModal";
import { RejectPayoutRequestModal } from "../Modals/RejectPayoutRequestModal";
import { UnfreezeWalletModal } from "../Modals/UnfreezeWalletModal";

export default function WalletPayoutsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Wallet & Payouts"
        description="Manage and track wallet balances, commissions and payout requests"
        actions={[
          {
            key: "export-statement",
            label: "Export Statement",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
          {
            key: "process-approved",
            label: "Process All Approved",
            icon: <CheckCircle className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("bulk_approve"),
          },
        ]}
      />

      {/* Top Metric Cards - Reusing existing DashboardStats */}
      <DashboardStats />

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <CommissionAnalyticsCard />
          <TotalReadyToPayoutCard
            onProcessAll={() => setActiveModal("bulk_approve")}
            onApproveAll={() => setActiveModal("bulk_approve")}
          />
          <PayoutRequestsTable
            onSelectRow={(r) => {
              setSelectedPayout(r);
              setActiveModal("approve_payout");
            }}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6 min-w-0">
          <PlatformWalletCard />
          <BulkApprovePendingCard onApproveAll={() => setActiveModal("bulk_approve")} />
          <PayoutStatisticsCard />
          <RecentActivityCard />
          <SearchByAgentCard />
        </div>
      </div>

      {/* Modals */}
      <ApprovePayoutRequestModal
        open={activeModal === "approve_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedPayout?.agentName || "Rabiu Sani"}
        role={selectedPayout?.role || "Agency Partner"}
        amount={selectedPayout?.amount || "₦45,000"}
        onRejectClick={() => setActiveModal("reject_payout")}
      />

      <BulkApprovePayoutsModal
        open={activeModal === "bulk_approve"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <RejectPayoutRequestModal
        open={activeModal === "reject_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName={selectedPayout?.agentName || "Rabiu Sani"}
        amount={selectedPayout?.amount || "₦45,000"}
      />

      <UnfreezeWalletModal
        open={activeModal === "unfreeze_wallet"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
      />
    </div>
  );
}
