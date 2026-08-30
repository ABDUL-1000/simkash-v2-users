import type { ReactNode } from "react";
import { SIM_DETAILS_COLORS } from "@/constants/colors";

export function SectionCard({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: SIM_DETAILS_COLORS.cardHeaderBorder }}>
      <div className="flex items-center justify-between px-5 py-4 sm:px-6" style={{ backgroundColor: SIM_DETAILS_COLORS.cardHeaderBg }}>
        <div>
          <p className="text-base font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
            {title}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-sm" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
              {subtitle}
            </p>
          )}
        </div>
        {right}
      </div>
      <div className="bg-white p-5 sm:p-6">{children}</div>
    </div>
  );
}