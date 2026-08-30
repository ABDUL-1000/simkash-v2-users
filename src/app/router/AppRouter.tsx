import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import NotFoundPage from "@/components/error/NotFoundPage";
import { appPaths } from "./paths";
import { appRouteConfig } from "./routes";

export function AppRouter() {
  return <Routes>
    <Route path={appPaths.root} element={<Navigate to={appPaths.dashboard} replace />} />
    <Route element={<AdminLayout />}>
      {appRouteConfig.map((route) => <Route key={route.path} path={route.path} element={route.element} />)}
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>;
}
