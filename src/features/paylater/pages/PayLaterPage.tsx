import { useState } from "react";
import {
  BookOpen,
  Droplets,
  Globe,
  GraduationCap,
  Phone,
  Tv,
  Wifi,
  Zap,
} from "lucide-react";
import { RepayFullBalanceModal } from "../Modals/RepayFullBalanceModal";
import { PartialRepaymentModal } from "../Modals/PartialRepaymentModal";
import { RepaymentHistoryModal } from "../Modals/RepaymentHistoryModal";
import { RequestLimitIncreaseModal } from "../Modals/RequestLimitIncreaseModal";
import { PaymentOverdueModal } from "../Modals/PaymentOverdueModal";

// Service Modals from bill-payments
import { BuyAirtimeModal } from "@/features/bill-payments/Modals/BuyAirtimeModal";
import { BuyDataModal } from "@/features/bill-payments/Modals/BuyDataModal";
import { ElectricityPaymentModal } from "@/features/bill-payments/Modals/ElectricityPaymentModal";
import { CableTvPaymentModal } from "@/features/bill-payments/Modals/CableTvPaymentModal";
import { JambPinModal } from "@/features/bill-payments/Modals/JambPinModal";
import { WaecCheckerModal } from "@/features/bill-payments/Modals/WaecCheckerModal";

