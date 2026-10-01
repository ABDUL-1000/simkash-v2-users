import React from "react";

export const DetailsPageSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* Top breadcrumb & header placeholder */}
      <div className="space-y-3 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-16 bg-slate-200 rounded" />
          <div className="h-3.5 w-4 bg-slate-100 rounded" />
          <div className="h-3.5 w-24 bg-slate-200 rounded" />
          <div className="h-3.5 w-4 bg-slate-100 rounded" />
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="h-8 w-60 bg-slate-200 rounded-xl" />
            <div className="h-4 w-40 bg-slate-100 rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-24 bg-slate-100 rounded-xl" />
            <div className="h-10 w-28 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* 3-column detail layout placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Information - 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-14 rounded-2xl bg-slate-200 shrink-0" />
              <div className="space-y-1.5 w-full">
                <div className="h-5 w-36 bg-slate-200 rounded-lg" />
                <div className="h-3.5 w-24 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="divide-y divide-slate-50 pt-2 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center pt-2">
                  <div className="h-3.5 w-24 bg-slate-100 rounded" />
                  <div className="h-3.5 w-32 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column (Metrics & Activity - 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-4">
            <div className="h-4 w-32 bg-slate-200 rounded-md" />
            <div className="h-24 bg-slate-100 rounded-xl" />
            <div className="space-y-2">
              <div className="h-3.5 w-full bg-slate-100 rounded" />
              <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
            </div>
          </div>
        </div>

        {/* Right Column (Actions & Summary - 3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs space-y-3">
            <div className="h-4 w-28 bg-slate-200 rounded-md" />
            <div className="h-10 w-full bg-slate-200 rounded-xl" />
            <div className="h-10 w-full bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
