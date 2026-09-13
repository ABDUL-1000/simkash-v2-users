import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

interface ApActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apId?: string;
  apName?: string;
  todayActs?: number;
  monthActs?: number;
  stock?: number;
  bonusStatus?: string;
  onDistribute?: () => void;
}

export function ApActivityModal({
  open,
  onOpenChange,
  apId = "rabiu-sani",
  apName = "Rabiu Sani",
  todayActs = 5,
  monthActs = 847,
  stock = 18,
  bonusStatus = "Achieved",
  onDistribute,
}: ApActivityModalProps) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"Today" | "This Week" | "This Month" | "Custom">("Today");

  const sampleActivations = [
    { time: "2 m", simNumber: "07022222222", customer: "Chidi Eze", type: "POS", network: "MTN", status: "Completed", amount: "+₦1,000" },
    { time: "45 m", simNumber: "08120600542", customer: "Aminat Nduka", type: "CCTV", network: "Airtel", status: "Completed", amount: "+₦1,000" },
    { time: "1 h", simNumber: "08163083409", customer: "Ibrahim Musa", type: "POS", network: "Glo", status: "Completed", amount: "+₦1,000" },
    { time: "2 h", simNumber: "07055093537", customer: "Fatima Ali", type: "GPS", network: "MTN", status: "Failed", amount: "₦0" },
    { time: "3 h", simNumber: "09122222222", customer: "Emeka Obi", type: "Router", network: "9mobile", status: "Completed", amount: "+₦1,000" },
    { time: "4 h", simNumber: "08033333333", customer: "Blessing Udo", type: "POS", network: "MTN", status: "Completed", amount: "+₦1,000" },
    { time: "5 h", simNumber: "07044444444", customer: "Yusuf Bello", type: "CCTV", network: "Airtel", status: "Completed", amount: "+₦1,000" },
    { time: "6 h", simNumber: "08155555555", customer: "Aisha Garba", type: "POS", network: "Glo", status: "Failed", amount: "₦0" },
    { time: "7 h", simNumber: "09066666666", customer: "Nneka Ani", type: "GPS", network: "MTN", status: "Completed", amount: "+₦1,000" },
    { time: "8 h", simNumber: "07077777777", customer: "Tunde Adeyemi", type: "Router", network: "Airtel", status: "Completed", amount: "+₦1,000" },
  ];

  const firstName = apName.split(" ")[0];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${apName} — Activity`}
      description="Agency Partner · Your network"
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* 4-Stat Strip Header Card (Matching Image 2) */}
        <div className="grid grid-cols-4 gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center">
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              TODAY
            </span>
            <p className="text-sm font-black text-[#0F152A] pt-0.5">{todayActs} Act.</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              THIS MONTH
            </span>
            <p className="text-sm font-black text-[#0F152A] pt-0.5">{monthActs}</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              STOCK
            </span>
            <p className="text-sm font-black text-[#0F152A] pt-0.5">{stock} SIMs</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              BONUS
            </span>
            <div className="pt-0.5">
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-extrabold text-purple-600">
                {bonusStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Date Range Tabs */}
        <div className="grid grid-cols-4 gap-1.5">
          {(["Today", "This Week", "This Month", "Custom"] as const).map((f) => {
            const isSelected = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-xl py-2 text-center text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#0F152A] text-white shadow-xs"
                    : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Recent Activations Feed */}
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            RECENT ACTIVATIONS
          </span>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6] text-xs">
            {sampleActivations.map((item, idx) => {
              const isOk = item.status === "Completed";
              return (
                <div
                  key={idx}
                  className="p-2.5 flex items-center justify-between hover:bg-[#F8FAFC]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-medium text-[#8C909B] w-6 shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-[#0F152A]">
                        {item.simNumber}
                      </h4>
                      <p className="text-[10px] text-[#8C909B]">{item.customer}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-extrabold text-[#2563EB]">
                      {item.type}
                    </span>
                    <span className="rounded-md bg-[#FFFBEB] px-1.5 py-0.5 text-[9px] font-extrabold text-[#854D0E]">
                      {item.network}
                    </span>
                    <span
                      className={`size-2 rounded-full ${
                        isOk ? "bg-[#10B981]" : "bg-[#EF4444]"
                      }`}
                    />
                    <span
                      className={`font-black text-xs min-w-[55px] text-right ${
                        isOk ? "text-[#10B981]" : "text-[#8C909B]"
                      }`}
                    >
                      {item.amount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#66738C] pt-0.5 px-1 font-medium">
            <span>And 13 more today...</span>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                navigate(appPaths.agencyPartnerDetails(apId).path);
              }}
              className="font-extrabold text-[#2563EB] hover:underline"
            >
              View full history →
            </button>
          </div>
        </div>

        {/* Summary Strip Box */}
        <div className="rounded-2xl border border-[#EBFFF8] bg-[#EBFFF8]/60 p-3 flex items-center justify-between text-xs font-bold">
          <span className="text-[#0F152A]">
            5 activations · 4 completed · 1 failed
          </span>
          <span className="text-[#10B981] font-black text-sm">+₦4,000</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate(appPaths.agencyPartnerDetails(apId).path);
            }}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View {firstName}'s Full Profile
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onDistribute?.();
            }}
            className="w-full rounded-xl border border-[#10B981]/40 bg-[#EBFFF8] py-2.5 text-xs font-bold text-[#10B981] hover:bg-emerald-100"
          >
            Distribute to {firstName}
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl bg-[#0F152A] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
