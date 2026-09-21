import React, { useState } from "react";
import { Download, TrendingUp, Send, Package, Coins } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { mockLedgerEntries } from "../data/mockActivityLedger";
import { InventoryHistoryTable } from "../components/InventoryHistoryTable";
import { SimBalanceTrendsChart } from "../components/SimBalanceTrendsChart";
import { ExportInventoryHistoryModal } from "../modals/ExportInventoryHistoryModal";

export const InventoryHistoryPage: React.FC = () => {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <PageHeader
        title="Inventory History"
        description="Complete record of SIM card orders and distributions"
        actions={[
          {
            key: "export",
            label: "Export History",
            icon: <Download className="w-4 h-4" />,
            variant: "outline",
            onClick: () => setShowExportModal(true),
          },
        ]}
      />

      {/* 4 Metric Cards from Image 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-400 block">Total Ordered</span>
          <div className="text-2xl font-extrabold text-slate-900">9,847</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Send className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-400 block">Distributed</span>
          <div className="text-2xl font-extrabold text-slate-900">4,847</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-400 block">In Stock</span>
          <div className="text-2xl font-extrabold text-slate-900">8,247</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Coins className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-400 block">Wholesale Value</span>
          <div className="text-2xl font-extrabold text-slate-900">₦26,285,000</div>
        </div>
      </div>

      {/* Verified SIM Transaction Log Table */}
      <InventoryHistoryTable entries={mockLedgerEntries} />

      {/* Running inventory SIM Balance Trends Chart */}
      <SimBalanceTrendsChart />

      {/* Export Modal */}
      <ExportInventoryHistoryModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
      />
    </div>
  );
};
