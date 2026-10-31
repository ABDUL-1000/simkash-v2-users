export type ScStatus = "active" | "suspended" | "new";

export interface StateCoordinatorNetwork {
  id: string;
  name: string;
  initials: string;
  phone: string;
  state: string;
  joinedDate: string;
  lastActive: string;
  apsCount: number;
  activationsThisMonth: number;
  stockCount: number;
  stockLabel: string;
  stockStatus: string;
  status: ScStatus;
  statusLabel: string;
  atRisk: boolean;
  target?: { current: number; target: number; percentage: number; text: string };
  canRemind: boolean;
  canDistribute: boolean;
  canSuspend: boolean;
}
