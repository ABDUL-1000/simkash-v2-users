import { lazy } from "react";

export const InstallersPage = lazy(
  () => import("./pages/InstallersPage"),
);

export const InstallersDetailsPage = lazy(
  () => import("./pages/InstallersDetailsPage"),
);

export const JobPoolPage = lazy(
  () => import("./pages/JobPoolPage"),
);
