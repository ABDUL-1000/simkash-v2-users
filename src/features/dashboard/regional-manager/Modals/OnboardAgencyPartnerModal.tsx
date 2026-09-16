import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface OnboardAgencyPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: StateCoordinatorItem | null;
  onSuccess?: (details: {
    apName: string;
    phone: string;
    scName: string;
    location: string;
  }) => void;
}

export function OnboardAgencyPartnerModal({
  open,
  onOpenChange,
  sc,
  onSuccess,
}: OnboardAgencyPartnerModalProps) {
  const scName = sc?.name || "Aminat Okafor";
  const scState = sc?.state || "Lagos";
  const currentApCount = sc?.apsCount || 6;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [sendWelcomeSms, setSendWelcomeSms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    if (!fullName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        apName: fullName,
        phone: `+234 ${phoneNumber}`,
        scName,
        location: location || `${scState}, Nigeria`,
      });

      // Reset form
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setLocation("");
      setSendWelcomeSms(true);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Onboard Agency Partner"
      description={`Add a new AP under ${scName}`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Banner Card */}
        <div
          className="flex items-center justify-between rounded-2xl border p-3.5"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2 font-bold" style={{ color: APP_COLORS.texts.primary }}>
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            />
            <span>
              {scName} · {scState}
            </span>
          </div>
          <span className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            {currentApCount} current APs
          </span>
        </div>

        {/* Form Fields */}
        {/* 1. AP Full Name */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            AP Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. John Doe"
            className="w-full rounded-2xl border p-3 text-xs focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* 2. Phone Number */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Phone Number
          </label>
          <div className="flex items-center">
            <span
              className="inline-flex items-center rounded-l-2xl border border-r-0 px-3.5 py-3 text-xs font-bold"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
                color: APP_COLORS.texts.primary,
              }}
            >
              +234
            </span>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="806 000 0000"
              className="w-full rounded-r-2xl border p-3 text-xs focus:outline-hidden transition"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
                color: APP_COLORS.texts.primary,
              }}
            />
          </div>
        </div>

        {/* 3. Email Address (Optional) */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. john@email.com"
            className="w-full rounded-2xl border p-3 text-xs focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* 4. Location / Area */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Location / Area
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Ikeja, Lagos"
            className="w-full rounded-2xl border p-3 text-xs focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={sendWelcomeSms}
            onChange={(e) => setSendWelcomeSms(e.target.checked)}
            className="size-4 rounded-md accent-blue-600 cursor-pointer"
          />
          <span
            className="text-xs font-medium"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Send welcome SMS to new AP with activation instructions
          </span>
        </label>

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
            disabled={isSubmitting || !fullName.trim() || !phoneNumber.trim()}
            onClick={handleConfirm}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSubmitting ? "Onboarding..." : "Onboard AP"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default OnboardAgencyPartnerModal;
