import { useState } from "react";
import { Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ActivationCustomerItem {
  id: string;
  name: string;
  phone: string;
  simType: string;
  commission: string;
  time: string;
  avatarBg: string;
}

interface AllActivationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCustomer?: (customer: ActivationCustomerItem) => void;
}

export function AllActivationsModal({
  open,
  onOpenChange,
  onSelectCustomer,
}: AllActivationsModalProps) {
  const [search, setSearch] = useState("");
  const [filterPeriod, setFilterPeriod] = useState<"Today" | "This Week" | "This Month" | "All Time">("This Week");

  const activations: ActivationCustomerItem[] = [
    {
      id: "1",
      name: "Chidi Eze",
      phone: "0801 234 5678",
      simType: "POS SIM",
      commission: "+₦1,000",
      time: "2 min ago",
      avatarBg: "bg-[#D9990D] text-white",
    },
    {
      id: "2",
      name: "Ada Obi",
      phone: "0802 111 2222",
      simType: "CCTV SIM",
      commission: "+₦1,000",
      time: "45 min ago",
      avatarBg: "bg-[#EF4444] text-white",
    },
    {
      id: "3",
      name: "Bola Akin",
      phone: "0803 444 5555",
      simType: "GPS SIM",
      commission: "+₦1,000",
      time: "1 hr ago",
      avatarBg: "bg-[#10B981] text-white",
    },
    {
      id: "4",
      name: "Yemi Bello",
      phone: "0801 888 9999",
      simType: "Router SIM",
      commission: "+₦1,000",
      time: "3 hrs ago",
      avatarBg: "bg-[#D9990D] text-white",
    },
    {
      id: "5",
      name: "Kemi Alade",
      phone: "0807 222 3333",
      simType: "POS SIM",
      commission: "+₦1,000",
      time: "5 hrs ago",
      avatarBg: "bg-[#EF4444] text-white",
    },
    {
      id: "6",
      name: "Ike Sali",
      phone: "0809 555 1212",
      simType: "POS SIM",
      commission: "+₦1,000",
      time: "Yesterday",
      avatarBg: "bg-[#D9990D] text-white",
    },
  ];

  const filtered = activations.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-[#0F152A]">All Activations</span>
          <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
            47
          </span>
        </div>
      }
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 size-4 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search by name, phone or SIM..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] pl-10 pr-4 py-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Period Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {(["Today", "This Week", "This Month", "All Time"] as const).map((period) => {
            const isSelected = filterPeriod === period;
            return (
              <button
                key={period}
                type="button"
                onClick={() => setFilterPeriod(period)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold shrink-0 transition ${
                  isSelected
                    ? "bg-[#0F152A] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8]"
                }`}
              >
                {period}
              </button>
            );
          })}
        </div>

        {/* Customer List Container */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
          <div className="bg-[#F8FAFC] border-b border-[#E2ECF6] px-4 py-2 text-[10px] font-extrabold uppercase text-[#8C909B]">
            CUSTOMER
          </div>
          <div className="divide-y divide-[#E2ECF6]">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectCustomer?.(item);
                }}
                className="flex items-center justify-between p-3.5 hover:bg-[#F8FAFC] cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-full font-bold text-xs ${item.avatarBg}`}
                  >
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0F152A] text-xs">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#66738C] font-mono">
                      {item.phone}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#10B981] text-xs">
                    {item.commission}
                  </span>
                  <p className="text-[10px] text-[#8C909B]">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-[#E2ECF6]">
          <span className="text-xs text-[#8C909B] font-medium">
            Showing {filtered.length} of 47 activations
          </span>
          <button
            type="button"
            onClick={() => alert("Loading more activations...")}
            className="rounded-xl bg-[#EFF4F8] px-4 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#E2ECF6] transition"
          >
            Load More
          </button>
        </div>
      </div>
    </AppModal>
  );
}
