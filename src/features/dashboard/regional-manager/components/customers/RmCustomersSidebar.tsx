import { RmNetworkSummaryCard } from "./RmNetworkSummaryCard";
import { RmSpecialAlertsCard } from "./RmSpecialAlertsCard";
import { RmBonusLimitsCard } from "./RmBonusLimitsCard";
import { RmCustomersQuickActionsCard } from "./RmCustomersQuickActionsCard";

interface RmCustomersSidebarProps {
  onOnboardSc: () => void;
  onDistributeAll: () => void;
  onRedistributeStock?: () => void;
  onSendBulkReminder: () => void;
  onExportNetwork: () => void;
  onViewNetworkActivity: () => void;
  onDistributeSc: (scName: string) => void;
  onContactSc: (scName: string) => void;
  onResolveSc: (scName: string) => void;
  onManageLimits: () => void;
  onViewAllDetails: () => void;
}

export function RmCustomersSidebar({
  onOnboardSc,
  onDistributeAll,
  onRedistributeStock,
  onSendBulkReminder,
  onExportNetwork,
  onViewNetworkActivity,
  onDistributeSc,
  onContactSc,
  onResolveSc,
  onManageLimits,
  onViewAllDetails,
}: RmCustomersSidebarProps) {
  return (
    <div className="space-y-4">
      {/* 1. Network Summary */}
      <RmNetworkSummaryCard />

      {/* 2. Special Alerts */}
      <RmSpecialAlertsCard
        onDistributeSc={onDistributeSc}
        onContactSc={onContactSc}
        onResolveSc={onResolveSc}
        onViewAllDetails={onViewAllDetails}
      />

      {/* 3. Bonus Status & SIM Limits */}
      <RmBonusLimitsCard onManageLimits={onManageLimits} />

      {/* 4. Quick Actions */}
      <RmCustomersQuickActionsCard
        onOnboardSc={onOnboardSc}
        onDistributeAll={onDistributeAll}
        onRedistributeStock={onRedistributeStock}
        onSendBulkReminder={onSendBulkReminder}
        onExportNetwork={onExportNetwork}
        onViewNetworkActivity={onViewNetworkActivity}
      />
    </div>
  );
}

export default RmCustomersSidebar;
