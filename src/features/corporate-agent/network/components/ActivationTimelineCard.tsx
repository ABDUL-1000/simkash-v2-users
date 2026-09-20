export function ActivationTimelineCard() {
  const steps = [
    { label: "3:47:20 PM · SIM submitted", color: "#10B981" },
    { label: "3:47:21 PM · MTN confirmed", color: "#10B981" },
    { label: "3:47:22 PM · +₦600 credited", color: "#10B981" },
    { label: "3:47:23 PM · Record saved", color: "#10B981" },
  ];

  return (
    <div className="space-y-4 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#8C909B]">
        ACTIVATION TIMELINE
      </h3>

      <div className="space-y-3 text-xs">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#EBFFF8]">
              <span className="size-2 rounded-full bg-[#10B981]" />
            </div>
            <span className="font-bold text-[#10B981]">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
