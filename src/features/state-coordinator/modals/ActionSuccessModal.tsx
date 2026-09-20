import React from "react";
import { CheckCircle2, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface DetailItem {
  label: string;
  value: React.ReactNode;
}

interface ActionSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  badgeText?: string;
  iconType?: "check" | "shield" | "trophy" | "sparkles";
  details?: DetailItem[];
  primaryButtonText?: string;
  onPrimaryAction?: () => void;
  secondaryButtonText?: string;
  onSecondaryAction?: () => void;
}

export function ActionSuccessModal({
  open,
  onOpenChange,
  title,
  subtitle,
  badgeText,
  iconType = "check",
  details = [],
  primaryButtonText = "Done",
  onPrimaryAction,
  secondaryButtonText,
  onSecondaryAction,
}: ActionSuccessModalProps) {
  const handleClose = () => {
    onOpenChange(false);
    onPrimaryAction?.();
  };

  const renderIcon = () => {
    switch (iconType) {
      case "shield":
        return <ShieldCheck className="size-10 text-[#10B981]" />;
      case "trophy":
        return <Trophy className="size-10 text-[#F59E0B]" />;
      case "sparkles":
        return <Sparkles className="size-10 text-[#7C3AED]" />;
      default:
        return <CheckCircle2 className="size-10 text-[#10B981]" />;
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Soft Circular Icon */}
        <div className="flex size-18 items-center justify-center rounded-full bg-[#EBFFF8] p-3 text-[#10B981] shadow-xs">
          {renderIcon()}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-[#0F152A]">{title}</h2>
          {subtitle && (
            <p className="text-xs font-medium text-[#66738C] max-w-xs mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {badgeText && (
            <div className="pt-1">
              <span className="inline-block rounded-full bg-[#EBFFF8] px-3 py-1 text-[11px] font-extrabold text-[#10B981]">
                {badgeText}
              </span>
            </div>
          )}
        </div>

        {/* Details Table */}
        {details.length > 0 && (
          <div className="w-full divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-left">
            {details.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 text-xs first:pt-0 last:pb-0"
              >
                <span className="text-[#8C909B] font-medium">{item.label}</span>
                <span className="font-bold text-[#0F152A]">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="w-full space-y-2 pt-2 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-extrabold text-white shadow-xs hover:bg-blue-700 transition"
          >
            {primaryButtonText}
          </button>
          {secondaryButtonText && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onSecondaryAction?.();
              }}
              className="w-full py-2 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </AppModal>
  );
}
