import { useState } from "react";
import { RefreshCw, Lock, Mail, Smartphone, Bell, Ban } from "lucide-react";
import type { OnSimAction, SimAction } from "@/types/sim-details.types";
import { SectionCard } from "./SectionCard";
import { ActionButton } from "./ActionButton";

import { RenewSimModal } from "./Modals/RenewSimModal";
import { PlacePndModal } from "./Modals/PlacePNDModal";
import { NotifyAgentModal } from "./Modals/NotifyAgentModal";
import { NotifyCustomerModal } from "./Modals/NotifyCustomerModal";
import { SetUsageAlertModal } from "./Modals/SetUsageAlertModal";
import { DeactivateSimModal } from "./Modals/DeactivateSimModal";

export function AdminActionsSection({ onAction }: { onAction: OnSimAction }) {
  const [activeModal, setActiveModal] = useState<SimAction | null>(null);

  const handleOpenModal = (action: SimAction) => {
    setActiveModal(action);
    onAction?.(action);
  };

  return (
    <>
      <SectionCard title="Admin Actions">
        <div className="space-y-3">
          <ActionButton
            icon={<RefreshCw className="size-4" />}
            label="Renew on Behalf"
            tone="primary"
            onClick={() => handleOpenModal("renew")}
          />
          <ActionButton
            icon={<Lock className="size-4" />}
            label="Place PND"
            tone="warning"
            onClick={() => handleOpenModal("pnd")}
          />
          <ActionButton
            icon={<Mail className="size-4" />}
            label="Notify Agent"
            tone="notify"
            onClick={() => handleOpenModal("notify-agent")}
          />
          <ActionButton
            icon={<Smartphone className="size-4" />}
            label="Notify Customer"
            tone="notify"
            onClick={() => handleOpenModal("notify-customer")}
          />
          <ActionButton
            icon={<Bell className="size-4" />}
            label="Set Usage Alert"
            tone="warning"
            onClick={() => handleOpenModal("set-usage-alert")}
          />
          <ActionButton
            icon={<Ban className="size-4" />}
            label="Deactivate SIM"
            tone="danger"
            onClick={() => handleOpenModal("deactivate")}
          />
        </div>
      </SectionCard>

      {/* Action Modals */}
      <RenewSimModal
        open={activeModal === "renew"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
      <PlacePndModal
        open={activeModal === "pnd"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
      <NotifyAgentModal
        open={activeModal === "notify-agent"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
      <NotifyCustomerModal
        open={activeModal === "notify-customer"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
      <SetUsageAlertModal
        open={activeModal === "set-usage-alert"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
      <DeactivateSimModal
        open={activeModal === "deactivate"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </>
  );
}