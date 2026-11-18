import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export const inputClass = "w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB] disabled:bg-[#F8FAFC]";
export const footerClass = "flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end";
export const secondaryBtn = "rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-50";

export function PrimaryButton({ loading, children, tone = "blue", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; tone?: "blue" | "red" }) {
  const color = tone === "red" ? "bg-[#EF4444] hover:bg-red-600" : "bg-[#2563EB] hover:bg-blue-700";
  return <button {...props} disabled={props.disabled || loading}
    className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md disabled:opacity-50 ${color} ${props.className ?? ""}`}>
    {loading && <Loader2 className="size-4 animate-spin" />}{children}
  </button>;
}

export function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return <label className="block space-y-1.5">
    <span className="block text-xs font-bold text-[#0F152A]">{label}</span>
    {children}
    {hint && <span className="block text-[11px] text-[#8C909B]">{hint}</span>}
  </label>;
}

export function ErrorNote({ message }: { message?: string | null }) {
  if (!message) return null;
  return <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{message}</p>;
}

/** Chip row used for status and SIM type filters. */
export function FilterChips<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: string; count?: number }[]; onChange: (v: T) => void }) {
  return <div className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {options.map((o) => <button key={o.value} type="button" onClick={() => onChange(o.value)}
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold transition ${value === o.value ? "bg-[#2563EB] text-white" : "bg-white text-[#66738C] ring-1 ring-[#E2ECF6] hover:text-[#0F152A]"}`}>
      {o.label}
      {o.count != null && <span className={`rounded-full px-1.5 text-[10px] ${value === o.value ? "bg-white/20" : "bg-[#EFF4F8]"}`}>{o.count}</span>}
    </button>)}
  </div>;
}

export function Pager({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null;
  return <div className="flex items-center justify-between gap-3 text-xs">
    <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} className={secondaryBtn}>Previous</button>
    <span className="font-semibold text-[#66738C]">Page {page} of {totalPages}</span>
    <button type="button" disabled={page >= totalPages} onClick={() => onChange(page + 1)} className={secondaryBtn}>Next</button>
  </div>;
}
