import { appPaths } from "@/app/router/paths";

export type UserRole =
  | "USER"
  | "REGIONAL_MANAGER"
  | "RM"
  | "STATE_COORDINATOR"
  | "SC"
  | "CORPORATE_AGENT"
  | "CA"
  | "AGENCY_PARTNER"
  | "AP"
  | "INSTALLER"
  | "INS"
  | "ENTERPRISE_PRO"
  | "EP"
  | "ENTERPRISE_BASIC"
  | "EB"
  | string;

/**
 * Resolves a platform user's role to their designated dashboard route.
 */
export const getDashboardRouteByRole = (role?: UserRole): string => {
  if (!role) return appPaths.dashboard;

  switch (role.toUpperCase()) {
    case "REGIONAL_MANAGER":
    case "RM":
      return appPaths.regionalManagerDashboard;
    case "STATE_COORDINATOR":
    case "SC":
      return appPaths.stateCoordinatorDashboard;
    case "CORPORATE_AGENT":
    case "CA":
      return appPaths.corporateAgentDashboard;
    case "AGENCY_PARTNER":
    case "AP":
      return appPaths.agencyPartnerDashboard;
    case "INSTALLER":
    case "INS":
      return appPaths.installerDashboard;
    case "ENTERPRISE_PRO":
    case "EP":
      return appPaths.enterpriseProDashboard;
    case "ENTERPRISE_BASIC":
    case "EB":
      return appPaths.enterpriseBasicDashboard;
    case "USER":
    default:
      return appPaths.dashboard;
  }
};
