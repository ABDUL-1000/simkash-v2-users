export interface StateCoordinatorStock {
  id: string;
  name: string;
  state: string;
  statusLabel: string;
  onHandStock: { pos: number; cctv: number; gps: number; router: number; total: number };
}

export interface InventoryActivityItem {
  id: string;
  type: "reorder" | "distribution" | "return" | "adjustment";
  title: string;
  description: string;
  timestamp: string;
  referenceId: string;
  totalSims: number;
}

/** Recipient / source State Coordinator in the distribute and redistribute forms (GET /my-state-coordinator/overview). */
export interface EpCoordinatorOption {
  id: number;
  name: string;
  phone: string;
  state: string;
  initials: string;
  stock: number;
  apsCount: number;
}
