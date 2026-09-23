import React from "react";
import { Phone, MessageCircle } from "lucide-react";

interface RelationshipManagerCardProps {
  name?: string;
  role?: string;
  phone?: string;
}

export const RelationshipManagerCard: React.FC<RelationshipManagerCardProps> = ({
  name = "Your Account Manager",
  role = "Strategic Account Manager",
  phone = "08012345678",
}) => {
  return (
    <div className="rounded-2xl p-5 bg-[#1B365D] text-white shadow-sm space-y-4">
      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
        Your Relationship Manager
      </span>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-500/30 border border-blue-400/40 flex items-center justify-center font-bold text-base text-blue-200 shrink-0">
          KA
        </div>
        <div>
          <h4 className="font-bold text-sm text-white">{name}</h4>
          <div className="text-[11px] text-slate-300">{role}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Phone: {phone}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <a
          href={`tel:${phone}`}
          className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </a>
        <a
          href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>

      <p className="text-[10px] text-slate-300 leading-relaxed pt-1 border-t border-white/10">
        For pricing, private label and strategic account support
      </p>
    </div>
  );
};
