import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { appPaths } from "@/app/router/paths";

export function SearchByAgentCard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Search by Agent</h3>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Agent name or phone..."
          className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-9 pr-3.5 py-2 text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
        />
      </div>

      {/* Rabiu Sani Mini Profile Card */}
      <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0F1F36] font-bold text-white text-xs">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0F172A]">Rabiu Sani</span>
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                Agency Partner
              </span>
            </div>
            <p className="text-[11px] text-[#64748B]">08120600542 · Lagos</p>
          </div>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-white p-1">
          {["Week", "Month", "Year", "All Time"].map((tab) => {
            const id = tab.toLowerCase().replace(" ", "");
            const isActive = activeTab === id;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex-1 rounded-lg py-1 text-[11px] font-bold transition-all ${
                  isActive ? "bg-[#0F1F36] text-white" : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Financial Details */}
        <div className="space-y-2 divide-y divide-[#DBEAFE] text-xs">
          <div className="flex justify-between pt-1 text-[#64748B]">
            <span>Total Earned</span>
            <strong className="font-extrabold text-[#059669]">₦847,000</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Total Paid Out</span>
            <strong className="font-bold text-[#0F172A]">₦677,500</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Pending Payout</span>
            <strong className="font-extrabold text-[#D97706]">₦45,000</strong>
          </div>
        </div>

        {/* Last Payouts */}
        <div>
          <p className="text-[10px] font-bold text-[#64748B] uppercase mb-1.5">Last Payouts</p>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span>14 Jun · ₦45,000</span>
              <span className="rounded-md bg-[#ECFDF5] px-1.5 py-0.5 font-bold text-[#059669]">Paid</span>
            </div>
            <div className="flex items-center justify-between">
              <span>28 May · ₦30,000</span>
              <span className="rounded-md bg-[#ECFDF5] px-1.5 py-0.5 font-bold text-[#059669]">Paid</span>
            </div>
            <div className="flex items-center justify-between">
              <span>14 May · ₦25,000</span>
              <span className="rounded-md bg-[#ECFDF5] px-1.5 py-0.5 font-bold text-[#059669]">Paid</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(appPaths.walletAgentDetails("1").path)}
            className="mt-2 flex items-center gap-1 font-bold text-[#2563EB] text-[11px] hover:underline"
          >
            <span>View full history</span>
            <ArrowRight className="size-3" />
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#059669]"
          >
            Approve Pending — ₦45,000
          </button>
          <button
            type="button"
            onClick={() => navigate(appPaths.walletAgentDetails("1").path)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 font-bold text-[#0F172A] text-xs hover:bg-[#F8FAFC]"
          >
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
