import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SettingsPage from "./pages/SettingsPage";

export const SettingsRoutes: TRouteData[] = [
  {
    path: appPaths.settings,
    element: <SettingsPage />,
    title: "Settings",
    isSearchable: true,
  },
  {
    path: appPaths.settingsTab().format,
    element: <SettingsPage />,
    title: "Settings",
    isSearchable: false,
  },
];
