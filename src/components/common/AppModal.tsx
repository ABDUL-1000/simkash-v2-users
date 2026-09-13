import type { ReactNode } from "react";
import { Modal, Button } from "antd";
import { APP_MODAL_ACTION_STYLES } from "@/constants/modal";
import type { AppModalAction, AppModalSize } from "@/types/modal.types";

const SIZE_WIDTH: Record<AppModalSize, number | string> = {
  sm: "min(420px, calc(100vw - 1rem))",
  md: "min(560px, calc(100vw - 1rem))",
  lg: "min(720px, calc(100vw - 1rem))",
  xl: "min(960px, calc(100vw - 1rem))",
  full: "calc(100vw - 2rem)",
};

type AppModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  descriptionColor?: string;
  children: ReactNode;
  size?: AppModalSize;
  actions?: AppModalAction[];
  footer?: ReactNode;
  showCloseButton?: boolean;
};

export function AppModal({
  open,
  onOpenChange,
  title,
  description,
  descriptionColor = "#64748B",
  children,
  size = "md",
  actions = [],
  footer,
  showCloseButton = true,
}: AppModalProps) {
  const hasFooter = footer !== undefined ? footer !== null : actions.length > 0;

  return (
    <Modal
      open={open}
      onCancel={() => onOpenChange(false)}
      closable={showCloseButton}
      centered
      width={SIZE_WIDTH[size]}
      styles={{
        body: {
          maxHeight: "calc(100vh - 9rem)",
          overflowY: "auto",
        },
      }}
      title={
        <div>
          <p className="text-lg font-bold text-[#0F1F36] sm:text-xl">{title}</p>
          {description && (
            <p className="mt-1 text-sm font-normal sm:text-base" style={{ color: descriptionColor }}>{description}</p>
          )}
        </div>
      }
      footer={
        !hasFooter
          ? null
          : footer !== undefined
            ? footer
            : actions.map((action) => {
                const variant = action.variant ?? "primary";
                const style = APP_MODAL_ACTION_STYLES[variant];

                return (
                  <Button
                    key={action.key}
                    type={variant === "text" ? "text" : "default"}
                    htmlType={action.htmlType ?? "button"}
                    form={action.form}
                    icon={action.icon}
                    loading={action.loading}
                    disabled={action.disabled}
                    onClick={() => {
                      action.onClick?.();
                      if (action.closeOnClick) onOpenChange(false);
                    }}
                    className={action.className}
                    style={{ ...style, ...action.style }}
                  >
                    {action.label}
                  </Button>
                );
              })
      }
    >
      {children}
    </Modal>
  );
}
