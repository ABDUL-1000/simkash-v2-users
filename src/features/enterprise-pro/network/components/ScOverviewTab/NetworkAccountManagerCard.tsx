import React from "react";
import { Phone, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { colors } from "@/constants/colors";

export const NetworkAccountManagerCard: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-900 text-sm">Your Account Manager</h4>
        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-800 text-sm">
          OA
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm">Oluwaseun Adebayo</div>
          <p className="text-xs text-gray-500">Senior Account Manager · Lagos Region</p>
          <p className="text-[11px] text-gray-400">Response time: &lt;15 mins</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1">
        <a
          href="tel:08001234567"
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-gray-900 transition border border-slate-200/60"
        >
          <Phone className="w-4 h-4 text-blue-600 mb-1" />
          <span className="text-[11px] font-medium">Call</span>
        </a>
        <a
          href="mailto:seun.adebayo@simkash.ng"
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-gray-900 transition border border-slate-200/60"
        >
          <Mail className="w-4 h-4 text-indigo-600 mb-1" />
          <span className="text-[11px] font-medium">Email</span>
        </a>
        <button
          type="button"
          onClick={() => window.open("https://wa.me/2348001234567", "_blank")}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-gray-700 hover:text-gray-900 transition border border-slate-200/60"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-1" />
          <span className="text-[11px] font-medium">Chat</span>
        </button>
      </div>
    </div>
  );
};
