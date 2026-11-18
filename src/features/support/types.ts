import type { MarketplacePagination } from "@/features/marketplace/types/api";

export type TicketStatusKey = "open" | "in_progress" | "resolved" | "closed";
export type TicketStatusFilter = "all" | TicketStatusKey;
export type TicketChannel = "ticket" | "chat";
export type TicketPriority = "low" | "medium" | "high";

export interface KeyLabel<K extends string = string> { key: K; label: string; }

export interface SupportCategory { key: string; label: string; description?: string; }
export interface ContactChannel {
  key: string; label: string; value?: string; description?: string; online?: boolean;
  action: { type: "chat" | "call" | "email" | "whatsapp" | string; label: string };
}
export interface AttachmentRules { maxFiles: number; maxBytes: number; allowedTypes: string[]; }

export interface TicketSummary {
  id: number; ticketNumber: string; subject: string; channel: TicketChannel;
  category: KeyLabel; status: KeyLabel<TicketStatusKey>; priority: KeyLabel<TicketPriority>;
  unreadCount: number; createdAt: string; updatedAt: string;
}

export interface SupportHome {
  categories: SupportCategory[];
  recentTickets: TicketSummary[];
  ticketCounts: Record<TicketStatusFilter, number>;
  contactChannels: ContactChannel[];
  responseTimes: { channel: string; label: string; value: string }[];
  quickLinks: { key: string; label: string }[];
  attachmentRules: AttachmentRules;
}

export interface Faq { id: number; category: KeyLabel; question: string; answer: string; }
export interface FaqsData { categories: KeyLabel[]; faqs: Faq[]; }

export interface TicketsQuery { status?: TicketStatusFilter; channel?: TicketChannel | ""; q?: string; page: number; limit: number; }
export interface TicketsData { tickets: TicketSummary[]; pagination: MarketplacePagination; }

export interface Attachment { id?: number; name?: string; fileName?: string; url: string; mimeType?: string; size?: number; }
export interface Sender { type: "user" | "admin" | "system" | string; name: string; isMe: boolean; }

export type ConversationItem =
  | { kind: "message"; messageId: number; sender: Sender; body: string; attachments: Attachment[]; readAt: string | null; at: string; clientId?: string; pending?: boolean }
  | { kind: "event"; text: string; at: string };

export interface RelatedRecord { type: "sim" | "order" | "easybuy" | "transaction" | "request" | string; reference: string; title: string; subtitle?: string | null; status?: string | null; }

export interface TicketDetail extends TicketSummary {
  description?: string;
  relatedRef?: string | null;
  conversation: ConversationItem[];
  awaitingSupportResponse: boolean;
  related: RelatedRecord | null;
  history: { type: string; label: string; at: string }[];
  assignedTo: string | null;
  actions: { canReply: boolean; canClose: boolean; canReopen: boolean };
}

export interface CreateTicketPayload {
  category: string; subject: string; description: string; priority?: TicketPriority; relatedRef?: string; attachments?: File[];
}

// ---------- Socket ----------
export interface SocketAck<T> { ok: boolean; data?: T; error?: string; status?: number; }
export interface ActiveChat { ticketId: number; ticketNumber: string; status: KeyLabel<TicketStatusKey> | string; assigned: boolean; queuePosition: number | null; }
export interface ChatStartResult { ticketId: number; ticketNumber: string; resumed: boolean; assigned: boolean; queuePosition: number | null; }
export interface MessageNewEvent {
  ticketId: number; ticketNumber: string; channel: TicketChannel; messageId: number; body: string;
  attachments: Attachment[]; at: string; sender: Sender; clientId?: string;
}
export interface TicketUpdatedEvent { ticketId: number; ticketNumber: string; channel: TicketChannel; change: string; status: KeyLabel<TicketStatusKey>; assigned: boolean; }
