import { useState, type ReactNode } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Search } from "lucide-react";

export interface DataTableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  pagination?: TablePaginationConfig | false;
  onRowClick?: (record: T) => void;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  extraFilters?: ReactNode;
  headerRight?: ReactNode;
  rowKey?: string | ((record: T) => string);
  className?: string;
  scroll?: { x?: number | string | true; y?: number | string };
}

export function DataTable<T extends object>({
  columns,
  dataSource,
  loading = false,
  pagination = { pageSize: 10 },
  onRowClick,
  searchPlaceholder = "Search...",
  onSearch,
  extraFilters,
  headerRight,
  rowKey = "id",
  className = "",
  scroll,
}: DataTableProps<T>) {
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    onSearch?.(val);
  };

  const showToolbar = onSearch !== undefined || searchPlaceholder !== undefined || extraFilters || headerRight;

  return (
    <div className={`simkash-datatable-wrapper space-y-4 ${className}`}>
      {/* Toolbar strip */}
      {showToolbar && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-3xl border border-[#E2ECF6] shadow-xs">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {onSearch !== undefined && (
              <div className="relative min-w-[240px] max-w-sm flex-1">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={localSearch}
                  onChange={handleSearchChange}
                  className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-xs font-medium text-[#0F152A] placeholder-[#8C909B] outline-none transition focus:border-[#2563EB] focus:bg-white"
                />
              </div>
            )}
            {extraFilters && <div className="flex flex-wrap items-center gap-2">{extraFilters}</div>}
          </div>

          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </div>
      )}

      {/* Table container */}
      <div className="overflow-hidden rounded-3xl border border-[#E2ECF6] bg-white shadow-xs">
        <Table<T>
          className="simkash-data-table"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={
            pagination === false
              ? false
              : {
                  ...pagination,
                  className: "px-5 py-3 !mb-0 text-xs font-bold text-[#0F152A]",
                  showSizeChanger: false,
                }
          }
          rowKey={rowKey}
          scroll={scroll ?? { x: "max-content" }}
          onRow={(record) => ({
            onClick: () => onRowClick?.(record),
            className: onRowClick ? "cursor-pointer transition-colors hover:!bg-[#F8FAFC]" : "transition-colors hover:!bg-[#F8FAFC]",
          })}
        />
      </div>
    </div>
  );
}
