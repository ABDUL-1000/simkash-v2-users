import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Heart, ShieldCheck, Truck } from "lucide-react";
import { EasyBuyInstalmentsModal } from "../Modals/EasyBuyInstalmentsModal";
import { EasyBuyPlanModal } from "../Modals/EasyBuyPlanModal";
import { NotifyAvailableModal } from "../Modals/NotifyAvailableModal";

export default function ProductDetailsPage() {
  const navigate = useNavigate();

  // State
  const [selectedImage, setSelectedImage] = useState(0);
  const [simConnectivity, setSimConnectivity] = useState(true);
  const [professionalInstallation, setProfessionalInstallation] = useState(true);
  const [paymentMode, setPaymentMode] = useState<"wallet" | "card" | "easybuy">("wallet");
  const [quantity, setQuantity] = useState(1);

  // Modals state
  const [easyBuyModalOpen, setEasyBuyModalOpen] = useState(false);
  const [easyBuyPlanModalOpen, setEasyBuyPlanModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  const basePrice = 184999;
  const simAddon = simConnectivity ? 5000 : 0;
  const installationAddon = professionalInstallation ? 40000 : 0;
  const totalPrice = (basePrice + simAddon + installationAddon) * quantity;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs font-semibold text-[#8C909B]">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate("/marketplace")} className="hover:underline">
            Simkash Store
          </button>
          <span>/</span>
          <span>CCTV Cameras</span>
          <span>/</span>
          <span className="text-[#0F152A]">Hikvision DS-2CD2143G2</span>
        </div>

        <button
          type="button"
          onClick={() => setNotifyModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-1.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
        >
          <Bell className="size-3.5 text-[#2563EB]" /> Notify When Available
        </button>
      </div>

      {/* Main Top Grid: Gallery Left, Purchase Panel Right */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Gallery & Product Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Gallery Preview */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div className="h-80 w-full rounded-2xl bg-[#F8FAFC] flex flex-col items-center justify-center text-center p-4">
              <span className="text-6xl">📹</span>
              <p className="mt-4 text-xs font-bold text-[#66738C]">
                Hikvision DS-2CD2143G2 (4MP Outdoor Dome Camera)
              </p>
            </div>

            {/* Thumbnail Squares */}
            <div className="flex items-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex size-16 cursor-pointer items-center justify-center rounded-xl border transition ${
                    selectedImage === idx
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-[#F8FAFC] hover:border-slate-300"
                  }`}
                >
                  <span className="text-xl">📹</span>
                </div>
              ))}
            </div>
          </div>

          {/* About This Product */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F152A]">About This Product</h3>
            <p className="text-xs text-[#66738C] leading-relaxed">
              The Hikvision DS-2CD2143G2 is a professional-grade 4MP outdoor CCTV camera with AcuSense technology for accurate human and vehicle detection. Features H.265+ compression, 60m IR night vision, and IP67 weatherproofing for reliable outdoor performance.
            </p>

            {/* Specifications Table */}
            <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Brand</span>
                <span className="font-bold text-[#0F152A]">Hikvision</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Model</span>
                <span className="font-bold text-[#0F152A]">DS-2CD2143G2</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Resolution</span>
                <span className="font-bold text-[#0F152A]">4MP (2688×1520)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">IR Range</span>
                <span className="font-bold text-[#0F152A]">60 metres</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">IP Rating</span>
                <span className="font-bold text-[#0F152A]">IP67 Weatherproof</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Power</span>
                <span className="font-bold text-[#0F152A]">PoE / 12V DC</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Storage</span>
                <span className="font-bold text-[#0F152A]">MicroSD up to 256GB</span>
              </div>
              <div className="flex justify-between py-2 last:pb-0">
                <span className="text-[#8C909B]">Warranty</span>
                <span className="font-bold text-[#0F152A]">2 years Simkash warranty</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-[#0F152A]">Customer Reviews (124)</h3>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold text-[#0F152A]">4.7</h2>
                <p className="text-xs font-bold text-[#F59E0B] mt-0.5">★★★★★</p>
                <p className="text-[10px] text-[#8C909B] mt-0.5">Based on 124 reviews</p>
              </div>

              {/* Star Rating Bars */}
              <div className="flex-1 space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-4 text-[#8C909B]">5★</span>
                  <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className="h-full w-[81%] bg-[#F59E0B]" />
                  </div>
                  <span className="w-8 text-right text-[#8C909B]">81</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 text-[#8C909B]">4★</span>
                  <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className="h-full w-[27%] bg-[#F59E0B]" />
                  </div>
                  <span className="w-8 text-right text-[#8C909B]">27</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Purchase Panel & Add-ons (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            {/* Title & Pricing */}
            <div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-extrabold text-[#0F152A]">
                  ₦{basePrice.toLocaleString()}
                </h2>
                <span className="text-xs text-[#8C909B] line-through">₦220,000</span>
                <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-extrabold text-[#10B981]">
                  16% OFF
                </span>
              </div>
              <p className="text-xs font-bold text-[#10B981] mt-1">
                ● In Stock - Ships within 2 days
              </p>
              <p className="text-xs text-[#8C909B] mt-0.5">
                Sold by Simkash Direct ✓ <span className="font-bold text-[#2563EB]">View store</span>
              </p>
            </div>

            {/* Add-on Checkbox Cards */}
            <div className="space-y-2.5">
              {/* Add SIM Connectivity */}
              <div
                onClick={() => setSimConnectivity(!simConnectivity)}
                className={`cursor-pointer flex items-center justify-between rounded-2xl border p-3.5 transition ${
                  simConnectivity
                    ? "border-[#2563EB] bg-[#EFF4F8]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={simConnectivity}
                    onChange={() => setSimConnectivity(!simConnectivity)}
                    className="size-4 accent-[#2563EB]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0F152A]">Add SIM Connectivity</h4>
                    <p className="text-[10px] text-[#8C909B]">CCTV SIM · ₦5,000/month</p>
                  </div>
                </div>
              </div>

              {/* Book Professional Installation */}
              <div
                onClick={() => setProfessionalInstallation(!professionalInstallation)}
                className={`cursor-pointer flex items-center justify-between rounded-2xl border p-3.5 transition ${
                  professionalInstallation
                    ? "border-[#2563EB] bg-[#EFF4F8]"
                    : "border-[#E2ECF6] bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={professionalInstallation}
                    onChange={() => setProfessionalInstallation(!professionalInstallation)}
                    className="size-4 accent-[#2563EB]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0F152A]">Book Professional Installation</h4>
                    <p className="text-[10px] text-[#8C909B]">
                      By certified SimKash Installer · ₦40,000 · Within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW WOULD YOU LIKE TO PAY? */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                HOW WOULD YOU LIKE TO PAY?
              </label>

              <div className="space-y-2">
                {/* Option 1: Pay with Wallet */}
                <div
                  onClick={() => setPaymentMode("wallet")}
                  className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                    paymentMode === "wallet"
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0F152A]">💳 Pay with Wallet</span>
                    <span className="text-xs font-bold text-[#2563EB]">
                      Full price: ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8C909B] mt-0.5">₦50,000 available</p>
                </div>

                {/* Option 2: Pay with Card */}
                <div
                  onClick={() => setPaymentMode("card")}
                  className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                    paymentMode === "card"
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0F152A]">💳 Pay with Card</span>
                    <span className="text-xs font-bold text-[#2563EB]">
                      Full price: ₦{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#8C909B] mt-0.5">Visa, Mastercard, Verve</p>
                </div>

                {/* Option 3: EasyBuy Instalments */}
                <div
                  onClick={() => {
                    setPaymentMode("easybuy");
                    setEasyBuyPlanModalOpen(true);
                  }}
                  className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                    paymentMode === "easybuy"
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0F152A]">
                      📅 EasyBuy — Pay in Instalments
                    </span>
                    <span className="text-xs font-bold text-[#2563EB]">0% Interest</span>
                  </div>
                  <p className="text-[10px] text-[#8C909B] mt-0.5">
                    ₦36,999 deposit + ₦29,600 × 5 months
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#8C909B]">Quantity:</span>
              <div className="flex items-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-[#0F152A] hover:bg-slate-200"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-extrabold text-[#0F152A]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold text-[#0F152A] hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Purchase Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => navigate("/marketplace/cart")}
                className="w-full rounded-xl border border-[#2563EB] py-3 text-xs font-bold text-[#2563EB] hover:bg-[#EFF4F8]"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => navigate("/marketplace/checkout")}
                className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="w-full text-center text-xs font-bold text-[#8C909B] hover:text-[#2563EB] flex items-center justify-center gap-1.5 pt-1"
              >
                <Heart className="size-4" /> Add to Wishlist
              </button>
            </div>

            {/* Guarantee Shipping Box */}
            <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#0F152A] font-semibold">
                <Truck className="size-4 text-[#2563EB]" />
                <span>Free delivery to Lagos (3–5 business days)</span>
              </div>
              <div className="flex items-center gap-2 text-[#0F152A] font-semibold pt-2">
                <ShieldCheck className="size-4 text-[#10B981]" />
                <span>14-day return policy & 2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Modals */}
      <EasyBuyInstalmentsModal
        open={easyBuyModalOpen}
        onOpenChange={setEasyBuyModalOpen}
        productName="Hikvision DS-2CD2143G2"
        depositAmount={36999}
        monthlyAmount={29600}
        months={5}
        totalAmount={totalPrice}
      />
      <EasyBuyPlanModal
        open={easyBuyPlanModalOpen}
        onOpenChange={setEasyBuyPlanModalOpen}
        productName="Hikvision 4MP Camera"
        productPrice={89999}
      />
      <NotifyAvailableModal
        open={notifyModalOpen}
        onOpenChange={setNotifyModalOpen}
        productName="Hikvision 4MP Camera"
        price={89999}
      />
    </div>
  );
}
