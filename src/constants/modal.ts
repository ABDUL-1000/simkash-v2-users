import type { CSSProperties } from "react";

import { MODAL_COLORS } from "@/constants/colors";
import type {
  AppModalActionVariant,
  AppModalSize,
} from "@/types/modal.types";

export const APP_MODAL_SIZE_CLASSES: Record<AppModalSize, string> = {
  sm: "sm:max-w-md",
  md: "sm:max-w-xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
  full: "sm:max-w-[calc(100vw-3rem)]",
};

export const APP_MODAL_ACTION_STYLES: Record<
  AppModalActionVariant,
  CSSProperties
> = {
  primary: {
    backgroundColor: MODAL_COLORS.primary,
    borderColor: MODAL_COLORS.primary,
    color: MODAL_COLORS.surface,
  },
  secondary: {
    backgroundColor: MODAL_COLORS.surface,
    borderColor: MODAL_COLORS.secondaryBorder,
    color: MODAL_COLORS.title,
  },
  success: {
    backgroundColor: MODAL_COLORS.successBackground,
    borderColor: MODAL_COLORS.successBackground,
    color: MODAL_COLORS.successText,
  },
  danger: {
    backgroundColor: MODAL_COLORS.dangerBackground,
    borderColor: MODAL_COLORS.dangerBackground,
    color: MODAL_COLORS.dangerText,
  },
  text: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    color: MODAL_COLORS.primary,
    boxShadow: "none",
  },
};
