import type { CSSProperties } from "react";
import { colors } from "@/constants/colors";
export const rmDesignTokens = {
  "--rm-border": colors.border, "--rm-muted": colors.texts.muted, "--rm-ink": colors.textPrimary,
  "--rm-navy": colors.blues.primary, "--rm-blue": colors.primary, "--rm-base": colors.backgrounds.base,
  "--rm-white": colors.backgrounds.background, "--rm-green": colors.success,
} as CSSProperties;
