import React from "react";
import { Phone, Mail, Shield } from "lucide-react";
import { colors } from "@/constants/colors";
import { accountManagerData } from "../data/mockInvestmentData";

export const AssignedAccountManager: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900">
            Dedicated Wealth Advisor
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      </div>

      <div className="flex items-center gap-3.5 mb-4">
        <img
          src={accountManagerData.avatar}
          alt={accountManagerData.name}
          className="w-13 h-13 rounded-full object-cover border-2 border-slate-100 shadow-sm"
        />
        <div>
          <h4 className="text-base font-bold text-gray-900">
            {accountManagerData.name}
          </h4>
          <p className="text-xs text-gray-500 font-medium">
            {accountManagerData.title}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {accountManagerData.availability}
          </p>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-100">
        <a
          href={`tel:${accountManagerData.phone}`}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors border border-gray-200"
        >
          <Phone className="w-3.5 h-3.5 text-gray-600" />
          <span>Call: {accountManagerData.phone}</span>
        </a>
        <a
          href={`mailto:${accountManagerData.email}`}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-blue-600" />
          <span>Email {accountManagerData.name}</span>
        </a>
      </div>
    </div>
  );
};
