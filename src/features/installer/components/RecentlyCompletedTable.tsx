import type { ColumnsType } from "antd/es/table";
import { Star } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import type { InstallerCompletedJob } from "../types";
import { RECENTLY_COMPLETED_JOBS } from "../data/installer.data";

interface RecentlyCompletedTableProps {
  onViewAll?: () => void;
  onSelectJob?: (job: InstallerCompletedJob) => void;
}

export function RecentlyCompletedTable({
  onViewAll,
  onSelectJob,
}: RecentlyCompletedTableProps) {
  const columns: ColumnsType<InstallerCompletedJob> = [
    {
      title: "Date & Ref",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <div>
          <div className="text-xs font-bold text-[#0F152A]">{record.date}</div>
          <div className="text-[11px] text-[#8C909B]">{record.jobRef}</div>
        </div>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <span className="text-xs font-semibold text-[#0F152A]">{text}</span>
      ),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (text: string) => (
        <span className="text-xs text-[#66738C]">{text}</span>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center gap-1">
          <div className="flex items-center text-[#F59E0B]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3 ${
                  i < Math.floor(rating)
                    ? "fill-[#F59E0B] text-[#F59E0B]"
                    : "text-[#E2ECF6]"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#0F152A]">{rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      align: "right",
      render: (fee: number) => (
        <span className="text-xs font-bold text-[#10B981]">
          ₦{fee.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F152A] sm:text-base">Recently Completed</h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View All →
        </button>
      </div>

      {/* Reusable Ant Design DataTable */}
      <DataTable<InstallerCompletedJob>
        columns={columns}
        dataSource={RECENTLY_COMPLETED_JOBS}
        pagination={false}
        onRowClick={onSelectJob}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}
