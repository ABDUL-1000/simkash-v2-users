import React from "react";
import { ExportCommissionReportModal } from "../modals/ExportCommissionReportModal";
import { ExportReportSuccessModal } from "../modals/ExportReportSuccessModal";
import { ScCommissionDetailModal } from "../modals/ScCommissionDetailModal";
import { SetScCommissionRateModal } from "../modals/SetScCommissionRateModal";
import { ConfirmRateChangeModal } from "../modals/ConfirmRateChangeModal";
import { RateUpdatedSuccessModal } from "../modals/RateUpdatedSuccessModal";
import { ConfirmReinvestOrderModal } from "../modals/ConfirmReinvestOrderModal";
import { ProcessingOrderModal } from "../modals/ProcessingOrderModal";
import { OrderPlacedSuccessModal } from "../modals/OrderPlacedSuccessModal";
import { OrderFailedModal } from "../modals/OrderFailedModal";
import { InsufficientBalanceModal } from "../modals/InsufficientBalanceModal";
import { ConfirmBalancePaymentModal } from "../modals/ConfirmBalancePaymentModal";
import { ProcessingPaymentModal } from "../modals/ProcessingPaymentModal";
import { PaymentAppliedSuccessModal } from "../modals/PaymentAppliedSuccessModal";
import { PaymentFailedModal } from "../modals/PaymentFailedModal";
import type { ScCommissionItem, ReinvestSimProduct } from "../types";

export interface InvestmentModalsState {
  exportOpen: boolean;
  setExportOpen: (open: boolean) => void;
  exportSuccessOpen: boolean;
  setExportSuccessOpen: (open: boolean) => void;
  exportFileName: string;

  scDetailOpen: boolean;
  setScDetailOpen: (open: boolean) => void;
  selectedSc: ScCommissionItem | null;

  rateEditOpen: boolean;
  setRateEditOpen: (open: boolean) => void;
  rateReviewData: {
    coordinator: ScCommissionItem;
    newRate: number;
    effectiveDate: string;
    reason: string;
  } | null;
  confirmRateOpen: boolean;
  setConfirmRateOpen: (open: boolean) => void;
  rateSuccessOpen: boolean;
  setRateSuccessOpen: (open: boolean) => void;

  reinvestConfirmOpen: boolean;
  setReinvestConfirmOpen: (open: boolean) => void;
  reinvestOrderData: {
    product: ReinvestSimProduct;
    quantity: number;
    sc: { id: string; scName: string; state: string };
    totalCost: number;
    note: string;
  } | null;
  reinvestProcessingOpen: boolean;
  reinvestSuccessOpen: boolean;
  setReinvestSuccessOpen: (open: boolean) => void;
  reinvestFailedOpen: boolean;
  setReinvestFailedOpen: (open: boolean) => void;
  insufficientOpen: boolean;
  setInsufficientOpen: (open: boolean) => void;

  paydownConfirmOpen: boolean;
  setPaydownConfirmOpen: (open: boolean) => void;
  paydownPaymentData: {
    amount: number;
    source: string;
    pin: string;
  } | null;
  paydownProcessingOpen: boolean;
  paydownSuccessOpen: boolean;
  setPaydownSuccessOpen: (open: boolean) => void;
  paydownFailedOpen: boolean;
  setPaydownFailedOpen: (open: boolean) => void;

  onEditRate: (sc: ScCommissionItem) => void;
  onReviewRateChange: (data: {
    coordinator: ScCommissionItem;
    newRate: number;
    effectiveDate: string;
    reason: string;
  }) => void;
  onConfirmRateChange: () => void;
  onConfirmReinvestOrder: () => void;
  onConfirmPaydown: () => void;
  onExportSuccess: (fileName: string) => void;
}

export const InvestmentModalsHub: React.FC<InvestmentModalsState> = (props) => {
  return (
    <>
      <ExportCommissionReportModal
        open={props.exportOpen}
        onOpenChange={props.setExportOpen}
        onGenerateSuccess={props.onExportSuccess}
      />

      <ExportReportSuccessModal
        open={props.exportSuccessOpen}
        onOpenChange={props.setExportSuccessOpen}
        fileName={props.exportFileName}
        onGenerateAnother={() => {
          props.setExportSuccessOpen(false);
          props.setExportOpen(true);
        }}
      />

      <ScCommissionDetailModal
        open={props.scDetailOpen}
        onOpenChange={props.setScDetailOpen}
        coordinator={props.selectedSc}
        onEditRate={props.onEditRate}
      />

      <SetScCommissionRateModal
        open={props.rateEditOpen}
        onOpenChange={props.setRateEditOpen}
        coordinator={props.selectedSc}
        onSaveRate={(data) => {
          props.onReviewRateChange({
            coordinator: data.coordinator,
            newRate: data.newRate,
            effectiveDate: "immediate",
            reason: `Adjusted rate from ${data.oldRate}% to ${data.newRate}%`,
          });
        }}
      />

      <ConfirmRateChangeModal
        open={props.confirmRateOpen}
        onOpenChange={props.setConfirmRateOpen}
        scName={props.rateReviewData?.coordinator.scName}
        state={props.rateReviewData?.coordinator.state}
        oldRate={props.rateReviewData?.coordinator.commissionRate}
        newRate={props.rateReviewData?.newRate}
        onConfirm={props.onConfirmRateChange}
      />

      <RateUpdatedSuccessModal
        open={props.rateSuccessOpen}
        onOpenChange={props.setRateSuccessOpen}
        coordinatorName={props.selectedSc?.scName}
        newRate={props.rateReviewData?.newRate}
      />

      <ConfirmReinvestOrderModal
        open={props.reinvestConfirmOpen}
        onOpenChange={props.setReinvestConfirmOpen}
        orderData={props.reinvestOrderData}
        onConfirm={props.onConfirmReinvestOrder}
      />

      <ProcessingOrderModal open={props.reinvestProcessingOpen} />

      <OrderPlacedSuccessModal
        open={props.reinvestSuccessOpen}
        onOpenChange={props.setReinvestSuccessOpen}
      />

      <OrderFailedModal
        open={props.reinvestFailedOpen}
        onOpenChange={props.setReinvestFailedOpen}
        onRetry={props.onConfirmReinvestOrder}
      />

      <InsufficientBalanceModal
        open={props.insufficientOpen}
        onOpenChange={props.setInsufficientOpen}
        requiredAmount={props.reinvestOrderData?.totalCost}
      />

      <ConfirmBalancePaymentModal
        open={props.paydownConfirmOpen}
        onOpenChange={props.setPaydownConfirmOpen}
        payingAmount={props.paydownPaymentData?.amount}
        onConfirm={props.onConfirmPaydown}
      />

      <ProcessingPaymentModal open={props.paydownProcessingOpen} />

      <PaymentAppliedSuccessModal
        open={props.paydownSuccessOpen}
        onOpenChange={props.setPaydownSuccessOpen}
        amount={props.paydownPaymentData?.amount}
      />

      <PaymentFailedModal
        open={props.paydownFailedOpen}
        onOpenChange={props.setPaydownFailedOpen}
        onRetry={props.onConfirmPaydown}
      />
    </>
  );
};
