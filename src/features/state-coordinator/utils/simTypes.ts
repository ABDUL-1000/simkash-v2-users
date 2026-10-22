import type { RedistType, SimType } from "../types/operations";

export const SC_SIM_TYPES: SimType[] = ["pos", "cctv", "gps", "router"];
export const SIM_TYPE_LABELS: Record<SimType, string> = { pos: "POS SIM", cctv: "CCTV SIM", gps: "GPS SIM", router: "Router SIM" };
export const emptySimSelection = (): Record<SimType, string[]> => ({ pos: [], cctv: [], gps: [], router: [] });
export const REDIST_TYPES: RedistType[] = ["pos", "cctv", "gps", "router", "cctv_device"];
export const REDIST_TYPE_LABELS: Record<RedistType, string> = { ...SIM_TYPE_LABELS, cctv_device: "CCTV Device" };
export const emptyRedistSelection = (): Record<RedistType, string[]> => ({ pos: [], cctv: [], gps: [], router: [], cctv_device: [] });
