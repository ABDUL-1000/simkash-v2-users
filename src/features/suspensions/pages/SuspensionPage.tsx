import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download } from "lucide-react";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";

import { SuspensionTable, type SuspensionRow } from "../components/SuspensionTable";
import { SuspensionSummaryCard } from "../components/SuspensionSummaryCard";
import { SuspensionImmediateActionCard } from "../components/SuspensionImmediateActionCard";
import { SuspensionRecentActivityCard } from "../components/SuspensionRecentActivityCard";

import { TransferAssetsModal } from "../Modals/TransferAssetsModal";
import { ReinstateAccountModal } from "../Modals/ReinstateAccountModal";
import { PermanentlyCloseAccountModal } from "../Modals/PermanentlyCloseAccountModal";

export default function SuspensionPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<SuspensionRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Account Suspensions"
        description="Manage suspended accounts, asset transfers and reinstatements"
        actions={[
          {
            key: "export-dashboard",
            label: "Export Report",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
        ]}
      />

      {/* Top Metric Dashboard Stats */}
      <DashboardStats />

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Main Table Column */}
        <div className="lg:col-span-2 min-w-0">
          <SuspensionTable onSelectRow={(r) => setSelectedAccount(r)} />
        </div>

        {/* Right Sidebar Cards Column */}
        <div className="space-y-6 min-w-0">
          <SuspensionSummaryCard />
          <SuspensionImmediateActionCard
            onTransfer={(item) => {
                console.log(item)

              setActiveModal("transfer");
            }}
          />
          <SuspensionRecentActivityCard />
        </div>
      </div>

      {/* Modals */}
      <TransferAssetsModal
        open={activeModal === "transfer"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        accountName={selectedAccount?.name || "Elidan Corp"}
      />

      <ReinstateAccountModal
        open={activeModal === "reinstate"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        accountName={selectedAccount?.name || "Elidan Corp"}
      />

      <PermanentlyCloseAccountModal
        open={activeModal === "close"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        accountName={selectedAccount?.name || "Elidan Corp"}
      />
    </div>
  );
}
