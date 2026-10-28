import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useCaSuspendPartner } from "../api/useCaPartners";

interface SuspendPartnerModalProps {
  partnerId: number;
  partnerName: string;
  /** true when the partner is currently suspended (the modal then re-activates). */
  suspended: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/** POST /my-partner/{agentId}/suspend { suspend, reason } */
export function SuspendPartnerModal({ partnerId, partnerName, suspended, onClose, onSuccess }: SuspendPartnerModalProps) {
  const [reason, setReason] = useState("");
  const mutation = useCaSuspendPartner(partnerId);
  const submit = () => mutation.mutate({ suspend: !suspended, reason: reason.trim() }, { onSuccess: () => { onSuccess?.(); onClose(); } });
  return (
    <AppModal
      open
      onOpenChange={(open) => { if (!open && !mutation.isPending) onClose(); }}
      title={suspended ? "Reactivate Agency Partner" : "Suspend Agency Partner"}
      description={partnerName}
      size="sm"
      showCloseButton={!mutation.isPending}
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", disabled: mutation.isPending, onClick: onClose },
        { key: "confirm", label: mutation.isPending ? (suspended ? "Reactivating..." : "Suspending...") : suspended ? "Reactivate" : "Suspend", variant: "primary", disabled: mutation.isPending || !reason.trim(), onClick: submit },
      ]}
    >
      <div className="space-y-3 text-xs">
        {!suspended && <p className="flex items-start gap-2 rounded-xl border border-[#EF4444]/30 bg-[#FFF7F8] p-3 font-medium text-[#EF4444]">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />Customers of this AP cannot activate or renew SIMs while the account is suspended.
        </p>}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Reason</label>
          <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder={suspended ? "e.g. KYC issue resolved" : "e.g. Non-compliance with KYC verification"}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white p-2.5 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]" />
        </div>
      </div>
    </AppModal>
  );
}
