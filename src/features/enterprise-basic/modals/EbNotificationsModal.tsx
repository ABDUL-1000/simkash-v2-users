import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Bell, ArrowRight } from "lucide-react";
import { mockEbNotifications } from "../data/mockEbNotifications";

interface EbNotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EbNotificationsModal: React.FC<EbNotificationsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [notifications, setNotifications] = useState(mockEbNotifications);

  const filterTabs = ["all", "sales", "balance", "stock", "system"];

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.category === filter;
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Notifications</h3>
              <p className="text-[11px] text-slate-400">Stay updated on sales, balance, and stock</p>
            </div>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="text-[11px] font-bold text-blue-600 hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {filterTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold capitalize transition ${
                filter === t ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`py-3 px-2 flex items-start justify-between gap-3 rounded-xl transition ${
                !item.read ? "bg-blue-50/40" : "hover:bg-slate-50/60"
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  {!item.read && <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />}
                  <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed pl-4">{item.description}</p>
                <div className="text-[10px] text-slate-400 font-medium pl-4">{item.time}</div>
              </div>

              {item.amount && (
                <span className="text-xs font-bold text-slate-800 shrink-0 mt-0.5">
                  ₦{item.amount.toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold">
          <button type="button" className="text-slate-600 hover:text-slate-900">
            Load more
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <span>Notification Settings</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </AppModal>
  );
};
