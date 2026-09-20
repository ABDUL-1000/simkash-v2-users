import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Info, Trophy, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { EasyBuyMetricCards } from "../components/EasyBuyMetricCards";
import { EasyBuyCommissionTable } from "../components/EasyBuyCommissionTable";
import { EasyBuySidebar } from "../components/EasyBuySidebar";
import { CustomerEasyBuyPlanModal } from "../modals/CustomerEasyBuyPlanModal";
import { EasyBuyCommissionEarnedModal } from "../modals/EasyBuyCommissionEarnedModal";
import { EasyBuyCommissionDelayedModal } from "../modals/EasyBuyCommissionDelayedModal";
import { EasyBuyCommissionCancelledModal } from "../modals/EasyBuyCommissionCancelledModal";
import { EASYBUY_COMMISSION_LIST } from "../data/easybuy.data";
import type { EasyBuyCommissionRecord } from "../types";

export function EasyBuyCommissionPage() {
  const navigate = useNavigate();
  const [selectedRecord, setSelectedRecord] = useState<EasyBuyCommissionRecord | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isEarnedModalOpen, setIsEarnedModalOpen] = useState(false);
  const [isDelayedModalOpen, setIsDelayedModalOpen] = useState(false);
  const [isCancelledModalOpen, setIsCancelledModalOpen] = useState(false);

  const handleViewPlan = (record: EasyBuyCommissionRecord) => {
    setSelectedRecord(record);
    if (record.commissionStatus === "Delayed") {
      setIsDelayedModalOpen(true);
    } else {
      setIsPlanModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <PageHeader
        title="My EasyBuy Commission"
        description="Separate commission earned when customers complete their full EasyBuy payment plan after your installation"
        extra={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEarnedModalOpen(true)}
              className="cursor-pointer rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-2 text-xs font-bold text-[#065F46] hover:bg-[#D1FAE5]"
            >
              Simulate Earned
            </button>
            <button
              type="button"
              onClick={() => setIsCancelledModalOpen(true)}
              className="cursor-pointer rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-3 py-2 text-xs font-bold text-[#B91C1C] hover:bg-[#FEE2E2]"
            >
              Simulate Cancelled
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC]"
            >
              <Download className="size-3.5 text-[#66738C]" />
              <span>Export History</span>
            </button>
          </div>
        }
      />

      {/* 2. Info Alert Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs text-[#1E40AF]">
        <Info className="size-5 shrink-0 text-[#2563EB] mt-0.5" />
        <p className="leading-relaxed">
          <strong>EasyBuy commission is separate from your job fee.</strong> Your ₦65,000 job fee pays immediately after completion verification. EasyBuy commission pays later — when the customer finishes all their instalments.
        </p>
      </div>

      {/* 3. 4 Metric Cards */}
      <EasyBuyMetricCards />

      {/* 4. Responsive 2-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Commission Table & Incentive Banner */}
        <div className="space-y-4 lg:col-span-2">
          <EasyBuyCommissionTable
            records={EASYBUY_COMMISSION_LIST}
            onViewPlan={handleViewPlan}
          />

          {/* Gold Incentive Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#FDE68A] bg-[#FEF9C3]/70 p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-2xl bg-[#FEF3C7] text-[#D97706]">
                <Trophy className="size-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F152A]">
                  EasyBuy jobs count toward your 12-job bonus target
                </h4>
                <p className="text-[11px] text-[#8C909B]">
                  Both EasyBuy jobs above = 2 of your 12-job target this month
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(appPaths.installerEarnings)}
              className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#FDE68A] bg-white px-3.5 py-2 text-xs font-bold text-[#D97706] hover:bg-[#FEFCE8]"
            >
              <span>View Bonus Tracker</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Explanations & FAQ Sidebar */}
        <div className="lg:col-span-1">
          <EasyBuySidebar />
        </div>
      </div>

      {/* Modals */}
      <CustomerEasyBuyPlanModal
        open={isPlanModalOpen}
        onOpenChange={setIsPlanModalOpen}
        plan={selectedRecord?.plan}
      />
      <EasyBuyCommissionDelayedModal
        open={isDelayedModalOpen}
        onOpenChange={setIsDelayedModalOpen}
        customerName={selectedRecord?.client}
        commissionAmount={selectedRecord?.commissionAmount}
        planProgress={selectedRecord?.planProgress}
      />
      <EasyBuyCommissionEarnedModal
        open={isEarnedModalOpen}
        onOpenChange={setIsEarnedModalOpen}
        onViewWallet={() => navigate(appPaths.installerEarnings)}
        onViewCommission={() => setIsEarnedModalOpen(false)}
      />
      <EasyBuyCommissionCancelledModal
        open={isCancelledModalOpen}
        onOpenChange={setIsCancelledModalOpen}
      />
    </div>
  );
}
