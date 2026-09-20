import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import AgencyPartnerPage from "./pages/AgencyPartnerPage";
import AgencyPartnerDetailsPage from "./pages/AgencyPartnerDetailsPage";
import { AgencyPartnerDashboardPage } from "@/features/agency-partner/pages/AgencyPartnerDashboardPage";
import { AgencyPartnerStockPage } from "../../agency-partner/stock/pages/AgencyPartnerStockPage";
import { MyCustomersPage } from "../../agency-partner/customers/pages/MyCustomersPage";
import { CustomerDetailsPage } from "../../agency-partner/customers/pages/CustomerDetailsPage";

export const AgencyPartnerRoutes: TRouteData[] = [
  { path: appPaths.agencyPartner, element: <AgencyPartnerPage />, title: "Agency Partner", isSearchable: true },
  { path: appPaths.agencyPartnerDashboard, element: <AgencyPartnerDashboardPage />, title: "AP Dashboard", isSearchable: true },
  { path: appPaths.agencyPartnerStock, element: <AgencyPartnerStockPage />, title: "My SIM Stock", isSearchable: true },
  { path: appPaths.apSimStock, element: <AgencyPartnerStockPage />, title: "My SIM Stock", isSearchable: true },
  { path: "/sim-stock/ap", element: <AgencyPartnerStockPage />, title: "My SIM Stock", isSearchable: false },
  { path: appPaths.apCustomers, element: <MyCustomersPage />, title: "My Customers", isSearchable: true },
  { path: appPaths.apCustomerDetails().format, element: <CustomerDetailsPage />, title: "Customer Details", isSearchable: false },
  { path: appPaths.agencyPartnerDetails().format, element: <AgencyPartnerDetailsPage />, title: "Agency Partner Details", isSearchable: false },
];
