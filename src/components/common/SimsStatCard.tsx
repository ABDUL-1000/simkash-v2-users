import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { NETWORK_COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";

export type SimStatCardAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type SimStatCardProps = {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  iconColor?: string;
  network?: keyof typeof NETWORK_COLORS;
  networkLabel?: string;
  label?: string;
  labelIcon?: ReactNode;
  labelColor?: string;
  valueColor?: string;
  description?: string;
  action?: SimStatCardAction;
  loading?: boolean;
  onClick?: () => void;
};

export function SimStatCard({
  title,
  value,
  icon,
  iconBackgroundColor = "#E8EEFC",
  iconColor = "#2563EB",
  network,
  networkLabel,
  label,
  labelIcon,
  labelColor = "#475569",
  valueColor = "#0F1F36",
  description,
  action,
  loading,
  onClick,
}: SimStatCardProps) {
  const networkColor = network ? NETWORK_COLORS[network] : undefined;

  const cardStyle = {
    "--stat-icon-background": iconBackgroundColor,
    "--stat-icon-color": iconColor,
    "--stat-network-background": networkColor?.bg,
    "--stat-network-border": networkColor?.border,
    "--stat-network-color": networkColor?.text,
    "--stat-value-color": valueColor,
  } as CSSProperties;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) onClick();
      }}
      className={cn(
        "relative min-h-[11rem] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow",
        onClick && "cursor-pointer hover:shadow-md",
      )}
      style={cardStyle}
    >
      <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
        {loading ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="size-12 rounded-xl" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        ) : (
          <>
            <div className="mb-5 flex  items-start justify-between gap-3">
              {network ? (
                <div className="grid  shrink-0 place-items-center rounded-sm border border-[var(--stat-network-border)] bg-[var(--stat-network-background)] p-2 text-[10px] font-bold text-[var(--stat-network-color)] ">
                  {networkLabel ?? network.toUpperCase()}
                </div>
              ) : icon ? (
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[var(--stat-icon-background)] text-[var(--stat-icon-color)] [&_svg]:size-6">
                  {icon}
                </div>
              ) : (
                <span />
              )}

              {label && (
                <div
                  className="ml-auto inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold"
                  style={{ color: labelColor }}
                >
                  {labelIcon}
                  {label}
                </div>
              )}
            </div>

            <div className="">
              <p
                className="text-xl font-bold leading-none tracking-tight sm:text-xl"
                style={{ color: "var(--stat-value-color)" }}
              >
                {value}
              </p>
              <p className=" text-[10px] font-medium text-[#64748B]">
                {title}
              </p>
            </div>

            {(description || action) && (
              <>
                <div className="my-5 h-px bg-[#E2ECF8]" />
                {action ? (
                  action.href ? (
                    <a
                      href={action.href}
                      className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#2563EB] hover:underline"
                    >
                      {action.label}
                      <ArrowRight className="size-4" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        action.onClick?.();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:underline"
                    >
                      {action.label}
                      <ArrowRight className="size-4" />
                    </button>
                  )
                ) : (
                  <p className="text-[10px] leading-6 text-[#94A3B8]">
                    {description}
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export type SimStatsGridCols = 2 | 3 | 4 | 5 | 6;

const colsClassMap: Record<SimStatsGridCols, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 xl:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
  5: "sm:grid-cols-2 xl:grid-cols-5",
  6: "sm:grid-cols-2 xl:grid-cols-6",
};

export function SimStatsGrid({
  children,
  cols = 5,
  className,
}: {
  children: ReactNode;
  cols?: SimStatsGridCols;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", colsClassMap[cols], className)}>
      {children}
    </div>
  );
}
