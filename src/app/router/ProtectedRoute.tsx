import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "./paths";

/**
 * Route guard that ensures only authenticated users can access inside app pages (e.g. Dashboard).
 * Unauthenticated users are redirected to the login page.
 */
export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={appPaths.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
