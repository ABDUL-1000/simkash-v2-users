import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import AgencyPartnerPage from "./pages/AgencyPartnerPage";
import AgencyPartnerDetailsPage from "./pages/AgencyPartnerDetailsPage";

export const AgencyPartnerRoutes: TRouteData[] = [
  { path: appPaths.agencyPartner, element: <AgencyPartnerPage />, title: "Agency Partner", isSearchable: true },
  { path: appPaths.agencyPartnerDetails().format, element: <AgencyPartnerDetailsPage />, title: "Agency Partner Details", isSearchable: false },
];
