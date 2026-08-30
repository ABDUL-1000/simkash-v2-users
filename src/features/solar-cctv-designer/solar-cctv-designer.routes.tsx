import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import SolarCctvDesignerOverviewPage from "./pages/SolarCctvDesignerOverviewPage";
import ComponentPricingPage from "./pages/ComponentPricingPage";
import SolarDesignDetailsPage from "./pages/SolarDesignDetailsPage";
import StateSolarIrradiancePage from "./pages/StateSolarIrradiancePage";
import SolarDesignToolPreviewPage from "./pages/SolarDesignToolPreviewPage";

export const SolarCctvDesignerRoutes: TRouteData[] = [
  {
    path: appPaths.solarCctvDesigner,
    element: <SolarCctvDesignerOverviewPage />,
    title: "Solar CCTV Designer",
    isSearchable: true,
  },
  {
    path: appPaths.solarComponentPricing,
    element: <ComponentPricingPage />,
    title: "Component Pricing",
    isSearchable: true,
  },
  {
    path: appPaths.solarCctvDesignDetails().format,
    element: <SolarDesignDetailsPage />,
    title: "Solar Design Details",
    isSearchable: false,
  },
  {
    path: appPaths.solarIrradianceData,
    element: <StateSolarIrradiancePage />,
    title: "State Solar Irradiance Data",
    isSearchable: true,
  },
  {
    path: appPaths.solarDesignerPreview,
    element: <SolarDesignToolPreviewPage />,
    title: "Solar Design Tool Preview",
    isSearchable: false,
  },
];
