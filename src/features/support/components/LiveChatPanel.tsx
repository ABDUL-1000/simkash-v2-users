import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, MessageCircle, Send, WifiOff } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";
import { useCloseTicket, useReplyTicket, useSupportHome, useSupportTicket } from "../api";
import { useSupportSocket } from "../socket/context";
import { dropPending, upsertMessage } from "../socket/cache";
import type { ChatStartResult } from "../types";
import { DEFAULT_RULES, LIMITS } from "../utils";
import { AttachmentPicker } from "./AttachmentPicker";
import { Conversation } from "./Conversation";

const TYPING_IDLE = 3000;

/** Global live chat (Socket.IO). Mounted once by SupportSocketProvider. */
export function LiveChatPanel() {
  const socket = useSupportSocket();
  const { activeChat, chatOpen, endedChat } = socket;
  const close = () => socket.closeChat();
  const title = activeChat ? "Live Chat" : endedChat ? "Chat ended" : "Start a Live Chat";
  const description = activeChat
    ? `${activeChat.ticketNumber} · ${activeChat.assigned ? "Connected to Support Team" : "Waiting for an agent"}`
    : endedChat ? endedChat.ticketNumber : "Chat with Simkash Support in real time";

  return <AppModal open={chatOpen} onOpenChange={(v) => { if (!v) close(); }} title={title} description={description} size="md">
    {!socket.connected && <p className="mb-3 flex items-center gap-1.5 rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-2.5 text-[11px] font-semibold text-[#D9990D]"><WifiOff className="size-3.5" /> Reconnecting… messages will sync when you're back online.</p>}
    {activeChat ? <ActiveChatView key={activeChat.ticketId} /> : endedChat ? <EndedView /> : <StartView />}
  </AppModal>;
}

function StartView() {
  const socket = useSupportSocket();
  const home = useSupportHome();
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const restOnline = home.data?.contactChannels.find((c) => c.key === "live_chat")?.online;
  const online = socket.online ?? restOnline ?? false;

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStarting(true); setError(null);
    try {
      const res = await socket.emit<ChatStartResult>("chat:start", { message: message.trim(), ...(category ? { category } : {}) });
      socket.setActiveChat({ ticketId: res.ticketId, ticketNumber: res.ticketNumber, status: "open", assigned: res.assigned, queuePosition: res.queuePosition });
      setMessage("");
    } catch (err) { setError((err as Error).message); }
    finally { setStarting(false); }
  };

  if (!online) return <div className="space-y-4 py-2 text-center">
    <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-[#66738C]"><MessageCircle className="size-5" /></span>
    <div><p className="text-sm font-bold text-[#0F152A]">No agents are online right now</p><p className="mt-1 text-xs text-[#66738C]">Leave us a message and we'll reply to your ticket as soon as we're back.</p></div>
    <button type="button" onClick={() => { socket.closeChat(); socket.openCreateTicket(category || undefined); }} className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700">Leave a Message</button>
  </div>;

  return <form onSubmit={start} className="space-y-4 pt-1">
    <p className="flex items-center gap-1.5 text-[11px] font-bold text-[#10B981]"><span className="size-2 rounded-full bg-[#10B981]" /> Support is online</p>
    {(home.data?.categories?.length ?? 0) > 0 && <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Topic (optional)</p>
      <div className="flex flex-wrap gap-1.5">{home.data!.categories.map((c) => <button key={c.key} type="button" onClick={() => setCategory(category === c.key ? "" : c.key)}
        className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${category === c.key ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{c.label}</button>)}</div>
    </div>}
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">How can we help?</p>
      <textarea autoFocus value={message} maxLength={LIMITS.message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Describe your issue…"
        className="w-full resize-none rounded-xl border border-[#E2ECF6] px-3 py-2.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]" />
    </div>
    {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}
    <button type="submit" disabled={!message.trim() || starting || !socket.connected} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-600 disabled:opacity-50">
      {starting ? <Loader2 className="size-4 animate-spin" /> : <MessageCircle className="size-4" />} {starting ? "Connecting…" : "Start Chat"}
    </button>
  </form>;
}

function ActiveChatView() {
  const socket = useSupportSocket();
  const chat = socket.activeChat!;
  const client = useQueryClient();
  const ticket = useSupportTicket(chat.ticketId);
  const home = useSupportHome();
  const reply = useReplyTicket();
  const closeTicket = useCloseTicket();
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const typingSent = useRef(false);
  const typingTimer = useRef<number | undefined>(undefined);
  const items = ticket.data?.conversation ?? [];
  const supportCount = items.filter((c) => c.kind === "message" && !c.sender?.isMe).length;

  // Tell support we've read their messages whenever a new one shows while the chat is open.
  const { emit } = socket;
  useEffect(() => { if (supportCount > 0) emit("message:read", { ticketId: chat.ticketId }).catch(() => undefined); }, [supportCount, chat.ticketId, emit]);
  useEffect(() => () => window.clearTimeout(typingTimer.current), []);

  const setTyping = (isTyping: boolean) => {
    if (typingSent.current === isTyping) return;
    typingSent.current = isTyping;
    socket.emit("typing", { ticketId: chat.ticketId, isTyping }).catch(() => undefined);
  };
  const onType = (value: string) => {
    setText(value);
    setTyping(Boolean(value.trim()));
    window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(() => setTyping(false), TYPING_IDLE);
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = text.trim();
    if (!message && files.length === 0) return;
    setError(null); setTyping(false);
    // Files go over REST; the saved message still arrives as message:new.
    if (files.length > 0) {
      reply.mutate({ id: chat.ticketId, message, attachments: files }, { onSuccess: () => { setText(""); setFiles([]); }, onError: (err) => setError(err.message) });
      return;
    }
    const clientId = `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const at = new Date().toISOString();
    upsertMessage(client, chat.ticketId, { kind: "message", messageId: -Date.now(), sender: { type: "user", name: "You", isMe: true }, body: message, attachments: [], readAt: null, at, clientId, pending: true });
    setText("");
    try {
      const ack = await socket.emit<{ messageId: number; at: string; clientId?: string }>("message:send", { ticketId: chat.ticketId, message, clientId });
      upsertMessage(client, chat.ticketId, { kind: "message", messageId: ack.messageId, sender: { type: "user", name: "You", isMe: true }, body: message, attachments: [], readAt: null, at: ack.at ?? at, clientId });
    } catch (err) {
      dropPending(client, chat.ticketId, clientId);
      setText(message);
      const status = (err as { status?: number }).status;
      setError(status === 429 ? "You're sending messages too fast. Wait a moment and try again." : (err as Error).message);
    }
  };

  const endChat = () => closeTicket.mutate(chat.ticketId, {
    onSuccess: () => socket.endChat({ ticketId: chat.ticketId, ticketNumber: chat.ticketNumber }),
    onError: (err) => setError(err.message),
  });

  return <div className="flex flex-col gap-3">
    {!chat.assigned && <div className="flex items-center gap-2 rounded-xl border border-[#C7DAFC] bg-[#EFF4F8] p-3 text-xs font-semibold text-[#2563EB]">
      <Loader2 className="size-4 shrink-0 animate-spin" /> Waiting for an agent…{chat.queuePosition ? ` You're number ${chat.queuePosition} in the queue.` : ""}
    </div>}
    {chat.assigned && <p className="text-center text-[10px] font-bold text-[#10B981]">Support Team has joined the chat</p>}

    <div className="h-[min(380px,calc(100vh-380px))] min-h-[220px] overflow-y-auto rounded-2xl bg-white pr-1">
      {ticket.isLoading ? <div className="flex h-full items-center justify-center"><Loader2 className="size-5 animate-spin text-[#8C909B]" /></div>
        : <Conversation items={items} typing={socket.typing[chat.ticketId]} />}
    </div>

    {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}

    <form onSubmit={send} className="space-y-2 border-t border-[#E2ECF6] pt-3">
      <div className="flex items-end gap-2">
        <textarea value={text} maxLength={LIMITS.message} rows={1} onChange={(e) => onType(e.target.value)} placeholder="Type a message…"
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); } }}
          className="max-h-28 min-h-[42px] flex-1 resize-none rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]" />
        <button type="submit" aria-label="Send" disabled={(!text.trim() && files.length === 0) || reply.isPending} className="flex size-[42px] shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
          {reply.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        </button>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1"><AttachmentPicker compact files={files} onChange={setFiles} rules={home.data?.attachmentRules ?? DEFAULT_RULES} /></div>
        <button type="button" disabled={closeTicket.isPending} onClick={endChat} className="shrink-0 rounded-lg border border-[#EF4444] px-3 py-1 text-[11px] font-bold text-[#EF4444] hover:bg-red-50 disabled:opacity-50">{closeTicket.isPending ? "Ending…" : "End Chat"}</button>
      </div>
    </form>
  </div>;
}

function EndedView() {
  const socket = useSupportSocket();
  const navigate = useNavigate();
  const ended = socket.endedChat!;
  return <div className="space-y-4 py-2 text-center">
    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#EBFFF8]"><CheckCircle2 className="size-7 text-[#10B981]" /></span>
    <div><p className="text-sm font-bold text-[#0F152A]">This chat has ended</p><p className="mt-1 text-xs text-[#66738C]">The full transcript is saved as ticket {ended.ticketNumber}. You can reopen it from there within 7 days.</p></div>
    <div className="flex flex-col-reverse gap-2 sm:flex-row">
      <button type="button" onClick={() => { socket.clearEndedChat(); socket.closeChat(); navigate(appPaths.supportTicketDetails(String(ended.ticketId)).path); }} className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">View transcript</button>
      <button type="button" onClick={() => socket.clearEndedChat()} className="flex-1 rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-600">Start a new chat</button>
    </div>
  </div>;
}
