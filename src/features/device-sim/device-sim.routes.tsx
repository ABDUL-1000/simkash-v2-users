import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { DeviceSimPage } from "./pages/DeviceSimPage";
import { DeviceSimDetailPage } from "./pages/DeviceSimDetailPage";

export const deviceSimRoutes: TRouteData[] = [
  { path: appPaths.deviceSim, element: <DeviceSimPage />, title: "My Device SIMs", isSearchable: true },
  { path: appPaths.deviceSimDetail(":type", ":id").path, element: <DeviceSimDetailPage />, title: "SIM Details", isSearchable: false },
];
