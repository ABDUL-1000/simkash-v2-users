export const APP_COLORS = {
  backgrounds: {
    background: "#FFFFFF",
    base: "#F7F9FC",
    backgroundLight: "#FAFAFA",
    surface: "#F8FAFC",
  },
  blues: {
    primary: "#1F3A5F",
    secondary: "#2E5FA0",
    interactiveCta: "#2563EB",
    surfaceLight: "#EFF4F8",
    surfaceMid: "#D0DFF0",
    accent: "#2450F6",
  },
  greens: {
    green: "#10B981",
    primary: "#9DF8DA",
    light: "#EBFFF8",
    secondary: "#21B86B",
  },
  reds: {
    red: "#EF4444",
    primary: "#F7D2D7",
    light: "#FFF7F8",
    secondary: "#E53333",
  },
  ambers: {
    amber: "#F59E0B",
    light: "#FCEEC1",
    secondary: "#D9990D",
  },
  texts: {
    primary: "#0F152A",
    secondary: "#939393",
    light: "#C6C6C6",
    light2: "#F0ECEC",
    whiteFixed: "#FFFFFF",
    blackFixed: "#1A1A1A",
    slate: "#66738C",
    muted: "#8C909B",
  },
  icons: {
    primary: "#0F152A",
    secondary: "#939393",
    light: "#C6C6C6",
    light2: "#F0ECEC",
    whiteFixed: "#FFFFFF",
    blackFixed: "#1A1A1A",
    slate: "#66738C",
    muted: "#8C909B",
  },
  greys: {
    primary: "#0F152A",
    secondary: "#939393",
    light: "#C6C6C6",
    light2: "#F0ECEC",
    whiteFixed: "#FFFFFF",
    blackFixed: "#1A1A1A",
    stroke: "#E2ECF6",
    slate: "#66738C",
    strokeLight: "#94A2B8",
    divider: "#CCD1DE",
  },
} as const;

export const COLORS = APP_COLORS;
export const colors = {
  ...APP_COLORS,
  primary: APP_COLORS.blues.interactiveCta,
  border: APP_COLORS.greys.stroke,
  success: APP_COLORS.greens.green,
  warning: APP_COLORS.ambers.amber,
  danger: APP_COLORS.reds.red,
  textPrimary: APP_COLORS.texts.primary,
  textSecondary: APP_COLORS.texts.slate,
};

// Minimal direct flat color constants
export const background = APP_COLORS.backgrounds.background;
export const baseBackground = APP_COLORS.backgrounds.base;
export const backgroundLight = APP_COLORS.backgrounds.backgroundLight;
export const surface = APP_COLORS.backgrounds.surface;

export const primaryBlue = APP_COLORS.blues.primary;
export const secondaryBlue = APP_COLORS.blues.secondary;
export const interactiveCta = APP_COLORS.blues.interactiveCta;
export const surfaceLightBlue = APP_COLORS.blues.surfaceLight;
export const surfaceMidBlue = APP_COLORS.blues.surfaceMid;
export const accentBlue = APP_COLORS.blues.accent;

export const green = APP_COLORS.greens.green;
export const primaryGreen = APP_COLORS.greens.primary;
export const lightGreen = APP_COLORS.greens.light;
export const secondaryGreen = APP_COLORS.greens.secondary;

export const red = APP_COLORS.reds.red;
export const primaryRed = APP_COLORS.reds.primary;
export const lightRed = APP_COLORS.reds.light;
export const secondaryRed = APP_COLORS.reds.secondary;

export const amber = APP_COLORS.ambers.amber;
export const lightAmber = APP_COLORS.ambers.light;
export const secondaryAmber = APP_COLORS.ambers.secondary;

export const textPrimary = APP_COLORS.texts.primary;
export const textSecondary = APP_COLORS.texts.secondary;
export const textLight = APP_COLORS.texts.light;
export const textSlate = APP_COLORS.texts.slate;
export const textMuted = APP_COLORS.texts.muted;

export const greyStroke = APP_COLORS.greys.stroke;
export const greyDivider = APP_COLORS.greys.divider;

// Backwards-compatibility mappings for existing admin sub-components
export const HELPFUL_COLORS = {
  pending: APP_COLORS.ambers.amber,
  credit: APP_COLORS.greens.green,
  success: APP_COLORS.greens.green,
  completed: APP_COLORS.greens.green,
  approved: APP_COLORS.greens.green,
  debit: APP_COLORS.reds.red,
  failed: APP_COLORS.reds.red,
  rejected: APP_COLORS.reds.red,
  active: APP_COLORS.blues.interactiveCta,
  inactive: APP_COLORS.greys.secondary,
  suspended: APP_COLORS.reds.red,
  processing: APP_COLORS.ambers.amber,
  neutral: APP_COLORS.greys.slate,
  in_stock: APP_COLORS.greens.green,
  assigned: APP_COLORS.blues.interactiveCta,
  activated: APP_COLORS.greens.green,
  expired: APP_COLORS.reds.red,
};

