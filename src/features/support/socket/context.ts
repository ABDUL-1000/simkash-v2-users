import { createContext, useContext } from "react";
import type { ActiveChat, SocketAck } from "../types";

export interface SupportSocketValue {
  connected: boolean;
  /** Live Chat online dot; `null` until the server tells us. */
  online: boolean | null;
  activeChat: ActiveChat | null;
  setActiveChat: (chat: ActiveChat | null) => void;
  /** The chat that just ended (by the customer or support), for the "Chat ended" screen. */
  endedChat: { ticketId: number; ticketNumber: string } | null;
  endChat: (chat: { ticketId: number; ticketNumber: string }) => void;
  clearEndedChat: () => void;
  /** Ticket ids where support is currently typing. */
  typing: Record<number, boolean>;
  /** Emit with acknowledgement; rejects with the server's error (and `status`). */
  emit: <T>(event: string, payload: object) => Promise<T>;
  chatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  openCreateTicket: (category?: string) => void;
}

export const SupportSocketContext = createContext<SupportSocketValue | null>(null);

export function useSupportSocket() {
  const value = useContext(SupportSocketContext);
  if (!value) throw new Error("useSupportSocket must be used inside SupportSocketProvider");
  return value;
}

export class SocketAckError extends Error {
  status?: number;
  constructor(ack: SocketAck<unknown>) { super(ack.error || "Something went wrong"); this.status = ack.status; }
}
