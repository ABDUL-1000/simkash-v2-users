"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { GRADIENTS, TEXT_COLORS, MODAL_COLORS } from "@/constants/colors";

type SimSearchHeroProps = {
  onSearch?: (query: string) => void;
  className?: string;
};

export function SimSearchHeroCard({ onSearch, className }: SimSearchHeroProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(query.trim());
  };

  return (
    <div
      className={`rounded-3xl px-8 py-5 text-center ${className ?? ""}`}
      style={{ background: GRADIENTS.simSearchCard }}
    >
      <p
        className="text-[12px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: TEXT_COLORS.ash }}
      >
        Admin SIM Search — Full Chain View
      </p>

      <h1
        className="mt-3 text-[18px] font-extrabold "
        style={{ color: TEXT_COLORS.white }}
      >
        Find any SIM on the platform
      </h1>

      <p className="mt-3 text-[12px]" style={{ color: TEXT_COLORS.ash }}>
        Search by SIM number, serial/ICCID, or customer phone number
      </p>

      <div className="mx-auto mb-8 mt-4 flex max-w-2xl flex-col gap-3 sm:flex-row">
        <div
          className="flex flex-1 items-center gap-3 bg-[#F0F6FF] rounded-2xl pl-2 "
          style={{ backgroundColor: TEXT_COLORS.white }}
        >
          <Search className="size-4 shrink-0" style={{ color: TEXT_COLORS.ash }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g 07054757393"
            className="w-full bg-[] text-sm outline-none placeholder:text-[#64748B]"
            style={{ color: MODAL_COLORS.title }}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="shrink-0 rounded-xl px-8 py-3.5 text-base text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: MODAL_COLORS.primary }}
        >
          Search
        </button>
      </div>
    </div>
  );
}