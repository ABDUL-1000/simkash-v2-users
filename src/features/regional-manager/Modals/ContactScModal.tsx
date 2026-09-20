import { useState } from "react";
import { Phone, MessageSquare, Mail } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface ContactScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: StateCoordinatorItem | null;
  scName?: string;
  phone?: string;
  onSuccess?: (details: { scName: string; phone: string; message: string }) => void;
}

const QUICK_MESSAGES = [
  "Check your stock level",
  "Activate more SIMs today",
  "You're near your target",
  "Custom message",
];

export function ContactScModal({
  open,
  onOpenChange,
  sc,
  scName: propScName,
  phone: propPhone,
  onSuccess,
}: ContactScModalProps) {
  const scName = sc?.name || propScName || "Aminat Okafor";
  const scState = sc?.state || "Lagos";
  const scPhone = sc?.phone || propPhone || "08065942373";
  const scEmail = sc?.email || `${scName.toLowerCase().replace(/\s+/g, ".")}@email.com`;
  const scInitials = sc?.initials || "AO";
  const scStatus = sc?.status || "Active";

  const firstName = scName.split(" ")[0];

  const [selectedQuickMsg, setSelectedQuickMsg] = useState<string>("Custom message");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSelectChip = (chip: string) => {
    setSelectedQuickMsg(chip);
    if (chip === "Check your stock level") {
      setMessage(`Please check your current SIM inventory. We want to ensure your agents never run out of stock.`);
    } else if (chip === "Activate more SIMs today") {
      setMessage(`Let's push for more activations today! Check in with your agency partners to see where support is needed.`);
    } else if (chip === "You're near your target") {
      setMessage(`Great momentum! You are very close to achieving your monthly bonus tier. Keep it up!`);
    } else {
      setMessage("");
    }
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onOpenChange(false);
      onSuccess?.({
        scName,
        phone: scPhone,
        message: message || selectedQuickMsg,
      });
    }, 400);
  };

  const displayMessage = message || (selectedQuickMsg !== "Custom message" ? selectedQuickMsg : "your message here");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Contact SC"
      description={`${scName} · ${scState}`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* SC Profile Card */}
        <div
          className="flex items-center gap-3.5 rounded-2xl border p-4 shadow-xs"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.blues.interactiveCta,
            }}
          >
            {scInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className="text-sm font-bold truncate"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {scName}
            </h4>
            <p className="text-xs" style={{ color: APP_COLORS.texts.slate }}>
              {scPhone}
            </p>
            <p className="text-xs truncate" style={{ color: APP_COLORS.texts.slate }}>
              {scEmail}
            </p>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold">
              <span style={{ color: APP_COLORS.texts.slate }}>{scState}</span>
              <span style={{ color: APP_COLORS.texts.slate }}>•</span>
              <span
                className="inline-flex items-center gap-1"
                style={{
                  color:
                    scStatus === "Active"
                      ? APP_COLORS.greens.green
                      : scStatus === "At Risk"
                      ? APP_COLORS.ambers.amber
                      : APP_COLORS.reds.red,
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      scStatus === "Active"
                        ? APP_COLORS.greens.green
                        : scStatus === "At Risk"
                        ? APP_COLORS.ambers.amber
                        : APP_COLORS.reds.red,
                  }}
                />
                {scStatus}
              </span>
            </div>
          </div>
        </div>

        {/* 2 Big Action Cards: Call & WhatsApp */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Call Card */}
          <a
            href={`tel:${scPhone}`}
            className="flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition hover:shadow-sm"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <div
              className="flex size-12 items-center justify-center rounded-full mb-2"
              style={{
                backgroundColor: APP_COLORS.greens.light,
                color: APP_COLORS.greens.green,
              }}
            >
              <Phone className="size-6 stroke-[2.2]" />
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: APP_COLORS.texts.primary }}
            >
              Call
            </span>
            <span
              className="text-xs mt-0.5"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {scPhone}
            </span>
          </a>

          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/234${scPhone.replace(/\D/g, "").slice(-10)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition hover:shadow-sm"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <div
              className="flex size-12 items-center justify-center rounded-full mb-2"
              style={{
                backgroundColor: APP_COLORS.greens.light,
                color: APP_COLORS.greens.green,
              }}
            >
              <MessageSquare className="size-6 stroke-[2.2]" />
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: APP_COLORS.texts.primary }}
            >
              WhatsApp
            </span>
            <span
              className="text-xs mt-0.5"
              style={{ color: APP_COLORS.texts.slate }}
            >
              Send message
            </span>
          </a>
        </div>

        {/* Email Row Card */}
        <div
          className="flex items-center justify-between rounded-xl border p-3.5"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail
              className="size-4 shrink-0"
              style={{ color: APP_COLORS.blues.interactiveCta }}
            />
            <span
              className="text-xs font-medium truncate"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {scEmail}
            </span>
          </div>
          <a
            href={`mailto:${scEmail}`}
            className="text-xs font-bold shrink-0 transition hover:underline"
            style={{ color: APP_COLORS.blues.interactiveCta }}
          >
            Send Email
          </a>
        </div>

        {/* QUICK MESSAGE SECTION */}
        <div className="space-y-2 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Quick Message
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_MESSAGES.map((chip) => {
              const isSelected = selectedQuickMsg === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleSelectChip(chip)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.surface,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.primary,
                    border: `1px solid ${
                      isSelected
                        ? APP_COLORS.blues.interactiveCta
                        : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full rounded-2xl border p-3 text-xs focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />

          {/* Preview SMS */}
          <div className="space-y-0.5 pt-0.5">
            <p
              className="text-[11px] font-medium"
              style={{ color: APP_COLORS.texts.slate }}
            >
              Preview SMS:
            </p>
            <p
              className="text-xs italic"
              style={{ color: APP_COLORS.texts.primary }}
            >
              Hi {firstName}, {displayMessage}. — Yusuf (RM)
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-3">
          <button
            type="button"
            disabled={isSending}
            onClick={handleSend}
            className="w-full rounded-xl py-3 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSending ? "Sending SMS..." : "Send SMS"}
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full py-2 text-xs font-semibold transition hover:opacity-80"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default ContactScModal;
