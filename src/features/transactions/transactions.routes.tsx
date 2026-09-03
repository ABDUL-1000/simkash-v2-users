import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";

export const transactionsRoutes: TRouteData[] = [
  {
    path: appPaths.transactions,
    element: <TransactionHistoryPage />,
    title: "Transaction History",
    isSearchable: true,
  },
  {
    path: appPaths.transactionDetails().format,
    element: <TransactionDetailsPage />,
    title: "Transaction Details",
    isSearchable: false,
  },
];
