import { lazy } from "react";

export const MarketplacePage = lazy(
  () => import("./pages/MarketplacePage"),
);

export const MarketplaceDetailsPage = lazy(
  () => import("./pages/MarketplaceDetailsPage"),
);

export const VendorManagementPage = lazy(
  () => import("./pages/VendorManagementPage"),
);

export const OrdersPage = lazy(
  () => import("./pages/OrdersPage"),
);
