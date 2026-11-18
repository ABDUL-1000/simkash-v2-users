import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SupportCenterPage from "./pages/SupportCenterPage";
import SupportTicketsPage from "./pages/SupportTicketsPage";
import SupportTicketDetailsPage from "./pages/SupportTicketDetailsPage";
import SupportFaqsPage from "./pages/SupportFaqsPage";

export const supportRoutes: TRouteData[] = [
  { path: appPaths.support, element: <SupportCenterPage />, title: "Support Center", isSearchable: true },
  { path: appPaths.supportTickets, element: <SupportTicketsPage />, title: "My Support Tickets", isSearchable: true },
  { path: appPaths.supportTicketDetails().format, element: <SupportTicketDetailsPage />, title: "Ticket Details", isSearchable: false },
  { path: appPaths.supportFaqs, element: <SupportFaqsPage />, title: "Help & FAQs", isSearchable: true },
];

export const SupportRoutes = supportRoutes;
