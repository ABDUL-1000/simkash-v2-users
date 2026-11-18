import { useRef, useState } from "react";
import { FileText, ImageIcon, Paperclip, X } from "lucide-react";
import type { AttachmentRules } from "../types";
import { checkFile, fmtBytes, typesLabel } from "../utils";

/** Pick up to `maxFiles` files; shows chips with remove buttons and the upload rules. */
export function AttachmentPicker({ files, onChange, rules, compact = false }: {
  files: File[]; onChange: (files: File[]) => void; rules: AttachmentRules; compact?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const accept = rules.allowedTypes.map((t) => (t.includes("/") ? t : `.${t.replace(".", "")}`)).join(",");
  const full = files.length >= rules.maxFiles;

  const add = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list);
    const problems: string[] = [];
    const next = [...files];
    for (const file of picked) {
      if (next.length >= rules.maxFiles) { problems.push(`You can attach up to ${rules.maxFiles} files`); break; }
      const issue = checkFile(file, rules);
      if (issue) problems.push(issue); else next.push(file);
    }
    setError(problems[0] ?? null);
    onChange(next);
    if (input.current) input.current.value = "";
  };

  return <div className="space-y-2">
    <input ref={input} type="file" multiple accept={accept} className="hidden" onChange={(e) => add(e.target.files)} />
    {compact ? <button type="button" disabled={full} onClick={() => input.current?.click()} className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline disabled:opacity-40 disabled:no-underline">
      <Paperclip className="size-4" /> Attach file
    </button> : <button type="button" disabled={full} onClick={() => input.current?.click()}
      className="flex w-full flex-col items-center gap-1 rounded-2xl border border-dashed border-[#C7DAFC] bg-[#F8FAFC] px-4 py-5 text-center transition hover:border-[#2563EB] disabled:opacity-50">
      <Paperclip className="size-5 text-[#2563EB]" />
      <span className="text-xs font-bold text-[#0F152A]">{full ? "Maximum files attached" : "Tap to attach screenshots or receipts"}</span>
      <span className="text-[10px] text-[#8C909B]">Up to {rules.maxFiles} files · {typesLabel(rules.allowedTypes)} · {fmtBytes(rules.maxBytes)} each</span>
    </button>}
    {files.length > 0 && <div className="flex flex-wrap gap-2">
      {files.map((file, i) => <span key={`${file.name}-${i}`} className="flex max-w-full items-center gap-1.5 rounded-lg border border-[#E2ECF6] bg-white py-1 pl-2 pr-1 text-[11px] font-semibold text-[#0F152A]">
        {file.type.startsWith("image/") ? <ImageIcon className="size-3.5 shrink-0 text-[#2563EB]" /> : <FileText className="size-3.5 shrink-0 text-[#EF4444]" />}
        <span className="truncate">{file.name}</span><span className="shrink-0 text-[#8C909B]">{fmtBytes(file.size)}</span>
        <button type="button" aria-label={`Remove ${file.name}`} onClick={() => onChange(files.filter((_, j) => j !== i))} className="rounded p-0.5 text-[#8C909B] hover:bg-slate-100 hover:text-[#EF4444]"><X className="size-3.5" /></button>
      </span>)}
    </div>}
    {error && <p className="text-[11px] font-semibold text-[#EF4444]">{error}</p>}
  </div>;
}
