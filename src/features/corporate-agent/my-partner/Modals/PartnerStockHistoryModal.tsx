"use client";

import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaPartnerStockHistory } from "../api/useCaPartners";

interface PartnerStockHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId: number | string;
  partnerName?: string;
}

export function PartnerStockHistoryModal({
  open,
  onOpenChange,
  partnerId,
  partnerName = "Agency Partner",
}: PartnerStockHistoryModalProps) {
  const { page, pageSize, setPage } = useTablePagination({
    initialPage: 1,
    initialPageSize: 10,
  });

  const { data, isLoading } = useGetCaPartnerStockHistory(partnerId, {
    page,
    limit: pageSize,
  });

  const history = data?.history || [];
  const pagination = data?.pagination;
  const totalCount = pagination?.total_items ?? history.length;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Sent History"
      description={`Distribution history sent to ${partnerName} (${totalCount} records)`}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {isLoading ? (
          <div className="py-8 text-center text-xs text-[#8C909B]">Loading stock history...</div>
        ) : history.length === 0 ? (
          <AppEmptyState
            title="No Stock History Found"
            description="There are no stock distribution records for this partner yet."
          />
        ) : (
          <div className="divide-y divide-[#E2ECF6] max-h-72 overflow-y-auto pr-1">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2.5 hover:bg-[#F8FAFC] px-1 rounded-xl transition"
              >
                <div>
                  <h4 className="font-extrabold text-[#0F172A]">{item.date_formatted || item.time_ago}</h4>
                  <p className="text-[10px] text-[#8C909B]">{item.breakdown_text}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#10B981]">{item.total_sims_label || `${item.total_sims} SIMs`}</span>
                  <p className="text-[10px] text-[#8C909B]">{item.time_ago}</p>
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
                className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#0F172A] disabled:opacity-40 hover:bg-[#F8FAFC]"
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
