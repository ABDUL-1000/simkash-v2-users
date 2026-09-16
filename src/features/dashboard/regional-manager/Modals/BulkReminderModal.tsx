import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface BulkReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: { targetGroup: string; message: string; count: number; channel: string }) => void;
}

type TargetGroupType = "at_risk" | "active" | "custom";
type ChannelType = "SMS" | "Push" | "Both";

interface ScReminderPreview {
  initials: string;
  name: string;
  state: string;
  progress: string;
  percent: number;
}

const AT_RISK_SCS: ScReminderPreview[] = [
  { initials: "IM", name: "Ibrahim Musa", state: "Rivers", progress: "421/500 (84%)", percent: 84 },
  { initials: "GE", name: "Glory Effah", state: "Kano", progress: "287/500 (57%)", percent: 57 },
  { initials: "AS", name: "Abubakar Sule", state: "Kebbi", progress: "247/500 (49%)", percent: 49 },
];

export function BulkReminderModal({
  open,
  onOpenChange,
  onSuccess,
}: BulkReminderModalProps) {
  const [targetGroup, setTargetGroup] = useState<TargetGroupType>("at_risk");
  const [channel, setChannel] = useState<ChannelType>("SMS");
  const [message, setMessage] = useState(
    "Hi [Name], you are currently at [X]% of your monthly bonus target. You have 15 days left to hit [Target] activations and earn ₦10,000! Push your APs harder. — Yusuf (RM)"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recipientCount = targetGroup === "at_risk" ? 3 : targetGroup === "active" ? 10 : 5;

  const handleInsertTag = (tag: string) => {
    setMessage((prev) => `${prev} ${tag}`);
  };

  const handleSend = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      const groupName =
        targetGroup === "at_risk"
          ? "At Risk SCs (3)"
          : targetGroup === "active"
          ? "All Active SCs (10)"
          : "Custom Selection";

      onSuccess?.({
        targetGroup: groupName,
        message,
        count: recipientCount,
        channel,
      });
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Send Bulk Bonus Reminder"
      description="Motivate your SCs to hit targets"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* SEND TO SELECTION */}
        <div className="space-y-2">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Send To
          </label>
          <div className="flex items-center gap-2">
            {[
              { key: "at_risk", label: "At Risk SCs (3)" },
              { key: "active", label: "All Active SCs (10)" },
              { key: "custom", label: "Custom Selection" },
            ].map((tgt) => {
              const isSelected = targetGroup === tgt.key;
              return (
                <button
                  key={tgt.key}
                  type="button"
                  onClick={() => setTargetGroup(tgt.key as TargetGroupType)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {tgt.label}
                </button>
              );
            })}
          </div>

          {/* SC Progress List Card */}
          <div
            className="rounded-2xl border divide-y overflow-hidden shadow-xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            {AT_RISK_SCS.map((sc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                    style={{
                      backgroundColor: APP_COLORS.blues.surfaceLight,
                      color: APP_COLORS.blues.interactiveCta,
                    }}
                  >
                    {sc.initials}
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold"
                      style={{ color: APP_COLORS.texts.primary }}
                    >
                      {sc.name}
                    </h4>
                    <p className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
                      {sc.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-bold"
                    style={{ color: APP_COLORS.texts.primary }}
                  >
                    {sc.progress}
                  </span>
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: APP_COLORS.greens.green }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-medium" style={{ color: APP_COLORS.texts.slate }}>
            {recipientCount} SCs will receive this reminder
          </p>
        </div>

        {/* MESSAGE SECTION */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-2xl border p-3 text-xs leading-relaxed focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {["[Name]", "[X]%", "[Target]", "[Days Left]"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleInsertTag(tag)}
                className="rounded-lg px-2 py-1 text-[11px] font-bold transition hover:bg-slate-200 cursor-pointer"
                style={{
                  backgroundColor: APP_COLORS.blues.surfaceLight,
                  color: APP_COLORS.blues.primary,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
            Variables are auto-filled per SC
          </p>
        </div>

        {/* DELIVERY CHANNEL */}
        <div className="flex items-center gap-2 pt-1">
          {(["SMS", "Push", "Both"] as ChannelType[]).map((ch) => {
            const isSelected = channel === ch;
            return (
              <button
                key={ch}
                type="button"
                onClick={() => setChannel(ch)}
                className="rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.backgrounds.background,
                  color: isSelected
                    ? APP_COLORS.texts.whiteFixed
                    : APP_COLORS.texts.slate,
                  border: `1px solid ${
                    isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                  }`,
                }}
              >
                {ch}
              </button>
            );
          })}
        </div>

        {/* SUMMARY CARD */}
        <div
          className="rounded-2xl border p-3.5 space-y-1"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <h4 className="text-xs font-bold" style={{ color: APP_COLORS.texts.primary }}>
            {recipientCount} personalised messages will be sent
          </h4>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
            <HelpCircle className="size-3.5 shrink-0 text-slate-400" />
            <span>Each SC sees their own name and specific progress percentage</span>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
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
            disabled={isSubmitting || !message.trim()}
            onClick={handleSend}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "#D97706" }}
          >
            {isSubmitting ? "Sending..." : `Send to ${recipientCount} SCs`}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default BulkReminderModal;
