import React from "react";
import { MessageSquare, PhoneCall } from "lucide-react";

interface EbRelationshipManagerCardProps {
  onMessage?: () => void;
  onScheduleCall?: () => void;
}

export const EbRelationshipManagerCard: React.FC<
  EbRelationshipManagerCardProps
> = ({ onMessage, onScheduleCall }) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3.5 text-xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Relationship Manager
      </span>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <h4 className="font-bold text-slate-900 text-sm">Adebayo Okonkwo</h4>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Available
          </span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium">
          Your dedicated RM for Strategic accounts.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={onMessage}
          className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition inline-flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          <span>Message</span>
        </button>
        <button
          type="button"
          onClick={onScheduleCall}
          className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition inline-flex items-center justify-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
          <span>Schedule Call</span>
        </button>
      </div>
    </div>
  );
};
