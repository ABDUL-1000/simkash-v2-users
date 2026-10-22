import { useState } from "react";
import type { ActivateSimResponseData } from "../types/api";
import { QuickActivateSimModal, type ActivationFormData } from "./QuickActivateSimModal";
import { ConfirmActivationModal } from "./ConfirmActivationModal";
import { SimActivatedSuccessModal } from "./SimActivatedSuccessModal";

interface ApActivateSimFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Preselects a SIM from stock. */
  initialSim?: { simNumber: string; simType: string } | null;
  onActivated?: (result: ActivateSimResponseData) => void;
}

/** The single SIM activation flow: Quick Activate → Confirm (PIN) → Success. */
export function ApActivateSimFlow({ open, onOpenChange, initialSim, onActivated }: ApActivateSimFlowProps) {
  const [formData, setFormData] = useState<ActivationFormData | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<ActivateSimResponseData | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  // Remounts the form on every open so it starts clean (and picks up initialSim).
  const [formKey, setFormKey] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setFormKey(key => key + 1);
  }

  return <>
    <QuickActivateSimModal
      key={formKey}
      open={open}
      onOpenChange={onOpenChange}
      initialSim={initialSim}
      onProceedToConfirm={(data) => { setFormData(data); setConfirmOpen(true); }}
    />
    <ConfirmActivationModal
      open={confirmOpen}
      onOpenChange={setConfirmOpen}
      data={formData}
      onBack={() => onOpenChange(true)}
      onConfirmSuccess={(response) => {
        setFormData(null);
        setResult(response);
        setSuccessOpen(true);
        onActivated?.(response);
      }}
    />
    <SimActivatedSuccessModal
      open={successOpen}
      onOpenChange={setSuccessOpen}
      data={result}
      onActivateAnother={() => onOpenChange(true)}
      onDone={() => setResult(null)}
    />
  </>;
}
