import { useState } from "react";
import { Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useGetActivatedSims } from "../api";

interface ActivationCustomerItem {
  id: string;
  name: string;
  phone: string;
  simType: string;
  commission: string;
  time: string;
  avatarBg: string;
}

const AVATAR_BY_NETWORK: Record<string, string> = { mtn: "bg-[#D9990D] text-white", airtel: "bg-[#EF4444] text-white", glo: "bg-[#10B981] text-white" };
const PAGE = 15;

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
  const [limit, setLimit] = useState(PAGE);
  // Period pills (Today / This Week / This Month / All Time) are disabled: /activated has no date filter.
  const query = useGetActivatedSims({ search: search.trim(), page: 1, limit }, );
  const total = query.result?.total ?? 0;
  const filtered: ActivationCustomerItem[] = query.sims.map(sim => ({
    id: String(sim.id),
    name: sim.customer.fullname,
    phone: sim.customer.phone,
    simType: sim.type_label,
    commission: `+₦${Number(sim.commission || 0).toLocaleString()}`,
    time: sim.time_ago,
    avatarBg: AVATAR_BY_NETWORK[sim.network.toLowerCase()] ?? "bg-[#2563EB] text-white",
  }));

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-[#0F152A]">All Activations</span>
          <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
            {total.toLocaleString()}
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
            onChange={(e) => { setSearch(e.target.value); setLimit(PAGE); }}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] pl-10 pr-4 py-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Period Filter Pills are disabled: no date filter on /partner/device-sim/activated. */}

        {/* Customer List Container */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white overflow-hidden">
          <div className="bg-[#F8FAFC] border-b border-[#E2ECF6] px-4 py-2 text-[10px] font-extrabold uppercase text-[#8C909B]">
            CUSTOMER
          </div>
          <div className="divide-y divide-[#E2ECF6]">
            {query.isLoading && Array.from({ length: 4 }).map((_, index) => <div key={index} className="m-3 h-10 animate-pulse rounded-xl bg-slate-100" />)}
            {!query.isLoading && filtered.length === 0 && <p className="p-4 text-center text-[11px] text-[#8C909B]">{query.error ? query.error.message : search ? "No activations match your search." : "No activations yet."}</p>}
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
            Showing {filtered.length} of {total.toLocaleString()} activations
          </span>
          {filtered.length < total && <button
            type="button"
            disabled={query.isFetching}
            onClick={() => setLimit(current => current + PAGE)}
            className="rounded-xl bg-[#EFF4F8] px-4 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#E2ECF6] transition"
          >
            {query.isFetching ? "Loading..." : "Load More"}
          </button>}
        </div>
      </div>
    </AppModal>
  );
}
