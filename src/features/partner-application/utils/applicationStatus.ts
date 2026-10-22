import type { ApplicationRole } from "../types/api";

/** URL segment ↔ API role. */
export const roleFromSlug = (slug?: string): ApplicationRole | null => slug === "agency-partner" ? "partner" : slug === "state-coordinator" ? "state" : null;
export const slugFromRole = (role: ApplicationRole) => role === "partner" ? "agency-partner" : "state-coordinator";
export const roleTitle = (role: ApplicationRole) => role === "partner" ? "Agency Partner" : "State Coordinator";

export const applicationTone = (status?: string) => {
  const s = (status ?? "").toLowerCase();
  if (/approv|accept|active/.test(s)) return { color: "#10B981", bg: "#EBFFF8" };
  if (/reject|declin|denied/.test(s)) return { color: "#EF4444", bg: "#FFF7F8" };
  if (/pend|review|submit/.test(s)) return { color: "#D9990D", bg: "#FFFBEB" };
  return { color: "#66738C", bg: "#F1F5F9" };
};

/** A role is "taken" while an application is pending or approved; a rejected one can be re-submitted. */
export const isOpenApplication = (status?: string) => Boolean(status) && !/^none$|reject|declin|denied/i.test(status ?? "");

/** Progress timeline shown after submitting / on the status card. */
export function applicationTimeline(status?: string) {
  const s = (status ?? "").toLowerCase();
  const decided = /approv|reject|declin/.test(s);
  return [
    { label: "Application submitted", state: "done" as const },
    { label: "Under review", state: decided ? "done" as const : "current" as const },
    { label: "Decision made", state: decided ? (/reject|declin/.test(s) ? "failed" as const : "done" as const) : "pending" as const },
  ];
}
