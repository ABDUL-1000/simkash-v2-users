import { useState, useMemo } from "react";
import { Plus, AlertTriangle, ChevronRight } from "lucide-react";
import type { StateCoordinatorItem } from "../types/regional-manager.types";
import { APP_COLORS } from "@/constants/colors";

type ScFilterTab = "All" | "Active" | "At Risk" | "Suspended";

interface RmScTableProps {
  scs: StateCoordinatorItem[];
  onOnboardSc: () => void;
  onViewSc: (scId: string) => void;
  onDistributeSc: (sc: StateCoordinatorItem) => void;
}

export function RmScTable({
  scs,
  onOnboardSc,
  onViewSc,
  onDistributeSc,
}: RmScTableProps) {
  const [activeTab, setActiveTab] = useState<ScFilterTab>("All");

  const filteredScs = useMemo(() => {
    return scs.filter((sc) => {
      if (activeTab === "Active") return sc.bonusStatus === "On Track" || sc.bonusStatus === "Achieved";
      if (activeTab === "At Risk") return sc.bonusStatus === "At Risk" || sc.stockStatus === "Low" || sc.stockStatus === "Critical";
      if (activeTab === "Suspended") return sc.stockStatus === "Out of Stock" || sc.bonusStatus === "Missed";
      return true;
    });
  }, [scs, activeTab]);

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white shadow-xs overflow-hidden">
      {/* Header Row */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2ECF6]">
        <div>
          <h3 className="text-base font-black tracking-tight text-[#0F152A]">
            My State Coordinators
          </h3>
          <p className="text-xs text-[#66738C] font-medium">
            12 SCs · All onboarded by you
          </p>
        </div>

        <button
          type="button"
          onClick={onOnboardSc}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8] transition"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <Plus className="size-4" />
          <span>Onboard New SC</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-[#F1F5F9] overflow-x-auto text-xs font-bold">
        {(["All", "Active", "At Risk", "Suspended"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-3.5 py-1.5 transition ${
              activeTab === tab
                ? "bg-[#0F152A] text-white shadow-xs"
                : "text-[#66738C] hover:bg-[#F8FAFC] hover:text-[#0F152A]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SC Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E2ECF6] bg-[#F8FAFC] text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              <th className="py-3 px-4 font-black">SC</th>
              <th className="py-3 px-4 font-black">State</th>
              <th className="py-3 px-4 font-black">Stock</th>
              <th className="py-3 px-4 font-black">APs</th>
              <th className="py-3 px-4 font-black">Activations</th>
              <th className="py-3 px-4 font-black">Bonus</th>
              <th className="py-3 px-4 font-black">Last Active</th>
              <th className="py-3 px-4 text-right font-black">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {filteredScs.map((sc) => {
              const isLow = sc.stock <= 8 && sc.stock > 0;
              const isCritical = sc.stock <= 3 && sc.stock > 0;
              const isOutOfStock = sc.stock === 0;

              return (
                <tr key={sc.id} className="hover:bg-[#F8FAFC] transition-colors">
                  {/* SC Name & Initials */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: sc.avatarBg || "#2563EB" }}
                      >
                        {sc.initials}
                      </div>
                      <span className="font-bold text-[#0F152A]">{sc.name}</span>
                    </div>
                  </td>

                  {/* State */}
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-[#64748B]">
                    {sc.state}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 font-bold">
                      {isCritical && <AlertTriangle className="size-3 text-[#EF4444]" />}
                      <span
                        className={
                          isOutOfStock
                            ? "text-[#EF4444] font-black"
                            : isCritical
                            ? "text-[#EF4444]"
                            : isLow
                            ? "text-[#D97706]"
                            : "text-[#0F152A]"
                        }
                      >
                        {sc.stock}
                      </span>
                      {isLow && !isCritical && (
                        <span className="text-[10px] text-[#D97706] font-normal">Low</span>
                      )}
                      {isCritical && (
                        <span className="text-[10px] text-[#EF4444] font-normal">Critical</span>
                      )}
                    </div>
                  </td>

                  {/* APs */}
                  <td className="py-3 px-4 whitespace-nowrap text-[#0F152A]">
                    <span className="font-bold">{sc.apsCount}</span>{" "}
                    <span className="text-[10px] text-[#8C909B]">partners</span>
                  </td>

                  {/* Activations */}
                  <td className="py-3 px-4 whitespace-nowrap text-[#0F152A]">
                    <span className="font-bold">{sc.activationsCount.toLocaleString()}</span>{" "}
                    <span className="text-[10px] text-[#8C909B]">this month</span>
                  </td>

                  {/* Bonus Status */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        sc.bonusStatus === "On Track"
                          ? "bg-[#EBFFF8] text-[#10B981]"
                          : sc.bonusStatus === "Achieved"
                          ? "bg-[#EFF6FF] text-[#2563EB]"
                          : sc.bonusStatus === "At Risk"
                          ? "bg-[#FFFBEB] text-[#D97706]"
                          : "bg-[#FFF1F2] text-[#EF4444]"
                      }`}
                    >
                      {sc.bonusStatus}
                    </span>
                  </td>

                  {/* Last Active */}
                  <td className="py-3 px-4 whitespace-nowrap text-xs text-[#8C909B]">
                    {sc.lastActive}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap font-bold">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => onViewSc(sc.id)}
                        className="text-[#2563EB] hover:underline"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => onDistributeSc(sc)}
                        className="text-[#10B981] hover:underline"
                      >
                        Distribute
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer link */}
      <div className="border-t border-[#E2ECF6] p-3.5 text-center">
        <button
          type="button"
          onClick={() => setActiveTab("All")}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <span>View all 12 SCs</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export default RmScTable;
