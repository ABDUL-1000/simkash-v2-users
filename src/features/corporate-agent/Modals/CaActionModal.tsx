import type { ReactNode } from "react";
import { Alert, Button } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { CaSuccessModal } from "@/features/corporate-agent/Modals/CaSuccessModal";
export function CaActionModal({ title, description, children, onClose, onSubmit, pending, error, disabled, submitLabel = "Submit" }: {
  title: string; description: string; children: ReactNode; onClose: () => void; onSubmit: () => void; pending: boolean; error: Error | null; disabled?: boolean; submitLabel?: string;
}) {
  return <AppModal open title={title} description={description} size="md" showCloseButton={!pending} onOpenChange={open => { if (!open && !pending) onClose(); }} footer={<div className="flex flex-col gap-2 sm:flex-row sm:justify-end"><Button disabled={pending} onClick={onClose}>Cancel</Button><Button type="primary" loading={pending} disabled={disabled} onClick={onSubmit}>{submitLabel}</Button></div>}><div className="space-y-4 pt-1 text-xs" style={{ color: APP_COLORS.texts.primary }}>{error && <Alert type="error" showIcon title={error.message} />}{children}</div></AppModal>;
}
export function CaConfirmed({ title, result, onClose }: { title: string; result: { message: string; data: unknown }; onClose: () => void }) {
  const data = result.data && typeof result.data === "object" ? result.data as Record<string, unknown> : {};
  const keys = ["reference", "status", "amount", "total_distributed", "partners_replenished", "sim_type", "fullname", "initial_stock_assigned", "quantity", "request_id"];
  const details = keys.filter(key => typeof data[key] === "string" || typeof data[key] === "number").map(key => ({ label: key.replaceAll("_", " "), value: key === "amount" ? `₦${Number(data[key]).toLocaleString()}` : String(data[key]) }));
  return <CaSuccessModal open title={title} subtitle={result.message} details={details} onOpenChange={open => { if (!open) onClose(); }} />;
}
