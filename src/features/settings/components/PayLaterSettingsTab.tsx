import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PayLaterSettingsTab() {
  const navigate = useNavigate();

  const [autoRepay, setAutoRepay] = useState(true);
  const [payLaterCheckout, setPayLaterCheckout] = useState(true);
  const [limitIncreases, setLimitIncreases] = useState(false);

  return (
    <div className="space-y-6">
      {/* Card 1: PayLater Credit Overview */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">PayLater Credit Overview</h3>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#8C909B]">Credit Limit</span>
            <h4 className="text-2xl font-extrabold text-[#0F152A]">₦50,000</h4>
          </div>
          <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#8C909B]">Used</span>
            <h4 className="text-2xl font-extrabold text-[#0F152A]">₦12,500</h4>
          </div>
          <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-1">
            <span className="text-[11px] font-semibold text-[#8C909B]">Available</span>
            <h4 className="text-2xl font-extrabold text-[#0F152A]">₦37,500</h4>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div className="h-full w-[25%] rounded-full bg-[#2563EB]" />
          </div>
          <p className="text-[11px] text-[#8C909B] font-medium">25% used</p>
        </div>
      </div>

      {/* Card 2: PayLater Preferences */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">PayLater Preferences</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          <div className="flex items-center justify-between py-3.5 first:pt-0">
            <div>
              <h4 className="font-bold text-[#0F152A]">Auto-repay on due date</h4>
              <p className="text-[11px] text-[#8C909B]">Deduct from wallet balance</p>
            </div>
            <button
              type="button"
              onClick={() => setAutoRepay(!autoRepay)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                autoRepay ? "bg-[#10B981]" : "bg-[#E2ECF6]"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  autoRepay ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3.5">
            <div>
              <h4 className="font-bold text-[#0F152A]">PayLater at checkout</h4>
              <p className="text-[11px] text-[#8C909B]">Show PayLater option during purchase</p>
            </div>
            <button
              type="button"
              onClick={() => setPayLaterCheckout(!payLaterCheckout)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                payLaterCheckout ? "bg-[#10B981]" : "bg-[#E2ECF6]"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  payLaterCheckout ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3.5 last:pb-0">
            <div>
              <h4 className="font-bold text-[#0F152A]">Credit increase requests</h4>
              <p className="text-[11px] text-[#8C909B]">Allow Simkash to offer limit increases</p>
            </div>
            <button
              type="button"
              onClick={() => setLimitIncreases(!limitIncreases)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                limitIncreases ? "bg-[#10B981]" : "bg-[#E2ECF6]"
              }`}
            >
              <span
                className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                  limitIncreases ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Repayment History */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Repayment History</h3>
          <button
            type="button"
            onClick={() => navigate("/paylater")}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white text-xs">
          <div className="flex items-center justify-between p-3.5 px-4">
            <div>
              <h4 className="font-bold text-[#0F152A]">12 Jul 2026</h4>
              <p className="text-[11px] text-[#8C909B]">₦5,000</p>
            </div>
            <span className="rounded bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
              Paid
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 px-4">
            <div>
              <h4 className="font-bold text-[#0F152A]">28 Jun 2026</h4>
              <p className="text-[11px] text-[#8C909B]">₦7,500</p>
            </div>
            <span className="rounded bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
              Paid
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 px-4">
            <div>
              <h4 className="font-bold text-[#0F152A]">14 Jun 2026</h4>
              <p className="text-[11px] text-[#8C909B]">₦3,200</p>
            </div>
            <span className="rounded bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold text-[#F59E0B]">
              Late
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
