import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

type TimePill = "today" | "week" | "month" | "year" | "all";

const ROLES = [
  { id: "agency", name: "Agency Partner", count: "11,204 agents", amount: "₦196,305,000", share: "69%", barColor: "#2563EB", route: appPaths.agencyPartnerCommissions },
  { id: "corporate", name: "Corporate Agent", count: "4,847 agents", amount: "₦82,590,000", share: "29%", barColor: "#8B5CF6" },
  { id: "installer", name: "Installer", count: "142 accounts", amount: "₦18,815,000", share: "7%", barColor: "#10B981" },
  { id: "register_manager", name: "Register Manager", count: "42 accounts", amount: "₦19,915,000", share: "7%", barColor: "#059669" },
  { id: "super_distributor", name: "Super Distributor", count: "12 accounts", amount: "₦18,815,000", share: "7%", barColor: "#0D9488" },
  { id: "enterprise", name: "Enterprise", count: "98 agents", amount: "₦5,000,000", share: "2%", barColor: "#F59E0B" },
];

export function CommissionAnalyticsCard() {
  const navigate = useNavigate();
  const [activeTime, setActiveTime] = useState<TimePill>("month");

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-5 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-[#0F172A]">Commission Analytics</h3>

        <div className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-1">
          {(
            [
              { id: "today", label: "Today" },
              { id: "week", label: "This Week" },
              { id: "month", label: "This Month" },
              { id: "year", label: "This Year" },
              { id: "all", label: "All Time" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTime(t.id)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                activeTime === t.id
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 5 Metric Badges Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">TOTAL ACCUMULATED</p>
          <strong className="text-sm font-extrabold text-[#0F172A] block mt-0.5">₦284,500,000</strong>
          <span className="text-[10px] text-[#94A3B8]">All-time total earned</span>
        </div>

        <div className="rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">TOTAL PAID OUT</p>
          <strong className="text-sm font-extrabold text-[#059669] block mt-0.5">₦142,847,000</strong>
          <span className="text-[10px] text-[#94A3B8]">Successfully paid out</span>
        </div>

        <div className="rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#D97706]">PENDING PAYOUT</p>
          <strong className="text-sm font-extrabold text-[#D97706] block mt-0.5">₦8,700,000</strong>
          <span className="text-[10px] text-[#D97706]">23 requests awaiting</span>
        </div>

        <div className="rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">THIS MONTH</p>
          <strong className="text-sm font-extrabold text-[#2563EB] block mt-0.5">₦28,400,000</strong>
          <span className="text-[10px] text-[#94A3B8]">Earned this month</span>
        </div>

        <div className="rounded-xl border border-[#E2ECF8] bg-[#F8FAFC] p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">PLATFORM WALLET</p>
          <strong className="text-sm font-extrabold text-[#0F172A] block mt-0.5">₦847,200,000</strong>
          <span className="text-[10px] text-[#94A3B8]">Available in pool</span>
        </div>
      </div>

      {/* Breakdown by Role */}
      <div className="space-y-3 pt-2">
        <label className="block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          BREAKDOWN BY ROLE
        </label>

        <div className="space-y-3">
          {ROLES.map((role) => (
            <div key={role.id} className="flex items-center justify-between gap-4">
              <div className="w-44 shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => role.route && navigate(role.route)}
                  className={`rounded-md px-2 py-0.5 text-xs font-bold text-left transition-all ${
                    role.route ? "bg-[#EFF6FF] text-[#2563EB] hover:underline cursor-pointer" : "bg-[#F1F5F9] text-[#0F172A]"
                  }`}
                >
                  {role.name}
                </button>
                <span className="text-[11px] text-[#94A3B8]">{role.count}</span>
              </div>

              <div className="h-2 flex-1 rounded-full bg-[#F1F5F9]">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: role.share,
                    backgroundColor: role.barColor,
                  }}
                />
              </div>

              <div className="w-32 text-right">
                <strong className="font-extrabold text-[#0F172A] text-xs sm:text-sm block">{role.amount}</strong>
                <span className="text-[10px] text-[#94A3B8]">{role.share}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
