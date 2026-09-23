export interface EbInventoryStockItem {
  id: string;
  name: string;
  category: "sim" | "cctv" | "solar";
  inStock: number;
  reserved: number;
  totalPurchased: number;
  costPrice: number;
  retailPrice: number;
  margin: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
}

export interface EbCustomerSaleItem {
  id: string;
  customerName: string;
  initials: string;
  phone: string;
  productType: string;
  productDetail: string;
  date: string;
  margin: number;
}

export interface EbCustomerProductSummary {
  id: string;
  customerName: string;
  phone: string;
  simsCount: number;
  cctvCount: number;
  solarCount: number;
  status: "active" | "expiring";
}
