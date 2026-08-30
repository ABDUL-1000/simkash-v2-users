import type { CSSProperties, ReactNode } from "react";

export type AppModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type AppModalActionVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "text";                                                                     

export type AppModalAction = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: AppModalActionVariant;
  loading?: boolean;
  disabled?: boolean;
  closeOnClick?: boolean;
  htmlType?: "button" | "submit" | "reset";
  form?: string;
  className?: string;
  style?: CSSProperties;
};
