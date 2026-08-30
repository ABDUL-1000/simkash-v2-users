import type { ReactNode } from "react";
import { Button } from "antd";

export type PageHeaderAction = {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: PageHeaderAction[];
};

export function PageHeader({
  title,
  description,
  actions = [],
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-lg font-bold tracking-tight text-[#0F1F36] sm:text-[16px]">
          {title}
        </p>
        {description && (
          <p className="text-[11px] text-[#64748B] ">
            {description}
          </p>
        )}
      </div>

      {actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => {
            const isPrimary =
              action.variant === undefined || action.variant === "default";
            const isGhost = action.variant === "ghost";
            const isDestructive = action.variant === "destructive";

            return (
              <Button
                key={action.key}
                type={isPrimary ? "primary" : isGhost ? "text" : "default"}
                danger={isDestructive}
                icon={action.icon}
                loading={action.loading}
                disabled={action.disabled}
                onClick={action.onClick}
                className="h-10 rounded-lg px-4 text-[11px] font-medium"
                style={
                  isPrimary
                    ? {
                        backgroundColor: "#2563EB",
                        borderColor: "#2563EB",
                        color: "#FFFFFF",
                      }
                    : isGhost || isDestructive
                      ? undefined
                      : {
                          backgroundColor: "#FFFFFF",
                          borderColor: "#C7DAFC",
                          color: "#0F1F36",
                        }
                }
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
