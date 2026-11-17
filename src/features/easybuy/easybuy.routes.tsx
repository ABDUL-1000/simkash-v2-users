import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import EasyBuyPage from "./pages/EasyBuyPage";
import EasyBuyDetailsPage from "./pages/EasyBuyDetailsPage";

export const easyBuyRoutes: TRouteData[] = [
  { path: appPaths.easyBuy, element: <EasyBuyPage />, title: "EasyBuy", isSearchable: true },
  { path: appPaths.easyBuyDetails().format, element: <EasyBuyDetailsPage />, title: "EasyBuy Details", isSearchable: false },
];
