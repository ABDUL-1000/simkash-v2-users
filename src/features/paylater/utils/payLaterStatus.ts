// Maps the API's status_color / rating_color (yellow, green, red, blue, …) to the PayLater palette.
const TONES: Record<string, { color: string; bg: string; solid: string }> = {
  yellow: { color: "#F59E0B", bg: "#FFFBEB", solid: "#F59E0B" },
  orange: { color: "#EA580C", bg: "#FFF7ED", solid: "#EA580C" },
  green: { color: "#10B981", bg: "#EBFFF8", solid: "#10B981" },
  red: { color: "#EF4444", bg: "#FFF7F8", solid: "#EF4444" },
  blue: { color: "#2563EB", bg: "#EFF4F8", solid: "#2563EB" },
  gray: { color: "#66738C", bg: "#F1F5F9", solid: "#94A2B8" },
};
export const payLaterStatusTone = (color?: string) => TONES[(color ?? "").toLowerCase()] ?? TONES.gray;
