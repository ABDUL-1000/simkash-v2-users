import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import OperationalManagersPage from "./pages/OperationalManagersPage";
import OperationalManagerDetailsPage from "./pages/OperationalManagerDetailsPage";

export const OperationalManagerRoutes: TRouteData[] = [
  {
    path: appPaths.operationalManagers,
    element: <OperationalManagersPage />,
    title: "Operational Managers",
    isSearchable: true,
  },
  {
    path: appPaths.operationalManagerDetails().format,
    element: <OperationalManagerDetailsPage />,
    title: "Operational Manager Details",
    isSearchable: false,
  },
];
