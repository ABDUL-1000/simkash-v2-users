import React from "react";

export type EntityBadgeVariant =
  | "success"
  | "info"
  | "warning"
  | "amber"
  | "purple"
  | "danger"
  | "gray";

export type EntityBadge = {
  label: string;
  variant?: EntityBadgeVariant;
};

export type EntityActionVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "amber"
  | "purple";

export type EntityAction = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  variant?: EntityActionVariant;
  onClick?: () => void;
};

export type EntityDetailsHeaderProps = {
  name: string;
  phone?: string;
  location?: string;
  role?: string;
  avatarInitials?: string;
  avatarBg?: string;
  badges?: EntityBadge[];
  actions?: EntityAction[];
};

export function EntityDetailsHeader({
  name,
  phone,
  location,
  role,
  avatarInitials,
  avatarBg = "#2563EB",
  badges = [],
  actions = [],
}: EntityDetailsHeaderProps) {
  const initials =
    avatarInitials ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const subtitleParts = [phone, location, role].filter(Boolean);

  const getBadgeStyle = (variant: EntityBadgeVariant = "info") => {
    switch (variant) {
      case "success":
        return "border border-[#A7F3D0] bg-[#ECFDF5] text-[#059669]";
      case "info":
        return "border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]";
      case "amber":
      case "warning":
        return "border border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]";
      case "purple":
        return "border border-[#E9D5FF] bg-[#F3E8FF] text-[#9333EA]";
      case "danger":
        return "border border-[#FECACA] bg-[#FFF1F2] text-[#DC2626]";
      case "gray":
      default:
        return "bg-[#F1F5F9] text-[#64748B]";
    }
  };

  const getActionButtonStyle = (variant: EntityActionVariant = "primary") => {
    switch (variant) {
      case "primary":
        return "bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-xs font-bold";
      case "purple":
        return "bg-[#9333EA] text-white hover:bg-[#7E22CE] shadow-xs font-bold";
      case "amber":
        return "border border-[#FDE68A] bg-[#FFFBEB] text-[#92400E] hover:bg-[#FEF3C7] font-bold";
      case "danger":
        return "border border-[#FECACA] bg-[#FFF1F2] text-[#DC2626] hover:bg-[#FEE2E2] font-bold";
      case "outline":
        return "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] font-bold";
      case "secondary":
      default:
        return "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] font-bold";
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
      {/* Left Avatar & Info */}
      <div className="flex items-center gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-xs"
          style={{ backgroundColor: avatarBg }}
        >
          {initials}
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold text-[#0F172A]">{name}</h1>
            {badges.map((b, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold whitespace-nowrap ${getBadgeStyle(
                  b.variant
                )}`}
              >
                {b.label}
              </span>
            ))}
          </div>

          {subtitleParts.length > 0 && (
            <p className="mt-1 text-xs font-medium text-[#64748B]">
              {subtitleParts.join(" · ")}
            </p>
          )}
        </div>
      </div>

      {/* Right Action Buttons */}
      {actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {actions.map((act) => (
            <button
              key={act.key}
              type="button"
              onClick={act.onClick}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all ${getActionButtonStyle(
                act.variant
              )}`}
            >
              {act.icon}
              <span>{act.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
