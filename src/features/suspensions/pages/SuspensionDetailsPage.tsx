import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { EntityDetailsHeader } from "@/components/common/EntityDetailsHeader";

import { SuspensionInfoCard } from "../components/details/SuspensionInfoCard";
import { SuspensionAuditTrailCard } from "../components/details/SuspensionAuditTrailCard";
import { SuspensionAssetsAwaitingTransferCard } from "../components/details/SuspensionAssetsAwaitingTransferCard";
import { SuspensionQuickActionsCard } from "../components/details/SuspensionQuickActionsCard";
import { SuspensionAccountSnapshotCard } from "../components/details/SuspensionAccountSnapshotCard";

import { TransferAssetsModal } from "../Modals/TransferAssetsModal";
import { ReinstateAccountModal } from "../Modals/ReinstateAccountModal";
import { PermanentlyCloseAccountModal } from "../Modals/PermanentlyCloseAccountModal";

export default function SuspensionDetailsPage() {
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
          onClick={() => navigate(appPaths.suspensions)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Suspensions</span>
        </button>
      </div>

      {/* Top Details Header using EntityDetailsHeader */}
      <EntityDetailsHeader
        name="Elidan Corp"
        phone="+234 803 456 7890"
        location="Lagos"
        role="Enterprise"
        avatarInitials="EC"
        avatarBg="#2563EB"
        badges={[
          { label: "Suspended", variant: "danger" },
          { label: "Transfer Pending", variant: "amber" },
        ]}
        actions={[
          {
            key: "transfer",
            label: "Transfer Assets",
            variant: "amber",
            onClick: () => setActiveModal("transfer"),
          },
          {
            key: "reinstate",
            label: "Reinstate Account",
            variant: "primary",
            onClick: () => setActiveModal("reinstate"),
          },
        ]}
      />

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Left */}
        <div className="space-y-6 min-w-0">
          <SuspensionInfoCard />
          <SuspensionAuditTrailCard />
        </div>

        {/* Column 2: Center */}
        <div className="space-y-6 min-w-0">
          <SuspensionAssetsAwaitingTransferCard
            onTransferNow={() => setActiveModal("transfer")}
          />
        </div>

        {/* Column 3: Right */}
        <div className="space-y-6 min-w-0">
          <SuspensionQuickActionsCard
            onTransferAll={() => setActiveModal("transfer")}
            onTransferAgentsOnly={() => setActiveModal("transfer")}
            onTransferSimsOnly={() => setActiveModal("transfer")}
            onReinstate={() => setActiveModal("reinstate")}
            onPermanentClosure={() => setActiveModal("close")}
          />
          <SuspensionAccountSnapshotCard />
        </div>
      </div>

      {/* Action Modals */}
      <TransferAssetsModal
        open={activeModal === "transfer"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        accountName="Elidan Corp"
      />

      <ReinstateAccountModal
        open={activeModal === "reinstate"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        accountName="Elidan Corp"
      />

      <PermanentlyCloseAccountModal
        open={activeModal === "close"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        accountName="Elidan Corp"
      />
    </div>
  );
}
