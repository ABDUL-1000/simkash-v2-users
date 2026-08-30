"use client";

export function RMPlatformChainWidget() {
  const steps = [
    { label: "Super Admin → Regional Managers (28)", sub: "8,400 SIMs sent" },
    { label: "Regional Managers → State Coordinators (147)", sub: "6,234 SIMs sent" },
    { label: "State Coordinators → Agency Partners (2,847)", sub: "4,891 SIMs sent" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Platform Distribution Chain</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {steps.map((item, idx) => (
          <div key={idx} className={`${idx > 0 ? "pt-3" : ""}`}>
            <strong className="font-bold text-[#0F172A] block text-xs">{item.label}</strong>
            <span className="text-[11px] font-bold text-[#059669] mt-0.5 block">{item.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
