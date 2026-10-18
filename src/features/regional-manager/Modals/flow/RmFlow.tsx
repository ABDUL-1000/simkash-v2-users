import type { ReactNode } from "react";
import { Spin } from "antd";
import { AlertTriangle, Check, CheckCircle2, Clock, Info, LoaderCircle, Minus, Plus, X, XCircle, type LucideIcon } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { APP_COLORS } from "@/constants/colors";
import { rmFlow } from "./rmFlowTokens";


type Tone = "info" | "warning" | "success" | "danger" | "neutral";
const tones: Record<Tone, { bg: string; ink: string; border: string; icon: LucideIcon }> = {
  info: { bg: rmFlow.blueBg, ink: rmFlow.blueInk, border: "#DBEAFE", icon: Info },
  warning: { bg: rmFlow.amberBg, ink: rmFlow.amberInk, border: "#FCD34D", icon: AlertTriangle },
  success: { bg: rmFlow.greenBg, ink: "#047857", border: "#A7F3D0", icon: CheckCircle2 },
  danger: { bg: rmFlow.redBg, ink: rmFlow.red, border: "#FECACA", icon: XCircle },
  neutral: { bg: rmFlow.base, ink: rmFlow.slate, border: rmFlow.border, icon: Info },
};

export interface RmFlowButton { label: ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean; color?: string }
export function RmFlowFooter({ secondary, primary }: { secondary?: RmFlowButton; primary?: RmFlowButton }) {
  return <div className="flex gap-3 border-t pt-4" style={{ borderColor: rmFlow.border }}>
    {secondary && <button type="button" disabled={secondary.disabled} onClick={secondary.onClick} className="min-h-11 flex-1 rounded-xl text-sm font-semibold transition hover:brightness-95 disabled:opacity-50" style={{ background: "#F1F5F9", color: rmFlow.slate }}>{secondary.label}</button>}
    {primary && <button type="button" disabled={primary.disabled || primary.loading} onClick={primary.onClick} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45" style={{ background: primary.color ?? rmFlow.navy }}>{primary.loading && <LoaderCircle className="size-4 animate-spin" />}{primary.label}</button>}
  </div>;
}

export function RmFlowModal({ title, subtitle, onClose, pending, children, secondary, primary, size = "sm", footer }: {
  title: ReactNode; subtitle?: ReactNode; onClose: () => void; pending?: boolean; children: ReactNode; secondary?: RmFlowButton; primary?: RmFlowButton; size?: "sm" | "md" | "lg"; footer?: ReactNode;
}) {
  return <AppModal open size={size} title={<span style={{ color: rmFlow.navy }}>{title}</span>} description={subtitle} showCloseButton={!pending}
    onOpenChange={open => { if (!open && !pending) onClose(); }} footer={footer ?? (secondary || primary ? <RmFlowFooter secondary={secondary} primary={primary} /> : null)}>
    <div className="space-y-4 border-t pt-4 text-left" style={{ borderColor: rmFlow.border, color: rmFlow.ink }}>{children}</div>
  </AppModal>;
}

export const RmLabel = ({ children, right }: { children: ReactNode; right?: ReactNode }) =>
  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: rmFlow.muted }}><span>{children}</span>{right}</div>;

export function RmNote({ tone = "info", title, children, icon, action }: { tone?: Tone; title?: ReactNode; children?: ReactNode; icon?: LucideIcon; action?: ReactNode }) {
  const t = tones[tone]; const Icon = icon ?? t.icon;
  return <div className="flex gap-2.5 rounded-xl border p-3 text-xs leading-relaxed" style={{ background: t.bg, color: t.ink, borderColor: t.border }}>
    <Icon className="mt-0.5 size-4 shrink-0" /><div className="min-w-0 flex-1">{title && <p className="font-semibold">{title}</p>}{children}{action && <div className="mt-1.5">{action}</div>}</div>
  </div>;
}

export function RmStockBox({ title, children, tone = "neutral", icon }: { title: ReactNode; children?: ReactNode; tone?: Tone; icon?: LucideIcon }) {
  const t = tones[tone]; const Icon = icon;
  return <div className="rounded-xl p-3.5" style={{ background: tone === "neutral" ? rmFlow.base : t.bg }}>
    <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: tone === "neutral" ? rmFlow.navy : t.ink }}>{Icon && <Icon className="size-4" />}{title}</p>
    {children && <div className="mt-1 text-xs" style={{ color: rmFlow.muted }}>{children}</div>}
  </div>;
}

