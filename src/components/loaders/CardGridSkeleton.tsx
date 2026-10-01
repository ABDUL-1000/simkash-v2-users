import React from "react";

interface CardGridSkeletonProps {
  count?: number;
}

export const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({
  count = 8,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-28 bg-slate-200 rounded-md" />
            <div className="size-8 rounded-xl bg-slate-100" />
          </div>
          <div className="space-y-1">
            <div className="h-7 w-32 bg-slate-200 rounded-lg" />
            <div className="h-3.5 w-24 bg-slate-100 rounded" />
          </div>
          <div className="border-t border-slate-50 pt-2 flex items-center justify-between">
            <div className="h-3 w-16 bg-slate-100 rounded" />
            <div className="h-3 w-12 bg-slate-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
