import React from "react";
import { PeriodInvestmentDetailModal } from "../modals/PeriodInvestmentDetailModal";
import { InvestmentOrderDetailModal } from "../modals/InvestmentOrderDetailModal";
import { ExportInvestmentReportModal } from "../modals/ExportInvestmentReportModal";
import { BalancePaymentOverdueModal } from "../modals/BalancePaymentOverdueModal";
import { WholesalePriceUpdateModal } from "../modals/WholesalePriceUpdateModal";
import { toast } from "sonner";

export interface InvestmentAlertModalsState {
  periodDetailOpen: boolean;
  setPeriodDetailOpen: (open: boolean) => void;

  orderDetailOpen: boolean;
  setOrderDetailOpen: (open: boolean) => void;

  exportInvestmentOpen: boolean;
  setExportInvestmentOpen: (open: boolean) => void;

  overdueOpen: boolean;
  setOverdueOpen: (open: boolean) => void;

  priceUpdateOpen: boolean;
  setPriceUpdateOpen: (open: boolean) => void;

  onPayWhatICan?: () => void;
}

export const InvestmentAlertModalsHub: React.FC<InvestmentAlertModalsState> = (
  props
) => {
  return (
    <>
      <PeriodInvestmentDetailModal
        open={props.periodDetailOpen}
        onOpenChange={props.setPeriodDetailOpen}
      />

      <InvestmentOrderDetailModal
        open={props.orderDetailOpen}
        onOpenChange={props.setOrderDetailOpen}
      />

      <ExportInvestmentReportModal
        open={props.exportInvestmentOpen}
        onOpenChange={props.setExportInvestmentOpen}
      />

      <BalancePaymentOverdueModal
        open={props.overdueOpen}
        onOpenChange={props.setOverdueOpen}
        onCallAdvisor={() => toast.info("Calling Kemi Ade (08012345678)...")}
        onSendWhatsApp={() => window.open("https://wa.me/2348012345678", "_blank")}
        onPayWhatICan={props.onPayWhatICan}
      />

      <WholesalePriceUpdateModal
        open={props.priceUpdateOpen}
        onOpenChange={props.setPriceUpdateOpen}
        onUpdatePricesNow={() => {
          props.setPriceUpdateOpen(false);
          toast.success("Redirecting to Price Adjustment matrix...");
        }}
        onContactAdvisor={() => toast.info("Connecting to Kemi Ade...")}
      />
    </>
  );
};
