import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus } from "lucide-react";

import { SimSwapHeaderStats } from "../components/SimSwapHeaderStats";
import { SwapRequestsTable, type SwapRow } from "../components/SwapRequestsTable";
import { SwapRecentActivityCard } from "../components/SwapRecentActivityCard";
import { SwapPendingApprovalsCard } from "../components/SwapPendingApprovalsCard";
import { SwapRevenueChartCard } from "../components/SwapRevenueChartCard";

import { SelectSwapReasonModal, type SwapReasonType } from "../Modals/SelectSwapReasonModal";
import { SwapNetworkIssueModal } from "../Modals/SwapNetworkIssueModal";
import { SwapLostSimModal } from "../Modals/SwapLostSimModal";
import { ConfirmSingleSwapModal } from "../Modals/ConfirmSingleSwapModal";
import { ConfirmBatchSwapModal } from "../Modals/ConfirmBatchSwapModal";

export default function SimSwapPage() {
  const [wizardStep, setWizardStep] = useState<
    "select_reason" | "network_issue" | "lost_sim" | "confirm_single" | "confirm_batch" | null
  >(null);

  const [selectedSwapRow, setSelectedSwapRow] = useState<SwapRow | null>(null);
  console.log(selectedSwapRow)

  const handleApproveSwap = (row: SwapRow) => {
    setSelectedSwapRow(row);
    setWizardStep("confirm_single");
  };

  const handleRejectSwap = (row: SwapRow) => {
    // Reject handler
    console.log(row)
  };


  const handleViewSwapRow = (row: SwapRow) => {
    setSelectedSwapRow(row);
    setWizardStep("confirm_single");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Top Page Header */}
      <PageHeader
        title="SIM Swap"
        description="Manage same-network and cross-network SIM swaps · ₦3,500 per swap"
        actions={[
          {
            key: "initiate-swap",
            label: "Initiate Swap",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setWizardStep("select_reason"),
          },
        ]}
      />

      {/* Top Stats Section (5-metric bar + 4 card grid) */}
      <SimSwapHeaderStats />

      {/* Main Table: Swap Requests */}
      <SwapRequestsTable
        onApprove={handleApproveSwap}
        onReject={handleRejectSwap}
        onViewRow={handleViewSwapRow}
      />

      {/* Bottom 3-Card Grid Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SwapRecentActivityCard />
        <SwapPendingApprovalsCard
          onApprove={() => setWizardStep("confirm_single")}
          onReject={() => {}}
        />
        <SwapRevenueChartCard />
      </div>

      {/* Multi-Step SIM Swap Wizard Modals */}
      <SelectSwapReasonModal
        open={wizardStep === "select_reason"}
        onOpenChange={(open) => !open && setWizardStep(null)}
        onContinue={(reason: SwapReasonType) => {
          if (reason === "network_issue") {
            setWizardStep("network_issue");
          } else {
            setWizardStep("lost_sim");
          }
        }}
      />

      <SwapNetworkIssueModal
        open={wizardStep === "network_issue"}
        onOpenChange={(open) => !open && setWizardStep(null)}
        onBack={() => setWizardStep("select_reason")}
        onConfirmSwap={(selectedSims) => {
          if (selectedSims.length > 1) {
            setWizardStep("confirm_batch");
          } else {
            setWizardStep("confirm_single");
          }
        }}
      />

      <SwapLostSimModal
        open={wizardStep === "lost_sim"}
        onOpenChange={(open) => !open && setWizardStep(null)}
        onBack={() => setWizardStep("select_reason")}
        onProcessSwap={() => {
          setWizardStep("confirm_single");
        }}
      />

      <ConfirmSingleSwapModal
        open={wizardStep === "confirm_single"}
        onOpenChange={(open) => !open && setWizardStep(null)}
        onBack={() => setWizardStep("network_issue")}
        onConfirmSuccess={() => setWizardStep(null)}
      />

      <ConfirmBatchSwapModal
        open={wizardStep === "confirm_batch"}
        onOpenChange={(open) => !open && setWizardStep(null)}
        onBack={() => setWizardStep("network_issue")}
        onConfirmSuccess={() => setWizardStep(null)}
      />
    </div>
  );
}
