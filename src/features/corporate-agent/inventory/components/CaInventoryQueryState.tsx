import type { ReactNode } from "react";
import { Alert, Button, Skeleton } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
export function CaInventoryQueryState({ query, children }: { query: { isLoading: boolean; error: Error | null; data: unknown; refetch: () => unknown }; children: ReactNode }) {
 if (query.isLoading) return <Skeleton active />;
 if (query.error) return <Alert type="error" showIcon title="Unable to load inventory" description={query.error.message} action={<Button onClick={() => void query.refetch()}>Retry</Button>} />;
 if (!query.data) return <AppEmptyState title="No inventory data" />;
 return <>{children}</>;
}
