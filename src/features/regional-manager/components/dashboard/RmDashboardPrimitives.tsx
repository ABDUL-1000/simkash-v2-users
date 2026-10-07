import type { ReactNode } from "react";
import { Alert, Button, Skeleton, Tag } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { colors } from "@/constants/colors";

export function RmSection({ title, description, actions, children }: { title: string; description?: string; actions?: PageHeaderAction[]; children: ReactNode }) {
  return <section className="min-w-0 space-y-4 rounded-2xl border p-4 sm:p-5" style={{ borderColor: colors.border, background: colors.backgrounds.background, color: colors.textPrimary }}>
    <PageHeader title={title} description={description} actions={actions} />{children}
  </section>;
}
export function RmMetric({ label, value, subtitle }: { label: string; value: ReactNode; subtitle?: string }) {
  return <div className="rounded-xl border p-4" style={{ borderColor: colors.border, background: colors.backgrounds.background }}>
    <p className="text-sm" style={{ color: colors.textSecondary }}>{label}</p><p className="mt-2 text-2xl font-bold" style={{ color: colors.textPrimary }}>{value}</p>
    {subtitle && <p className="mt-2 text-xs" style={{ color: colors.textSecondary }}>{subtitle}</p>}
  </div>;
}
export function RmQueryState({ loading, error, empty, retry, children }: { loading: boolean; error: Error | null; empty?: boolean; retry: () => void; children: ReactNode }) {
  if (loading) return <Skeleton active />;
  if (error) return <Alert type="error" showIcon title="Unable to load regional data" description={error.message} action={<Button onClick={retry}>Retry</Button>} />;
  if (empty) return <AppEmptyState title="No regional data available" description="Your regional data will appear when available." />;
  return <>{children}</>;
}
export function RmStatus({ value }: { value: string }) {
  const status = value.toLowerCase().replaceAll("_", " ");
  const tone = ["active", "all active", "normal", "good", "achieved", "on track", "activated", "success", "successful", "approved", "verified", "completed", "paid"].includes(status) ? colors.success
    : ["critical", "suspended", "out of stock", "failed", "rejected", "missed"].includes(status) ? colors.danger
      : ["warning", "at risk", "needs action", "low stock", "pending"].includes(status) ? colors.warning : colors.primary;
  const surface = tone === colors.success ? colors.greens.light : tone === colors.danger ? colors.reds.light : tone === colors.warning ? colors.ambers.light : colors.blues.surfaceLight;
  return <Tag style={{ color: tone, borderColor: "transparent", background: surface }}>{value.replaceAll("_", " ")}</Tag>;
}
