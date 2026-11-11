import type { JobClient } from "./api/types";

export const naira = (value: number | null | undefined) => value == null ? "—" : `₦${Number(value).toLocaleString("en-NG")}`;
export const dateText = (iso: string | null | undefined, withTime = false) => iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}) }) : "—";
export const clientName = (client: JobClient | string | null | undefined) => typeof client === "string" ? client : client?.company || client?.contactName || "—";
export const jobPath = (id: number | string) => `/installer/jobs/${id}`;
