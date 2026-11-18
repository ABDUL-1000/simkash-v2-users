import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { MessageCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { supportKeys } from "../api";
import type { ActiveChat, MessageNewEvent, SocketAck, TicketUpdatedEvent } from "../types";
import { SocketAckError, SupportSocketContext, type SupportSocketValue } from "./context";
import { messageFromEvent, upsertMessage } from "./cache";
import { LiveChatPanel } from "../components/LiveChatPanel";
import { CreateTicketModal } from "../Modals/CreateTicketModal";

/** The API host without the `/api/v1` path; Socket.IO uses the `/support` namespace on the same host. */
function socketUrl() {
  const base = import.meta.env.VITE_API_BASE_URL as string | undefined;
  try { return `${new URL(base || window.location.origin, window.location.origin).origin}/support`; }
  catch { return `${window.location.origin}/support`; }
}

const TYPING_TIMEOUT = 5000;

export function SupportSocketProvider({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.accessToken);
  const client = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const typingTimers = useRef<Record<number, number>>({});
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState<boolean | null>(null);
  const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);
  const [typing, setTyping] = useState<Record<number, boolean>>({});
  const [chatOpen, setChatOpen] = useState(false);
  const [endedChat, setEndedChat] = useState<{ ticketId: number; ticketNumber: string } | null>(null);
  const [createTicket, setCreateTicket] = useState<{ open: boolean; category?: string }>({ open: false });

  useEffect(() => {
    if (!token) return;
    const socket = io(socketUrl(), { auth: { token }, transports: ["websocket"] });
    socketRef.current = socket;
    const refreshLists = () => {
      void client.invalidateQueries({ queryKey: ["support", "tickets"] });
      void client.invalidateQueries({ queryKey: supportKeys.home });
    };
    const setTypingFor = (ticketId: number, isTyping: boolean) => {
      window.clearTimeout(typingTimers.current[ticketId]);
      setTyping((prev) => ({ ...prev, [ticketId]: isTyping }));
      if (isTyping) typingTimers.current[ticketId] = window.setTimeout(() => setTyping((prev) => ({ ...prev, [ticketId]: false })), TYPING_TIMEOUT);
    };

    socket.on("connect", () => {
      setConnected(true);
      // Events aren't replayed: catch up on any open ticket.
      void client.invalidateQueries({ queryKey: ["support", "ticket"] });
      refreshLists();
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", () => setConnected(false));
    socket.on("session", (data: { activeChat: ActiveChat | null }) => setActiveChat(data?.activeChat ?? null));
    socket.on("presence", (data: { online: boolean }) => setOnline(Boolean(data?.online)));
    socket.on("agent:joined", (data: { ticketId: number }) =>
      setActiveChat((chat) => (chat && chat.ticketId === data.ticketId ? { ...chat, assigned: true, queuePosition: null } : chat)));
    socket.on("message:new", (event: MessageNewEvent) => {
      upsertMessage(client, event.ticketId, messageFromEvent(event));
      if (!event.sender?.isMe) {
        setTypingFor(event.ticketId, false);
        void client.invalidateQueries({ queryKey: ["user-notifications"] });
      }
      refreshLists();
    });
    socket.on("typing", (data: { ticketId: number; isTyping: boolean }) => setTypingFor(data.ticketId, Boolean(data.isTyping)));
    socket.on("message:read", (data: { ticketId: number }) => void client.invalidateQueries({ queryKey: supportKeys.ticket(data.ticketId) }));
    socket.on("ticket:updated", (event: TicketUpdatedEvent) => {
      void client.invalidateQueries({ queryKey: supportKeys.ticket(event.ticketId) });
      refreshLists();
      setActiveChat((chat) => {
        if (!chat || chat.ticketId !== event.ticketId) return chat;
        if (event.status?.key === "resolved" || event.status?.key === "closed") { setEndedChat({ ticketId: chat.ticketId, ticketNumber: chat.ticketNumber }); return null; }
        return { ...chat, status: event.status, assigned: event.assigned, queuePosition: event.assigned ? null : chat.queuePosition };
      });
    });

    const timers = typingTimers.current;
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      Object.values(timers).forEach((t) => window.clearTimeout(t));
      setConnected(false);
      setOnline(null);
      setActiveChat(null);
    };
  }, [token, client]);

  const emit = useCallback(<T,>(event: string, payload: object) => new Promise<T>((resolve, reject) => {
    const socket = socketRef.current;
    if (!socket?.connected) { reject(new Error("You're offline. Check your connection and try again.")); return; }
    socket.timeout(15_000).emit(event, payload, (err: Error | null, ack: SocketAck<T>) => {
      if (err) reject(new Error("The server didn't respond. Please try again."));
      else if (ack?.ok) resolve(ack.data as T);
      else reject(new SocketAckError(ack ?? { ok: false }));
    });
  }), []);

  const value = useMemo<SupportSocketValue>(() => ({
    connected, online, activeChat, setActiveChat, typing, emit, chatOpen, endedChat,
    endChat: (chat) => { setActiveChat(null); setEndedChat(chat); },
    clearEndedChat: () => setEndedChat(null),
    openChat: () => setChatOpen(true),
    closeChat: () => { setChatOpen(false); setEndedChat(null); },
    openCreateTicket: (category?: string) => setCreateTicket({ open: true, category }),
  }), [connected, online, activeChat, typing, emit, chatOpen, endedChat]);

  return <SupportSocketContext.Provider value={value}>
    {children}
    <LiveChatPanel />
    {activeChat && !chatOpen && <button type="button" onClick={() => setChatOpen(true)}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#10B981] px-4 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-emerald-600 sm:bottom-6 sm:right-6">
      <MessageCircle className="size-4" /> {activeChat.assigned ? "Return to chat" : "Waiting for an agent…"}
    </button>}
    {createTicket.open && <CreateTicketModal open initialCategory={createTicket.category} onClose={() => setCreateTicket({ open: false })} />}
  </SupportSocketContext.Provider>;
}
