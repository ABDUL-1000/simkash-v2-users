import { useNavigate } from "react-router-dom";
import type { CustomerItem } from "../types/customer.types";

interface CustomerTableProps {
  customers: CustomerItem[];
  onRemindClick: (customer: CustomerItem) => void;
}

export function CustomerTable({ customers, onRemindClick }: CustomerTableProps) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E2ECF6] bg-[#F8FAFC] text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              <th className="py-3.5 px-4 sm:px-6">Customer</th>
              <th className="py-3.5 px-4">SIM Number</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Network</th>
              <th className="py-3.5 px-4">Plan</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Activated</th>
              <th className="py-3.5 px-4">Expiry</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {customers.map((c) => {
              const initials = c.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2);

              const isExpiring = c.status === "Expiring";
              const isExpired = c.status === "Expired";
              const isActive = c.status === "Active";

              return (
                <tr
                  key={c.id}
                  className="transition hover:bg-[#F8FAFC] text-[#0F152A]"
                >
                  {/* Customer Avatar + Name + Phone */}
                  <td className="py-3 px-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] font-bold text-xs text-[#2563EB]">
                        {initials}
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => navigate(`/agency-partner/customers/${c.id}`)}
                          className="font-bold text-xs text-[#0F152A] hover:text-[#2563EB] text-left block"
                        >
                          {c.name}
                        </button>
                        <span className="text-[11px] text-[#8C909B] font-mono">{c.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* SIM Number */}
                  <td className="py-3 px-4 font-mono font-medium text-[#475569] whitespace-nowrap">
                    {c.simNumber}
                  </td>

                  {/* SIM Type Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      {c.simType}
                    </span>
                  </td>

                  {/* Network Badge */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                        c.network === "MTN"
                          ? "bg-[#FFFBEB] text-[#854D0E]"
                          : c.network === "Airtel"
                          ? "bg-[#FFF1F2] text-[#991B1B]"
                          : c.network === "Glo"
                          ? "bg-[#F0FDF4] text-[#065F46]"
                          : "bg-[#EFF6FF] text-[#1E40AF]"
                      }`}
                    >
                      {c.network}
                    </span>
                  </td>

                  {/* Plan */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      {c.plan}
                    </span>
                  </td>

                  {/* Status with dot */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <div
                        className={`size-1.5 rounded-full ${
                          isActive
                            ? "bg-[#10B981]"
                            : isExpiring
                            ? "bg-[#F59E0B]"
                            : isExpired
                            ? "bg-[#EF4444]"
                            : "bg-[#94A3B8]"
                        }`}
                      />
                      <span
                        className={
                          isActive
                            ? "text-[#10B981]"
                            : isExpiring
                            ? "text-[#D97706]"
                            : isExpired
                            ? "text-[#EF4444]"
                            : "text-[#64748B]"
                        }
                      >
                        {c.status}
                      </span>
                    </div>
                  </td>

                  {/* Activated */}
                  <td className="py-3 px-4 font-medium text-[#64748B] whitespace-nowrap">
                    {c.activatedDate}
                  </td>

                  {/* Expiry */}
                  <td className="py-3 px-4 font-medium text-[#64748B] whitespace-nowrap">
                    <span className={isExpiring ? "text-[#D97706] font-bold" : isExpired ? "text-[#EF4444] font-bold" : ""}>
                      {c.expiryDate}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/agency-partner/customers/${c.id}`)}
                        className="font-bold text-[#2563EB] hover:underline"
                      >
                        View
                      </button>

                      {(isExpiring || isExpired) && (
                        <button
                          type="button"
                          onClick={() => onRemindClick(c)}
                          className="font-bold text-[#D97706] hover:underline text-[11px]"
                        >
                          Remind
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#E2ECF6] p-4 text-xs text-[#8C909B]">
        <span>Showing 1–{customers.length} of 247 customers</span>

        <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
          <button type="button" className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100">
            &lt; Prev
          </button>
          <button type="button" className="size-7 rounded-lg bg-[#2563EB] text-white font-bold">
            1
          </button>
          <button type="button" className="size-7 rounded-lg text-slate-600 hover:bg-slate-100">
            2
          </button>
          <button type="button" className="size-7 rounded-lg text-slate-600 hover:bg-slate-100">
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button type="button" className="size-7 rounded-lg text-slate-600 hover:bg-slate-100">
            17
          </button>
          <button type="button" className="rounded-lg px-2 py-1 font-bold text-[#2563EB] hover:bg-slate-100">
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
