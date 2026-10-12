import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import type { ColumnsType } from "antd/es/table";
import type { CaStockRequestItem } from "../types/inventory";
import { useGetCaStockRequests } from "../api/useCaInventory";
import { CaInventoryQueryState } from "../components/CaInventoryQueryState";
export function CaStockRequestsModal({ onClose }: { onClose: () => void }) {
 const pagination = useTablePagination({ initialPageSize: 10 });
 const query = useGetCaStockRequests({ page: pagination.page, limit: pagination.pageSize });
 const columns: ColumnsType<CaStockRequestItem> = [
  { title: "Reference", dataIndex: "reference" }, { title: "SIM Type", dataIndex: "sim_type" }, { title: "Quantity", dataIndex: "quantity" },
  { title: "Status", dataIndex: "status" }, { title: "Requested", dataIndex: "time_ago" }, { title: "Notes", dataIndex: "notes" },
 ];
 return <AppModal open title="Stock Requests" description="Requests submitted to Super Admin" size="lg" onOpenChange={open => { if (!open) onClose(); }}>
  <CaInventoryQueryState query={query}><DataTable columns={columns} dataSource={query.data ?? []} pagination={false} emptyTitle="No stock requests" /></CaInventoryQueryState>
  {/* API returns an array without total metadata. Next remains available for a full page; an empty next page is handled explicitly. */}
  <div className="flex items-center justify-between gap-3 pt-4">
   <button disabled={pagination.page <= 1 || query.isFetching} onClick={() => pagination.setPage(pagination.page - 1)}>Previous</button>
   <span>Page {pagination.page}</span>
   <button disabled={query.isFetching || Boolean(query.error) || (query.data?.length ?? 0) < pagination.pageSize} onClick={() => pagination.setPage(pagination.page + 1)}>Next</button>
  </div>
 </AppModal>;
}
