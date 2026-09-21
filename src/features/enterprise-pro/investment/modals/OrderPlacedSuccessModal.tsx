import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";

interface OrderPlacedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderNumber?: string;
  onViewOrders?: () => void;
}

export const OrderPlacedSuccessModal: React.FC<OrderPlacedSuccessModalProps> = ({
  open,
  onOpenChange,
  orderNumber = "ORD-EP-2026-0922",
  onViewOrders,
}) => {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      footer={null}
    >
      <div className="text-center py-4 space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-900">
            Reinvestment Order Confirmed!
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
            Your stock order has been submitted to factory dispatch and logged to
            your inventory ledger.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Order Reference:</span>
            <span className="font-mono font-bold text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Fulfillment Status:</span>
            <span className="font-bold text-emerald-600">Dispatched to Hub</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Estimated Delivery:</span>
            <span className="font-semibold text-gray-800">48 Hours via Courier</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              if (onViewOrders) onViewOrders();
            }}
            className="py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90 flex items-center justify-center gap-1.5"
            style={{ backgroundColor: colors.primary }}
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </AppModal>
  );
};
