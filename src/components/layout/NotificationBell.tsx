import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import { Bell, BellOff, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useMarkAllNotificationsRead, useMarkNotificationRead, useNotificationsList, useUnreadNotificationsCount, type AppNotification,
} from "@/features/notifications/api";
import { NOTIFICATION_TYPE_LABELS, notificationHref, notificationIcon, timeAgo, typeLabel } from "@/features/notifications/utils";

type Tab = "all" | "unread";

/** Navbar bell: unread badge (polled every minute) and the in-app notifications panel. */
export function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("all");
  const [type, setType] = useState("");
  const badgeCount = useUnreadNotificationsCount();
  const list = useNotificationsList({ unreadOnly: tab === "unread", type: type || undefined }, open);
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const unread = list.unreadCount ?? badgeCount;
  const items = list.notifications;

  // Known types plus any other type the server has sent.
  const typeOptions = useMemo(() => {
    const keys = new Set([...Object.keys(NOTIFICATION_TYPE_LABELS), ...items.map((n) => n.type), ...(type ? [type] : [])]);
    return [...keys].map((key) => ({ key, label: typeLabel(key) })).sort((a, b) => a.label.localeCompare(b.label));
  }, [items, type]);

  const openItem = (item: AppNotification) => {
    if (!item.read) markRead.mutate(item.id);
    const href = notificationHref(item);
    if (href) { setOpen(false); navigate(href); }
  };

  const content = <div className="w-[min(440px,calc(100vw-24px))] overflow-hidden rounded-2xl">
    {/* Header */}
    <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-[#0F1F36] sm:text-xl">Notifications</h2>
        {unread > 0 && <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-xs font-bold text-[#2563EB]">{unread > 99 ? "99+" : unread}</span>}
      </div>
      {unread > 0 && <button type="button" disabled={markAll.isPending} onClick={() => markAll.mutate()} className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline disabled:opacity-50">
        <Check className="size-4" /> <span>{markAll.isPending ? "Marking…" : "Mark all as read"}</span>
      </button>}
    </div>

    {/* Filters */}
    <div className="flex items-center justify-between gap-2 border-b border-[#E2ECF6] px-4 py-3 sm:px-5">
      <div className="flex items-center gap-1">
        {(["all", "unread"] as const).map((key) => <button key={key} type="button" onClick={() => setTab(key)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${tab === key ? "bg-[#EFF4F8] font-bold text-[#2563EB]" : "text-[#66738C] hover:text-[#0F1F36]"}`}>
          {key === "all" ? "All" : `Unread${unread ? ` (${unread})` : ""}`}
        </button>)}
      </div>
      <div className="relative min-w-0">
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type"
          className="w-full max-w-[150px] cursor-pointer appearance-none truncate rounded-lg border border-[#E2ECF6] bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-[#0F1F36] outline-none focus:border-[#2563EB]">
          <option value="">All types</option>
          {typeOptions.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#0F1F36]" />
      </div>
    </div>

    {/* List */}
    <div className="max-h-[min(460px,calc(100vh-220px))] overflow-y-auto">
      {list.isPending ? <div className="space-y-px">{[0, 1, 2].map((i) => <div key={i} className="flex gap-3 px-4 py-4 sm:px-5"><div className="size-10 shrink-0 animate-pulse rounded-xl bg-slate-100" /><div className="flex-1 space-y-2"><div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" /><div className="h-3 w-full animate-pulse rounded bg-slate-100" /></div></div>)}</div>
        : list.isError ? <div className="px-5 py-10 text-center text-xs text-[#66738C]">
          <p>Couldn't load notifications.</p>
          <button type="button" onClick={() => void list.refetch()} className="mt-2 font-bold text-[#2563EB] hover:underline">Try again</button>
        </div>
          : items.length === 0 ? <div className="flex flex-col items-center px-5 py-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]"><BellOff className="size-5" /></span>
            <p className="mt-3 text-sm font-semibold text-[#0F1F36]">{tab === "unread" ? "You're all caught up" : "No notifications yet"}</p>
            <p className="mt-1 text-xs text-[#66738C]">{type ? `Nothing under ${typeLabel(type)}.` : "We'll let you know when something happens."}</p>
          </div>
            : <ul className="divide-y divide-[#E2ECF6]">
              {items.map((item) => {
                const Icon = notificationIcon(item);
                return <li key={item.id}>
                  <button type="button" onClick={() => openItem(item)} className={`flex w-full items-start gap-3 px-4 py-4 text-left transition hover:bg-[#F1F5F9] sm:px-5 ${item.read ? "bg-white" : "bg-[#F8FAFC]"}`}>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]"><Icon className="size-[18px]" /></span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm text-[#0F1F36] ${item.read ? "font-semibold" : "font-bold"}`}>{item.title}</span>
                      <span className="mt-0.5 block break-words text-xs leading-relaxed text-[#66738C]">{item.message}</span>
                      <span className="mt-1 block text-[11px] text-[#8C909B]">{timeAgo(item.createdAt)}</span>
                    </span>
                    {!item.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#2563EB]" aria-label="Unread" />}
                  </button>
                </li>;
              })}
            </ul>}
      {list.hasNextPage && <div className="border-t border-[#E2ECF6] p-3 text-center">
        <button type="button" disabled={list.isFetchingNextPage} onClick={() => void list.fetchNextPage()} className="text-xs font-bold text-[#2563EB] hover:underline disabled:opacity-50">
          {list.isFetchingNextPage ? "Loading…" : "Load more"}
        </button>
      </div>}
    </div>
  </div>;

  return (
    <Popover open={open} onOpenChange={(value) => { setOpen(value); if (value && list.isFetched) void list.refetch(); }} trigger="click" placement="bottomRight"
      content={content} arrow={false} styles={{ container: { padding: 0, borderRadius: 16 } }}>
      <Button variant="ghost" size="icon" aria-label={`Notifications${badgeCount ? ` (${badgeCount} unread)` : ""}`} className="relative text-[#0F152A] hover:bg-slate-100">
        <Bell className="size-5 text-[#0F152A]" />
        {badgeCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[9px] font-bold text-white">{badgeCount > 99 ? "99+" : badgeCount}</span>}
      </Button>
    </Popover>
  );
}
