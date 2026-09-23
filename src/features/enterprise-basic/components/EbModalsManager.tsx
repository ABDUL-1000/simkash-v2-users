import React from "react";
import type { EbModalsState } from "../hooks/useEnterpriseBasicState";
import type { AssignSimFormData } from "../types";
import { PayBiWeeklyInstalmentModal } from "../modals/PayBiWeeklyInstalmentModal";
import { RequestEbPayoutModal } from "../modals/RequestEbPayoutModal";
import { EbPayoutPendingAdminModal } from "../modals/EbPayoutPendingAdminModal";
import { AssignSimModal } from "../modals/AssignSimModal";
import { CommissionPnLSummaryModal } from "../modals/CommissionPnLSummaryModal";
import { EbNotificationsModal } from "../modals/EbNotificationsModal";

interface EbModalsManagerProps {
  state: EbModalsState;
  onUpdateState: (patch: Partial<EbModalsState>) => void;
  walletBalance: number;
  balanceRemaining: number;
  balancePaid: number;
  onConfirmPayment: (amount: number) => void;
  onRequestPayout: (amount: number) => void;
  onAssignSim: (data: AssignSimFormData) => void;
}

export const EbModalsManager: React.FC<EbModalsManagerProps> = ({
  state,
  onUpdateState,
  walletBalance,
  balanceRemaining,
  balancePaid,
  onConfirmPayment,
  onRequestPayout,
  onAssignSim,
}) => {
  return (
    <>
      <PayBiWeeklyInstalmentModal
        open={state.isOpenInstalment}
        onOpenChange={(open) => onUpdateState({ isOpenInstalment: open })}
        balanceRemaining={balanceRemaining}
        balancePaid={balancePaid}
        walletBalance={walletBalance}
        onConfirmPayment={onConfirmPayment}
      />

      <RequestEbPayoutModal
        open={state.isOpenPayout}
        onOpenChange={(open) => onUpdateState({ isOpenPayout: open })}
        availableBalance={walletBalance}
        onRequestSubmitted={onRequestPayout}
      />

      <EbPayoutPendingAdminModal
        open={state.isOpenPayoutPending}
        onOpenChange={(open) => onUpdateState({ isOpenPayoutPending: open })}
        amount={state.payoutAmount}
        referenceId={state.payoutRef}
      />

      <AssignSimModal
        open={state.isOpenAssignSim}
        onOpenChange={(open) => onUpdateState({ isOpenAssignSim: open })}
        onAssignSubmitted={onAssignSim}
      />

      <CommissionPnLSummaryModal
        open={state.isOpenPnLSummary}
        onOpenChange={(open) => onUpdateState({ isOpenPnLSummary: open })}
      />

      <EbNotificationsModal
        open={state.isOpenNotifications}
        onOpenChange={(open) => onUpdateState({ isOpenNotifications: open })}
      />
    </>
  );
};
