import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { RouterDevicePage } from "./router-device.lazy";

export const routerDeviceRoutes: TRouteData[] = [
  { path: appPaths.routerDevice, element: <RouterDevicePage />, title: "Router Device", isSearchable: true },
  { path: appPaths.routerSim, element: <RouterDevicePage />, title: "Router SIM", isSearchable: true },
];
