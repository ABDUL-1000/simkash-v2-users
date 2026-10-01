import React from "react";
import { Empty, Button } from "antd";
import { colors } from "@/constants/colors";

export interface AppEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  image?: React.ReactNode;
  icon?: React.ReactNode;
  simple?: boolean;
  className?: string;
  actionVariant?: "primary" | "default" | "dashed" | "link" | "text";
}

export const AppEmptyState: React.FC<AppEmptyStateProps> = ({
  title = "No Data Found",
  description = "There are no records to display at this time.",
  actionText,
  onAction,
  image,
  icon,
  simple = true,
  className = "",
  actionVariant = "primary",
}) => {
  const emptyImage = icon ? (
    <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-[#F0F4F9] text-[#2563EB]">
      {icon}
    </div>
  ) : image !== undefined ? (
    image
  ) : simple ? (
    Empty.PRESENTED_IMAGE_SIMPLE
  ) : (
    Empty.PRESENTED_IMAGE_DEFAULT
  );

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <Empty
        image={emptyImage}
        description={
          <div className="mt-2 space-y-1">
            {title && (
              <p
                className="text-sm font-semibold"
                style={{ color: colors.textPrimary || "#0F152A" }}
              >
                {title}
              </p>
            )}
            {description && (
              <p
                className="mx-auto max-w-sm text-xs"
                style={{ color: colors.textSecondary || "#66738C" }}
              >
                {description}
              </p>
            )}
          </div>
        }
      >
        {actionText && onAction && (
          <Button
            type={actionVariant}
            onClick={onAction}
            className="mt-3 h-9 rounded-xl px-5 text-xs font-semibold shadow-xs"
            style={{
              backgroundColor:
                actionVariant === "primary"
                  ? colors.primary || "#2563EB"
                  : undefined,
              borderColor:
                actionVariant === "primary"
                  ? colors.primary || "#2563EB"
                  : undefined,
            }}
          >
            {actionText}
          </Button>
        )}
      </Empty>
    </div>
  );
};