export function RmStepperRow({ icon: Icon, label, hint, value, onChange, max, disabled, after, iconBg = rmFlow.softBlue, iconColor = rmFlow.navy }: {
  icon: LucideIcon; label: ReactNode; hint?: ReactNode; value: number; onChange: (value: number) => void; max?: number; disabled?: boolean; after?: ReactNode; iconBg?: string; iconColor?: string;
}) {
  const clamp = (next: number) => Math.max(0, max === undefined ? next : Math.min(max, next));
  const muted = disabled || max === 0;
  return <div className="flex flex-wrap items-center gap-3 py-2.5" style={{ opacity: muted ? 0.55 : 1 }}>
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl" style={{ background: iconBg, color: iconColor }}><Icon className="size-[18px]" /></span>
    <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{label}</p>{hint !== undefined && <p className="text-xs" style={{ color: rmFlow.muted }}>{hint}</p>}</div>
    {after && <div className="text-right text-[11px] leading-tight">{after}</div>}
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Decrease" disabled={muted || value <= 0} onClick={() => onChange(clamp(value - 1))} className="flex size-8 items-center justify-center rounded-full border bg-white transition hover:bg-slate-50 disabled:opacity-40" style={{ borderColor: rmFlow.border, color: rmFlow.ink }}><Minus className="size-3.5" /></button>
      <input aria-label={typeof label === "string" ? `${label} quantity` : "Quantity"} inputMode="numeric" disabled={muted} value={value} onChange={event => onChange(clamp(Number(event.target.value.replace(/\D/g, "")) || 0))}
        className="h-9 w-14 rounded-lg border-0 bg-transparent text-center text-base font-bold outline-none focus:ring-2 focus:ring-blue-100" style={{ color: rmFlow.navy }} />
      <button type="button" aria-label="Increase" disabled={muted || (max !== undefined && value >= max)} onClick={() => onChange(clamp(value + 1))} className="flex size-8 items-center justify-center rounded-full text-white transition hover:brightness-110 disabled:opacity-40" style={{ background: rmFlow.blue }}><Plus className="size-3.5" /></button>
    </div>
  </div>;
}

export function RmPills<T extends string>({ value, options, onChange, disabled }: { value: T; options: Array<{ value: T; label: ReactNode; disabled?: boolean }>; onChange: (value: T) => void; disabled?: boolean }) {
  return <div className="flex flex-wrap gap-2">{options.map(option => {
    const active = option.value === value;
    return <button key={option.value} type="button" disabled={disabled || option.disabled} onClick={() => onChange(option.value)} aria-pressed={active}
      className="rounded-full border px-4 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-45" style={{ background: active ? rmFlow.blue : rmFlow.white, color: active ? "#fff" : rmFlow.slate, borderColor: active ? rmFlow.blue : rmFlow.border }}>{option.label}</button>;
  })}</div>;
}

export const RmTotalBar = ({ left, right }: { left: ReactNode; right?: ReactNode }) =>
  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl px-4 py-3" style={{ background: rmFlow.base }}><strong className="text-sm" style={{ color: rmFlow.navy }}>{left}</strong>{right && <span className="text-xs" style={{ color: rmFlow.muted }}>{right}</span>}</div>;

export type RmReceiptRow = [ReactNode, ReactNode, string?] | "divider";
export function RmReceipt({ heading, rows, footer, highlight }: { heading?: ReactNode; rows: RmReceiptRow[]; footer?: ReactNode; highlight?: boolean }) {
  return <div className="w-full rounded-xl p-4 text-left" style={{ background: highlight ? rmFlow.white : rmFlow.base, border: highlight ? `1.5px solid ${rmFlow.navy}` : undefined }}>
    {heading && <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: rmFlow.muted }}>{heading}</p>}
    <div className="space-y-2">{rows.map((row, index) => row === "divider"
      ? <div key={index} className="border-t" style={{ borderColor: rmFlow.border }} />
      : <div key={index} className="flex items-start justify-between gap-3 text-xs"><span style={{ color: rmFlow.muted }}>{row[0]}</span><span className="text-right font-semibold" style={{ color: row[2] ?? rmFlow.ink }}>{row[1]}</span></div>)}</div>
    {footer && <div className="mt-3 border-t pt-3" style={{ borderColor: rmFlow.border }}>{footer}</div>}
  </div>;
}

export const RmBadge = ({ children, tone = "info" }: { children: ReactNode; tone?: Tone }) =>
  <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ background: tones[tone].bg, color: tones[tone].ink }}>{children}</span>;

export const RmAvatar = ({ initials, size = 36, tone = rmFlow.softBlue }: { initials: string; size?: number; tone?: string }) =>
  <span className="flex shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ width: size, height: size, background: tone, color: rmFlow.navy }}>{initials}</span>;

