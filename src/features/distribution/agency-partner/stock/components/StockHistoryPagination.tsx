import { ChevronLeft, ChevronRight } from "lucide-react";

interface StockHistoryPaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalEvents?: number;
  onPageChange?: (page: number) => void;
}

export function StockHistoryPagination({
  currentPage = 1,
  totalPages = 5,
  totalEvents = 47,
  onPageChange,
}: StockHistoryPaginationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pt-2 text-xs">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-bold text-[#66738C] transition hover:bg-[#F1F5F9] disabled:opacity-40"
        >
          <ChevronLeft className="size-3.5" />
          <span>Prev</span>
        </button>

        <button
          type="button"
          onClick={() => onPageChange?.(1)}
          className={`size-8 rounded-lg font-bold transition ${
            currentPage === 1
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:bg-[#F1F5F9]"
          }`}
        >
          1
        </button>

        <button
          type="button"
          onClick={() => onPageChange?.(2)}
          className={`size-8 rounded-lg font-bold transition ${
            currentPage === 2
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:bg-[#F1F5F9]"
          }`}
        >
          2
        </button>

        <button
          type="button"
          onClick={() => onPageChange?.(3)}
          className={`size-8 rounded-lg font-bold transition ${
            currentPage === 3
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:bg-[#F1F5F9]"
          }`}
        >
          3
        </button>

        <span className="px-1 text-[#8C909B]">...</span>

        <button
          type="button"
          onClick={() => onPageChange?.(5)}
          className={`size-8 rounded-lg font-bold transition ${
            currentPage === 5
              ? "bg-[#2563EB] text-white shadow-xs"
              : "text-[#66738C] hover:bg-[#F1F5F9]"
          }`}
        >
          5
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-bold text-[#2563EB] transition hover:bg-[#F1F5F9] disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-[#8C909B]">Showing 1–10 of {totalEvents} events</p>
    </div>
  );
}
