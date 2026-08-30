

import type { TRouteData } from "@/app/router/route-types";
import { LoginPage } from "./auth.lazy";
import { appPaths } from "@/app/router/paths";

export const authRoutes: TRouteData[] = [
  {
    path: appPaths.login,
    element: <LoginPage />,
    title: "Login",
    isSearchable: false,
  },
];
