import { lazy } from "react";

export const AgencyPartnerPage = lazy(
  () => import("./pages/AgencyPartnerPage"),
);

export const AgencyPartnerDetailsPage = lazy(
  () => import("./pages/AgencyPartnerDetailsPage"),
);
