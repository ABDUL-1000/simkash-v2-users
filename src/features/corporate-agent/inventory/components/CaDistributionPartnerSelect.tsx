import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";
export function CaDistributionPartnerSelect({ selectedAp, partners, onSelectAp, search: searchQuery, onSearch: setSearchQuery, loading }: { selectedAp?: CaApStockDistributionRow; partners: CaApStockDistributionRow[]; onSelectAp: (ap: CaApStockDistributionRow) => void; search: string; onSearch: (value: string) => void; loading?: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentApStock = selectedAp?.total;

  const filteredAps = partners;

return (<>
      {/* SELECT AGENCY PARTNER */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
          Select Agency Partner
        </span>

        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white cursor-pointer hover:border-slate-300 text-xs"
          >
            <div className="flex items-center gap-2 text-slate-400">
              <Search className="w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                placeholder="Search AP by name or phone..."
                className="outline-none text-xs text-slate-800 bg-transparent placeholder:text-slate-400"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg z-20 divide-y divide-slate-100">
              {!filteredAps.length && <AppEmptyState title={loading ? "Loading agency partners…" : "No agency partners found"} />}
              {filteredAps.map((ap) => (
                <div
                  key={ap.id}
                  onClick={() => {
                    onSelectAp(ap);
                    setDropdownOpen(false);
                  }}
                  className="p-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-black text-[9px] flex items-center justify-center">
                      {ap.avatarInitials}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900">{ap.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {ap.phone}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ap.total <= 3 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-700"}`}>
                    {ap.total} SIMs {ap.total <= 3 && "⚠️ Critical"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SELECTED AP CARD */}
        {selectedAp ? <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {selectedAp.avatarInitials}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">
                {selectedAp.name}
              </div>
              <div className="text-[11px] text-slate-600">
                {selectedAp.phone} · {selectedAp.state} · {selectedAp.customers ?? "—"} customers
              </div>
              <div className="text-[11px] font-bold text-rose-600 mt-0.5">
                Current stock: {currentApStock} SIMs
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDropdownOpen(true)}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Change
          </button>
        </div> : <AppEmptyState title="Select an agency partner" description="Choose a recipient from the list above." />}
      </div>

</>); }
