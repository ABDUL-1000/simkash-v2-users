import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import EnterprisePage from "./pages/EnterprisePage";
import EnterpriseDetailsPage from "./pages/EnterpriseDetailsPage";


export const EnterpriseRoutes: TRouteData[] = [
  { path: appPaths.enterprise, element: <EnterprisePage />, title: "Enterprise", isSearchable: true },
  { path: appPaths.enterpriseDetails().format, element: <EnterpriseDetailsPage />, title: "Enterprise Details", isSearchable: false },
];
