import React from "react";

export const SimBalanceTrendsChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">SIM Balance Trends</h3>
          <p className="text-xs text-slate-400">Running inventory by SIM type · Jan–Jun 2026</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1F3A5F]" />
            <span className="text-slate-600">POS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="text-slate-600">CCTV</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="text-slate-600">GPS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            <span className="text-slate-600">Router</span>
          </div>
        </div>
      </div>

      {/* SVG Multi-Line Chart */}
      <div className="w-full h-44 relative">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="30" x2="700" y2="30" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="0" y1="80" x2="700" y2="80" stroke="#F1F5F9" strokeWidth="1" />
          <line x1="0" y1="130" x2="700" y2="130" stroke="#F1F5F9" strokeWidth="1" />

          {/* POS Line (Navy) */}
          <polyline
            fill="none"
            stroke="#1F3A5F"
            strokeWidth="2.5"
            points="20,105 140,103 260,102 380,68 500,90 680,118"
          />
          <circle cx="680" cy="118" r="4" fill="#1F3A5F" />

          {/* CCTV Line (Orange) */}
          <polyline
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            points="20,118 140,120 260,122 380,124 500,128 680,132"
          />
          <circle cx="680" cy="132" r="4" fill="#F59E0B" />

          {/* GPS Line (Green) */}
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            points="20,138 140,138 260,138 380,137 500,137 680,140"
          />
          <circle cx="680" cy="140" r="4" fill="#10B981" />

          {/* Router Line (Purple) */}
          <polyline
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            points="20,142 140,142 260,142 380,142 500,142 680,143"
          />
          <circle cx="680" cy="143" r="4" fill="#8B5CF6" />
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between text-[11px] text-slate-400 pt-2 px-1">
          <span>Jan 2026</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>

      {/* 4 Bottom Delta Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">POS SIM</span>
          <span className="font-extrabold text-xs text-rose-600">-2,210 from Apr peak</span>
        </div>
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CCTV SIM</span>
          <span className="font-extrabold text-xs text-amber-600">-600 since Jan</span>
        </div>
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GPS SIM</span>
          <span className="font-extrabold text-xs text-emerald-600">+28 net since Jan</span>
        </div>
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Router SIM</span>
          <span className="font-extrabold text-xs text-purple-600">-124 net since Jan</span>
        </div>
      </div>
    </div>
  );
};
