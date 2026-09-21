import React from "react";
import { Info, AlertTriangle } from "lucide-react";

export const ApCommissionNoticeBanner: React.FC = () => {
  return (
    <div className="space-y-2.5">
      <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200/80 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-900 leading-relaxed font-medium">
          AP commission is paid by the SC from their SC commission earnings. You set the AP rates your SCs must follow across your EP network.
        </p>
      </div>

      <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          AP commission comes from the SC commission pool — not directly from your EP earnings. SCs fund AP payments from their own commission slice. Changes here affect what SCs must pay their APs.
        </p>
      </div>
    </div>
  );
};