export const ECOLOR: Record<string, string> = HELPFUL_COLORS;

export const SIDEBAR_COLORS = {
  gradientStart: APP_COLORS.backgrounds.background,
  gradientMiddle: APP_COLORS.backgrounds.background,
  gradientEnd: APP_COLORS.backgrounds.background,
  adminBorder: APP_COLORS.greys.stroke,
  adminText: APP_COLORS.blues.interactiveCta,
  overviewBorder: APP_COLORS.blues.interactiveCta,
  overviewBackground: APP_COLORS.blues.surfaceLight,
  simHubBorder: "transparent",
  simHubBackground: APP_COLORS.blues.surfaceLight,
  badgeBackground: APP_COLORS.blues.surfaceLight,
  badgeText: APP_COLORS.blues.interactiveCta,
  subNavigationActiveBackground: APP_COLORS.blues.surfaceLight,
  subNavigationActiveText: APP_COLORS.blues.interactiveCta,
  foreground: APP_COLORS.texts.primary,
  mutedForeground: APP_COLORS.texts.slate,
  subtleForeground: APP_COLORS.texts.secondary,
  divider: APP_COLORS.greys.divider,
  danger: APP_COLORS.reds.red,
} as const;

export const DASHBOARD_COLORS = {
  kpiStripBackground: APP_COLORS.blues.primary,
} as const;

export const TEXT_COLORS = {
  ash: APP_COLORS.texts.slate,
  white: APP_COLORS.texts.whiteFixed,
} as const;

export const CARD_COLORS = {
  background: APP_COLORS.backgrounds.background,
  border: APP_COLORS.greys.stroke,
  title: APP_COLORS.texts.primary,
  description: APP_COLORS.texts.slate,
} as const;

export const FEATURE_ICON_COLORS = {
  blue: { icon: APP_COLORS.blues.interactiveCta, background: APP_COLORS.blues.surfaceLight },
  purple: { icon: "#7C3AED", background: "#F1EAFE" },
  green: { icon: APP_COLORS.greens.green, background: APP_COLORS.greens.light },
} as const;

export const GRADIENTS = {
  simSearchCard: `linear-gradient(180deg, ${APP_COLORS.blues.primary} 0%, ${APP_COLORS.blues.secondary} 100%)`,
} as const;

export const CHART_COLORS = {
  mtn: "#DBEAFE",
  airtel: "#FEE2E2",
  glo: "#D1FAE5",
  t2: "#FEF9C3",
} as const;

export const MODAL_COLORS = {
  overlay: APP_COLORS.texts.primary + "80",
  surface: APP_COLORS.backgrounds.background,
  border: APP_COLORS.greys.stroke,
  title: APP_COLORS.texts.primary,
  description: APP_COLORS.texts.slate,
  primary: APP_COLORS.blues.interactiveCta,
  secondaryBorder: APP_COLORS.blues.surfaceMid,
  successBackground: APP_COLORS.greens.light,
  successText: APP_COLORS.greens.green,
  dangerBackground: APP_COLORS.reds.light,
  dangerText: APP_COLORS.reds.red,
} as const;

export const RENEW_MODAL_COLORS = {
  infoBg: APP_COLORS.blues.surfaceLight,
  planActiveBg: APP_COLORS.blues.surfaceLight,
  expiryText: APP_COLORS.greens.green,
} as const;

export const NETWORK_ACTIVE_COLORS = {
  background: APP_COLORS.blues.primary,
  border: APP_COLORS.blues.primary,
  text: APP_COLORS.texts.whiteFixed,
} as const;

export const NETWORK_COLORS = {
  mtn: {
    bg: "#FFFBEB",
    border: "#FDE68A",
    text: "#854D0E",
    bar: "#FBBF24",
  },
  airtel: {
    bg: "#FFF1F2",
    border: "#FECACA",
    text: "#991B1B",
    bar: APP_COLORS.reds.red,
  },
  glo: {
    bg: "#F0FDF4",
    border: "#A7F3D0",
    text: "#065F46",
    bar: APP_COLORS.greens.green,
  },
  t2: {
    bg: "#EFF6FF",
    border: "#BFDBFE",
    text: "#1E40AF",
    bar: APP_COLORS.blues.interactiveCta,
  },
} as const;

