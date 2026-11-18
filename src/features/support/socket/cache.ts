import type { QueryClient } from "@tanstack/react-query";
import { supportKeys } from "../api";
import type { ConversationItem, MessageNewEvent, TicketDetail } from "../types";

type MessageItem = Extract<ConversationItem, { kind: "message" }>;

/**
 * Add a message to a cached ticket without duplicates:
 * - a saved message already in the list wins (any optimistic bubble with the same clientId is dropped)
 * - otherwise it replaces the optimistic bubble with the same clientId
 * - otherwise it's appended
 * `message:new` can arrive before or after the send acknowledgement, so both paths call this.
 */
export function upsertMessage(client: QueryClient, ticketId: number, item: MessageItem) {
  client.setQueryData<TicketDetail>(supportKeys.ticket(ticketId), (old) => {
    if (!old) return old;
    const conversation = old.conversation ?? [];
    const isPendingFor = (c: ConversationItem) => c.kind === "message" && c.pending && Boolean(item.clientId) && c.clientId === item.clientId;
    if (!item.pending && conversation.some((c) => c.kind === "message" && !c.pending && c.messageId === item.messageId)) {
      return conversation.some(isPendingFor) ? { ...old, conversation: conversation.filter((c) => !isPendingFor(c)) } : old;
    }
    const index = conversation.findIndex(isPendingFor);
    const next = index >= 0 ? conversation.map((c, i) => (i === index ? item : c)) : [...conversation, item];
    return { ...old, conversation: next, updatedAt: item.at };
  });
}

export const messageFromEvent = (event: MessageNewEvent): MessageItem => ({
  kind: "message", messageId: event.messageId, sender: event.sender, body: event.body,
  attachments: event.attachments ?? [], readAt: null, at: event.at, clientId: event.clientId,
});

export function dropPending(client: QueryClient, ticketId: number, clientId: string) {
  client.setQueryData<TicketDetail>(supportKeys.ticket(ticketId), (old) =>
    old && { ...old, conversation: old.conversation.filter((c) => !(c.kind === "message" && c.pending && c.clientId === clientId)) });
}
