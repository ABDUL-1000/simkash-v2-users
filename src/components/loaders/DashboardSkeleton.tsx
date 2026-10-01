import React from "react";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* Header bar placeholder */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 sm:w-64 bg-slate-200 rounded-xl" />
          <div className="h-4 w-60 sm:w-80 bg-slate-100 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 bg-slate-100 rounded-xl" />
          <div className="h-10 w-32 bg-slate-200 rounded-xl" />
        </div>
      </div>

      {/* 4-card metric strip placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-100 rounded-2xl h-28 p-4 flex flex-col justify-between border border-slate-100 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-slate-200 rounded-md" />
              <div className="h-7 w-7 bg-slate-200 rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <div className="h-6 w-32 bg-slate-200 rounded-lg" />
              <div className="h-3 w-20 bg-slate-200/70 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* 2-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Large chart/table card */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-100 rounded-2xl h-96 p-5 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="h-5 w-40 bg-slate-200 rounded-lg" />
              <div className="h-7 w-24 bg-slate-200 rounded-lg" />
            </div>
            <div className="h-64 w-full bg-slate-200/50 rounded-xl" />
          </div>
        </div>

        {/* Right: Sidebar cards */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-100 rounded-2xl h-44 p-4 border border-slate-100 flex flex-col justify-between">
            <div className="h-4 w-28 bg-slate-200 rounded-md" />
            <div className="h-8 w-36 bg-slate-200 rounded-lg" />
            <div className="h-9 w-full bg-slate-200 rounded-xl" />
          </div>
          <div className="bg-slate-100 rounded-2xl h-44 p-4 border border-slate-100 flex flex-col justify-between">
            <div className="h-4 w-32 bg-slate-200 rounded-md" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-200/80 rounded" />
              <div className="h-3.5 w-3/4 bg-slate-200/80 rounded" />
            </div>
            <div className="h-8 w-24 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
