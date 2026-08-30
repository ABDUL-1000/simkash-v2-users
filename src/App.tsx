import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/app/router/AppRouter";
import { FullScreenLoader } from "@/components/loaders/FullScreenLoader";
import { AppProviders } from "@/providers/AppProviders";
export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<FullScreenLoader />}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </AppProviders>
  );
}
