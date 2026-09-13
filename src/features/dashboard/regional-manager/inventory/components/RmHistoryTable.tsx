import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Info,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type {
  RmHistoryEvent,
  RmHistoryEventType,
  RmHistoryGroup,
} from "../../types/rm-inventory.types";

interface RmHistoryTableProps {
  events: RmHistoryEvent[];
  onViewEvent: (event: RmHistoryEvent) => void;
}

export function RmHistoryTable({ events, onViewEvent }: RmHistoryTableProps) {
  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("All Events");
  const [simTypeFilter, setSimTypeFilter] = useState<string>("All SIM Types");
  const [scFilter, setScFilter] = useState<string>("All SCs");
  const [dateTag, setDateTag] = useState<string | null>("This Month");
  const [activeChipSim, setActiveChipSim] = useState<string | null>("POS SIM");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Search query
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesRef = evt.refNo.toLowerCase().includes(query);
        const matchesFromTo = evt.fromTo.toLowerCase().includes(query);
        const matchesSim = evt.simType.toLowerCase().includes(query);
        if (!matchesRef && !matchesFromTo && !matchesSim) return false;
      }

      // Event Type
      if (
        eventTypeFilter !== "All Events" &&
        evt.eventType !== eventTypeFilter
      ) {
        return false;
      }

      // SIM Type
      if (
        simTypeFilter !== "All SIM Types" &&
        evt.simType !== simTypeFilter
      ) {
        return false;
      }

      // Active Chip for SIM
      if (activeChipSim && evt.simType !== activeChipSim) {
        return false;
      }

      // SC
      if (scFilter !== "All SCs" && !evt.fromTo.includes(scFilter)) {
        return false;
      }

      return true;
    });
  }, [events, search, eventTypeFilter, simTypeFilter, scFilter, activeChipSim]);

  // Group events by timeline section
  const groupedEvents = useMemo(() => {
    const groups: { title: string; key: RmHistoryGroup; items: RmHistoryEvent[] }[] = [
      { title: "TODAY", key: "TODAY", items: [] },
      { title: "YESTERDAY", key: "YESTERDAY", items: [] },
      { title: "THIS WEEK", key: "THIS_WEEK", items: [] },
      { title: "EARLIER THIS MONTH", key: "EARLIER_THIS_MONTH", items: [] },
    ];

    filteredEvents.forEach((evt) => {
      const g = groups.find((grp) => grp.key === evt.group);
      if (g) g.items.push(evt);
    });

    return groups.filter((g) => g.items.length > 0);
  }, [filteredEvents]);

  const getEventBadge = (type: RmHistoryEventType) => {
    switch (type) {
      case "Received":
        return (
          <span className="rounded-md bg-[#ECFDF5] px-2.5 py-1 text-[11px] font-bold text-[#059669]">
            Received
          </span>
        );
      case "Distributed":
        return (
          <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
            Distributed
          </span>
        );
      case "Adjusted":
        return (
          <div className="flex flex-col">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#F1F5F9] px-2.5 py-1 text-[11px] font-bold text-[#475569]">
              Adjusted <Info className="size-3 text-slate-400" />
            </span>
            <span className="text-[9px] text-[#8C909B] mt-0.5">Stock correction</span>
          </div>
        );
      case "Returned":
        return (
          <span className="rounded-md bg-[#FFFBEB] px-2.5 py-1 text-[11px] font-bold text-[#D97706]">
            Returned
          </span>
        );
    }
  };

  const getSimBadge = (sim: RmHistoryEvent["simType"]) => {
    switch (sim) {
      case "POS SIM":
        return (
          <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
            POS SIM
          </span>
        );
      case "CCTV SIM":
        return (
          <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
            CCTV SIM
          </span>
        );
      case "GPS SIM":
        return (
          <span className="rounded-md bg-[#FEFCE8] px-2 py-0.5 text-[10px] font-bold text-[#CA8A04]">
            GPS SIM
          </span>
        );
      case "Router SIM":
        return (
          <span className="rounded-md bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-bold text-[#EA580C]">
            Router SIM
          </span>
        );
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4 text-xs">
      {/* Search & Dropdown Filters Bar */}
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by SC name, SIM type, ref..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-medium text-[#0F152A] outline-hidden placeholder:text-slate-400 focus:border-blue-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Dropdowns Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Event Filter */}
            <div className="relative">
              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold text-[#0F152A] outline-hidden hover:border-slate-300"
              >
                <option value="All Events">All Events</option>
                <option value="Received">Received</option>
                <option value="Distributed">Distributed</option>
                <option value="Adjusted">Adjusted</option>
                <option value="Returned">Returned</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-slate-400" />
            </div>

            {/* SIM Type Filter */}
            <div className="relative">
              <select
                value={simTypeFilter}
                onChange={(e) => setSimTypeFilter(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold text-[#0F152A] outline-hidden hover:border-slate-300"
              >
                <option value="All SIM Types">All SIM Types</option>
                <option value="POS SIM">POS SIM</option>
                <option value="CCTV SIM">CCTV SIM</option>
                <option value="GPS SIM">GPS SIM</option>
                <option value="Router SIM">Router SIM</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-slate-400" />
            </div>

            {/* SC Filter */}
            <div className="relative">
              <select
                value={scFilter}
                onChange={(e) => setScFilter(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-bold text-[#0F152A] outline-hidden hover:border-slate-300"
              >
                <option value="All SCs">All SCs</option>
                <option value="Aminat Okafor">Aminat Okafor</option>
                <option value="Chidi Eze">Chidi Eze</option>
                <option value="Rabiu Sani">Rabiu Sani</option>
                <option value="Kola Ibrahim">Kola Ibrahim</option>
                <option value="Fatima">Fatima</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Date Range dummy */}
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#64748B] hover:bg-slate-50"
            >
              <Filter className="size-3 text-slate-400" />
              <span>From → To</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#8C909B]">
            <span className="font-bold text-[#0F152A]">Newest First</span>
            <span>•</span>
            <span>Showing 1-15 of 89 events</span>
          </div>
        </div>

        {/* Active Chips */}
        {(dateTag || activeChipSim) && (
          <div className="flex items-center gap-2 pt-1">
            {dateTag && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#2563EB]">
                <span>{dateTag}</span>
                <button
                  type="button"
                  onClick={() => setDateTag(null)}
                  className="hover:text-blue-800"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            {activeChipSim && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#2563EB]">
                <span>{activeChipSim}</span>
                <button
                  type="button"
                  onClick={() => setActiveChipSim(null)}
                  className="hover:text-blue-800"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setDateTag(null);
                setActiveChipSim(null);
                setSearch("");
                setEventTypeFilter("All Events");
                setSimTypeFilter("All SIM Types");
                setScFilter("All SCs");
              }}
              className="text-[11px] font-bold text-[#64748B] hover:text-[#0F152A] underline pl-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              <th className="pb-3 pr-3">Date / Time</th>
              <th className="pb-3 px-3">Event Type</th>
              <th className="pb-3 px-3">SIM Type</th>
              <th className="pb-3 px-3">Network</th>
              <th className="pb-3 px-3 text-right">Quantity</th>
              <th className="pb-3 px-3">From / To</th>
              <th className="pb-3 px-3 text-center">Stock Balance</th>
              <th className="pb-3 px-3">Ref No</th>
              <th className="pb-3 pl-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {groupedEvents.map((group) => (
              <tr key={group.key} className="contents">
                {/* Timeline Group Header */}
                <tr className="bg-[#F8FAFC]">
                  <td
                    colSpan={9}
                    className="py-1.5 px-3 text-[10px] font-black uppercase tracking-wider text-[#8C909B]"
                  >
                    {group.title}
                  </td>
                </tr>

                {group.items.map((item) => (
                  <tr
                    key={item.id}
                    className="group transition hover:bg-[#F8FAFC]"
                  >
                    <td className="py-3.5 pr-3">
                      <span className="font-bold text-[#0F152A] block">
                        {item.date}
                      </span>
                      <span className="text-[10px] text-[#8C909B]">
                        {item.time}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">{getEventBadge(item.eventType)}</td>
                    <td className="py-3.5 px-3">{getSimBadge(item.simType)}</td>
                    <td className="py-3.5 px-3 font-semibold text-[#0F152A]">
                      {item.network}
                    </td>
                    <td className="py-3.5 px-3 text-right font-black">
                      <span
                        className={
                          item.quantity > 0 ? "text-[#10B981]" : "text-[#EF4444]"
                        }
                      >
                        {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-medium text-[#0F152A]">
                      {item.fromTo}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-[#0F152A]">
                      {item.stockBalance}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#64748B]">
                      {item.refNo}
                    </td>
                    <td className="py-3.5 pl-3 text-right">
                      <button
                        type="button"
                        onClick={() => onViewEvent(item)}
                        className="rounded-lg px-2.5 py-1 text-xs font-bold text-[#2563EB] hover:bg-blue-50 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F5F9] pt-4">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-[#64748B] hover:bg-slate-50 disabled:opacity-40"
        >
          <ChevronLeft className="size-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex items-center gap-1.5">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`size-7 rounded-lg text-xs font-bold transition ${
                currentPage === page
                  ? "bg-[#0F152A] text-white"
                  : "text-[#64748B] hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-slate-400 px-1">...</span>
          <button
            type="button"
            onClick={() => setCurrentPage(6)}
            className={`size-7 rounded-lg text-xs font-bold transition ${
              currentPage === 6
                ? "bg-[#0F152A] text-white"
                : "text-[#64748B] hover:bg-slate-100"
            }`}
          >
            6
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(6, p + 1))}
          disabled={currentPage === 6}
          className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
