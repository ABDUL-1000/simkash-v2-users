import type { ReactNode } from "react";
import { ADMIN_ACTIONS_COLORS, SIM_DETAILS_COLORS } from "@/constants/colors";

export type ActionButtonTone = "primary" | "warning" | "danger" | "notify";

export function ActionButton({
  icon,
  label,
  onClick,
  tone = "primary",
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  tone?: ActionButtonTone;
}) {
  const styles: Record<ActionButtonTone, { bg: string; text: string; border?: string }> = {
    primary: { bg: "#2563EB", text: "#FFFFFF" },
    warning: { bg: "#FEF3C7", text: "#92400E" },
    danger: { bg: "#FEE2E2", text: "#DC2626" },
    notify: { bg: ADMIN_ACTIONS_COLORS.notifyBg, text: SIM_DETAILS_COLORS.valueDark, border: ADMIN_ACTIONS_COLORS.notifyBorder },
  };
  const s = styles[tone];

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-opacity hover:opacity-90"
      style={{ backgroundColor: s.bg, color: s.text, border: s.border ? `1px solid ${s.border}` : undefined }}
    >
      {icon}
      {label}
    </button>
  );
}