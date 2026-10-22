import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Phone,
  Tv,
  Wifi,
  Zap,
} from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { TopUpWalletModal } from "@/features/dashboard/Modals/TopUpWalletModal";
import { useGetPayLaterAccount, useGetPayLaterDashboard, useGetPayLaterSchedule } from "../api/usePayLater";
import type { PayLaterMode, PayLaterTransactionDetail } from "../types/api";
import { payLaterStatusTone } from "../utils/payLaterStatus";
import { PayLaterOnboardingCard } from "../components/PayLaterOnboardingCard";
import { RepayFullBalanceModal } from "../Modals/RepayFullBalanceModal";
import { PartialRepaymentModal } from "../Modals/PartialRepaymentModal";
import { RepaymentHistoryModal } from "../Modals/RepaymentHistoryModal";
import { RequestLimitIncreaseModal } from "../Modals/RequestLimitIncreaseModal";
import { PaymentOverdueModal } from "../Modals/PaymentOverdueModal";
import { PayLaterTransactionDetailModal } from "../Modals/PayLaterTransactionDetailModal";

// Service Modals from bill-payments (charged to PayLater credit via the `payLater` prop)
import { BuyAirtimeModal } from "@/features/bill-payments/Modals/BuyAirtimeModal";
import { BuyDataModal } from "@/features/bill-payments/Modals/BuyDataModal";
import { ElectricityPaymentModal } from "@/features/bill-payments/Modals/ElectricityPaymentModal";
import { CableTvPaymentModal } from "@/features/bill-payments/Modals/CableTvPaymentModal";
import { JambPinModal } from "@/features/bill-payments/Modals/JambPinModal";
import { WaecCheckerModal } from "@/features/bill-payments/Modals/WaecCheckerModal";

// Repayment period sent with PayLater purchases. The API has no tenure options endpoint; 14 days matches its examples.
const TENURE_DAYS = 14;

type ServiceKey = "airtime" | "data" | "electricity" | "cable" | "jamb" | "waec";
const services: Array<{ key: ServiceKey; title: string; icon: typeof Phone; bg: string; iconClass?: string }> = [
  { key: "airtime", title: "Buy Airtime", icon: Phone, bg: "bg-[#F59E0B]" },
  { key: "data", title: "Buy Data", icon: Wifi, bg: "bg-[#2563EB]" },
  { key: "electricity", title: "Electricity", icon: Zap, bg: "bg-[#F59E0B]", iconClass: "fill-white" },
  { key: "cable", title: "Cable TV", icon: Tv, bg: "bg-[#9333EA]" },
  // Internet and Water Bill cards are disabled: there are no PayLater endpoints for them
  // (PayLater covers airtime, data, electricity, cable, WAEC and JAMB only).
  // { key: "internet", title: "Internet", icon: Globe, bg: "bg-[#10B981]" },
  // { key: "water", title: "Water Bill", icon: Droplets, bg: "bg-[#0D1B2E]" },
  { key: "jamb", title: "JAMB PIN", icon: BookOpen, bg: "bg-[#EF4444]" },
  { key: "waec", title: "WAEC PIN", icon: GraduationCap, bg: "bg-[#0F152A]" },
];

/** "₦38,100" → ₦38,100<span>.00</span> as in the design. */
function Money({ value, centsClass }: { value: number; centsClass: string }) {
  const [whole, cents = "00"] = value.toFixed(2).split(".");
  return <>₦{Number(whole).toLocaleString()}<span className={`text-xl ${centsClass}`}>.{cents}</span></>;
}

const daysUntil = (dateText?: string | null) => {
  if (!dateText) return null;
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((date.getTime() - today.getTime()) / 86_400_000);
};

