import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SupportCenterPage from "./pages/SupportCenterPage";
import SupportTicketDetailsPage from "./pages/SupportTicketDetailsPage";
import FaqArticlePage from "./pages/FaqArticlePage";

export const supportRoutes: TRouteData[] = [
  {
    path: appPaths.support,
    element: <SupportCenterPage />,
    title: "Support Center",
    isSearchable: true,
  },
  {
    path: appPaths.supportTicketDetails().format,
    element: <SupportTicketDetailsPage />,
    title: "Ticket Details",
    isSearchable: false,
  },
  {
    path: appPaths.faqArticle().format,
    element: <FaqArticlePage />,
    title: "FAQ Article",
    isSearchable: false,
  },
];

export const SupportRoutes = supportRoutes;
