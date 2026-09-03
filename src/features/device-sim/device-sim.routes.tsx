import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import DeviceSimListPage from "./pages/DeviceSimListPage";
import DeviceSimDetailsPage from "./pages/DeviceSimDetailsPage";

export const deviceSimRoutes: TRouteData[] = [
  {
    path: appPaths.deviceSim,
    element: <DeviceSimListPage />,
    title: "Device SIM",
    isSearchable: true,
  },
  {
    path: appPaths.deviceSimDetails().format,
    element: <DeviceSimDetailsPage />,
    title: "Device SIM Details",
    isSearchable: false,
  },
];