export default function PayLaterPage() {
  const navigate = useNavigate();
  const dashboard = useGetPayLaterDashboard();
  const account = useGetPayLaterAccount();
  const schedule = useGetPayLaterSchedule();

  // Modals state
  const [repayFullOpen, setRepayFullOpen] = useState(false);
  const [partialRepayOpen, setPartialRepayOpen] = useState(false);
  const [repaymentHistoryOpen, setRepaymentHistoryOpen] = useState(false);
  const [limitIncreaseOpen, setLimitIncreaseOpen] = useState(false);
  const [overdueModalOpen, setOverdueModalOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [detailId, setDetailId] = useState<number | null>(null);
  const [billRepay, setBillRepay] = useState<PayLaterTransactionDetail | null>(null);
  const [activeService, setActiveService] = useState<ServiceKey | null>(null);

  const data = dashboard.data;
  const acct = account.data;
  const outstanding = data?.outstanding_card;
  const history = data?.credit_history;
  const hasCredit = Boolean(data && !data.is_first_time && data.has_credit_limit);
  const totalOutstanding = outstanding?.total_outstanding ?? 0;
  const usedPercent = acct && acct.credit_limit > 0 ? Math.min(100, Math.round(acct.used_credit / acct.credit_limit * 100)) : 0;
  const dueIn = daysUntil(outstanding?.next_due_date);
  const scheduleItems = schedule.data?.items ?? [];
  const payLater: PayLaterMode = { availableCredit: acct?.available_credit ?? 0, tenureDays: TENURE_DAYS };
  const closeService = (open: boolean) => { if (!open) setActiveService(null); };

  if (dashboard.isLoading) {
    return <div className="space-y-6">{[160, 120, 280].map(height => <div key={height} className="animate-pulse rounded-2xl bg-slate-100" style={{ height }} />)}</div>;
  }
  if (dashboard.error || !data) {
    return <AppEmptyState title="Couldn't load PayLater" description={dashboard.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void dashboard.refetch()} />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">PayLater</h1>
          <p className="mt-1 text-xs text-[#8C909B]">
            Buy now, pay later — use credit for bills and services
          </p>
        </div>
        {hasCredit && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRepayFullOpen(true)}
              disabled={!outstanding?.actions.can_repay}
              className="rounded-xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50 disabled:opacity-50"
            >
              Repay Now
            </button>
            <button
              type="button"
              onClick={() => setLimitIncreaseOpen(true)}
              className="rounded-xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
            >
              Request Limit Increase
            </button>
          </div>
        )}
      </div>

      {/* First-time users / no credit limit: eligibility onboarding */}
      {!hasCredit && <PayLaterOnboardingCard onboarding={data.onboarding} />}

      {/* 2. Available Credit & Credit Used Card */}
      {hasCredit && (
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
          {account.isLoading ? <div className="h-24 animate-pulse rounded-xl bg-slate-100" /> : acct && <>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Available Credit */}
              <div>
                <span className="text-xs text-[#8C909B] font-semibold">Available Credit</span>
                <h2 className="text-4xl font-extrabold text-[#0F152A] mt-1">
                  <Money value={acct.available_credit} centsClass="text-[#8C909B]" />
                </h2>
                <p className="text-[11px] text-[#8C909B] mt-1 font-medium">
                  of {acct.credit_limit_formatted} total limit
                </p>
              </div>

              {/* Credit Used */}
              <div className="md:text-right">
                <span className="text-xs text-[#8C909B] font-semibold">Credit Used</span>
                <h2 className="text-4xl font-extrabold text-[#EF4444] mt-1">
                  <Money value={acct.used_credit} centsClass="text-[#EF4444]/60" />
                </h2>
                {outstanding?.next_due_date_label && (
                  <p className="text-[11px] font-bold text-[#F59E0B] mt-1">
                    {outstanding.next_due_date_label}
                  </p>
                )}
              </div>
            </div>

            {/* Usage Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="h-3 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                <div className="h-full rounded-full bg-[#EF4444]" style={{ width: `${usedPercent}%` }} />
              </div>
              <div className="flex flex-wrap gap-1 justify-between text-[11px] font-medium text-[#8C909B]">
                <span>{acct.used_credit_formatted} used</span>
                <span>{usedPercent}% of credit used</span>
                <span>{acct.available_credit_formatted} available</span>
              </div>
            </div>

            {/* Due / Overdue Alert Banner */}
            {acct.has_overdue ? (
              <div className="flex items-center justify-between rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3.5 px-4 text-xs">
                <span className="font-bold text-[#EF4444] flex items-center gap-2">
                  <span>●</span> ₦{(acct.overdue_amount ?? 0).toLocaleString()} overdue{acct.overdue_count ? ` · ${acct.overdue_count} bill${acct.overdue_count === 1 ? "" : "s"}` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => setOverdueModalOpen(true)}
                  className="rounded-xl bg-[#EF4444] px-5 py-2 font-bold text-white shadow-xs hover:bg-red-600"
                >
                  View & Repay
                </button>
              </div>
            ) : totalOutstanding > 0 && (
              <div className="flex items-center justify-between rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 px-4 text-xs">
                <span className="font-bold text-[#D9990D] flex items-center gap-2">
                  <span>●</span> {dueIn === null ? outstanding?.next_due_date_label : dueIn <= 0 ? "Repayment due today" : `Repayment due in ${dueIn} day${dueIn === 1 ? "" : "s"}`}
                </span>
                <button
                  type="button"
                  onClick={() => setRepayFullOpen(true)}
                  disabled={!outstanding?.actions.can_repay}
                  className="rounded-xl bg-[#F59E0B] px-5 py-2 font-bold text-white shadow-xs hover:bg-amber-600 disabled:opacity-50"
                >
                  Repay {outstanding?.total_outstanding_formatted}
                </button>
              </div>
            )}
          </>}
        </div>
      )}

      {/* 3. Use PayLater For (service cards) */}
      {hasCredit && (
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-bold text-[#0F152A]">Use PayLater For</h3>
            <p className="text-xs text-[#8C909B]">Select a service to pay on credit</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ key, title, icon: Icon, bg, iconClass }) => (
              <div
                key={key}
                onClick={() => setActiveService(key)}
                className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
              >
                <div className={`flex size-11 items-center justify-center rounded-2xl ${bg} text-white`}>
                  <Icon className={`size-5 ${iconClass ?? ""}`} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#0F152A]">{title}</h4>
                  <p className="text-xs text-[#8C909B]">Pay on credit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Repayment Schedule & Right Column Grid */}
      {hasCredit && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column — Repayment Schedule Table (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F152A]">Repayment Schedule</h3>
              <button
                type="button"
                onClick={() => setRepaymentHistoryOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6] bg-white shadow-xs">
              {schedule.isLoading ? (
                <div className="space-y-2 p-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-9 animate-pulse rounded-lg bg-slate-100" />)}</div>
              ) : schedule.error ? (
                <div className="p-4"><AppEmptyState title="Couldn't load your schedule" description={schedule.error.message} actionText="Retry" onAction={() => void schedule.refetch()} /></div>
              ) : scheduleItems.length === 0 ? (
                <div className="p-4"><AppEmptyState title="Nothing to repay" description="Bills you pay with PayLater will appear here with their due dates." /></div>
              ) : (
                <table className="w-full min-w-150 text-left text-xs">
                  <thead className="bg-[#F8FAFC] font-bold text-[#8C909B] border-b border-[#E2ECF6]">
                    <tr>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Due Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2ECF6]">
                    {scheduleItems.map((item) => {
                      const tone = payLaterStatusTone(item.status_color);
                      return (
                        <tr key={item.id} onClick={() => setDetailId(item.id)} className="cursor-pointer hover:bg-[#F8FAFC]">
                          <td className="py-3.5 px-4 font-bold text-[#0F152A]">{item.service}</td>
                          <td className="py-3.5 px-4 text-[#8C909B]">{item.date}</td>
                          <td className="py-3.5 px-4 font-extrabold text-[#0F152A]">{item.amount_formatted}</td>
                          <td className="py-3.5 px-4 text-[#8C909B]">{item.due_date}</td>
                          <td className="py-3.5 px-4">
                            <span className="rounded-full px-3 py-1 text-[10px] font-bold" style={{ background: tone.bg, color: tone.color }}>
                              {item.status_label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-[#F8FAFC] border-t border-[#E2ECF6] font-bold">
                    <tr>
                      <td colSpan={2} className="py-3.5 px-4 text-[#0F152A]">Total Outstanding</td>
                      <td colSpan={3} className="py-3.5 px-4 text-right font-extrabold text-[#EF4444] text-sm">
                        {schedule.data?.total_outstanding_formatted}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>

          {/* Right Column — Cards (Span 1) */}
          <div className="space-y-6">
            {/* Outstanding Repayment Card */}
            {outstanding && (
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#EF4444]">{outstanding.total_outstanding_formatted}</h2>
                  <p className="text-xs text-[#8C909B] font-medium mt-0.5">Total outstanding</p>
                  {outstanding.next_due_date_label && <p className="text-xs font-bold text-[#F59E0B] mt-1">● {outstanding.next_due_date_label}</p>}
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                    <div className="h-full rounded-full bg-[#EF4444]" style={{ width: `${Math.min(100, outstanding.repayment_progress.progress_percentage)}%` }} />
                  </div>
                  <p className="text-[10px] text-[#8C909B]">{outstanding.repayment_progress.progress_text}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRepayFullOpen(true)}
                    disabled={!outstanding.actions.can_repay}
                    className="w-full rounded-xl bg-[#EF4444] py-3 text-xs font-bold text-white shadow-md transition hover:bg-red-600 disabled:opacity-50"
                  >
                    {outstanding.actions.repay_all_label}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartialRepayOpen(true)}
                    disabled={!outstanding.actions.can_repay}
                    className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-50"
                  >
                    Repay Partial Amount
                  </button>
                </div>
              </div>
            )}

            {/* Credit History Card */}
            {history && (
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#0F152A]">Credit History</h3>

                <div className="divide-y divide-[#E2ECF6] text-xs">
                  <div className="flex justify-between py-2.5 first:pt-0">
                    <span className="text-[#8C909B]">Total credit used all time</span>
                    <span className="font-bold text-[#0F152A]">{history.total_credit_used_all_time_formatted}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-[#8C909B]">Total repaid all time</span>
                    <span className="font-bold text-[#10B981]">{history.total_repaid_all_time_formatted}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-[#8C909B]">On-time repayments</span>
                    <span className="font-bold text-[#0F152A]">{history.on_time_repayments.ratio_text}</span>
                  </div>
                  <div className="flex justify-between py-2.5 last:pb-0 items-center">
                    <span className="text-[#8C909B]">Credit score</span>
                    <span className="flex items-center gap-2 font-bold" style={{ color: payLaterStatusTone(history.credit_score.rating_color).color }}>
                      {history.credit_score.score} · {history.credit_score.rating}
                      <span className="h-2.5 w-16 rounded-full" style={{ background: payLaterStatusTone(history.credit_score.rating_color).solid }} />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Repayment & Credit Modals */}
      <RepayFullBalanceModal
        open={repayFullOpen}
        onOpenChange={setRepayFullOpen}
        outstandingAmount={outstanding?.actions.repay_all_amount ?? totalOutstanding}
        dueDate={outstanding?.next_due_date}
        breakdown={scheduleItems}
        onOpenPartialRepayment={() => setPartialRepayOpen(true)}
        onTopUpClick={() => setTopUpOpen(true)}
      />
      <PartialRepaymentModal
        open={partialRepayOpen || Boolean(billRepay)}
        onOpenChange={open => { if (!open) { setPartialRepayOpen(false); setBillRepay(null); } }}
        outstandingTotal={billRepay?.total_outstanding ?? totalOutstanding}
        dueDate={billRepay ? billRepay.due_date_formatted ?? billRepay.due_date : outstanding?.next_due_date}
        creditTransactionId={billRepay?.id}
        billLabel={billRepay?.service}
      />
      <RepaymentHistoryModal
        open={repaymentHistoryOpen}
        onOpenChange={setRepaymentHistoryOpen}
        onRepayAllClick={() => setRepayFullOpen(true)}
        onTransactionClick={id => { setRepaymentHistoryOpen(false); setDetailId(id); }}
        pendingFormatted={outstanding?.total_outstanding_formatted}
        paidFormatted={history?.total_repaid_all_time_formatted}
        overdueFormatted={acct?.has_overdue ? `₦${(acct.overdue_amount ?? 0).toLocaleString()}` : null}
        canRepay={outstanding?.actions.can_repay}
      />
      <RequestLimitIncreaseModal
        open={limitIncreaseOpen}
        onOpenChange={setLimitIncreaseOpen}
        account={acct}
        onTimeRatioText={history?.on_time_repayments.ratio_text}
      />
      <PaymentOverdueModal
        open={overdueModalOpen}
        onOpenChange={setOverdueModalOpen}
        onRepayNowClick={() => setRepayFullOpen(true)}
        onContactSupportClick={() => navigate(appPaths.support)}
        overdueAmount={acct?.overdue_amount ?? 0}
        overdueCount={acct?.overdue_count}
        accountStatus={acct?.status}
      />
      <PayLaterTransactionDetailModal
        id={detailId}
        onClose={() => setDetailId(null)}
        onRepay={tx => { setDetailId(null); setBillRepay(tx); }}
      />
      <TopUpWalletModal open={topUpOpen} onOpenChange={setTopUpOpen} />

      {/* Bill Payment Service Modals — charged to PayLater credit */}
      <BuyAirtimeModal open={activeService === "airtime"} onOpenChange={closeService} payLater={payLater} />
      <BuyDataModal open={activeService === "data"} onOpenChange={closeService} payLater={payLater} />
      <ElectricityPaymentModal open={activeService === "electricity"} onOpenChange={closeService} payLater={payLater} />
      <CableTvPaymentModal open={activeService === "cable"} onOpenChange={closeService} payLater={payLater} />
      <JambPinModal open={activeService === "jamb"} onOpenChange={closeService} payLater={payLater} />
      <WaecCheckerModal open={activeService === "waec"} onOpenChange={closeService} payLater={payLater} />
    </div>
  );
}
