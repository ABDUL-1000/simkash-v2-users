import { useState, useMemo } from "react";
import type { TablePaginationConfig } from "antd";

export interface UseTablePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  total?: number;
  onChange?: (page: number, pageSize: number) => void;
}

export const useTablePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  total = 0,
  onChange,
}: UseTablePaginationOptions = {}) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      current: page,
      pageSize,
      total,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      showTotal: (totalCount, range) =>
        `Showing ${range[0]}–${range[1]} of ${totalCount}`,
      onChange: (newPage, newPageSize) => {
        setPage(newPage);
        setPageSize(newPageSize);
        onChange?.(newPage, newPageSize);
      },
    }),
    [page, pageSize, total, onChange]
  );

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    paginationConfig,
    resetPage: () => setPage(1),
  };
};
