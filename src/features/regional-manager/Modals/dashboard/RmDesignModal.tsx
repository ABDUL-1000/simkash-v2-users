import type { ReactNode } from "react";
import { Alert, Button, InputNumber } from "antd";
import { Minus, Plus, Smartphone } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { RmSuccessModal } from "../RmSuccessModal";
import { rmDesignTokens } from "../../components/dashboard/rmDesignTokens";
export function RmDesignModal({ title, subtitle, pending, error, onClose, onSubmit, submitLabel, children, onBack, disabled, submitColor = colors.primary }: {
  title: string; subtitle?: string; pending?: boolean; error?: Error | null; onClose: () => void; onSubmit: () => void;
  submitLabel: string; children: ReactNode; onBack?: () => void; disabled?: boolean; submitColor?: string;
}) {
  return <AppModal open title={title} description={subtitle} size="md" showCloseButton={!pending} onOpenChange={open => { if (!open && !pending) onClose(); }} footer={<div className="flex gap-3 border-t pt-4" style={{ borderColor: colors.border }}><Button block disabled={pending} onClick={onBack ?? onClose}>{onBack ? "← Back" : "Cancel"}</Button><Button block type="primary" style={{ background: submitColor, borderColor: submitColor }} loading={pending} disabled={disabled} onClick={onSubmit}>{submitLabel}</Button></div>}>
    <div className="rm-design space-y-4 border-t pt-4" style={{ ...rmDesignTokens, borderColor: colors.border }}>{error && <Alert type="error" showIcon title={error.message} />}{children}</div>
  </AppModal>;
}
export function RmQuantityRow({ label, available, value, onChange, max, disabled }: { label: string; available?: number; value: number; onChange: (value: number) => void; max?: number; disabled?: boolean }) {
  return <div className="flex flex-wrap items-center gap-3 py-2"><span className="flex size-9 items-center justify-center rounded-full" style={{ background: colors.blues.surfaceLight, color: colors.blues.primary }}><Smartphone size={17} /></span><div className="min-w-0 flex-1"><strong className="text-sm">{label}</strong>{available !== undefined && <p className="text-xs" style={{ color: colors.texts.muted }}>{available} available</p>}</div><div className="flex items-center gap-1"><Button shape="circle" aria-label={`Decrease ${label}`} disabled={disabled || value <= 0} onClick={() => onChange(Math.max(0, value - 1))} icon={<Minus size={13} />} /><InputNumber aria-label={`${label} quantity`} controls={false} min={0} max={max} precision={0} value={value} disabled={disabled} onChange={number => onChange(number ?? 0)} style={{ width: 68 }} /><Button shape="circle" type="primary" aria-label={`Increase ${label}`} disabled={disabled || (max !== undefined && value >= max)} onClick={() => onChange(value + 1)} icon={<Plus size={13} />} /></div></div>;
}
export function RmConfirmed({ title, result, rows = [], onClose }: { title: string; result: { message: string; data: unknown }; rows?: Array<{ label: string; value: ReactNode }>; onClose: () => void }) {
  const data = result.data && typeof result.data === "object" ? result.data as Record<string, unknown> : {};
  const details = [...rows];
  for (const key of ["reference", "status", "response_estimate"]) if (typeof data[key] === "string") details.push({ label: key.replaceAll("_", " "), value: String(data[key]) });
  return <RmSuccessModal open title={title} subtitle={result.message} details={details} onOpenChange={open => { if (!open) onClose(); }} />;
}
