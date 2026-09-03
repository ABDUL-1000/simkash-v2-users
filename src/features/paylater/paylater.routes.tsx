import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import PayLaterPage from "./pages/PayLaterPage";

export const payLaterRoutes: TRouteData[] = [
  {
    path: appPaths.payLater,
    element: <PayLaterPage />,
    title: "PayLater",
    isSearchable: true,
  },
];
