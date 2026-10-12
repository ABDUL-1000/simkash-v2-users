import type { ReactNode } from "react";
import { Alert, Button, Skeleton } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
export function CaQueryState({ loading, error, empty, retry, children }: { loading: boolean; error: Error | null; empty?: boolean; retry: () => void; children: ReactNode }) {
  if (loading) return <Skeleton active />;
  if (error) return <Alert type="error" showIcon title="Unable to load dashboard data" description={error.message} action={<Button onClick={retry}>Retry</Button>} />;
  if (empty) return <AppEmptyState title="No dashboard data" description="Your corporate dashboard data will appear here when available." />;
  return <>{children}</>;
}

