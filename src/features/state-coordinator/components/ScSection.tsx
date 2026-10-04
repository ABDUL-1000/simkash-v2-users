import type { ReactNode } from "react";
import { Alert, Button, Skeleton } from "antd";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";

export function ScSection({ title, description, children, actions }: { title: string; description?: string; children: ReactNode; actions?: PageHeaderAction[] }) {
  return <section className="min-w-0 space-y-4 rounded-2xl border p-5" style={{ borderColor: colors.border, background: colors.backgrounds.background }}>
    <PageHeader title={title} description={description} actions={actions} />
    {children}
  </section>;
}

export function ScQueryState({ loading, error, retry, empty, children }: {
  loading: boolean; error: Error | null; retry: () => void; empty?: boolean; children: ReactNode;
}) {
  if (loading) return <Skeleton active />;
  if (error) return <Alert type="error" showIcon title="Unable to load data" description={error.message}
    action={<Button onClick={retry}>Retry</Button>} />;
  if (empty) return <AppEmptyState title="No data available" description="Your coordinator information will appear here when available." />;
  return <>{children}</>;
}

export function ScMetric({ label, value, subtext, highlight }: { label: string; value: ReactNode; subtext?: string; highlight?: boolean }) {
  return <div className="rounded-xl border p-4" style={{ borderColor: colors.border, background: colors.backgrounds.background }}>
    <p className="text-sm" style={{ color: colors.textSecondary }}>{label}</p>
    <p className="mt-2 text-2xl font-bold" style={{ color: highlight ? colors.success : colors.textPrimary }}>{value}</p>
    {subtext && <p className="mt-2 text-xs" style={{ color: colors.textSecondary }}>{subtext}</p>}
  </div>;
}
