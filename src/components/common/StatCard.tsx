import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  iconColor?: string;
  decorationColor?: string;
  description?: string;
  trend?: number;
  trendType?: "positive" | "negative" | "neutral";
  trendBackgroundColor?: string;
  trendColor?: string;
  loading?: boolean;
  onClick?: () => void;
};

const defaultTrendColors = {
  positive: { background: "#D1FAE5", foreground: "#047857" },
  negative: { background: "#FEE2E2", foreground: "#DC2626" },
  neutral: { background: "#E2E8F0", foreground: "#475569" },
} as const;

export function StatCard({
  title,
  value,
  icon,
  iconBackgroundColor = "#E8EEFC",
  iconColor = "#2563EB",
  decorationColor = "#F1F5FD",
  description,
  trend,
  trendType = "neutral",
  trendBackgroundColor,
  trendColor,
  loading,
  onClick,
}: StatCardProps) {
  const TrendIcon =
    trendType === "positive"
      ? ArrowUp
      : trendType === "negative"
        ? ArrowDown
        : ArrowRight;
  const trendColors = defaultTrendColors[trendType];
  const cardStyle = {
    "--stat-icon-background": iconBackgroundColor,
    "--stat-icon-color": iconColor,
    "--stat-decoration": decorationColor,
  } as CSSProperties;

  return (
    <Card
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) onClick();
      }}
      className={cn(
        "relative overflow-hidden rounded-xl border-[#E2E8F0] bg-white shadow-none transition-shadow",
        onClick && "cursor-pointer hover:shadow-md",
      )}
      style={cardStyle}
    >
      <span
        className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full bg-[var(--stat-decoration)]"
        aria-hidden="true"
      />

      <CardContent className="relative z-10 p-5 sm:p-6">
        {loading ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="size-12 rounded-xl" />
              <Skeleton className="h-9 w-20 rounded-xl" />
            </div>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        ) : (
          <>
            <div className="flex min-h-12 items-start justify-between gap-4">
              {icon && (
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--stat-icon-background)] text-[var(--stat-icon-color)] [&_svg]:size-6">
                  {icon}
                </div>
              )}

              {trend !== undefined && (
                <div
                  className="ml-auto inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 text-sm font-bold"
                  style={{
                    backgroundColor:
                      trendBackgroundColor ?? trendColors.background,
                    color: trendColor ?? trendColors.foreground,
                  }}
                >
                  <TrendIcon className="size-4" />
                  {Math.abs(trend)}%
                </div>
              )}
            </div>

            <p className="mt-5 text-3xl font-bold leading-none tracking-tight text-[#202020]">
              {value}
            </p>
            <p className="mt-2 text-sm font-medium text-[#939393]">{title}</p>

            {description && (
              <>
                <div className="my-4 h-px bg-[#E2ECF8]" />
                <p className="text-sm leading-6 text-[#939393]">
                  {description}
                </p>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{children}</div>
  );
}
