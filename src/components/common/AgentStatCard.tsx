import React from "react";

export interface AgentStatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  subtitleColor?: string;
  badgeText?: string;
  badgeColor?: string;
  action?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AgentStatCard({
  title,
  value,
  subtitle,
  subtitleColor = "text-[#10B981]",
  badgeText,
  badgeColor = "bg-[#EBFFF8] text-[#10B981]",
  action,
  onClick,
  className = "",
}: AgentStatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs space-y-2.5 transition ${
        onClick ? "cursor-pointer hover:border-[#2563EB] hover:shadow-md" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#8C909B] truncate">{title}</span>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0F152A] font-sans break-words">
          {value}
        </h2>

        {subtitle && (
          <p className={`text-xs font-bold ${subtitleColor}`}>{subtitle}</p>
        )}
      </div>

      {badgeText && (
        <div className="pt-0.5">
          <span
            className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-extrabold ${badgeColor}`}
          >
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
}
