import { useState } from "react";
import { AlertTriangle, XCircle, ChevronDown } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface SuspendScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: StateCoordinatorItem | null;
  scName?: string;
  onConfirmSuspend?: () => void;
  onSuccess?: (details: { scName: string; reason: string; state: string }) => void;
}

export function SuspendScModal({
  open,
  onOpenChange,
  sc,
  scName: propScName,
  onConfirmSuspend,
  onSuccess,
}: SuspendScModalProps) {
  const scName = sc?.name || propScName || "Aminat Okafor";
  const scState = sc?.state || "Lagos";
  const apCount = sc?.apsCount || 6;
  const stockCount = sc?.stock || 85;

  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    // Auto-advance
    if (val && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSuspend = () => {
    if (!reason || !confirmed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onConfirmSuspend?.();
      onSuccess?.({
        scName,
        reason,
        state: scState,
      });

      // Reset
      setReason("");
      setNotes("");
      setConfirmed(false);
      setPin(["", "", "", ""]);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend SC Account"
      description={`${scName} · ${scState}`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Amber Alert Banner */}
        <div
          className="flex items-start gap-2.5 rounded-2xl border p-3.5"
          style={{
            borderColor: APP_COLORS.ambers.light,
            backgroundColor: "#FFFDF0",
            color: APP_COLORS.ambers.secondary,
          }}
        >
          <AlertTriangle
            className="size-4 shrink-0 mt-0.5"
            style={{ color: APP_COLORS.ambers.amber }}
          />
          <p className="text-xs leading-relaxed" style={{ color: "#92400E" }}>
            Suspending this SC will freeze their account and all stock. Their {apCount} Agency Partners will not be able to activate SIMs.
          </p>
        </div>

        {/* What happens on suspension card */}
        <div
          className="rounded-2xl border p-4 space-y-2.5"
          style={{
            borderColor: APP_COLORS.reds.primary,
            backgroundColor: APP_COLORS.reds.light,
          }}
        >
          <h4
            className="text-[11px] font-black tracking-wider uppercase"
            style={{ color: APP_COLORS.reds.red }}
          >
            What Happens on Suspension
          </h4>
          <div className="space-y-2">
            {[
              "SC cannot activate or distribute SIMs",
              `All ${apCount} Agency Partners frozen`,
              `Stock frozen (${stockCount} SIMs locked)`,
              "SC notified by SMS immediately",
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <XCircle
                  className="size-4 shrink-0"
                  style={{ color: APP_COLORS.reds.red }}
                />
                <span
                  className="text-xs font-semibold"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reason For Suspension */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Reason for Suspension
          </label>
          <div className="relative">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full appearance-none rounded-xl border bg-white p-3 pr-8 text-xs font-semibold focus:outline-hidden transition"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                color: reason ? APP_COLORS.texts.primary : APP_COLORS.texts.slate,
              }}
            >
              <option value="">Select reason...</option>
              <option value="Policy Violation">Policy Violation</option>
              <option value="Stock Audit Discrepancy">Stock Audit Discrepancy</option>
              <option value="Inactivity for over 30 Days">Inactivity for over 30 Days</option>
              <option value="Fraudulent Activity Detected">Fraudulent Activity Detected</option>
              <option value="Voluntary Account Freeze">Voluntary Account Freeze</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4"
              style={{ color: APP_COLORS.texts.slate }}
            />
          </div>
        </div>

        {/* Additional Notes (Optional) */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              className="block text-[11px] font-bold tracking-wider uppercase"
              style={{ color: APP_COLORS.texts.slate }}
            >
              Additional Notes (Optional)
            </label>
            <span className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
              {notes.length}/300
            </span>
          </div>
          <textarea
            rows={3}
            maxLength={300}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Provide details for the suspension report..."
            className="w-full rounded-2xl border p-3 text-xs focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* Checkbox Confirmation */}
        <label className="flex items-center gap-2.5 cursor-pointer pt-0.5">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="size-4 rounded-md accent-blue-600 cursor-pointer"
          />
          <span
            className="text-xs font-semibold"
            style={{ color: APP_COLORS.texts.primary }}
          >
            I confirm this suspension has been reviewed and approved.
          </span>
        </label>

        {/* Enter Your PIN To Confirm */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Enter Your PIN to Confirm
          </label>
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                id={`pin-input-${i}`}
                type="password"
                maxLength={1}
                value={pin[i]}
                onChange={(e) => handlePinChange(i, e.target.value)}
                className="size-12 rounded-2xl border text-center text-lg font-black focus:outline-hidden transition"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                  color: APP_COLORS.texts.primary,
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!reason || !confirmed || isSubmitting}
            onClick={handleSuspend}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.reds.red }}
          >
            {isSubmitting ? "Suspending..." : "Suspend SC"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default SuspendScModal;
