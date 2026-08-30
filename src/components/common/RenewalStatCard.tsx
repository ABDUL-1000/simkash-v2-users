import type { ReactNode } from "react";
import { RENEWAL_STAT_COLORS } from "@/constants/colors";

export type RenewalStatCardVariant = "critical" | "warning" | "watch";

export type RenewalStatCardProps = {
  variant?: RenewalStatCardVariant;
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  icon: ReactNode;
  customColors?: {
    bg?: string;
    border?: string;
    iconBg?: string;
    icon?: string;
    badgeBg?: string;
    badgeText?: string;
    value?: string;
    title?: string;
    subtitle?: string;
  };
};

export function RenewalStatCard({
  variant = "critical",
  title,
  value,
  subtitle,
  badge,
  icon,
  customColors,
}: RenewalStatCardProps) {
  const colorTheme = RENEWAL_STAT_COLORS[variant];

  const bg = customColors?.bg ?? colorTheme.bg;
  const border = customColors?.border ?? colorTheme.border;
  const iconBg = customColors?.iconBg ?? colorTheme.iconBg;
  const iconColor = customColors?.icon ?? colorTheme.icon;
  const badgeBg = customColors?.badgeBg ?? colorTheme.badgeBg;
  const badgeText = customColors?.badgeText ?? colorTheme.badgeText;
  const valueColor = customColors?.value ?? colorTheme.value;
  const titleColor = customColors?.title ?? colorTheme.title;
  const subtitleColor = customColors?.subtitle ?? colorTheme.subtitle;

  return (
    <div
      className="flex flex-col justify-between rounded-2xl border-l-2 border p-5 transition-shadow hover:shadow-sm"
      style={{ backgroundColor: bg, borderColor: border }}
    >
      {/* Top row: Icon & Badge */}
      <div className="flex items-center justify-between gap-2">
        <div
          className="flex p-3 size-10 items-center justify-center rounded-lg font-bold"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
            style={{ backgroundColor: badgeBg, color: badgeText }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Middle row: Large Value */}
      <div className="mt-3 mb-1">
        <span className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: valueColor }}>
          {value}
        </span>
      </div>

      {/* Bottom row: Title & Subtitle */}
      <div>
        <h3 className="text-sm font-bold leading-snug" style={{ color: titleColor }}>
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-xs font-medium leading-relaxed" style={{ color: subtitleColor }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export function RenewalStatsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
