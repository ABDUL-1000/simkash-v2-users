import { lazy } from "react";
import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";

const BillPaymentsPage = lazy(
  () => import("./pages/BillPaymentsPage")
);

export const billPaymentsRoutes: TRouteData[] = [
  {
    path: appPaths.billPayments,
    element: <BillPaymentsPage />,
    title: "Bill Payments",
    isSearchable: true,
  },
];
