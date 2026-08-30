import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import CorperateAgentPage from "./pages/CorporateAgentPage";
import CorperateAgentDetailsPage from "./pages/CorporateAgentDetailsPage";

export const CorporateAgentRoutes: TRouteData[] = [
  { path: appPaths.corporateAgent, element: <CorperateAgentPage />, title: "Corporate Agents", isSearchable: true },
  { path: appPaths.corporateAgentDetails().format, element: <CorperateAgentDetailsPage />, title: "Corporate Agents Details", isSearchable: false },
];
