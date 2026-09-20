import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface CaApActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apId?: string;
  apName?: string;
  todayActs?: number;
  monthActs?: number;
  stock?: number;
  bonusStatus?: string;
}

export function CaApActivityModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  todayActs = 5,
  monthActs = 847,
  stock = 18,
  bonusStatus = "Achieved",
}: CaApActivityModalProps) {
  const [filter, setFilter] = useState<"Today" | "This Week" | "This Month">("Today");

  const sampleActivations = [
    { time: "2 m", simNumber: "07022222222", customer: "Chidi Eze", type: "POS", network: "MTN", status: "Completed", amount: "+₦1,000" },
    { time: "45 m", simNumber: "08120600542", customer: "Aminat Nduka", type: "CCTV", network: "Airtel", status: "Completed", amount: "+₦1,000" },
    { time: "1 h", simNumber: "08163083409", customer: "Ibrahim Musa", type: "POS", network: "Glo", status: "Completed", amount: "+₦1,000" },
    { time: "2 h", simNumber: "07055093537", customer: "Fatima Ali", type: "GPS", network: "MTN", status: "Failed", amount: "₦0" },
    { time: "3 h", simNumber: "09122222222", customer: "Emeka Obi", type: "Router", network: "9mobile", status: "Completed", amount: "+₦1,000" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${apName} — Activity`}
      description="Agency Partner · Your network"
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* 4-Stat Strip */}
        <div className="grid grid-cols-4 gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-center">
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              TODAY
            </span>
            <p className="font-black text-sm text-[#0F152A] pt-0.5">{todayActs}</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              MONTH
            </span>
            <p className="font-black text-sm text-[#10B981] pt-0.5">{monthActs}</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              STOCK
            </span>
            <p className="font-black text-sm text-[#0F152A] pt-0.5">{stock}</p>
          </div>
          <div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              BONUS
            </span>
            <p className="font-black text-xs text-purple-600 pt-0.5 truncate">{bonusStatus}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0F152A]">Recent Activations</span>
          <div className="flex gap-1">
            {(["Today", "This Week", "This Month"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold cursor-pointer ${
                  filter === f
                    ? "bg-[#0F152A] text-white"
                    : "bg-[#F8FAFC] text-[#66738C] hover:bg-slate-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Activity list */}
        <div className="divide-y divide-[#E2ECF6] border border-[#E2ECF6] rounded-2xl p-2 bg-white max-h-56 overflow-y-auto">
          {sampleActivations.map((item, idx) => (
            <div key={idx} className="py-2 px-1 flex items-center justify-between">
              <div>
                <p className="font-bold text-[#0F152A]">{item.simNumber} ({item.network} · {item.type})</p>
                <p className="text-[10px] text-[#8C909B]">Cust: {item.customer} · {item.time} ago</p>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-black ${item.status === "Completed" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                  {item.amount}
                </span>
                <p className="text-[9px] text-[#8C909B]">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppModal>
  );
}
