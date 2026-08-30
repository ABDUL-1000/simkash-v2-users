import { lazy } from "react";

export const EnterprisePage = lazy(
  () => import("./pages/EnterprisePage"),
);

export const EnterpriseDetailsPage = lazy(
  () => import("./pages/EnterpriseDetailsPage"),
);
