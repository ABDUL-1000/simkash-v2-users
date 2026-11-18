import { useEffect, useRef } from "react";
import { CheckCheck, Clock, FileText } from "lucide-react";
import type { Attachment, ConversationItem } from "../types";
import { fmtShort, initials } from "../utils";

function AttachmentChip({ file, mine }: { file: Attachment; mine: boolean }) {
  const name = file.name ?? file.fileName ?? "Attachment";
  const isImage = file.mimeType?.startsWith("image/") ?? /\.(png|jpe?g|webp|gif)$/i.test(file.url);
  if (isImage) return <a href={file.url} target="_blank" rel="noreferrer" className="block"><img src={file.url} alt={name} className="max-h-40 rounded-xl border border-white/20 object-cover" /></a>;
  return <a href={file.url} target="_blank" rel="noreferrer" className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-bold underline-offset-2 hover:underline ${mine ? "bg-white/15 text-white" : "bg-white text-[#2563EB]"}`}>
    <FileText className="size-3.5 shrink-0" /><span className="truncate">{name}</span>
  </a>;
}

/** Message bubbles and centred system events. Scrolls to the newest item. */
export function Conversation({ items, typing, awaiting, className = "" }: { items: ConversationItem[]; typing?: boolean; awaiting?: boolean; className?: string }) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }); }, [items.length, typing]);

  return <div className={`space-y-4 text-xs ${className}`}>
    {items.length === 0 && <p className="py-6 text-center text-[11px] text-[#8C909B]">No messages yet.</p>}
    {items.map((item, i) => {
      if (item.kind === "event") return <p key={`e-${i}-${item.at}`} className="px-2 text-center text-[10px] font-bold text-[#8C909B]">{item.text} · {fmtShort(item.at)}</p>;
      const mine = item.sender?.isMe;
      return <div key={item.pending ? item.clientId : item.messageId} className={`flex gap-2 ${mine ? "flex-row-reverse" : ""}`}>
        <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${mine ? "bg-[#2563EB] text-white" : "bg-[#0F152A] text-white"}`}>{mine ? "Y" : initials(item.sender?.name ?? "Support Team")}</span>
        <div className={`flex min-w-0 max-w-[85%] flex-col gap-1 sm:max-w-[75%] ${mine ? "items-end" : "items-start"}`}>
          <div className="flex items-center gap-1.5 text-[10px] text-[#8C909B]">
            <span className="font-bold text-[#0F152A]">{mine ? "You" : item.sender?.name ?? "Support Team"}</span>
            {!mine && <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">Simkash</span>}
            <span>{item.pending ? "Sending…" : fmtShort(item.at)}</span>
          </div>
          <div className={`space-y-2 whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 font-medium leading-relaxed ${mine ? "rounded-tr-sm bg-[#2563EB] text-white" : "rounded-tl-sm border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A]"} ${item.pending ? "opacity-60" : ""}`}>
            {item.body && <p>{item.body}</p>}
            {item.attachments?.length > 0 && <div className="flex flex-col gap-1.5">{item.attachments.map((file, j) => <AttachmentChip key={file.id ?? `${file.url}-${j}`} file={file} mine={Boolean(mine)} />)}</div>}
          </div>
          {mine && !item.pending && <span className="flex items-center gap-0.5 text-[9px] text-[#8C909B]">{item.readAt ? <><CheckCheck className="size-3 text-[#2563EB]" /> Read</> : <><Clock className="size-3" /> Sent</>}</span>}
        </div>
      </div>;
    })}
    {typing && <div className="flex items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#0F152A] text-[10px] font-bold text-white">ST</span>
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2.5" aria-label="Support is typing">
        {[0, 150, 300].map((d) => <span key={d} className="size-1.5 animate-bounce rounded-full bg-[#8C909B]" style={{ animationDelay: `${d}ms` }} />)}
      </div>
    </div>}
    {awaiting && !typing && <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#2563EB]"><span className="animate-pulse">●●●</span> Still waiting for response…</p>}
    <div ref={end} />
  </div>;
}
