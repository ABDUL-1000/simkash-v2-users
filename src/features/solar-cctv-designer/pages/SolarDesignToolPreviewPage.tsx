"use client";

import { useNavigate } from "react-router-dom";
import { Sun, X, AlertTriangle } from "lucide-react";
import { appPaths } from "@/app/router/paths";

export default function SolarDesignToolPreviewPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-xs sm:text-sm">
      {/* Top Admin Preview Banner */}
      <div className="bg-[#FFFBEB] border-b border-[#FEF3C7] px-4 py-2 text-xs font-medium text-[#D97706] flex items-center justify-between">
        <div className="flex items-center gap-1.5 mx-auto">
          <AlertTriangle className="size-4 text-[#D97706]" />
          <span>
            Admin Preview — Changes you make here are not saved to any user account
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate(appPaths.solarCctvDesigner)}
          className="text-[#D97706] hover:text-[#0F172A] transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 p-6 sm:p-10 flex items-center justify-center">
        <div className="w-full max-w-4xl rounded-3xl border-2 border-dashed border-[#CBD5E1] bg-white p-16 text-center space-y-3 shadow-xs">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] mx-auto">
            <Sun className="size-8 text-[#2563EB]" />
          </div>
          <h2 className="text-lg font-extrabold text-[#0F172A]">
            Solar Design Tool Preview
          </h2>
          <p className="text-xs text-[#64748B]">
            This area renders the user-facing solar design tool
          </p>
        </div>
      </div>
    </div>
  );
}
