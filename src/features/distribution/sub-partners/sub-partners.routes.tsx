import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SubPartnerNetworkPage from "./pages/SubPartnerNetworkPage";

export const SubPartnerRoutes: TRouteData[] = [
  { path: appPaths.subPartners().format, element: <SubPartnerNetworkPage />, title: "Sub-Partner Network", isSearchable: true },
  { path: "/distribution/sub-partners", element: <SubPartnerNetworkPage />, title: "Sub-Partner Network", isSearchable: false },
];
