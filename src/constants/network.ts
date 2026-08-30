import { NETWORK_COLORS } from "@/constants/colors";

export type NetworkId = "mtn" | "airtel" | "glo" | "t2" | (string & {});

export type NetworkConfig = {
  id: NetworkId;
  label: string;
  bg: string;
  border: string;
  text: string;
  bar: string;
};

export const DEFAULT_SIM_TYPE_OPTIONS = [
  { label: "POS SIM", value: "pos" },
  { label: "CCTV SIM", value: "cctv" },
  { label: "GPS SIM", value: "gps" },
  { label: "Router SIM", value: "router" },
];

export const DEFAULT_NETWORK_OPTIONS = [
  { label: "MTN", value: "mtn" },
  { label: "Airtel", value: "airtel" },
  { label: "Glo", value: "glo" },
  { label: "T2", value: "t2" },
];

export const DEFAULT_NETWORKS: NetworkConfig[] = [
  { id: "mtn", label: "MTN", ...NETWORK_COLORS.mtn },
  { id: "airtel", label: "Airtel", ...NETWORK_COLORS.airtel },
  { id: "glo", label: "Glo", ...NETWORK_COLORS.glo },
  { id: "t2", label: "T2", ...NETWORK_COLORS.t2 },
];

export type NetworkBreakdownRow = {
  id: NetworkId;
  label: string;
  value: number;
  color: string;
  bar?: string;
};

export function buildNetworkRows(
  values: Partial<Record<NetworkId, number>>,
  networks: NetworkConfig[] = DEFAULT_NETWORKS,
): NetworkBreakdownRow[] {
  return networks.map((network) => ({
    id: network.id,
    label: network.label,
    value: values[network.id] ?? 0,
    color: network.text,
    bar: network.bar,
  }));
}