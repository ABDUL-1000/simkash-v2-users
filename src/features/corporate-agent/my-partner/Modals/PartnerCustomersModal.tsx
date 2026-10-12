"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaPartnerCustomers } from "../api/useCaPartners";

interface PartnerCustomersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId: number | string;
  partnerName?: string;
  partnerPhone?: string;
}

export function PartnerCustomersModal({
  open,
  onOpenChange,
  partnerId,
  partnerName = "Agency Partner",
  partnerPhone = "",
}: PartnerCustomersModalProps) {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const { page, pageSize, setPage } = useTablePagination({
    initialPage: 1,
    initialPageSize: 10,
  });

  const { data, isLoading } = useGetCaPartnerCustomers(partnerId, {
    page,
    limit: pageSize,
  });

  const customers = data?.customers || [];
  const pagination = data?.pagination;
  const totalCount = pagination?.total_items ?? customers.length;

  const filtered = customers.filter((c) => {
    if (filter !== "All" && c.status.toLowerCase() !== filter.toLowerCase()) return false;
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.sim_number.includes(search)
    ) {
      return false;
    }
    return true;
  });

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${partnerName.split(" ")[0]}'s Customers`}
      description={`${totalCount} customers · ${partnerPhone}`}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Active", "Expiring", "Expired"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
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
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-4 text-xs font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Customer List / Empty State */}
        {isLoading ? (
          <div className="py-8 text-center text-xs text-[#8C909B]">Loading customers...</div>
        ) : filtered.length === 0 ? (
          <AppEmptyState
            title="No Customers Found"
            description="There are no customers matching the selected criteria."
          />
        ) : (
          <div className="divide-y divide-[#E2ECF6] max-h-72 overflow-y-auto pr-1">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2.5 hover:bg-[#F8FAFC] px-1 rounded-xl transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#0F152A] text-[10px]">
                    {item.initials || item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-[#0F152A]">{item.name}</h4>
                      <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                        {item.sim_type}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#8C909B]">{item.sim_number}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-extrabold flex items-center gap-1 justify-end ${
                      item.status.toLowerCase() === "active"
                        ? "text-[#10B981]"
                        : item.status.toLowerCase() === "expiring"
                        ? "text-[#F59E0B]"
                        : "text-[#EF4444]"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        item.status.toLowerCase() === "active"
                          ? "bg-[#10B981]"
                          : item.status.toLowerCase() === "expiring"
                          ? "bg-[#F59E0B]"
                          : "bg-[#EF4444]"
                      }`}
                    />
                    {item.status}
                  </span>
                  {(item.activated_date || item.expiry_date) && (
                    <p className="text-[10px] text-[#8C909B]">
                      {item.activated_date || item.expiry_date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {pagination && pagination.total_pages > 1 && (
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E2ECF6]">
            <span className="text-[11px] font-medium text-[#8C909B]">
              Page {pagination.current_page} of {pagination.total_pages} ({pagination.total_items} total)
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] disabled:opacity-40 hover:bg-[#F8FAFC]"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page >= pagination.total_pages}
                onClick={() => setPage(page + 1)}
                className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#0F152A] disabled:opacity-40 hover:bg-[#F8FAFC]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
