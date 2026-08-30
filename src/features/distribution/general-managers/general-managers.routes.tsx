import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import GeneralManagersPage from "./pages/GeneralManagersPage";
import GeneralManagerDetailsPage from "./pages/GeneralManagerDetailsPage";

export const GeneralManagerRoutes: TRouteData[] = [
  {
    path: appPaths.generalManagers,
    element: <GeneralManagersPage />,
    title: "General Managers",
    isSearchable: true,
  },
  {
    path: appPaths.generalManagerDetails().format,
    element: <GeneralManagerDetailsPage />,
    title: "General Manager Details",
    isSearchable: false,
  },
];
