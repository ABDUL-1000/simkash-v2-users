import type { ApRateConfigItem } from "../types";

export const initialApRates: ApRateConfigItem[] = [
  {
    id: "pos",
    simType: "POS SIM",
    label: "Point of Sale SIMs",
    mode: "fixed",
    rate: 1000,
    avgActivations: 14847,
    totalCommissionEst: 14847000,
  },
  {
    id: "cctv",
    simType: "CCTV SIM",
    label: "Smart Security SIMs",
    mode: "fixed",
    rate: 1200,
    avgActivations: 2700,
    totalCommissionEst: 3240000,
  },
  {
    id: "gps",
    simType: "GPS SIM",
    label: "Asset & GPS Trackers",
    mode: "fixed",
    rate: 1500,
    avgActivations: 1240,
    totalCommissionEst: 1860000,
  },
  {
    id: "router",
    simType: "Router SIM",
    label: "4G/5G Router SIMs",
    mode: "fixed",
    rate: 1000,
    avgActivations: 500,
    totalCommissionEst: 500000,
  },
];
