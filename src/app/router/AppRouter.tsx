import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import NotFoundPage from "@/components/error/NotFoundPage";
import { appPaths } from "./paths";
import { appRouteConfig } from "./routes";
import { authRoutes } from "@/features/auth/auth.routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { useAuthStore } from "@/store/authStore";

export function AppRouter() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Dynamic Root Route: directs to dashboard if authenticated, login if not */}
      <Route
        path={appPaths.root}
        element={
          <Navigate
            to={isAuthenticated ? appPaths.dashboard : appPaths.login}
            replace
          />
        }
      />

      {/* Public / Guest Routes (Auth Pages) */}
      {/* Authenticated users are prevented from seeing auth pages and redirected to dashboard */}
      <Route element={<PublicRoute />}>
        {authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* Support common alias paths */}
        <Route path="/login" element={<Navigate to={appPaths.login} replace />} />
        <Route path="/register" element={<Navigate to={appPaths.register} replace />} />
        <Route path="/forgot-password" element={<Navigate to={appPaths.forgotPassword} replace />} />
        <Route path="/reset-password" element={<Navigate to={appPaths.resetPassword} replace />} />
      </Route>

      {/* Protected Routes (Dashboard & App Pages) */}
      {/* Unauthenticated users are prevented from seeing dashboard and redirected to login */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          {appRouteConfig.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
