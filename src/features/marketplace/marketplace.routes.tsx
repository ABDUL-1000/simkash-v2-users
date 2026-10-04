import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import MarketplaceStorePage from "./pages/MarketplaceStorePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrdersHistoryPage from "./pages/OrdersHistoryPage";

export const MarketplaceRoutes: TRouteData[] = [
  {
    path: appPaths.marketplace,
    element: <MarketplaceStorePage />,
    title: "Simkash Store",
    isSearchable: true,
  },
  {
    path: "/marketplace/cart",
    element: <CartPage />,
    title: "My Cart",
    isSearchable: true,
  },
  {
    path: "/marketplace/checkout",
    element: <CheckoutPage />,
    title: "Checkout",
    isSearchable: true,
  },
  {
    path: appPaths.orders,
    element: <OrdersHistoryPage />,
    title: "My Orders",
    isSearchable: true,
  },
  {
    path: "/marketplace/orders/:id",
    element: <OrderDetailsPage />,
    title: "Order Details",
    isSearchable: false,
  },
  {
    path: appPaths.marketplaceDetails().format,
    element: <ProductDetailsPage />,
    title: "Product Details",
    isSearchable: false,
  },
];
