// Maps the API's status_color (yellow, blue, green, red, …) to text/background tokens.
const TONES: Record<string, { color: string; bg: string }> = {
  yellow: { color: "#D9990D", bg: "#FFFBEB" },
  orange: { color: "#EA580C", bg: "#FFF7ED" },
  blue: { color: "#2563EB", bg: "#EFF4F8" },
  green: { color: "#10B981", bg: "#EBFFF8" },
  red: { color: "#EF4444", bg: "#FFF7F8" },
  gray: { color: "#66738C", bg: "#F1F5F9" },
};
export const posStatusTone = (color?: string) => TONES[(color ?? "").toLowerCase()] ?? TONES.gray;
