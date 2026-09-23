import React from "react";

export const EbCustomerAnalyticsSidebar: React.FC = () => {
  const simsByType = [
    { label: "POS SIM", pct: 68, color: "bg-blue-600" },
    { label: "CCTV SIM", pct: 22, color: "bg-emerald-500" },
    { label: "GPS SIM", pct: 10, color: "bg-purple-600" },
    { label: "Router SIM", pct: 0, color: "bg-slate-300" },
  ];

  const plansByDuration = [
    { label: "1 Year", pct: 45, color: "bg-slate-900" },
    { label: "6 Month", pct: 23, color: "bg-blue-600" },
    { label: "2 Year", pct: 20, color: "bg-emerald-500" },
    { label: "3 Year", pct: 12, color: "bg-purple-600" },
  ];

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-5 text-xs">
      {/* SIMs by Type */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          SIMs by Type
        </span>
        <div className="space-y-2 font-medium">
          {simsByType.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-bold text-slate-900">{item.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans by Duration */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Plans by Duration
        </span>
        <div className="space-y-2 font-medium">
          {plansByDuration.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-bold text-slate-900">{item.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