export const SIM_DETAILS_COLORS = {
  activatedBg: APP_COLORS.greens.light,
  activatedText: APP_COLORS.greens.green,
  tabActive: APP_COLORS.blues.interactiveCta,
  tabInactive: APP_COLORS.texts.slate,
  labelMuted: APP_COLORS.texts.slate,
  labelFaint: APP_COLORS.texts.secondary,
  valueDark: APP_COLORS.texts.primary,
  danger: APP_COLORS.reds.red,
  cardHeaderBg: APP_COLORS.backgrounds.surface,
  cardHeaderBorder: APP_COLORS.greys.stroke,
  innerCardBg: APP_COLORS.backgrounds.surface,
  innerCardBorder: APP_COLORS.greys.stroke,
} as const;

export const SIM_DATA_USAGE_COLORS = {
  primary: APP_COLORS.blues.interactiveCta,
  ringTrack: APP_COLORS.greys.stroke,
  mutedBar: APP_COLORS.greys.strokeLight,
  success: APP_COLORS.greens.green,
  alertText: APP_COLORS.texts.primary,
} as const;

export const CHAIN_NODE_COLORS = {
  redBg: APP_COLORS.reds.light,
  purpleBg: "#EDE9FE",
  purpleText: "#5B21B6",
} as const;

export const EVENT_HISTORY_COLORS = {
  yellowBg: APP_COLORS.ambers.light,
  goldenText: APP_COLORS.ambers.secondary,
} as const;

export const ADMIN_ACTIONS_COLORS = {
  notifyBg: APP_COLORS.backgrounds.surface,
  notifyBorder: APP_COLORS.greys.stroke,
} as const;

export const CRITICAL_ALERT_COLORS = {
  bg: APP_COLORS.reds.light,
  border: APP_COLORS.reds.primary,
  text: APP_COLORS.reds.secondary,
  bannerBg: APP_COLORS.ambers.light,
  bannerText: APP_COLORS.ambers.secondary,
  button: APP_COLORS.reds.red,
} as const;

export const RENEWAL_STAT_COLORS = {
  critical: {
    bg: APP_COLORS.reds.light,
    border: APP_COLORS.reds.red,
    iconBg: APP_COLORS.reds.primary,
    icon: APP_COLORS.reds.red,
    badgeBg: APP_COLORS.reds.primary,
    badgeText: APP_COLORS.reds.red,
    value: APP_COLORS.reds.red,
    title: APP_COLORS.texts.primary,
    subtitle: APP_COLORS.texts.slate,
  },
  warning: {
    bg: "#FFFBEB",
    border: APP_COLORS.ambers.amber,
    iconBg: APP_COLORS.ambers.light,
    icon: APP_COLORS.ambers.amber,
    badgeBg: APP_COLORS.ambers.light,
    badgeText: APP_COLORS.ambers.secondary,
    value: APP_COLORS.ambers.amber,
    title: APP_COLORS.texts.primary,
    subtitle: APP_COLORS.texts.slate,
  },
  watch: {
    bg: APP_COLORS.blues.surfaceLight,
    border: APP_COLORS.blues.interactiveCta,
    iconBg: APP_COLORS.blues.surfaceMid,
    icon: APP_COLORS.blues.interactiveCta,
    badgeBg: APP_COLORS.blues.surfaceMid,
    badgeText: APP_COLORS.blues.primary,
    value: APP_COLORS.blues.interactiveCta,
    title: APP_COLORS.texts.primary,
    subtitle: APP_COLORS.texts.slate,
  },
} as const;

export const AUTOMATED_SCHEDULE_COLORS = {
  blue: {
    bg: APP_COLORS.blues.surfaceLight,
    border: "transparent",
    circleBg: APP_COLORS.blues.surfaceMid,
    text: APP_COLORS.blues.interactiveCta,
    lightText: APP_COLORS.blues.secondary,
  },
  yellow: {
    bg: APP_COLORS.ambers.light,
    border: APP_COLORS.ambers.light,
    circleBg: APP_COLORS.ambers.light,
    text: APP_COLORS.ambers.secondary,
    lightText: APP_COLORS.ambers.secondary,
  },
  red: {
    bg: APP_COLORS.reds.light,
    border: APP_COLORS.reds.primary,
    circleBg: APP_COLORS.reds.primary,
    text: APP_COLORS.reds.red,
    lightText: APP_COLORS.reds.red,
  },
  amber: {
    bg: APP_COLORS.ambers.light,
    border: APP_COLORS.ambers.amber,
    circleBg: APP_COLORS.ambers.light,
    text: APP_COLORS.ambers.secondary,
    lightText: APP_COLORS.ambers.secondary,
  },
} as const;