type ResultStatus = "success" | "pending" | "failed" | "declined";
const resultIcons: Record<ResultStatus, { icon: LucideIcon; bg: string; ring: string; color: string }> = {
  success: { icon: Check, bg: rmFlow.blue, ring: "#DBEAFE", color: "#fff" },
  pending: { icon: Clock, bg: "#FDE68A", ring: "#FEF3C7", color: rmFlow.amberInk },
  failed: { icon: X, bg: rmFlow.redBg, ring: "#FEE2E2", color: rmFlow.red },
  declined: { icon: X, bg: rmFlow.amber, ring: "#FEF3C7", color: "#fff" },
};
export interface RmResultAction { label: ReactNode; onClick: () => void; variant?: "primary" | "secondary" | "text" | "danger"; color?: string }
export function RmResultModal({ status = "success", title, subtitle, children, actions, onClose, iconColor }: {
  status?: ResultStatus; title: ReactNode; subtitle?: ReactNode; children?: ReactNode; actions: RmResultAction[]; onClose: () => void; iconColor?: string;
}) {
  const visual = resultIcons[status]; const Icon = visual.icon;
  const primary = actions.filter(action => (action.variant ?? "primary") === "primary");
  const rest = actions.filter(action => (action.variant ?? "primary") !== "primary");
  return <AppModal open size="sm" title="" onOpenChange={open => { if (!open) onClose(); }} footer={null}>
    <div className="flex flex-col items-center gap-4 pb-1 text-center">
      <span className="flex size-20 items-center justify-center rounded-full" style={{ background: visual.ring }}><span className="flex size-14 items-center justify-center rounded-full" style={{ background: iconColor ?? visual.bg, color: visual.color }}><Icon className="size-7 stroke-[3]" /></span></span>
      <div><h2 className="text-xl font-bold" style={{ color: rmFlow.navy }}>{title}</h2>{subtitle && <p className="mx-auto mt-1 max-w-xs text-xs" style={{ color: rmFlow.muted }}>{subtitle}</p>}</div>
      {children && <div className="w-full space-y-3">{children}</div>}
      <div className="w-full space-y-2 pt-1">
        {primary.map((action, index) => <button key={index} type="button" onClick={action.onClick} className="min-h-11 w-full rounded-xl text-sm font-semibold text-white transition hover:brightness-110" style={{ background: action.color ?? rmFlow.blue }}>{action.label}</button>)}
        {rest.length > 0 && <div className="flex gap-2">{rest.map((action, index) => <button key={index} type="button" onClick={action.onClick} className="min-h-10 flex-1 rounded-xl text-xs font-semibold transition hover:brightness-95"
          style={action.variant === "danger" ? { border: `1px solid ${rmFlow.red}`, color: rmFlow.red, background: "#fff" } : action.variant === "text" ? { color: rmFlow.slate } : { background: "#F1F5F9", color: rmFlow.ink }}>{action.label}</button>)}</div>}
      </div>
    </div>
  </AppModal>;
}

export function RmProcessingModal({ title, subtitle, icon: Icon }: { title: ReactNode; subtitle?: ReactNode; icon?: LucideIcon }) {
  return <AppModal open size="sm" title="" showCloseButton={false} onOpenChange={() => undefined} footer={null}>
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      {Icon ? <Icon className="size-9 animate-pulse" style={{ color: rmFlow.green }} /> : <Spin size="large" />}
      <h2 className="text-lg font-bold" style={{ color: rmFlow.navy }}>{title}</h2>
      {subtitle && <p className="text-xs" style={{ color: rmFlow.muted }}>{subtitle}</p>}
      <p className="text-[11px]" style={{ color: APP_COLORS.texts.light }}>Do not close this screen</p>
    </div>
  </AppModal>;
}

export function RmPinInput({ value, onChange, disabled, error, label = "Enter PIN to confirm" }: { value: string; onChange: (value: string) => void; disabled?: boolean; error?: ReactNode; label?: ReactNode }) {
  return <div className="space-y-2 text-center">
    <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: rmFlow.muted }}>{label}</p>
    <InputOTP maxLength={4} value={value} onChange={onChange} disabled={disabled} inputMode="numeric" pattern="^[0-9]*$" autoComplete="off" aria-label="Transaction PIN" containerClassName="justify-center"
      render={({ slots }) => <InputOTPGroup className="gap-3">{slots.map((slot, index) => <div key={index} className="flex size-12 items-center justify-center rounded-xl border bg-white text-xl font-bold" style={{ borderColor: slot.isActive ? rmFlow.blue : error ? rmFlow.red : rmFlow.border, color: rmFlow.navy }}>{slot.char ? "•" : ""}</div>)}</InputOTPGroup>} />
    {error && <p className="text-xs" style={{ color: rmFlow.red }}>{error}</p>}
  </div>;
}
