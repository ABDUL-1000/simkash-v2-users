import { useState } from "react";
import { Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  simType: string;
  status: "Active" | "Expiring" | "Expired";
  expDate: string;
}

interface ApCustomersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  apPhone?: string;
  totalCount?: number;
  onSendRenewalReminders?: () => void;
}

export function ApCustomersModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  apPhone = "08120600542",
  totalCount = 247,
  onSendRenewalReminders,
}: ApCustomersModalProps) {
  const [filter, setFilter] = useState<"All" | "Active" | "Expiring" | "Expired">("All");
  const [search, setSearch] = useState("");

  const sampleCustomers: CustomerRecord[] = [
    { id: "1", name: "Chidi Eze", phone: "07022222222", simType: "POS", status: "Active", expDate: "Exp: 26 Jul" },
    { id: "2", name: "Aminat Nduka", phone: "08120600542", simType: "CCTV", status: "Active", expDate: "Exp: 10 Jul" },
    { id: "3", name: "Ibrahim Musa", phone: "08163083409", simType: "GPS", status: "Expiring", expDate: "Exp: 26 Jun" },
    { id: "4", name: "Fatima Ali", phone: "07055093537", simType: "POS", status: "Active", expDate: "Exp: 15 Jul" },
    { id: "5", name: "Emeka Obi", phone: "09122222222", simType: "Router", status: "Active", expDate: "Exp: 1 Aug" },
    { id: "6", name: "Grace Okonkwo", phone: "08065942373", simType: "POS", status: "Expired", expDate: "Exp: 1 Jun" },
    { id: "7", name: "Hassan Ibrahim", phone: "07083175021", simType: "CCTV", status: "Active", expDate: "Exp: 20 Jul" },
    { id: "8", name: "Chioma Eze", phone: "08099282811", simType: "POS", status: "Expiring", expDate: "Exp: 28 Jun" },
    { id: "9", name: "Abubakar Sule", phone: "08083175021", simType: "POS", status: "Active", expDate: "Exp: 5 Aug" },
    { id: "10", name: "Musa Abdullahi", phone: "07099282811", simType: "GPS", status: "Active", expDate: "Exp: 12 Jul" },
  ];

  const filtered = sampleCustomers.filter((c) => {
    if (filter !== "All" && c.status !== filter) return false;
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.phone.includes(search)
    ) {
      return false;
    }
    return true;
  });

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${apName.split(" ")[0]}'s Customers`}
      description={`${totalCount} customers · ${apPhone}`}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top 3 Summary Cards Strip */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">ACTIVE</span>
            <h3 className="text-xl font-black text-[#10B981]">198</h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">EXPIRING</span>
            <h3 className="text-xl font-black text-[#F59E0B]">23</h3>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-[#8C909B]">EXPIRED</span>
            <h3 className="text-xl font-black text-[#EF4444]">26</h3>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(["All", "Active", "Expiring", "Expired"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                filter === f
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 size-4 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search by name or SIM number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-4 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Customer List */}
        <div className="divide-y divide-[#E2ECF6] max-h-72 overflow-y-auto pr-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2.5 hover:bg-[#F8FAFC] px-1 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#0F152A] text-[10px]">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-[#0F152A]">{item.name}</h4>
                    <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                      {item.simType}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8C909B]">{item.phone}</p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-extrabold flex items-center gap-1 justify-end ${
                    item.status === "Active"
                      ? "text-[#10B981]"
                      : item.status === "Expiring"
                      ? "text-[#F59E0B]"
                      : "text-[#EF4444]"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      item.status === "Active"
                        ? "bg-[#10B981]"
                        : item.status === "Expiring"
                        ? "bg-[#F59E0B]"
                        : "bg-[#EF4444]"
                    }`}
                  />
                  {item.status}
                </span>
                <p className="text-[10px] text-[#8C909B]">{item.expDate}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination indicator & load more */}
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[11px] font-medium text-[#8C909B]">
            Showing {filtered.length} of {totalCount}
          </span>
          <button
            type="button"
            className="font-bold text-[#2563EB] hover:underline"
          >
            Load more
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => {
              onSendRenewalReminders?.();
              onOpenChange(false);
            }}
            className="rounded-xl border border-[#F59E0B] px-5 py-2.5 text-xs font-bold text-[#F59E0B] hover:bg-[#FFFBEB]"
          >
            Send Renewal Reminders
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
