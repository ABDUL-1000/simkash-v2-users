import { userNavigation } from "@/constants/navigation";
import { normalizeRole } from "./roleRouting";

export function getNavigationByRole(role?: string | null) {
  const normalized = normalizeRole(role);
  return userNavigation.filter(section => !section.roles || (normalized !== null && section.roles.includes(normalized)));
}
