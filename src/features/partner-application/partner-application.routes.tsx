import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import { BecomePartnerPage } from "./pages/BecomePartnerPage";
import { ApplicationFormPage } from "./pages/ApplicationFormPage";

export const partnerApplicationRoutes: TRouteData[] = [
  { path: appPaths.becomePartner, element: <BecomePartnerPage />, title: "Become a Partner", isSearchable: true },
  { path: appPaths.becomePartnerApply().format, element: <ApplicationFormPage />, title: "Partner Application", isSearchable: false },
];
