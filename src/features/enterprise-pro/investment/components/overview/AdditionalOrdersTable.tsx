import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Package, ArrowUpRight } from "lucide-react";
import { DataTable } from "@/components/common/DataTable";
import { colors } from "@/constants/colors";
import { mockAdditionalOrders } from "../../data/mockInvestmentData";
import type { AdditionalSimOrder } from "../../types";

interface AdditionalOrdersTableProps {
  onOrderMoreClick?: () => void;
}

export const AdditionalOrdersTable: React.FC<AdditionalOrdersTableProps> = ({
  onOrderMoreClick,
}) => {
  const columns: ColumnsType<AdditionalSimOrder> = [
    {
      title: "Order #",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => (
        <span className="font-semibold text-gray-900 text-xs">{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => <span className="text-gray-500 text-xs">{text}</span>,
    },
    {
      title: "SIM Type",
      dataIndex: "simType",
      key: "simType",
      render: (type) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">
          {type}
        </span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
      render: (qty) => (
        <span className="font-medium text-gray-800 text-xs">
          {qty.toLocaleString()} units
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "right",
      render: (amount) => (
        <span className="font-bold text-gray-900 text-xs">
          ₦{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Destination SC",
      dataIndex: "destinationSc",
      key: "destinationSc",
      render: (sc) => <span className="text-gray-600 text-xs">{sc}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const isDelivered = status === "Delivered";
        const isInTransit = status === "In Transit";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              isDelivered
                ? "bg-emerald-50 text-emerald-700"
                : isInTransit
                ? "bg-blue-50 text-blue-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">
            Additional SIM Inventory Orders
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Batches procured via reinvestment and distributed to coordinator hubs
          </p>
        </div>

        {onOrderMoreClick && (
          <button
            type="button"
            onClick={onOrderMoreClick}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            style={{ borderColor: colors.border }}
          >
            <Package className="w-3.5 h-3.5 text-blue-600" />
            <span>Order Reinvestment SIMs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
          </button>
        )}
      </div>

      <DataTable<AdditionalSimOrder>
        columns={columns}
        dataSource={mockAdditionalOrders}
        rowKey="id"
        pagination={false}
        scroll={{ x: 700 }}
      />
    </div>
  );
};
