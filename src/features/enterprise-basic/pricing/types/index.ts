export type PricingCategory = "all" | "sim" | "cctv" | "solar";

export interface CategoryPnLItem {
  id: string;
  name: string;
  category: "sim" | "cctv" | "solar";
  bought: number;
  cost: number;
  sold: number;
  revenue: number;
  marginPerUnit: number;
  totalMargin: number;
  unsold: number;
  unsoldCost: number;
}

export interface PricingKpis {
  totalRevenue: number;
  totalProductsCost: number;
  netProfit: number;
  roiPct: number;
  unsoldStockTotalCost: number;
}
