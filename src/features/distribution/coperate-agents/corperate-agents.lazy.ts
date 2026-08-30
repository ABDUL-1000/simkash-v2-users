import { lazy } from "react";

export const CorporateAgentPage = lazy(
  () => import("./pages/CorporateAgentPage"),
);

export const CorporateAgentDetailsPage = lazy(
  () => import("./pages/CorporateAgentDetailsPage"),
);
