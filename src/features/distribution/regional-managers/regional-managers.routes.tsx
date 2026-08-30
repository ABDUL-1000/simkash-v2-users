import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import RegionalManagersPage from "./pages/RegionalManagersPage";
import RegionalManagerDetailsPage from "./pages/RegionalManagerDetailsPage";

export const RegionalManagerRoutes: TRouteData[] = [
  {
    path: appPaths.regionalManagers,
    element: <RegionalManagersPage />,
    title: "Regional Managers",
    isSearchable: true,
  },
  {
    path: appPaths.regionalManagerDetails().format,
    element: <RegionalManagerDetailsPage />,
    title: "Regional Manager Details",
    isSearchable: false,
  },
];
