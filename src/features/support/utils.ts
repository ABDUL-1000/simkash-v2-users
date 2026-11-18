import type { AttachmentRules, TicketPriority, TicketStatusKey } from "./types";

export { timeAgo } from "@/features/notifications/utils";

export const DEFAULT_RULES: AttachmentRules = { maxFiles: 3, maxBytes: 5 * 1024 * 1024, allowedTypes: ["image/jpeg", "image/png", "application/pdf"] };
export const LIMITS = { subject: 100, description: 5000, message: 5000 };

export const STATUS_TONE: Record<TicketStatusKey, string> = {
  open: "bg-[#FFFBEB] text-[#D9990D]",
  in_progress: "bg-[#EFF4F8] text-[#2563EB]",
  resolved: "bg-[#EBFFF8] text-[#10B981]",
  closed: "bg-slate-100 text-[#66738C]",
};
export const PRIORITY_TONE: Record<TicketPriority, string> = {
  low: "bg-slate-100 text-[#66738C]",
  medium: "bg-[#FFFBEB] text-[#D9990D]",
  high: "bg-[#FFF7F8] text-[#EF4444]",
};

export const STATUS_TABS: { key: "all" | TicketStatusKey; label: string }[] = [
  { key: "all", label: "All" }, { key: "open", label: "Open" }, { key: "in_progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" }, { key: "closed", label: "Closed" },
];

export const fmtDateTime = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";
export const fmtShort = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
export const fmtTime = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "";

export const fmtBytes = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(bytes % (1024 * 1024) ? 1 : 0)}MB` : `${Math.ceil(bytes / 1024)}KB`);

/** "JPG, PNG or PDF" from mime types or extensions. */
export const typesLabel = (types: string[]) => {
  const names = [...new Set(types.map((t) => (t.includes("/") ? t.split("/")[1] : t.replace(".", "")).replace("jpeg", "jpg").toUpperCase()))];
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} or ${names.at(-1)}` : names[0] ?? "";
};

/** Client-side pre-check; the server still validates contents. */
export function checkFile(file: File, rules: AttachmentRules): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const allowed = rules.allowedTypes.some((t) => (t.includes("/") ? file.type === t : t.replace(".", "").toLowerCase() === ext || (t === "jpg" && ext === "jpeg")));
  if (!allowed) return `${file.name}: only ${typesLabel(rules.allowedTypes)} files are allowed`;
  if (file.size > rules.maxBytes) return `${file.name} is larger than ${fmtBytes(rules.maxBytes)}`;
  return null;
}

export const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "?";
