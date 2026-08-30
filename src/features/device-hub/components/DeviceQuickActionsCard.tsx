import { ChevronRight } from "lucide-react";

type ActionItem = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
};

const ACTIONS: ActionItem[] = [
  {
    id: "register",
    title: "Register New Device",
    subtitle: "Add to fleet",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    id: "firmware",
    title: "Firmware Update All",
    subtitle: "Push latest firmware",
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    id: "resolve",
    title: "Resolve All Alerts",
    subtitle: "Mark alerts resolved",
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

export function DeviceQuickActionsCard({
  onActionClick,
}: {
  onActionClick?: (actionId: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
        Quick Actions
      </h3>

      <div className="mt-4 space-y-3">
        {ACTIONS.map((act) => (
          <button
            key={act.id}
            type="button"
            onClick={() => onActionClick?.(act.id)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#E2ECF8] bg-[#F8FAFC] p-3.5 transition-all hover:border-[#CBD5E1] hover:bg-white text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: act.bg }}
              >
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: act.color }}
                />
              </div>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">{act.title}</p>
                <p className="text-xs text-[#64748B]">{act.subtitle}</p>
              </div>
            </div>

            <ChevronRight className="size-4 text-[#94A3B8]" />
          </button>
        ))}
      </div>
    </div>
  );
}
