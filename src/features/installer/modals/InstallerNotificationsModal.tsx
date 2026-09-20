import { useState } from "react";
import { Briefcase, Hourglass, Coins, AlertCircle, Star, ShieldCheck, CheckCircle2, Trophy, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface InstallerNotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectNotification?: (id: string) => void;
}

export function InstallerNotificationsModal({
  open,
  onOpenChange,
  onSelectNotification,
}: InstallerNotificationsModalProps) {
  const [filter, setFilter] = useState<string>("all");
  const [unreadIds, setUnreadIds] = useState<string[]>(["notif-1", "notif-2"]);

  const notifications = [
    {
      id: "notif-1",
      category: "Jobs",
      title: "New Job Assigned!",
      desc: "JOB-2026-00847 · Solar CCTV · ₦65,000 · Zenith Bank Lagos Island",
      time: "2 days ago",
      icon: Briefcase,
      color: "#7C3AED",
      bg: "#F1EAFE",
    },
    {
      id: "notif-2",
      category: "Jobs",
      title: "Verification Reminder Needed",
      desc: "JOB-2026-00844 has been pending client verification for 3 days. Send a reminder to Amara Eze.",
      time: "3 days ago",
      icon: Hourglass,
      color: "#D97706",
      bg: "#FEF3C7",
    },
    {
      id: "notif-3",
      category: "Payments",
      title: "Payment Released!",
      desc: "JOB-2026-00843 · ₦45,000 credited to your wallet · GT Bank Ikeja",
      time: "5 days ago",
      icon: Coins,
      color: "#10B981",
      bg: "#EBFFF8",
    },
    {
      id: "notif-4",
      category: "Jobs",
      title: "Client Dispute Raised",
      desc: "JOB-2026-00841 · Access Bank HQ has raised a dispute about your work",
      time: "6 days ago",
      icon: AlertCircle,
      color: "#EF4444",
      bg: "#FEE2E2",
    },
    {
      id: "notif-5",
      category: "Reviews",
      title: "New Review Received ★★★★★",
      desc: "GT Bank Ikeja left you a 5-star review on JOB-2026-00843",
      time: "5 days ago",
      icon: Star,
      color: "#F59E0B",
      bg: "#FEF3C7",
    },
    {
      id: "notif-6",
      category: "System",
      title: "Dispute Update",
      desc: "Admin is reviewing JOB-2026-00841. Response has been logged.",
      time: "4 days ago",
      icon: ShieldCheck,
      color: "#2563EB",
      bg: "#EFF4F8",
    },
    {
      id: "notif-7",
      category: "Jobs",
      title: "Job Verified by Client",
      desc: "Tantalizers has verified JOB-00843. Awaiting Admin confirmation.",
      time: "5 days ago",
      icon: CheckCircle2,
      color: "#10B981",
      bg: "#EBFFF8",
    },
    {
      id: "notif-8",
      category: "Jobs",
      title: "Job Assigned",
      desc: "JOB-2026-00845 · Solar CCTV · ₦75,000 · Dangote Industries VI",
      time: "1 week ago",
      icon: Briefcase,
      color: "#7C3AED",
      bg: "#F1EAFE",
    },
    {
      id: "notif-9",
      category: "System",
      title: "Bonus Progress Update",
      desc: "You've completed 7 of 12 jobs this period — 5 more for ₦50,000!",
      time: "1 week ago",
      icon: Trophy,
      color: "#D97706",
      bg: "#FEF3C7",
    },
    {
      id: "notif-10",
      category: "Payments",
      title: "Payment Released",
      desc: "JOB-2026-00842 · ₦80,000 credited · Shoprite VI",
      time: "1 week ago",
      icon: Coins,
      color: "#10B981",
      bg: "#EBFFF8",
    },
  ];

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter(
          (n) => n.category.toLowerCase() === filter.toLowerCase()
        );

  const handleMarkAllRead = () => {
    setUnreadIds([]);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={
        <div className="flex items-center justify-between pr-6">
          <span>Notifications</span>
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Mark all read
          </button>
        </div>
      }
    >
      <div className="space-y-3.5 py-1">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {(["all", "jobs", "payments", "reviews", "system"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize transition-all ${
                filter === cat
                  ? "bg-[#2563EB] text-white"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="divide-y divide-[#E2ECF6]">
          {filtered.map((item) => {
            const Icon = item.icon;
            const isUnread = unreadIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onSelectNotification?.(item.id)}
                className="flex cursor-pointer items-start gap-3 py-3 transition-colors hover:bg-[#F8FAFC]"
              >
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <Icon className="size-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-[#0F152A]">{item.title}</h5>
                    {isUnread && <span className="size-2 rounded-full bg-[#2563EB]" />}
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-[#66738C]">{item.desc}</p>
                  <span className="mt-1 block text-[10px] text-[#8C909B]">{item.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="space-y-2 border-t border-[#E2ECF6] pt-3 text-center">
          <button
            type="button"
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Load more notifications
          </button>
          <div className="flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#66738C] hover:text-[#0F152A]"
            >
              Notification Settings <ArrowRight className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
