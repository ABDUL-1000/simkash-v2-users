import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq, KeyLabel } from "../types";

export function FaqTabs({ tabs, value, onChange }: { tabs: KeyLabel[]; value: string; onChange: (key: string) => void }) {
  return <div className="flex max-w-full items-center gap-1.5 overflow-x-auto whitespace-nowrap rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-1">
    {tabs.map((tab) => <button key={tab.key} type="button" onClick={() => onChange(tab.key)}
      className={`shrink-0 rounded-lg px-3 py-1 text-xs font-bold transition ${value === tab.key ? "bg-white text-[#0F152A] shadow-xs" : "text-[#8C909B] hover:text-[#0F152A]"}`}>{tab.label}</button>)}
  </div>;
}

/** Accordion of FAQs. Answers keep their line breaks. */
export function FaqList({ faqs, loading, emptyText = "No FAQs found." }: { faqs: Faq[]; loading?: boolean; emptyText?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  if (loading) return <div className="space-y-2">{[0, 1, 2, 3].map((i) => <div key={i} className="h-11 animate-pulse rounded-xl bg-slate-100" />)}</div>;
  if (faqs.length === 0) return <p className="py-6 text-center text-xs text-[#8C909B]">{emptyText}</p>;
  return <div className="divide-y divide-[#E2ECF6] text-xs">
    {faqs.map((faq) => {
      const expanded = open === faq.id;
      return <div key={faq.id} className="py-3.5">
        <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : faq.id)} className="flex w-full items-start justify-between gap-3 text-left text-sm font-extrabold text-[#0F152A]">
          <span>{faq.question}</span>
          <ChevronDown className={`mt-0.5 size-4 shrink-0 transition ${expanded ? "rotate-180 text-[#2563EB]" : "text-[#8C909B]"}`} />
        </button>
        {expanded && <div className="space-y-2 pt-2">
          <p className="whitespace-pre-line leading-relaxed text-[#66738C]">{faq.answer}</p>
          <span className="inline-block rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">{faq.category?.label}</span>
        </div>}
      </div>;
    })}
  </div>;
}
