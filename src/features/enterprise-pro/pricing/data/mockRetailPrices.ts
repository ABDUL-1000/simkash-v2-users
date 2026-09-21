import type { RetailPriceConfig } from "../types";

export const initialRetailPrices: RetailPriceConfig[] = [
  {
    id: "pos",
    simType: "POS SIM",
    label: "Point of Sale Terminal SIMs",
    wholesale: 2500,
    currentRetail: 4500,
    marginPerSim: 2000,
    paceEstMonthly: 29694000,
    monthlyActivations: 14847,
  },
  {
    id: "cctv",
    simType: "CCTV SIM",
    label: "Smart Security & CCTV SIMs",
    wholesale: 6000,
    currentRetail: 9500,
    marginPerSim: 3500,
    paceEstMonthly: 3150000,
    monthlyActivations: 900,
  },
  {
    id: "gps",
    simType: "GPS SIM",
    label: "Vehicle & Asset Tracker SIMs",
    wholesale: 8000,
    currentRetail: 12000,
    marginPerSim: 4000,
    paceEstMonthly: 2800000,
    monthlyActivations: 700,
  },
  {
    id: "router",
    simType: "Router SIM",
    label: "4G / 5G High-Speed Router SIMs",
    wholesale: 5000,
    currentRetail: 8000,
    marginPerSim: 3000,
    paceEstMonthly: 2100000,
    monthlyActivations: 700,
  },
];
