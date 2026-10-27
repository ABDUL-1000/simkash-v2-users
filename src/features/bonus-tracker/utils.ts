export const naira = (value: number) => `₦${(Number(value) || 0).toLocaleString()}`;

export const shortDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short" }) : "—";

export const weekRange = (start?: string, end?: string) => `${shortDate(start)} – ${shortDate(end)}`;
