import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import type { EpNotificationCategory } from "../types";
import {
  TrendingUp, Package, Landmark, Percent, Users, Star, Award, UserPlus,
  CircleDollarSign, ShieldCheck, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface EpNotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NOTIFICATIONS_LIST = [
  { id: "1", cat: "investment", title: "Earnings Update", desc: "₦2,847,000 earned this month — up 19% vs last month", time: "Today", unread: true, icon: TrendingUp, iconColor: "text-emerald-500 bg-emerald-50" },
  { id: "2", cat: "system", title: "Stock Order Confirmed", desc: "400 POS SIMs ordered · ₦1,000,000 · Ref ORD-EP-2026-00847", time: "Yesterday", unread: true, icon: Package, iconColor: "text-slate-700 bg-slate-100" },
  { id: "3", cat: "payments", title: "Balance Payment Received", desc: "₦500,000 applied toward your ₦7,500,000 balance", time: "3 days ago", unread: false, icon: Landmark, iconColor: "text-amber-500 bg-amber-50" },
  { id: "4", cat: "system", title: "Price Change Active", desc: "POS SIM retail price updated to ₦4,500 across your network", time: "1 week ago", unread: false, icon: Percent, iconColor: "text-purple-600 bg-purple-50" },
  { id: "5", cat: "network", title: "Network Milestone", desc: "Your network hit 14,847 activations this month — all time high!", time: "1 week ago", unread: false, icon: Users, iconColor: "text-emerald-600 bg-emerald-50" },
  { id: "6", cat: "system", title: "Account Manager Update", desc: "Kemi Ade: Your Q2 performance review is ready. Call to discuss.", time: "2 weeks ago", unread: false, icon: Star, iconColor: "text-blue-600 bg-blue-50" },
  { id: "7", cat: "investment", title: "Bonus Progress Update", desc: "74% toward your bonus target — 15 days remaining", time: "2 weeks ago", unread: false, icon: Award, iconColor: "text-amber-500 bg-amber-50" },
  { id: "8", cat: "network", title: "New SC Onboarded", desc: "Ngozi Adeyemi (Delta) joined your network — 6th SC this month", time: "3 weeks ago", unread: false, icon: UserPlus, iconColor: "text-slate-600 bg-slate-100" },
  { id: "9", cat: "payments", title: "Wholesale Price Notice", desc: "Simkash: No price changes for Jun 2026. Your margins unchanged.", time: "1 month ago", unread: false, icon: CircleDollarSign, iconColor: "text-emerald-600 bg-emerald-50" },
  { id: "10", cat: "system", title: "Account Verified", desc: "Your Enterprise Pro account has been fully verified", time: "2 months ago", unread: false, icon: ShieldCheck, iconColor: "text-slate-800 bg-slate-100" },
];

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
