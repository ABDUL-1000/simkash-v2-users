import React from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

export interface CaSuccessDetailItem {
  label: string;
  value: React.ReactNode;
}

interface CaSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subtitle?: string;
  details?: CaSuccessDetailItem[];
  doneButtonText?: string;
  onDone?: () => void;
}

export function CaSuccessModal({
  open,
  onOpenChange,
  title = "Action Successful!",
  subtitle,
  details = [],
  doneButtonText = "Done",
  onDone,
}: CaSuccessModalProps) {
  const handleClose = () => {
    onOpenChange(false);
    onDone?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      description=""
      size="md"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4">
        {/* Soft Green Checkmark Icon Container */}
        <div
          className="flex size-20 items-center justify-center rounded-full"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            color: APP_COLORS.greens.green,
          }}
        >
          <Check className="size-10 stroke-[3]" />
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-sm font-normal max-w-sm mx-auto leading-relaxed"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Structured Details Card (Key-Value Grid) */}
        {details.length > 0 && (
          <div
            className="w-full rounded-2xl border p-4 space-y-2.5 text-left text-xs"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderColor: APP_COLORS.greys.stroke,
            }}
          >
            {details.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <span
                  className="font-medium"
                  style={{ color: APP_COLORS.texts.slate }}
                >
                  {item.label}
                </span>
                <span
                  className="font-semibold text-right"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Done Action Button */}
        <div className="w-full pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95 active:scale-[0.99]"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {doneButtonText}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
