import React from "react";

export const TablePageSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 w-full animate-pulse">
      {/* Filter bar placeholder */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-xs">
        <div className="h-10 w-full sm:w-72 bg-slate-100 rounded-xl" />
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-slate-100 rounded-lg shrink-0" />
          ))}
        </div>
      </div>

      {/* Table Container Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        {/* Mock table header */}
        <div className="grid grid-cols-5 gap-4 p-4 bg-slate-50/70 border-b border-slate-100">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-slate-200 rounded-md w-3/4" />
          ))}
        </div>

        {/* 5 alternating skeleton row strips */}
        <div className="divide-y divide-slate-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`grid grid-cols-5 gap-4 p-4 items-center ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-1 w-full">
                  <div className="h-3.5 bg-slate-200 rounded w-24" />
                  <div className="h-2.5 bg-slate-100 rounded w-16" />
                </div>
              </div>
              <div className="h-3.5 bg-slate-200 rounded w-20" />
              <div className="h-5 bg-slate-200 rounded-full w-16" />
              <div className="h-3.5 bg-slate-200 rounded w-24" />
              <div className="h-7 bg-slate-100 rounded-lg w-16 justify-self-end" />
            </div>
          ))}
        </div>

        {/* Bottom pagination placeholder */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-slate-100 bg-slate-50/40">
          <div className="h-4 w-36 bg-slate-200 rounded" />
          <div className="flex items-center gap-1.5">
            <div className="size-8 rounded-lg bg-slate-200" />
            <div className="size-8 rounded-lg bg-slate-100" />
            <div className="size-8 rounded-lg bg-slate-100" />
            <div className="size-8 rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
