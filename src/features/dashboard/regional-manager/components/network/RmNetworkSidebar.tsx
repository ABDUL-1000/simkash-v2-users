import { RmLivePulseCard } from "./RmLivePulseCard";
import { RmScBreakdownCard } from "./RmScBreakdownCard";
import { RmSimTypeBreakdownCard } from "./RmSimTypeBreakdownCard";
import { RmFailedActivationsCard } from "./RmFailedActivationsCard";
import type { ScNetworkBreakdownItem } from "../../types/regional-manager-network.types";
import type { FailedActivationItem } from "../../data/regional-manager-network.data";

interface RmNetworkSidebarProps {
  scs: ScNetworkBreakdownItem[];
  failedItems: FailedActivationItem[];
  onSelectSc: (sc: ScNetworkBreakdownItem) => void;
  onRetryFailed: (item: FailedActivationItem) => void;
  onViewFailedDetails: (item: FailedActivationItem) => void;
}

export function RmNetworkSidebar({
  scs,
  failedItems,
  onSelectSc,
  onRetryFailed,
  onViewFailedDetails,
}: RmNetworkSidebarProps) {
  return (
    <div className="space-y-4">
      {/* 1. Live Activity Pulse */}
      <RmLivePulseCard />

      {/* 2. SC Breakdown Today */}
      <RmScBreakdownCard scs={scs} onSelectSc={onSelectSc} />

      {/* 3. SIM Type Breakdown */}
      <RmSimTypeBreakdownCard />

      {/* 4. Failed Activations Alert */}
      <RmFailedActivationsCard
        failedItems={failedItems}
        onRetry={onRetryFailed}
        onViewDetails={onViewFailedDetails}
      />
    </div>
  );
}

export default RmNetworkSidebar;
