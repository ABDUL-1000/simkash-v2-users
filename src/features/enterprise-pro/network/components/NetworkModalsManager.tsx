import React from "react";
import type { StateCoordinatorNetwork } from "../types";
import { ScDetailActiveModal } from "../modals/ScDetails/ScDetailActiveModal";
import { OnboardNewScModal } from "../modals/OnboardScFlow/OnboardNewScModal";
import { OnboardInviteSentModal } from "../modals/OnboardScFlow/OnboardInviteSentModal";
import { SuspendScModal } from "../modals/StatusManagementFlow/SuspendScModal";
import { ScSuspendedSuccessModal } from "../modals/StatusManagementFlow/ScSuspendedSuccessModal";
import { ReinstateScModal } from "../modals/StatusManagementFlow/ReinstateScModal";
import { ScReinstatedSuccessModal } from "../modals/StatusManagementFlow/ScReinstatedSuccessModal";
import { SendActivationReminderModal } from "../modals/RemindersAndReports/SendActivationReminderModal";
import type { OnboardScResult } from '../types/api';

export interface NetworkModalsState {
  activeSc: StateCoordinatorNetwork | null;
  isOpenDetails: boolean;
  isOpenOnboard: boolean;
  isOpenInviteSent: boolean;
  isOpenSuspend: boolean;
  isOpenSuspendedSuccess: boolean;
  isOpenReinstate: boolean;
  isOpenReinstatedSuccess: boolean;
  isOpenSendReminder: boolean;
  onboardResult: OnboardScResult | null;
}

interface NetworkModalsManagerProps {
  state: NetworkModalsState;
  coordinators: StateCoordinatorNetwork[];
  onUpdateState: (patch: Partial<NetworkModalsState>) => void;
  onDistributeSim: (sc: StateCoordinatorNetwork) => void;
}

export const NetworkModalsManager: React.FC<NetworkModalsManagerProps> = ({
  state,
  coordinators,
  onUpdateState,
  onDistributeSim,
}) => {
  return (
    <>
      <ScDetailActiveModal
        open={state.isOpenDetails}
        onOpenChange={(open) => onUpdateState({ isOpenDetails: open })}
        coordinator={state.activeSc}
        onDistributeSim={onDistributeSim}
        onSendReminder={(sc) => onUpdateState({ activeSc: sc, isOpenSendReminder: true })}
        onSuspend={(sc) => onUpdateState({ activeSc: sc, isOpenSuspend: true })}
        onReinstate={(sc) => onUpdateState({ activeSc: sc, isOpenReinstate: true })}
      />
      {state.isOpenOnboard && <OnboardNewScModal
        onClose={() => onUpdateState({ isOpenOnboard: false })}
        onOnboarded={(result) => onUpdateState({ isOpenOnboard: false, onboardResult: result, isOpenInviteSent: true })}
      />}
      <OnboardInviteSentModal
        open={state.isOpenInviteSent}
        onOpenChange={(open) => onUpdateState({ isOpenInviteSent: open })}
        data={state.onboardResult}
      />
      <SuspendScModal
        key={`suspend-${state.activeSc?.id}`}
        open={state.isOpenSuspend}
        onOpenChange={(open) => onUpdateState({ isOpenSuspend: open })}
        coordinator={state.activeSc}
        onConfirmSuspend={(sc) => onUpdateState({ activeSc: sc, isOpenSuspendedSuccess: true })}
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
        onConfirmReinstate={(sc) => onUpdateState({ activeSc: sc, isOpenReinstatedSuccess: true })}
      />
      <ScReinstatedSuccessModal
        open={state.isOpenReinstatedSuccess}
        onOpenChange={(open) => onUpdateState({ isOpenReinstatedSuccess: open })}
        coordinator={state.activeSc}
      />
      {state.isOpenSendReminder && <SendActivationReminderModal
        coordinator={state.activeSc}
        coordinators={coordinators}
        onClose={() => onUpdateState({ isOpenSendReminder: false })}
      />}
    </>
  );
};
