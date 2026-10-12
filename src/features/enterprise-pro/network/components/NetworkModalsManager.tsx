import React from "react";
import type { StateCoordinatorNetwork, OnboardScFormData } from "../types";
import { ScDetailActiveModal } from "../modals/ScDetails/ScDetailActiveModal";
import { ScDetailSuspendedModal } from "../modals/ScDetails/ScDetailSuspendedModal";
import { OnboardNewScModal } from "../modals/OnboardScFlow/OnboardNewScModal";
import { OnboardInviteSentModal } from "../modals/OnboardScFlow/OnboardInviteSentModal";
import { OnboardInviteFailedModal } from "../modals/OnboardScFlow/OnboardInviteFailedModal";
import { SuspendScModal } from "../modals/StatusManagementFlow/SuspendScModal";
import { ScSuspendedSuccessModal } from "../modals/StatusManagementFlow/ScSuspendedSuccessModal";
import { ReinstateScModal } from "../modals/StatusManagementFlow/ReinstateScModal";
import { ScReinstatedSuccessModal } from "../modals/StatusManagementFlow/ScReinstatedSuccessModal";
import { ExportNetworkReportModal } from "../modals/RemindersAndReports/ExportNetworkReportModal";
import { ExportReportProgressModal } from "../modals/RemindersAndReports/ExportReportProgressModal";
import { openNotification } from '@/utils/notifications';
import type { OnboardScResult } from '../types/api';

export interface NetworkModalsState {
  activeSc: StateCoordinatorNetwork | null;
  isOpenActiveSc: boolean;
  isOpenSuspendedSc: boolean;
  isOpenOnboard: boolean;
  isOpenInviteSent: boolean;
  isOpenInviteFailed: boolean;
  isOpenSetRate: boolean;
  isOpenConfirmRate: boolean;
  isOpenRateSuccess: boolean;
  isOpenSuspend: boolean;
  isOpenSuspendedSuccess: boolean;
  isOpenReinstate: boolean;
  isOpenReinstatedSuccess: boolean;
  isOpenSendReminder: boolean;
  isOpenReminderSuccess: boolean;
  isOpenExport: boolean;
  isOpenExportProgress: boolean;
  onboardData: OnboardScFormData | null;
  onboardResult: OnboardScResult | null;
  pendingNewRate: number;
  reminderChannel: string;
  exportConfig: { scope: string; format: string; period: string } | null;
}

interface NetworkModalsManagerProps {
  state: NetworkModalsState;
  onUpdateState: (patch: Partial<NetworkModalsState>) => void;
  onDistributeSim: (sc: StateCoordinatorNetwork) => void;
  onViewAps: (sc: StateCoordinatorNetwork) => void;
}

export const NetworkModalsManager: React.FC<NetworkModalsManagerProps> = ({
  state,
  onUpdateState,
  onDistributeSim,
  onViewAps,
}) => {
  return (
    <>
      <ScDetailActiveModal
        open={state.isOpenActiveSc}
        onOpenChange={(open) => onUpdateState({ isOpenActiveSc: open })}
        coordinator={state.activeSc}
        onDistributeSim={onDistributeSim}
        onSetCommission={() => openNotification({ state: 'info', title: 'Commission Rate', description: 'Coordinator rate changes are not available from the supplied network API yet.' })}
        onSendReminder={() => openNotification({ state: 'info', title: 'Activation Reminder', description: 'Reminder delivery is not available from the supplied network API yet.' })}
        onSuspend={(sc) => onUpdateState({ activeSc: sc, isOpenSuspend: true })}
        onViewAps={onViewAps}
      />
      <ScDetailSuspendedModal
        open={state.isOpenSuspendedSc}
        onOpenChange={(open) => onUpdateState({ isOpenSuspendedSc: open })}
        coordinator={state.activeSc}
        onReinstate={(sc) => onUpdateState({ activeSc: sc, isOpenReinstate: true })}
        onViewAps={onViewAps}
      />
      <OnboardNewScModal
        open={state.isOpenOnboard}
        onOpenChange={(open) => onUpdateState({ isOpenOnboard: open })}
        onSuccess={(data, result) => onUpdateState({ onboardData: data, onboardResult: result, isOpenInviteSent: true })}
      />
      <OnboardInviteSentModal
        open={state.isOpenInviteSent}
        onOpenChange={(open) => onUpdateState({ isOpenInviteSent: open })}
        data={state.onboardResult}
      />
      <OnboardInviteFailedModal
        open={state.isOpenInviteFailed}
        onOpenChange={(open) => onUpdateState({ isOpenInviteFailed: open })}
        onRetry={() => onUpdateState({ isOpenOnboard: true })}
      />
      <SuspendScModal
        key={`suspend-${state.activeSc?.id}`}
        open={state.isOpenSuspend}
        onOpenChange={(open) => onUpdateState({ isOpenSuspend: open })}
        coordinator={state.activeSc}
        onConfirmSuspend={(sc) => {
          onUpdateState({ activeSc: sc, isOpenSuspendedSuccess: sc.status === 'suspended', isOpenReinstatedSuccess: sc.status === 'active' });
        }}
      />
      <ScSuspendedSuccessModal
        open={state.isOpenSuspendedSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenSuspendedSuccess: open })}
        coordinator={state.activeSc}
      />
      <ReinstateScModal
        key={`reinstate-${state.activeSc?.id}`}
        open={state.isOpenReinstate}
        onOpenChange={(open) => onUpdateState({ isOpenReinstate: open })}
        coordinator={state.activeSc}
        onConfirmReinstate={(sc) => {
          onUpdateState({ activeSc: sc, isOpenReinstatedSuccess: sc.status === 'active', isOpenSuspendedSuccess: sc.status === 'suspended' });
        }}
      />
      <ScReinstatedSuccessModal
        open={state.isOpenReinstatedSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenReinstatedSuccess: open })}
        coordinator={state.activeSc}
      />
      <ExportNetworkReportModal
        open={state.isOpenExport}
        onOpenChange={(open) => onUpdateState({ isOpenExport: open })}
        onStartExport={(cfg) => onUpdateState({ exportConfig: cfg, isOpenExportProgress: true })}
      />
      <ExportReportProgressModal
        open={state.isOpenExportProgress}
        onOpenChange={(open) => onUpdateState({ isOpenExportProgress: open })}
        config={state.exportConfig}
      />
    </>
  );
};
