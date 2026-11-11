import { useState } from "react";
import { Popover } from "antd";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetNotifications, useMarkAllNotificationsRead, useMarkNotificationRead } from "@/features/marketplace/api";

const ago = (iso: string) => {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

/** Bell badge (GET /user/notifications?limit=1, polled every 60s) and the latest notifications. */
export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const badge = useGetNotifications({ limit: 1 }, true);
  const list = useGetNotifications({ page: 1, limit: 15 });
  const markRead = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();
  const unread = badge.data?.unreadCount ?? list.data?.unreadCount ?? 0;
  const items = list.data?.notifications ?? [];

  const content = <div className="w-[min(340px,calc(100vw-32px))] space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-[#0F152A]">Notifications</span>
      {unread > 0 && <button type="button" disabled={markAll.isPending} onClick={() => markAll.mutate()} className="text-xs font-bold text-[#2563EB] hover:underline">Mark all as read</button>}
    </div>
    <div className="max-h-96 divide-y divide-[#E2ECF6] overflow-y-auto">
      {list.isPending ? <div className="h-24 animate-pulse rounded-xl bg-slate-100" /> : items.length === 0 ? <AppEmptyState title="No notifications" description="You're all caught up." /> :
        items.map((item) => <button key={item.id} type="button" onClick={() => !item.read && markRead.mutate(item.id)} className={`block w-full px-1 py-2.5 text-left ${item.read ? "" : "bg-[#EFF4F8]/60"}`}>
          <div className="flex items-start gap-2">
            {!item.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#2563EB]" />}
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0F152A]">{item.title}</p>
              <p className="text-[11px] text-[#66738C]">{item.message}</p>
              <p className="text-[10px] text-[#8C909B]">{ago(item.createdAt)}</p>
            </div>
          </div>
        </button>)}
    </div>
  </div>;

  return (
    <Popover open={open} onOpenChange={(value) => { setOpen(value); if (value) void list.refetch(); }} trigger="click" placement="bottomRight" content={content} arrow={false}>
      <Button variant="ghost" size="icon" aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`} className="relative text-[#0F152A] hover:bg-slate-100">
        <Bell className="size-5 text-[#0F152A]" />
        {unread > 0 && <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[9px] font-bold text-white">{unread > 99 ? "99+" : unread}</span>}
      </Button>
    </Popover>
  );
}
