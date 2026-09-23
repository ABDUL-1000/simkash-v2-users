import React from "react";
import { Package, TrendingUp, Users, CheckCircle2, Landmark, ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EbPaymentModel, EbDashboardMetrics } from "../types";

interface EbPrimaryMetricCardsProps {
  metrics: EbDashboardMetrics;
  paymentModel: EbPaymentModel;
  onPayInstalment?: () => void;
}

export const EbPrimaryMetricCards: React.FC<EbPrimaryMetricCardsProps> = ({
  metrics,
  paymentModel,
  onPayInstalment,
}) => {
  const isUpfront = paymentModel === "upfront";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Products in Stock */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isUpfront ? "Products in Stock" : "SIMs in Stock"}
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics.productsInStock.toLocaleString()}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[11px] font-bold">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
              SIMs: {metrics.simsInStock}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
              CCTV: {metrics.cctvInStock} units
            </span>
            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
              Solar: {metrics.solarInStock} units
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Total Margin Earned */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Margin Earned
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₦{metrics.totalMarginEarned.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Jun 2026 · All sales</p>
        </div>
      </div>

      {/* Card 3: Total Customers */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Customers
          </span>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics.totalCustomers.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1">
            <span>↑ {metrics.customersThisMonth} this month</span>
          </p>
        </div>
      </div>

      {/* Card 4: Payment Model vs Balance Remaining */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isUpfront ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
            }`}
          >
            {isUpfront ? <CheckCircle2 className="w-5 h-5" /> : <Landmark className="w-5 h-5" />}
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isUpfront ? "Payment Model" : "Balance Remaining"}
          </span>
        </div>

        <div>
          {isUpfront ? (
            <>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                100% Upfront
              </div>
              <div className="mt-2 text-xs font-medium space-y-0.5">
                <span className="text-emerald-600 font-bold block">No balance owed ✓</span>
                <span className="text-blue-600 font-bold block">Best wholesale pricing</span>
              </div>
            </>
          ) : (
            <>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">
                ₦{metrics.balanceRemaining.toLocaleString()}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Bi-weekly instalment due: 28 Jun</span>
                <button
                  type="button"
                  onClick={onPayInstalment}
                  className="font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-0.5"
                >
                  <span>Pay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
