import { useAuthStore } from "@/store/authStore";
import { normalizeRole } from "@/utils/auth/roleRouting";

export type HierarchyRole = "PARTNER" | "STATE_COORDINATOR" | "REGIONAL_MANAGER";

interface RecallConfig {
  /** GET: holders with recallable counts. */
  holders: string;
  /** GET: one holder's recallable SIMs. */
  sims: (id: number | string) => string;
  /** POST: recall. */
  recall: string;
  /** Body key that names the holder. */
  bodyKey: "partner_id" | "coordinator_id";
  /** Key the holder list comes back under. */
  listKey: "partners" | "state_coordinators";
  /** Key the holder comes back under on the SIMs list and the recall result. */
  holderKey: "partner" | "state_coordinator";
  holderLabel: string;
  holderPlural: string;
}

export interface HierarchyConfig {
  role: HierarchyRole;
  base: string;
  /** Who this role asks for SIMs. */
  supplierLabel: string;
  /** Who asks this role for SIMs (null when nobody does). */
  requesterLabel: string | null;
  recall: RecallConfig | null;
}

const CONFIG: Record<HierarchyRole, HierarchyConfig> = {
  PARTNER: { role: "PARTNER", base: "/partner", supplierLabel: "State Coordinator", requesterLabel: null, recall: null },
  STATE_COORDINATOR: {
    role: "STATE_COORDINATOR", base: "/state-coordinator", supplierLabel: "Regional Manager", requesterLabel: "Agency Partner",
    recall: {
      holders: "/state-coordinator/sim-inventory/recall/partners",
      sims: (id) => `/state-coordinator/sim-inventory/recall/partners/${id}/sims`,
      recall: "/state-coordinator/sim-inventory/recall",
      bodyKey: "partner_id", listKey: "partners", holderKey: "partner", holderLabel: "Agency Partner", holderPlural: "Agency Partners",
    },
  },
  REGIONAL_MANAGER: {
    role: "REGIONAL_MANAGER", base: "/regional-manager", supplierLabel: "Simkash Admin", requesterLabel: "State Coordinator",
    recall: {
      holders: "/regional-manager/sim-inventory/recall/state-coordinators",
      sims: (id) => `/regional-manager/sim-inventory/recall/state-coordinators/${id}/sims`,
      recall: "/regional-manager/sim-inventory/recall",
      bodyKey: "coordinator_id", listKey: "state_coordinators", holderKey: "state_coordinator", holderLabel: "State Coordinator", holderPlural: "State Coordinators",
    },
  },
};

/** The signed-in user's place in the SIM hierarchy, or null for everyone else. */
export function useHierarchyConfig(): HierarchyConfig | null {
  const role = normalizeRole(useAuthStore((s) => s.user?.role));
  return role && role in CONFIG ? CONFIG[role as HierarchyRole] : null;
}
