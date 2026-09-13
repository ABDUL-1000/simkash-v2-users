import type { ReactNode } from "react";
import { Table, Input, Button, Pagination, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type SimTableTab = { id: string; label: string; count: number };

export type SimInventoryTableProps<T extends { id: React.Key }> = {
  title: string;
  subtitle?: string;
  columns: ColumnsType<T>;
  rows: T[];

  tabs?: SimTableTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;

  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  onFiltersClick?: () => void;
  onExportClick?: () => void;
  exportLabel?: string;

  selectable?: boolean;
  selectedIds?: React.Key[];
  onSelectedIdsChange?: (ids: React.Key[]) => void;

  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;

  loading?: boolean;
  emptyState?: ReactNode;
  headerExtra?: ReactNode;
  rowKey?: string | ((record: T) => React.Key);
};

export function SimInventoryTable<T extends { id: React.Key }>({
  title,
  subtitle,
  columns,
  rows,
  tabs,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  onFiltersClick,
  onExportClick,
  exportLabel = "Export CSV",
  selectable = false,
  selectedIds = [],
  onSelectedIdsChange,
  page = 1,
  pageSize = 8,
  total,
  onPageChange,
  loading,
  emptyState,
  headerExtra,
  rowKey = "id",
}: SimInventoryTableProps<T>) {
  const totalCount = total ?? rows.length;
  const rangeStart = Math.min((page - 1) * pageSize + 1, totalCount);
  const rangeEnd = Math.min(page * pageSize, totalCount);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2563EB" } }}>
      <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] sm:text-lg">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs text-[#64748B] sm:text-sm">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {headerExtra}
            {onExportClick && (
              <Button icon={<Download className="size-4" />} onClick={onExportClick} className="w-full sm:w-auto">
                {exportLabel}
              </Button>
            )}
          </div>
        </div>

        {/* Tabs - horizontally scrollable on mobile */}
        {tabs && tabs.length > 0 && (
          <div className="mx-4 mb-4 overflow-x-auto pb-1 sm:mx-6">
            <div className="flex min-w-max gap-1 rounded-xl bg-[#EFF4FC] p-1">
              {tabs.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange?.(tab.id)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:px-4 sm:py-2.5 sm:text-sm",
                      active ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]",
                    )}
                  >
                    {tab.label} ({tab.count.toLocaleString()})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Toolbar: Search + Filters + Range */}
        {(onSearchChange || onFiltersClick) && (
          <div className="mx-4 mb-4 flex flex-col gap-3 sm:mx-6 sm:flex-row sm:items-center">
            {onSearchChange && (
              <Input
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                prefix={<Search className="size-4 text-[#94A3B8]" />}
                className="w-full sm:flex-1 sm:max-w-md"
              />
            )}
            <div className="flex items-center justify-between gap-3 sm:justify-start">
              {onFiltersClick && (
                <Button icon={<SlidersHorizontal className="size-4" />} onClick={onFiltersClick}>
                  Filters
                </Button>
              )}
              {totalCount > 0 && (
                <span className="whitespace-nowrap text-xs text-[#64748B] sm:ml-auto sm:text-sm">
                  {rangeStart}–{rangeEnd} of {totalCount.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Responsive Ant Design Table with horizontal scroll container */}
        <div className="overflow-x-auto px-4 sm:px-6">
          <Table<T>
            rowKey={rowKey}
            columns={columns}
            dataSource={rows}
            loading={loading}
            scroll={{ x: "max-content" }}
            tableLayout="auto"
            locale={{ emptyText: emptyState ?? "No records found." }}
            rowSelection={
              selectable
                ? {
                    selectedRowKeys: selectedIds,
                    onChange: (keys) => onSelectedIdsChange?.(keys),
                  }
                : undefined
            }
            pagination={false}
          />
        </div>

        {/* Pagination Footer */}
        {totalCount > 0 && onPageChange && (
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <span className="text-xs text-[#64748B] sm:text-sm">
              Showing {rangeStart}–{rangeEnd} of {totalCount.toLocaleString()}
            </span>
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalCount}
              onChange={(p) => onPageChange(p)}
              showSizeChanger={false}
              size="small"
              className="self-end sm:self-auto"
            />
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}