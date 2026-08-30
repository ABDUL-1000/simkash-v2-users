import { AUTOMATED_SCHEDULE_COLORS } from "@/constants/colors";

type ScheduleStep = {
  id: string;
  circleLabel: string;
  title: string;
  subtext: string;
  theme: keyof typeof AUTOMATED_SCHEDULE_COLORS;
};

const SCHEDULE_STEPS: ScheduleStep[] = [
  {
    id: "30d",
    circleLabel: "30d",
    title: "30 days",
    subtext: "Customer notified",
    theme: "blue",
  },
  {
    id: "14d",
    circleLabel: "14d",
    title: "14 days",
    subtext: "Customer + Agent",
    theme: "blue",
  },
  {
    id: "7d",
    circleLabel: "7d",
    title: "7 days",
    subtext: "Cust + Agent + Admin",
    theme: "yellow",
  },
  {
    id: "3d",
    circleLabel: "3d",
    title: "3 days",
    subtext: "Customer + Agent urgent",
    theme: "yellow",
  },
  {
    id: "1d",
    circleLabel: "1d",
    title: "1 day",
    subtext: "Cust + Agent + Admin urgent",
    theme: "red",
  },
  {
    id: "expiry",
    circleLabel: "!",
    title: "Expiry day",
    subtext: "Customer final notice",
    theme: "red",
  },
];

export function AutomatedNotificationSchedule() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-bold text-[#0F172A] sm:text-lg">
          Automated Notification Schedule
        </h2>
        <span className="text-xs text-[#94A3B8] sm:text-sm">
          System sends automatically — manual actions above are additional
        </span>
      </div>

      {/* Grid of 6 Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SCHEDULE_STEPS.map((step) => {
          const colors = AUTOMATED_SCHEDULE_COLORS[step.theme];
          return (
            <div
              key={step.id}
              className="flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all hover:shadow-xs"
              style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
              }}
            >
              {/* Inner Circle Badge */}
              <div
                className="mb-2 flex size-10 items-center justify-center rounded-full text-xs font-extrabold sm:text-sm"
                style={{
                  backgroundColor: colors.circleBg,
                  color: colors.text,
                }}
              >
                {step.circleLabel}
              </div>

              {/* Title Text */}
              <p className="text-sm font-bold sm:text-base" style={{ color: colors.text }}>
                {step.title}
              </p>

              {/* Subtext */}
              <p className="mt-1 text-xs font-semibold leading-tight" style={{ color: colors.lightText }}>
                {step.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
