import { appPaths } from "@/app/router/paths";

export type CanonicalRole =
  | "USER"
  | "PARTNER"
  | "STATE_COORDINATOR"
  | "REGIONAL_MANAGER"
  | "CORPORATE_SALES_AGENT"
  | "ENTERPRISE_BASIC"
  | "ENTERPRISE"
  | "INSTALLER";
export type UserRole = string;

export function normalizeRole(role?: string | null): CanonicalRole | null {
  const value = role
    ?.trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");
  const aliases: Record<string, CanonicalRole> = {
    USER: "USER",
    PARTNER: "PARTNER",
    AGENCY_PARTNER: "PARTNER",
    AP: "PARTNER",
    STATE_COORDINATOR: "STATE_COORDINATOR",
    SC: "STATE_COORDINATOR",
    REGIONAL_MANAGER: "REGIONAL_MANAGER",
    RM: "REGIONAL_MANAGER",
    CORPORATE_SALES_AGENT: "CORPORATE_SALES_AGENT",
    CORPERATE_SALES_AGENT: "CORPORATE_SALES_AGENT",
    CSA: "CORPORATE_SALES_AGENT",
    ENTERPRISE_BASIC: "ENTERPRISE_BASIC",
    EB: "ENTERPRISE_BASIC",
    ENTERPRISE: "ENTERPRISE",
    EP: "ENTERPRISE",
    INSTALLER: "INSTALLER",
    INS: "INSTALLER",
  };
  return value && Object.hasOwn(aliases, value) ? aliases[value] : null;
}

export function getDashboardRouteByRole(role?: string | null): string {
  const dashboards: Record<CanonicalRole, string> = {
    USER: appPaths.dashboard,
    PARTNER: appPaths.agencyPartnerDashboard,
    STATE_COORDINATOR: appPaths.stateCoordinatorDashboard,
    REGIONAL_MANAGER: appPaths.regionalManagerDashboard,
    CORPORATE_SALES_AGENT: appPaths.corporateAgentDashboard,
    ENTERPRISE_BASIC: appPaths.enterpriseBasicDashboard,
    ENTERPRISE: appPaths.enterpriseProDashboard,
    INSTALLER: appPaths.installerDashboard,
  };
  const normalized = normalizeRole(role);
  return normalized ? dashboards[normalized] : appPaths.dashboard;
}