export default function PayLaterPage() {
  // Modals state
  const [repayFullOpen, setRepayFullOpen] = useState(false);
  const [partialRepayOpen, setPartialRepayOpen] = useState(false);
  const [repaymentHistoryOpen, setRepaymentHistoryOpen] = useState(false);
  const [limitIncreaseOpen, setLimitIncreaseOpen] = useState(false);
  const [overdueModalOpen, setOverdueModalOpen] = useState(false);

  // Service Modals State
  const [airtimeModalOpen, setAirtimeModalOpen] = useState(false);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [electricityModalOpen, setElectricityModalOpen] = useState(false);
  const [cableTvModalOpen, setCableTvModalOpen] = useState(false);
  const [jambModalOpen, setJambModalOpen] = useState(false);
  const [waecModalOpen, setWaecModalOpen] = useState(false);

  const scheduleItems = [
    { service: "Airtime (MTN)", date: "15 Jun", amount: "₦500", due: "30 Jun", status: "Pending" },
    { service: "Electricity (EKEDC)", date: "10 Jun", amount: "₦3,000", due: "30 Jun", status: "Pending" },
    { service: "Cable TV (DSTV)", date: "5 Jun", amount: "₦7,900", due: "30 Jun", status: "Pending" },
    { service: "Data (MTN 1GB)", date: "1 Jun", amount: "₦500", due: "30 Jun", status: "Pending" },
    { service: "Airtime (Airtel)", date: "25 May", amount: "₦200", due: "31 May", status: "Paid" },
  ];

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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRepayFullOpen(true)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-5 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
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
      </div>

      {/* 2. Available Credit & Credit Used Card */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Available Credit */}
          <div>
            <span className="text-xs text-[#8C909B] font-semibold">Available Credit</span>
            <h2 className="text-4xl font-extrabold text-[#0F152A] mt-1">
              ₦1,000<span className="text-xl text-[#8C909B]">.00</span>
            </h2>
            <p className="text-[11px] text-[#8C909B] mt-1 font-medium">
              0 of ₦2,000 total limit
            </p>
          </div>

          {/* Credit Used */}
          <div className="md:text-right">
            <span className="text-xs text-[#8C909B] font-semibold">Credit Used</span>
            <h2 className="text-4xl font-extrabold text-[#EF4444] mt-1">
              ₦1,000<span className="text-xl text-[#EF4444]/60">.00</span>
            </h2>
            <p className="text-[11px] font-bold text-[#F59E0B] mt-1">
              Due: 30 Jun 2026
            </p>
          </div>
        </div>

        {/* Usage Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div className="h-full w-[50%] rounded-full bg-[#EF4444]" />
          </div>
          <div className="flex justify-between text-[11px] font-medium text-[#8C909B]">
            <span>₦1,000 used</span>
            <span>50% of credit used</span>
            <span>₦1,000 available</span>
          </div>
        </div>

        {/* Due Alert Banner */}
        <div className="flex items-center justify-between rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 px-4 text-xs">
          <span className="font-bold text-[#D9990D] flex items-center gap-2">
            <span>●</span> Repayment due in 5 days
          </span>
          <button
            type="button"
            onClick={() => setRepayFullOpen(true)}
            className="rounded-xl bg-[#F59E0B] px-5 py-2 font-bold text-white shadow-xs hover:bg-amber-600"
          >
            Repay ₦1,000
          </button>
        </div>
      </div>

      {/* 3. Use PayLater For (8 Service Cards Grid) */}
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-[#0F152A]">Use PayLater For</h3>
          <p className="text-xs text-[#8C909B]">Select a service to pay on credit</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Buy Airtime */}
          <div
            onClick={() => setAirtimeModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#F59E0B] text-white">
              <Phone className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">Buy Airtime</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 2: Buy Data */}
          <div
            onClick={() => setDataModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
              <Wifi className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">Buy Data</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 3: Electricity */}
          <div
            onClick={() => setElectricityModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#F59E0B] text-white">
              <Zap className="size-5 fill-white" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">Electricity</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 4: Cable TV */}
          <div
            onClick={() => setCableTvModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#9333EA] text-white">
              <Tv className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">Cable TV</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 5: Internet */}
          <div
            onClick={() => setDataModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#10B981] text-white">
              <Globe className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">Internet</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 6: Water Bill */}
          <div
            onClick={() => setElectricityModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0D1B2E] text-white">
              <Droplets className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">Water Bill</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 7: JAMB PIN */}
          <div
            onClick={() => setJambModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#EF4444] text-white">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">JAMB PIN</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>

          {/* Card 8: WAEC PIN */}
          <div
            onClick={() => setWaecModalOpen(true)}
            className="cursor-pointer flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
          >
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[#0F152A] text-white">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#0F152A]">WAEC PIN</h4>
              <p className="text-xs text-[#8C909B]">Pay on credit</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Repayment Schedule & Right Column Grid */}
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

          <div className="overflow-hidden rounded-2xl border border-[#E2ECF6] bg-white shadow-xs">
            <table className="w-full text-left text-xs">
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
                {scheduleItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]">
                    <td className="py-3.5 px-4 font-bold text-[#0F152A]">{item.service}</td>
                    <td className="py-3.5 px-4 text-[#8C909B]">{item.date}</td>
                    <td className="py-3.5 px-4 font-extrabold text-[#0F152A]">{item.amount}</td>
                    <td className="py-3.5 px-4 text-[#8C909B]">{item.due}</td>
                    <td className="py-3.5 px-4">
                      {item.status === "Pending" ? (
                        <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-[10px] font-bold text-[#F59E0B]">
                          Pending
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-[10px] font-bold text-[#10B981]">
                          Paid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#F8FAFC] border-t border-[#E2ECF6] font-bold">
                <tr>
                  <td colSpan={2} className="py-3.5 px-4 text-[#0F152A]">Total Outstanding</td>
                  <td colSpan={3} className="py-3.5 px-4 text-right font-extrabold text-[#EF4444] text-sm">
                    ₦11,900
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Right Column — Cards (Span 1) */}
        <div className="space-y-6">
          {/* Outstanding Repayment Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-3xl font-extrabold text-[#EF4444]">₦11,900</h2>
              <p className="text-xs text-[#8C909B] font-medium mt-0.5">Total outstanding</p>
              <p className="text-xs font-bold text-[#F59E0B] mt-1">● Due: 30 Jun 2026</p>
            </div>

            <div className="space-y-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                <div className="h-full w-0 rounded-full bg-[#EF4444]" />
              </div>
              <p className="text-[10px] text-[#8C909B]">0 of ₦12,100 used repaid</p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setRepayFullOpen(true)}
                className="w-full rounded-xl bg-[#EF4444] py-3 text-xs font-bold text-white shadow-md transition hover:bg-red-600"
              >
                Repay All — ₦11,900
              </button>
              <button
                type="button"
                onClick={() => setPartialRepayOpen(true)}
                className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                Repay Partial Amount
              </button>
            </div>
          </div>

          {/* Credit History Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Credit History</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2.5 first:pt-0">
                <span className="text-[#8C909B]">Total credit used all time</span>
                <span className="font-bold text-[#0F152A]">₦45,000</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Total repaid all time</span>
                <span className="font-bold text-[#10B981]">₦33,100</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">On-time repayments</span>
                <span className="font-bold text-[#0F152A]">8 of 9</span>
              </div>
              <div className="flex justify-between py-2.5 last:pb-0 items-center">
                <span className="text-[#8C909B]">Credit score</span>
                <span className="h-2.5 w-16 rounded-full bg-[#10B981]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repayment & Credit Modals */}
      <RepayFullBalanceModal
        open={repayFullOpen}
        onOpenChange={setRepayFullOpen}
        outstandingAmount={11900}
        dueDate="30 Jun 2026"
        onOpenPartialRepayment={() => setPartialRepayOpen(true)}
      />
      <PartialRepaymentModal
        open={partialRepayOpen}
        onOpenChange={setPartialRepayOpen}
        outstandingTotal={11900}
        dueDate="30 Jun"
      />
      <RepaymentHistoryModal
        open={repaymentHistoryOpen}
        onOpenChange={setRepaymentHistoryOpen}
        onRepayAllClick={() => setRepayFullOpen(true)}
      />
      <RequestLimitIncreaseModal
        open={limitIncreaseOpen}
        onOpenChange={setLimitIncreaseOpen}
        currentLimit={2000}
      />
      <PaymentOverdueModal
        open={overdueModalOpen}
        onOpenChange={setOverdueModalOpen}
        onRepayNowClick={() => setRepayFullOpen(true)}
        overdueAmount={11900}
      />

      {/* Bill Payment Service Modals */}
      <BuyAirtimeModal open={airtimeModalOpen} onOpenChange={setAirtimeModalOpen} />
      <BuyDataModal open={dataModalOpen} onOpenChange={setDataModalOpen} />
      <ElectricityPaymentModal open={electricityModalOpen} onOpenChange={setElectricityModalOpen} />
      <CableTvPaymentModal open={cableTvModalOpen} onOpenChange={setCableTvModalOpen} />
      <JambPinModal open={jambModalOpen} onOpenChange={setJambModalOpen} />
      <WaecCheckerModal open={waecModalOpen} onOpenChange={setWaecModalOpen} />
    </div>
  );
}
