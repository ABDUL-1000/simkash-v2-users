import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import ReferralsPage from "./pages/ReferralsPage";
import ReferralDetailsPage from "./pages/ReferralDetailsPage";

export const ReferralRoutes: TRouteData[] = [
  { path: appPaths.referrals, element: <ReferralsPage />, title: "Referrals & Partner Growth", isSearchable: true },
  { path: appPaths.referralDetails().format, element: <ReferralDetailsPage />, title: "Referral Details", isSearchable: false },
];
