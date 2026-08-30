import { lazy } from "react";

export const ReferralsPage = lazy(
  () => import("./pages/ReferralsPage"),
);

export const ReferralDetailsPage = lazy(
  () => import("./pages/ReferralDetailsPage"),
);
