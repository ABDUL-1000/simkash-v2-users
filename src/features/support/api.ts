import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type { CreateTicketPayload, FaqsData, SupportHome, TicketDetail, TicketsData, TicketsQuery, TicketSummary } from "./types";

const BASE = "/user/support";

async function call<T>(method: "get" | "post", url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = method === "get"
    ? await authedHttpClient.get<ApiResponse<T>>(url, { params: body, signal })
    : await authedHttpClient.post<ApiResponse<T>>(url, body ?? {}, { signal });
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}
const useToken = () => Boolean(useAuthStore((state) => state.accessToken));

/** Multipart body; `attachments` is repeated once per file. */
function toFormData(fields: Record<string, string | undefined>, files: File[] = []) {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => { if (value !== undefined && value !== "") form.append(key, value); });
  files.forEach((file) => form.append("attachments", file));
  return form;
}

export const supportKeys = {
  all: ["support"] as const,
  home: ["support", "home"] as const,
  faqs: (category: string, q: string) => ["support", "faqs", category, q] as const,
  tickets: (query: TicketsQuery) => ["support", "tickets", query] as const,
  ticket: (id?: number | string) => ["support", "ticket", String(id)] as const,
};

export const useSupportHome = () =>
  useQuery({ queryKey: supportKeys.home, enabled: useToken(), queryFn: ({ signal }) => call<SupportHome>("get", BASE, undefined, signal) });

export const useSupportFaqs = (category: string, q: string) =>
  useQuery({
    queryKey: supportKeys.faqs(category, q), enabled: useToken(), placeholderData: keepPreviousData, staleTime: 5 * 60_000,
    queryFn: ({ signal }) => call<FaqsData>("get", `${BASE}/faqs`, { ...(category && category !== "all" ? { category } : {}), ...(q ? { q } : {}) }, signal),
  });

type RawTickets = TicketsData | { items: TicketSummary[]; pagination: TicketsData["pagination"] };
export const useSupportTickets = (query: TicketsQuery) =>
  useQuery({
    queryKey: supportKeys.tickets(query), enabled: useToken(), placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const params = Object.fromEntries(Object.entries(query).filter(([, v]) => v !== undefined && v !== "" && v !== "all"));
      const raw = await call<RawTickets>("get", `${BASE}/tickets`, params, signal);
      return { tickets: ("tickets" in raw ? raw.tickets : raw.items) ?? [], pagination: raw.pagination } satisfies TicketsData;
    },
  });

export const useSupportTicket = (id?: number | string) =>
  useQuery({
    queryKey: supportKeys.ticket(id), enabled: useToken() && Boolean(id),
    queryFn: ({ signal }) => call<TicketDetail>("get", `${BASE}/tickets/${id}`, undefined, signal),
  });

/** Ticket actions return the full detail: cache it and refresh lists/counts. */
function useTicketMutation<V>(fn: (vars: V) => Promise<TicketDetail>) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (ticket) => {
      if (ticket?.id) client.setQueryData(supportKeys.ticket(ticket.id), ticket);
      void client.invalidateQueries({ queryKey: ["support", "tickets"] });
      void client.invalidateQueries({ queryKey: supportKeys.home });
    },
  });
}

export const useCreateTicket = () => useTicketMutation(({ attachments, ...fields }: CreateTicketPayload) =>
  call<TicketDetail>("post", `${BASE}/tickets`, toFormData(fields as Record<string, string | undefined>, attachments)));

export const useReplyTicket = () => useTicketMutation(({ id, message, attachments }: { id: number; message: string; attachments?: File[] }) =>
  call<TicketDetail>("post", `${BASE}/tickets/${id}/messages`, toFormData({ message }, attachments)));

export const useCloseTicket = () => useTicketMutation((id: number) => call<TicketDetail>("post", `${BASE}/tickets/${id}/close`));

export const useReopenTicket = () => useTicketMutation(({ id, reason }: { id: number; reason?: string }) =>
  call<TicketDetail>("post", `${BASE}/tickets/${id}/reopen`, reason ? { reason } : {}));
