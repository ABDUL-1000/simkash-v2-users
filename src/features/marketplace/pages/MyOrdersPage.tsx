import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { RequestReturnModal } from "../Modals/RequestReturnModal";
import { CancelOrderModal } from "../Modals/CancelOrderModal";

export default function MyOrdersPage() {
  const navigate = useNavigate();

  // Filters
  const [tabFilter, setTabFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrderRef, setSelectedOrderRef] = useState("ORD-2026-00847");

  const tabs = ["All", "Active", "Dispatched", "Delivered", "Cancelled", "Returned"];

  const handleOpenReturn = (orderRef: string) => {
    setSelectedOrderRef(orderRef);
    setReturnModalOpen(true);
  };

  const handleOpenCancel = (orderRef: string) => {
    setSelectedOrderRef(orderRef);
    setCancelModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">My Orders</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">Track and manage your purchases</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isSelected = tabFilter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setTabFilter(tab)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                isSelected
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Search & Meta Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2 pl-9 pr-4 text-xs font-semibold text-[#0F152A] outline-none"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8C909B]">
          <button type="button" className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-1.5 font-bold text-[#0F152A]">
            Date range
          </button>
          <span className="font-semibold text-[#0F152A]">4 orders</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {/* Order Card 1: Dispatched */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#0F152A]">ORD-2026-00847</h3>
              <p className="text-xs text-[#8C909B] mt-0.5">Hikvision Camera, GPS Tracker × 2 + 1 more</p>
            </div>
            <span className="rounded-full bg-[#EFF4F8] px-3 py-1 text-xs font-bold text-[#2563EB]">
              Dispatched
            </span>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-[#E2ECF6] pt-3">
            <span className="text-lg font-extrabold text-[#0F152A]">₦349,999</span>
            <span className="text-[#8C909B]">24 Jun 2026</span>
          </div>

          <p className="text-xs font-semibold text-[#8C909B]">Est. delivery: 28–30 Jun</p>

          {/* Progress Tracker Bar */}
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div className="h-full w-[70%] rounded-full bg-[#10B981]" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/marketplace/orders/ORD-2026-00847")}
              className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Track Order
            </button>
            <button
              type="button"
              onClick={() => navigate("/marketplace/orders/ORD-2026-00847")}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Order Card 2: Delivered */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#0F152A]">ORD-2026-00712</h3>
              <p className="text-xs text-[#8C909B] mt-0.5">Dahua CCTV Camera</p>
            </div>
            <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-bold text-[#10B981]">
              Delivered
            </span>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-[#E2ECF6] pt-3">
            <span className="text-lg font-extrabold text-[#0F152A]">₦124,999</span>
            <span className="text-[#8C909B]">10 Jun 2026</span>
          </div>

          <p className="text-xs font-semibold text-[#10B981]">Delivered: 14 Jun 2026</p>

          <div className="h-2 w-full rounded-full bg-[#10B981]" />

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/marketplace/orders/ORD-2026-00712")}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => handleOpenReturn("ORD-2026-00712")}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Return Item
            </button>
          </div>
        </div>

        {/* Order Card 3: Confirmed */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#0F152A]">ORD-2026-00901</h3>
              <p className="text-xs text-[#8C909B] mt-0.5">GL-iNet Router</p>
            </div>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-bold text-[#D9990D]">
              Confirmed
            </span>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-[#E2ECF6] pt-3">
            <span className="text-lg font-extrabold text-[#0F152A]">₦35,000</span>
            <span className="text-[#8C909B]">23 Jun 2026</span>
          </div>

          <p className="text-xs font-semibold text-[#8C909B]">Est. delivery: 27–29 Jun</p>

          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div className="h-full w-[40%] rounded-full bg-[#10B981]" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/marketplace/orders/ORD-2026-00901")}
              className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Track Order
            </button>
            <button
              type="button"
              onClick={() => navigate("/marketplace/orders/ORD-2026-00901")}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              View Details
            </button>
            <button
              type="button"
              onClick={() => handleOpenCancel("ORD-2026-00901")}
              className="rounded-xl border border-[#EF4444] px-5 py-2 text-xs font-bold text-[#EF4444] hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Order Card 4: Cancelled */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#0F152A]">ORD-2026-00654</h3>
              <p className="text-xs text-[#8C909B] mt-0.5">Solar Inverter 3KVA</p>
            </div>
            <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-xs font-bold text-[#8C909B]">
              Cancelled
            </span>
          </div>

          <div className="flex items-center justify-between text-xs border-t border-[#E2ECF6] pt-3">
            <span className="text-lg font-extrabold text-[#0F152A]">₦380,000</span>
            <span className="text-[#8C909B]">1 Jun 2026</span>
          </div>

          <p className="text-xs font-semibold text-[#10B981]">Refunded ₦380,000 to wallet</p>

          {/* Actions */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => navigate("/marketplace/orders/ORD-2026-00654")}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Linked Modals */}
      <RequestReturnModal
        open={returnModalOpen}
        onOpenChange={setReturnModalOpen}
        orderRef={selectedOrderRef}
      />
      <CancelOrderModal
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        orderRef={selectedOrderRef}
      />
    </div>
  );
}
