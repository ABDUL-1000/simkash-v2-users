import { useState, useMemo } from "react";
import { HistoryStatCards } from "./HistoryStatCards";
import { HistoryFilterBar } from "./HistoryFilterBar";
import { StockHistoryTable } from "./StockHistoryTable";
import { StockHistoryPagination } from "./StockHistoryPagination";
import type { StockEventItem } from "../types/stock.types";

interface StockHistoryTabProps {
  events: StockEventItem[];
  onViewEvent: (event: StockEventItem) => void;
  onExportClick?: () => void;
}

export function StockHistoryTab({ events, onViewEvent, onExportClick }: StockHistoryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [simFilter, setSimFilter] = useState("All");
  const [rangeFilter, setRangeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Type filter
      if (typeFilter !== "All" && e.eventType !== typeFilter) {
        return false;
      }
      // SIM type filter
      if (simFilter !== "All" && e.simType !== simFilter) {
        return false;
      }
      // Range filter
      if (rangeFilter !== "All" && e.dateGroup !== rangeFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRef = e.ref.toLowerCase().includes(q) || e.eventRef.toLowerCase().includes(q);
        const matchesType = e.simType.toLowerCase().includes(q);
        const matchesNetwork = e.network.toLowerCase().includes(q);
        const matchesFromTo = e.fromTo.toLowerCase().includes(q);
        const matchesCustomer = e.customer?.toLowerCase().includes(q);
        const matchesNumber = e.simNumber?.includes(q);
        if (
          !matchesRef &&
          !matchesType &&
          !matchesNetwork &&
          !matchesFromTo &&
          !matchesCustomer &&
          !matchesNumber
        ) {
          return false;
        }
      }
      return true;
    });
  }, [events, typeFilter, simFilter, rangeFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* 4 History KPI Cards */}
      <HistoryStatCards
        totalReceived={310}
        totalUsed={268}
        transferredOut={0}
        remaining={42}
      />

      {/* Filter and Search Bar */}
      <HistoryFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        simFilter={simFilter}
        onSimFilterChange={setSimFilter}
        rangeFilter={rangeFilter}
        onRangeFilterChange={setRangeFilter}
        totalCount={events.length}
        visibleCount={filteredEvents.length}
        onExportClick={onExportClick}
      />

      {/* History Table */}
      <StockHistoryTable events={filteredEvents} onViewEvent={onViewEvent} />

      {/* Pagination */}
      <StockHistoryPagination
        currentPage={currentPage}
        totalPages={5}
        totalEvents={events.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
