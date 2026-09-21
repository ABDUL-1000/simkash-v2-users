import React from "react";
import type { StateCoordinatorNetwork, OnboardScFormData } from "../types";
import { ScDetailActiveModal } from "../modals/ScDetails/ScDetailActiveModal";
import { ScDetailSuspendedModal } from "../modals/ScDetails/ScDetailSuspendedModal";
import { OnboardNewScModal } from "../modals/OnboardScFlow/OnboardNewScModal";
import { OnboardInviteSentModal } from "../modals/OnboardScFlow/OnboardInviteSentModal";
import { OnboardInviteFailedModal } from "../modals/OnboardScFlow/OnboardInviteFailedModal";
import { SetScCommissionRateModal } from "../modals/CommissionRateFlow/SetScCommissionRateModal";
import { ConfirmRateChangeModal } from "../modals/CommissionRateFlow/ConfirmRateChangeModal";
import { RateUpdatedSuccessModal } from "../modals/CommissionRateFlow/RateUpdatedSuccessModal";
import { SuspendScModal } from "../modals/StatusManagementFlow/SuspendScModal";
import { ScSuspendedSuccessModal } from "../modals/StatusManagementFlow/ScSuspendedSuccessModal";
import { ReinstateScModal } from "../modals/StatusManagementFlow/ReinstateScModal";
import { ScReinstatedSuccessModal } from "../modals/StatusManagementFlow/ScReinstatedSuccessModal";
import { SendActivationReminderModal } from "../modals/RemindersAndReports/SendActivationReminderModal";
import { ReminderSentSuccessModal } from "../modals/RemindersAndReports/ReminderSentSuccessModal";
import { ExportNetworkReportModal } from "../modals/RemindersAndReports/ExportNetworkReportModal";
import { ExportReportProgressModal } from "../modals/RemindersAndReports/ExportReportProgressModal";

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
  pendingNewRate: number;
  reminderChannel: string;
  exportConfig: { scope: string; format: string; period: string } | null;
}

interface NetworkModalsManagerProps {
  state: NetworkModalsState;
  onUpdateState: (patch: Partial<NetworkModalsState>) => void;
  onDistributeSim: (sc: StateCoordinatorNetwork) => void;
  onRateUpdated: (sc: StateCoordinatorNetwork, rate: number) => void;
  onStatusChanged: (scId: string, newStatus: "active" | "suspended") => void;
}

export const NetworkModalsManager: React.FC<NetworkModalsManagerProps> = ({
  state,
  onUpdateState,
  onDistributeSim,
  onRateUpdated,
  onStatusChanged,
}) => {
  return (
    <>
      <ScDetailActiveModal
        open={state.isOpenActiveSc}
        onOpenChange={(open) => onUpdateState({ isOpenActiveSc: open })}
        coordinator={state.activeSc}
        onDistributeSim={onDistributeSim}
        onSetCommission={(sc) => onUpdateState({ activeSc: sc, isOpenSetRate: true })}
        onSendReminder={(sc) => onUpdateState({ activeSc: sc, isOpenSendReminder: true })}
        onSuspend={(sc) => onUpdateState({ activeSc: sc, isOpenSuspend: true })}
      />
      <ScDetailSuspendedModal
        open={state.isOpenSuspendedSc}
        onOpenChange={(open) => onUpdateState({ isOpenSuspendedSc: open })}
        coordinator={state.activeSc}
        onReinstate={(sc) => onUpdateState({ activeSc: sc, isOpenReinstate: true })}
      />
      <OnboardNewScModal
        open={state.isOpenOnboard}
        onOpenChange={(open) => onUpdateState({ isOpenOnboard: open })}
        onSuccess={(data) => onUpdateState({ onboardData: data, isOpenInviteSent: true })}
      />
      <OnboardInviteSentModal
        open={state.isOpenInviteSent}
        onOpenChange={(open) => onUpdateState({ isOpenInviteSent: open })}
        data={state.onboardData}
      />
      <OnboardInviteFailedModal
        open={state.isOpenInviteFailed}
        onOpenChange={(open) => onUpdateState({ isOpenInviteFailed: open })}
        onRetry={() => onUpdateState({ isOpenOnboard: true })}
      />
      <SetScCommissionRateModal
        open={state.isOpenSetRate}
        onOpenChange={(open) => onUpdateState({ isOpenSetRate: open })}
        coordinator={state.activeSc}
        onProceedToConfirm={(sc, rate) =>
          onUpdateState({ activeSc: sc, pendingNewRate: rate, isOpenConfirmRate: true })
        }
      />
      <ConfirmRateChangeModal
        open={state.isOpenConfirmRate}
        onOpenChange={(open) => onUpdateState({ isOpenConfirmRate: open })}
        coordinator={state.activeSc}
        newRate={state.pendingNewRate}
        onSuccess={(sc, rate) => {
          onRateUpdated(sc, rate);
          onUpdateState({ isOpenRateSuccess: true });
        }}
      />
      <RateUpdatedSuccessModal
        open={state.isOpenRateSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenRateSuccess: open })}
        coordinator={state.activeSc}
        newRate={state.pendingNewRate}
      />
      <SuspendScModal
        open={state.isOpenSuspend}
        onOpenChange={(open) => onUpdateState({ isOpenSuspend: open })}
        coordinator={state.activeSc}
        onConfirmSuspend={(sc) => {
          onStatusChanged(sc.id, "suspended");
          onUpdateState({ isOpenSuspendedSuccess: true });
        }}
      />
      <ScSuspendedSuccessModal
        open={state.isOpenSuspendedSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenSuspendedSuccess: open })}
        coordinator={state.activeSc}
      />
      <ReinstateScModal
        open={state.isOpenReinstate}
        onOpenChange={(open) => onUpdateState({ isOpenReinstate: open })}
        coordinator={state.activeSc}
        onConfirmReinstate={(sc) => {
          onStatusChanged(sc.id, "active");
          onUpdateState({ isOpenReinstatedSuccess: true });
        }}
      />
      <ScReinstatedSuccessModal
        open={state.isOpenReinstatedSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenReinstatedSuccess: open })}
        coordinator={state.activeSc}
      />
      <SendActivationReminderModal
        open={state.isOpenSendReminder}
        onOpenChange={(open) => onUpdateState({ isOpenSendReminder: open })}
        coordinator={state.activeSc}
        onReminderSent={(sc, channel) => {
          onUpdateState({ activeSc: sc, reminderChannel: channel, isOpenReminderSuccess: true });
        }}
      />
      <ReminderSentSuccessModal
        open={state.isOpenReminderSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenReminderSuccess: open })}
        coordinator={state.activeSc}
        channel={state.reminderChannel}
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
