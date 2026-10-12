import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import type { EpNotificationCategory } from "../types";
import { TrendingUp, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface EpNotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NOTIFICATIONS_LIST: { id: string; cat: string; title: string; desc: string; time: string; unread: boolean; icon: typeof TrendingUp; iconColor: string }[] = [];

export function EpNotificationsModal({ open, onOpenChange }: EpNotificationsModalProps) {
  const [activeTab, setActiveTab] = useState<EpNotificationCategory>("all");
  const [items, setItems] = useState(NOTIFICATIONS_LIST);
  const [limit, setLimit] = useState(6);

  const filtered = items.filter((n) => activeTab === "all" || n.cat === activeTab);

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("All notifications marked as read");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center justify-between pr-6">
          <span className="font-bold text-slate-900 text-base">Notifications</span>
          <button onClick={handleMarkAllRead} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            Mark all read
          </button>
        </div>
      }
      description=""
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(["all", "investment", "network", "payments", "system"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3 py-1 font-semibold capitalize transition ${
                activeTab === tab ? "bg-[#0F172A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab === "all" ? "All" : tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {!filtered.length && <AppEmptyState title="No Notifications" description="There are no enterprise notifications to display." />}
          {filtered.slice(0, limit).map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.id} className="relative flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${n.iconColor}`}>
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-bold text-slate-900 text-xs">{n.title}</p>
                  <p className="mt-0.5 text-slate-500 leading-relaxed text-[11px]">{n.desc}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{n.time}</p>
                </div>
                {n.unread && <span className="absolute right-3.5 top-4 size-2 rounded-full bg-blue-600" />}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="space-y-2 pt-2 text-center">
          {limit < filtered.length && (
            <button onClick={() => setLimit((l) => l + 4)} className="text-xs font-bold text-blue-600 hover:text-blue-800">
              Load more
            </button>
          )}
          <div className="border-t border-slate-100 pt-2">
            <button onClick={() => onOpenChange(false)} className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700">
              Notification Settings <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
