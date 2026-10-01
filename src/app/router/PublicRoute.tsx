import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "./paths";

/**
 * Route guard that ensures unauthenticated users see public auth pages (Login, Register, etc.).
 * Authenticated users are kept inside the app and redirected to the dashboard.
 * Onboarding routes (profile-setup, set-pin) are allowed for authenticated users.
 */
export function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  // Allow profile and PIN setup onboarding flows even if user has a token
  const isOnboardingRoute =
    location.pathname === appPaths.profileSetup ||
    location.pathname === appPaths.setPin ||
    location.pathname === appPaths.confirmPin;

  if (isAuthenticated && !isOnboardingRoute) {
    return <Navigate to={appPaths.dashboard} replace />;
  }

  return <Outlet />;
}
