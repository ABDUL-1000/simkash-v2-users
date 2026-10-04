import { appPaths } from "@/app/router/paths";

export type CanonicalRole = "USER" | "PARTNER" | "STATE_COORDINATOR" | "REGIONAL_MANAGER" | "CORPORATE_AGENT" | "ENTERPRISE_BASIC" | "ENTERPRISE_PRO" | "INSTALLER";
export type UserRole = string;

export function normalizeRole(role?: string | null): CanonicalRole | null {
  const value = role?.trim().toUpperCase().replace(/[\s-]+/g, "_");
  const aliases: Record<string, CanonicalRole> = {
    USER: "USER", PARTNER: "PARTNER", AGENCY_PARTNER: "PARTNER", AP: "PARTNER",
    STATE_COORDINATOR: "STATE_COORDINATOR", SC: "STATE_COORDINATOR",
    REGIONAL_MANAGER: "REGIONAL_MANAGER", RM: "REGIONAL_MANAGER",
    CORPORATE_AGENT: "CORPORATE_AGENT", CORPERATE_AGENT: "CORPORATE_AGENT", CA: "CORPORATE_AGENT",
    ENTERPRISE_BASIC: "ENTERPRISE_BASIC", EB: "ENTERPRISE_BASIC",
    ENTERPRISE_PRO: "ENTERPRISE_PRO", EP: "ENTERPRISE_PRO", INSTALLER: "INSTALLER", INS: "INSTALLER",
  };
  return value && Object.hasOwn(aliases, value) ? aliases[value] : null;
}

export function getDashboardRouteByRole(role?: string | null): string {
  const dashboards: Record<CanonicalRole, string> = {
    USER: appPaths.dashboard, PARTNER: appPaths.agencyPartnerDashboard,
    STATE_COORDINATOR: appPaths.stateCoordinatorDashboard, REGIONAL_MANAGER: appPaths.regionalManagerDashboard,
    CORPORATE_AGENT: appPaths.corporateAgentDashboard, ENTERPRISE_BASIC: appPaths.enterpriseBasicDashboard,
    ENTERPRISE_PRO: appPaths.enterpriseProDashboard, INSTALLER: appPaths.installerDashboard,
  };
  const normalized = normalizeRole(role);
  return normalized ? dashboards[normalized] : appPaths.dashboard;
}
