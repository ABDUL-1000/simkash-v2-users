import { useState } from "react";
import { Search, MapPin, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { RM_SC_DISTRIBUTIONS } from "../../data/rm-inventory.data";
import type { RmScDistributionRow } from "../../types/rm-inventory.types";

interface ChangeScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedScId: string;
  onSelectSc: (sc: RmScDistributionRow) => void;
}

export function ChangeScModal({
  open,
  onOpenChange,
  selectedScId,
  onSelectSc,
}: ChangeScModalProps) {
  const [search, setSearch] = useState("");

  const filtered = RM_SC_DISTRIBUTIONS.filter(
    (sc) =>
      sc.name.toLowerCase().includes(search.toLowerCase()) ||
      sc.state.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (sc: RmScDistributionRow) => {
    onSelectSc(sc);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Select State Coordinator"
      description="Choose an SC to allocate and distribute SIM stock to."
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SC by name or state..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-[#0F152A] outline-hidden placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* SCs List */}
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {filtered.map((sc) => {
            const isSelected = sc.scId === selectedScId;
            const initials = sc.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2);

            return (
              <button
                key={sc.scId}
                type="button"
                onClick={() => handleSelect(sc)}
                className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition ${
                  isSelected
                    ? "border-[#2563EB] bg-[#EFF6FF]"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white shadow-xs">
                    {initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">{sc.name}</h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
                      <MapPin className="size-3 text-slate-400" />
                      <span>{sc.state} State</span>
                      <span>•</span>
                      <span>{sc.total ?? 0} SIMs in stock</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      sc.status === "Good"
                        ? "bg-[#EBFFF8] text-[#10B981]"
                        : sc.status === "Low"
                        ? "bg-[#FEFCE8] text-[#CA8A04]"
                        : "bg-[#FFF7F8] text-[#EF4444]"
                    }`}
                  >
                    {sc.status}
                  </span>
                  {isSelected && (
                    <div className="flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-white">
                      <Check className="size-3" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </AppModal>
  );
}
