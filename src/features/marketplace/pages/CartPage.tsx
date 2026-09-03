import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Trash2, Truck, Zap } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();

  // State
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">("standard");
  const [paymentOption, setPaymentOption] = useState<"wallet" | "card" | "paylater">("wallet");
  const [promoCode, setPromoCode] = useState("SIMKASH10");
  const [promoApplied, setPromoApplied] = useState(true);

  const deliveryCost = deliveryOption === "express" ? 3500 : 0;
  const promoDiscount = promoApplied ? 10000 : 0;
  const walletBalance = 50000;
  const totalAmount = 354999 + deliveryCost - promoDiscount;
  const shortfall = totalAmount - walletBalance;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">My Cart</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">3 items in your shopping cart</p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/marketplace")}
          className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <ArrowLeft className="size-4" /> Continue Shopping
        </button>
      </div>

      {/* Main Grid: Left Items & Delivery, Right Order Summary */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cart Items Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-[#0F152A]">Items (3)</h3>

            <div className="divide-y divide-[#E2ECF6] space-y-4">
              {/* Item 1: Hikvision Camera */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 first:pt-0">
                <div className="flex items-start gap-3.5">
                  <div className="size-16 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-2xl shrink-0">
                    📹
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-[#0F152A]">Hikvision DS-2CD2143G2</h4>
                    <p className="text-[11px] text-[#8C909B]">Simkash Direct</p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                        CCTV SIM ₦5,000/mo
                      </span>
                      <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                        Installation ₦40,000
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                  <div>
                    <span className="text-xs font-semibold text-[#8C909B] line-through block">₦224,999</span>
                    <span className="text-base font-extrabold text-[#0F152A]">₦184,999</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                      <button type="button" className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A]">-</button>
                      <span className="px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">1</span>
                      <button type="button" className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A]">+</button>
                    </div>
                    <button type="button" className="text-[#8C909B] hover:text-[#EF4444]">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 2: GPS Tracker */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className="flex items-start gap-3.5">
                  <div className="size-16 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-2xl shrink-0">
                    🛰️
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-[#0F152A]">GPS Tracker Pro X200</h4>
                    <p className="text-[11px] text-[#8C909B]">Simkash Direct</p>
                    <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                      SIM Ready
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                  <span className="text-base font-extrabold text-[#0F152A]">₦90,000</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                      <button type="button" className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A]">-</button>
                      <span className="px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">2</span>
                      <button type="button" className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A]">+</button>
                    </div>
                    <button type="button" className="text-[#8C909B] hover:text-[#EF4444]">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Item 3: GL-iNet Router */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                <div className="flex items-start gap-3.5">
                  <div className="size-16 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-2xl shrink-0">
                    📶
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-[#0F152A]">GL-iNet AX1800 Router</h4>
                    <p className="text-[11px] text-[#8C909B]">Simkash Direct</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                  <span className="text-base font-extrabold text-[#0F152A]">₦35,000</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                      <button type="button" className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A]">-</button>
                      <span className="px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">1</span>
                      <button type="button" className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A]">+</button>
                    </div>
                    <button type="button" className="text-[#8C909B] hover:text-[#EF4444]">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Options Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Delivery</h3>

            {/* Delivery Method Options */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                onClick={() => setDeliveryOption("standard")}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  deliveryOption === "standard"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F152A]">
                  <Truck className="size-4 text-[#2563EB]" /> Standard Delivery
                </div>
                <p className="text-[11px] text-[#8C909B] mt-1">3–5 business days</p>
                <span className="mt-2 inline-block font-extrabold text-xs text-[#10B981]">Free</span>
              </div>

              <div
                onClick={() => setDeliveryOption("express")}
                className={`cursor-pointer rounded-2xl border p-4 transition ${
                  deliveryOption === "express"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F152A]">
                  <Zap className="size-4 text-[#F59E0B]" /> Express Delivery
                </div>
                <p className="text-[11px] text-[#8C909B] mt-1">Next business day</p>
                <span className="mt-2 inline-block font-extrabold text-xs text-[#0F152A]">₦3,500</span>
              </div>
            </div>

            {/* Delivery Address Box */}
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0F152A] flex items-center gap-1.5">
                  <MapPin className="size-4 text-[#2563EB]" /> 23 Allen Avenue, Ikeja, Lagos
                </span>
                <span className="font-bold text-[#2563EB] hover:underline cursor-pointer">
                  Change address
                </span>
              </div>
              <p className="text-[10px] text-[#10B981] font-semibold pl-5">Default address</p>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) — Order Summary & Payment Mode */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Summary Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Order Summary</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Hikvision Camera</span>
                <span className="font-bold text-[#0F152A]">₦184,999</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">GPS Tracker × 2</span>
                <span className="font-bold text-[#0F152A]">₦90,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">GL-iNet Router</span>
                <span className="font-bold text-[#0F152A]">₦35,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">CCTV SIM (1 month)</span>
                <span className="font-bold text-[#0F152A]">₦5,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Installation fee</span>
                <span className="font-bold text-[#0F152A]">₦40,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Standard Delivery</span>
                <span className="font-bold text-[#10B981]">
                  {deliveryCost === 0 ? "Free" : `₦${deliveryCost.toLocaleString()}`}
                </span>
              </div>
              {promoApplied && (
                <div className="flex justify-between py-2">
                  <span className="text-[#8C909B]">Promo Discount</span>
                  <span className="font-bold text-[#10B981]">-₦10,000</span>
                </div>
              )}
              <div className="flex justify-between py-3 font-extrabold text-base pt-3 border-t border-[#E2ECF6]">
                <span className="text-[#0F152A]">Total</span>
                <span className="text-[#0F152A]">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-xl bg-[#EBFFF8] p-2.5 text-center text-xs font-bold text-[#10B981]">
              You save ₦35,001
            </div>
          </div>

          {/* Pay With Selector Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
              PAY WITH
            </h3>

            <div className="space-y-2.5">
              {/* Wallet Option */}
              <div
                onClick={() => setPaymentOption("wallet")}
                className={`cursor-pointer rounded-2xl border p-3.5 text-xs transition ${
                  paymentOption === "wallet"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#0F152A]">💳 Wallet · ₦50,000 available</span>
                  <span className="size-2 rounded-full bg-[#10B981]" />
                </div>
                {shortfall > 0 && (
                  <p className="text-[10px] font-bold text-[#D9990D] mt-1.5 bg-[#FFFBEB] p-2 rounded-xl border border-[#FCEEC1]">
                    Short by ₦{shortfall.toLocaleString()}. Top up or use a different method.
                  </p>
                )}
              </div>

              {/* Debit / Credit Card Option */}
              <div
                onClick={() => setPaymentOption("card")}
                className={`cursor-pointer rounded-2xl border p-3.5 text-xs transition ${
                  paymentOption === "card"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <span className="font-bold text-[#0F152A] block">💳 Debit / Credit Card</span>
                <span className="text-[10px] text-[#8C909B]">Enter card at checkout</span>
              </div>

              {/* PayLater Credit Option */}
              <div
                onClick={() => setPaymentOption("paylater")}
                className={`cursor-pointer rounded-2xl border p-3.5 text-xs transition ${
                  paymentOption === "paylater"
                    ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <span className="font-bold text-[#0F152A] block">📅 PayLater Credit</span>
                <span className="text-[10px] text-[#8C909B]">
                  ₦1,000 available · May not cover full amount
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              type="button"
              onClick={() => navigate("/marketplace/checkout")}
              className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Promo Code Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 px-3 text-xs font-bold text-[#0F152A] outline-none"
              />
              <button
                type="button"
                onClick={() => setPromoApplied(true)}
                className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <div className="flex items-center justify-between rounded-xl bg-[#EBFFF8] p-2 px-3 text-xs text-[#10B981] font-bold">
                <span>✓ SIMKASH10 applied · ₦10,000 off</span>
                <button type="button" onClick={() => setPromoApplied(false)} className="text-[#EF4444] text-[10px]">
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
