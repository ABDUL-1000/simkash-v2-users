import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download } from "lucide-react";

import { OrderTable, type OrderRow } from "../components/OrderTable";
import { FulfilmentStatsCard } from "../components/FulfilmentStatsCard";
import { DeliveryPartnersCard } from "../components/DeliveryPartnersCard";
import { RecentDisputesCard } from "../components/RecentDisputesCard";

import { ConfirmOrderModal } from "../Modals/ConfirmOrderModal";
import { MarkDispatchedModal } from "../Modals/MarkDispatchedModal";
import { ConfirmDeliveryModal } from "../Modals/ConfirmDeliveryModal";
import { OrderDisputeModal } from "../Modals/OrderDisputeModal";

export default function OrdersPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Orders"
        description="Track all marketplace orders from placement to delivery"
        actions={[
          {
            key: "export-orders",
            label: "Export Orders",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
        ]}
      />

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Order Table */}
        <div className="lg:col-span-2 min-w-0">
          <OrderTable
            onConfirmOrder={(r) => {
              setSelectedOrder(r);
              setActiveModal("confirm_order");
            }}
            onMarkDispatched={(r) => {
              setSelectedOrder(r);
              setActiveModal("mark_dispatched");
            }}
            onConfirmDelivery={(r) => {
              setSelectedOrder(r);
              setActiveModal("confirm_delivery");
            }}
            onResolveDispute={(r) => {
              setSelectedOrder(r);
              setActiveModal("order_dispute");
            }}
          />
        </div>

        {/* Right Column: Analytics Cards */}
        <div className="space-y-6 min-w-0">
          <FulfilmentStatsCard />
          <DeliveryPartnersCard />
          <RecentDisputesCard
            onSelectDispute={() => setActiveModal("order_dispute")}
          />
        </div>
      </div>

      {/* Action Modals */}
      <ConfirmOrderModal
        open={activeModal === "confirm_order"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orderRef={selectedOrder?.orderRef || "ORD-2026-00847"}
        buyerName={selectedOrder?.buyer || "Chidi Eze"}
      />

      <MarkDispatchedModal
        open={activeModal === "mark_dispatched"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orderRef={selectedOrder?.orderRef || "ORD-2026-00847"}
      />

      <ConfirmDeliveryModal
        open={activeModal === "confirm_delivery"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orderRef={selectedOrder?.orderRef || "ORD-2026-00847"}
      />

      <OrderDisputeModal
        open={activeModal === "order_dispute"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        orderRef={selectedOrder?.orderRef || "ORD-2026-00847"}
      />
    </div>
  );
}
