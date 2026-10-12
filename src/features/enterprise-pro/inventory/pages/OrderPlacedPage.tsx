import type { OrderResult } from '../types/simInventory';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import React from "react";
import { CheckCircle2, ArrowLeft, Download } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { colors } from "@/constants/colors";
export const OrderPlacedPage: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const order = (state as {
        order?: OrderResult;
    } | null)?.order;
    if (!order)
        return <AppEmptyState title="No order receipt" description="Place an order to view its confirmation." actionText="Back to Inventory" onAction={() => navigate(appPaths.enterpriseProSimInventory)}/>;
    const steps = [{ label: order.status, time: order.estimated_delivery, status: "completed" }];
    return (<div className="max-w-3xl mx-auto space-y-6 py-6 pb-16">
      <div className="p-8 bg-white rounded-2xl border space-y-6 shadow-sm" style={{ borderColor: colors.border }}>
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-8 h-8"/>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">
            Wholesale SIM Order Placed Successfully!
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Order <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">{order.order_reference}</code> {order.message ?? "has been submitted for fulfillment."}
          </p>
        </div>

        {/* Overview Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-[11px] text-slate-500 block">Total Volume</span>
            <span className="font-bold text-slate-900">{order.total_sims.toLocaleString()} SIM Cards</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Order Value</span>
            <span className="font-bold text-emerald-600">{order.total_cost_formatted}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Estimated Arrival</span>
            <span className="font-bold text-slate-900">{order.estimated_delivery}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Status</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full inline-block">
              {order.status}
            </span>
          </div>
        </div>

        {/* Fulfillment Stepper */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Fulfillment & Tracking Progress:
          </h4>
          <div className="space-y-3">
            {steps.map((step, idx) => (<div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step.status === "completed"
                ? "bg-emerald-600 text-white"
                : step.status === "current"
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-slate-200 text-slate-500"}`}>
                    {step.status === "completed" ? (<CheckCircle2 className="w-4 h-4"/>) : (idx + 1)}
                  </div>
                  {idx < steps.length - 1 && (<div className={`w-0.5 h-6 ${step.status === "completed" ? "bg-emerald-500" : "bg-slate-200"}`}/>)}
                </div>

                <div className="pt-0.5 text-xs">
                  <div className="font-bold text-slate-900">{step.label}</div>
                  <div className="text-[11px] text-slate-500">{step.time}</div>
                </div>
              </div>))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200">
          <button type="button" disabled title="Invoice download is not available yet" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors">
            <Download className="w-3.5 h-3.5"/>
            <span>Download Invoice</span>
          </button>
          <button type="button" onClick={() => navigate(appPaths.enterpriseProSimInventory)} className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span>Back to SIM Inventory</span>
          </button>
        </div>
      </div>
    </div>);
};
