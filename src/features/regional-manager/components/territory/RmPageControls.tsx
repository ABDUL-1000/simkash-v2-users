import { Button, Select } from "antd";
import type { useTablePagination } from "@/hooks/useTablePagination";

// These APIs return a page but no filtered total. Do not invent a total from summary cards.
export function RmPageControls({ pagination, count, loading }: { pagination: ReturnType<typeof useTablePagination>; count: number; loading: boolean }) {
  return <nav aria-label="Pagination" className="flex flex-wrap items-center gap-3">
    <Button disabled={loading || pagination.page <= 1} onClick={() => pagination.setPage(pagination.page - 1)}>Previous</Button>
    <span className="text-sm">Page {pagination.page}</span>
    <Button disabled={loading || count < pagination.pageSize} onClick={() => pagination.setPage(pagination.page + 1)}>Next</Button>
    <Select aria-label="Rows per page" value={pagination.pageSize} options={[10, 12, 20, 50].map((value) => ({ value, label: `${value} per page` }))} onChange={(value) => { pagination.setPageSize(value); pagination.resetPage(); }} />
  </nav>;
}
