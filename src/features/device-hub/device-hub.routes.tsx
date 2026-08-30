import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import DeviceHubPage from "./pages/DeviceHubPage";

export const DeviceHubRoutes: TRouteData[] = [{ path: appPaths.deviceHub, element: <DeviceHubPage />, title: "Device Hub", isSearchable: true }];
