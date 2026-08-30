import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import MarketplacePage from "./pages/MarketplacePage";
import MarketplaceDetailsPage from "./pages/MarketplaceDetailsPage";
import VendorManagementPage from "./pages/VendorManagementPage";
import OrdersPage from "./pages/OrdersPage";

export const MarketplaceRoutes: TRouteData[] = [
  { path: appPaths.marketplace, element: <MarketplacePage />, title: "Marketplace", isSearchable: true },
  { path: appPaths.vendorManagement, element: <VendorManagementPage />, title: "Vendor Management", isSearchable: true },
  { path: appPaths.orders, element: <OrdersPage />, title: "Orders", isSearchable: true },
  { path: appPaths.marketplaceDetails().format, element: <MarketplaceDetailsPage />, title: "Marketplace Product Details", isSearchable: false },
];
