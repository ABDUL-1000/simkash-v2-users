import React from "react";
import { Info, AlertCircle } from "lucide-react";

export const ScCommissionNoticeBanner: React.FC = () => {
  return (
    <div className="space-y-2.5">
      <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200/80 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-900 leading-relaxed font-medium">
          SC commission is the % of margin from each SC's AP network that you share with the SC. Higher rate = more SC motivation.
        </p>
      </div>

      <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          Rate changes apply to new distribution cycles only. Notify SCs of changes.
        </p>
      </div>
    </div>
  );
};
