import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import type { MarketplacePagination } from "@/features/marketplace/types/api";

export interface AppNotification { id: number; type: string; title: string; message: string; read: boolean; createdAt: string; }
export interface NotificationsPage { notifications: AppNotification[]; unreadCount: number; pagination: MarketplacePagination; }
export interface NotificationsFilter { unreadOnly?: boolean; type?: string; }

const PAGE_SIZE = 20;

async function call<T>(method: "get" | "patch", url: string, params?: object): Promise<T> {
  const response = method === "get"
    ? await authedHttpClient.get<ApiResponse<T>>(url, { params })
    : await authedHttpClient.patch<ApiResponse<T>>(url, {});
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}

export const notificationKeys = {
  all: ["user-notifications"] as const,
  badge: ["user-notifications", "badge"] as const,
  list: (filter: NotificationsFilter) => ["user-notifications", "list", filter] as const,
};

const useToken = () => Boolean(useAuthStore((state) => state.accessToken));

/** Unread count for the bell, polled every minute and on window focus. */
export const useUnreadNotificationsCount = () => {
  const query = useQuery({
    queryKey: notificationKeys.badge, enabled: useToken(), refetchInterval: 60_000, refetchOnWindowFocus: true,
    queryFn: () => call<NotificationsPage>("get", "/user/notifications", { page: 1, limit: 1 }),
  });
  return query.data?.unreadCount ?? 0;
};

/** GET /user/notifications with "Load more" paging. */
export const useNotificationsList = (filter: NotificationsFilter, enabled = true) => {
  const query = useInfiniteQuery({
    queryKey: notificationKeys.list(filter), enabled: useToken() && enabled, initialPageParam: 1,
    queryFn: ({ pageParam }) => call<NotificationsPage>("get", "/user/notifications", {
      page: pageParam, limit: PAGE_SIZE, ...(filter.unreadOnly ? { unreadOnly: true } : {}), ...(filter.type ? { type: filter.type } : {}),
    }),
    getNextPageParam: (last) => (last.pagination?.hasNextPage ? last.pagination.page + 1 : undefined),
  });
  const notifications = query.data?.pages.flatMap((page) => page.notifications ?? []) ?? [];
  return { ...query, notifications, unreadCount: query.data?.pages[0]?.unreadCount };
};

/** Write the server's unreadCount (and read flags) into every cached notification query. */
function useApplyReadState() {
  const client = useQueryClient();
  return (unreadCount: number, isRead: (n: AppNotification) => boolean) => {
    client.setQueryData<NotificationsPage>(notificationKeys.badge, (old) => old && { ...old, unreadCount });
    client.setQueriesData<InfiniteData<NotificationsPage>>({ queryKey: ["user-notifications", "list"] }, (old) => old && {
      ...old,
      pages: old.pages.map((page) => ({ ...page, unreadCount, notifications: page.notifications.map((n) => (isRead(n) ? { ...n, read: true } : n)) })),
    });
  };
}

export const useMarkNotificationRead = () => {
  const apply = useApplyReadState();
  return useMutation({
    mutationFn: (id: number) => call<{ id: number; read: boolean; unreadCount: number }>("patch", `/user/notifications/${id}/read`),
    onSuccess: (data, id) => apply(data.unreadCount, (n) => n.id === id),
  });
};

export const useMarkAllNotificationsRead = () => {
  const apply = useApplyReadState();
  return useMutation({
    mutationFn: () => call<{ marked: number; unreadCount: number }>("patch", "/user/notifications/read-all"),
    onSuccess: (data) => apply(data.unreadCount ?? 0, () => true),
    onError: (error: Error) => openNotification({ state: "error", title: "Couldn't mark as read", description: error.message }),
  });
};
