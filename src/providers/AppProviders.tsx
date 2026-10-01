import type { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/error/ErrorBoundry";
import { antdTheme } from "@/constants/theme";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { NetworkStatusProvider } from "./NetworkStatusProvider";
import { QueryProvider } from "./QueryProvider";
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary message="Please contact an administrator.">
      <QueryProvider>
        <ConfigProvider theme={antdTheme} renderEmpty={() => <AppEmptyState />}>
          <NetworkStatusProvider>
            {children}
            <Toaster richColors position="top-right" />
          </NetworkStatusProvider>
        </ConfigProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
