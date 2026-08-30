import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SupportCenterPage from "./pages/SupportCenterPage";

export const SupportRoutes: TRouteData[] = [
  {
    path: appPaths.support,
    element: <SupportCenterPage />,
    title: "Support Center",
    isSearchable: true,
  },
];
