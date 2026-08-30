import { lazy } from "react";

export const SuspensionPage = lazy(
  () => import("./pages/SuspensionPage"),
);

export const SuspensionDetailsPage = lazy(
  () => import("./pages/SuspensionDetailsPage"),
);
