import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, ShoppingBag, Sun } from "lucide-react";

export default function MarketplaceStorePage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "CCTV Cameras",
    "GPS Tracking",
    "Solar Energy",
    "Electronics",
    "Phones",
    "Routers",
    "Smart Home",
    "Accessories",
  ];

  const featuredProducts = [
    {
      id: "hikvision-ds-2cd2143g2",
      name: "Hikvision DS-2CD2143G2-I",
      price: 184999,
      oldPrice: 220000,
      seller: "Simkash Direct",
      badge: "SIM Ready",
    },
    {
      id: "gps-tracker-pro-x200",
      name: "GPS Tracker Pro X200",
      price: 45000,
      seller: "TrackMaster G",
      badge: "SIM Ready",
    },
    {
      id: "solar-inverter-3kva",
      name: "Solar Inverter 3KVA",
      price: 380000,
      seller: "SolarPlus Lagos",
    },
    {
      id: "dahua-ipc-hdw2831t",
      name: "Dahua IPC-HDW2831T-AS",
      price: 124999,
      oldPrice: 145000,
      seller: "Simkash Direct",
      badge: "SIM Ready",
    },
  ];

  const allProducts = [
    { id: "hikvision-4ch-dvr", name: "Hikvision 4CH DVR Kit", price: 280000, seller: "Simkash Direct", badge: "SIM Ready" },
    { id: "gl-inet-ax1800", name: "GL-iNet AX1800 Router", price: 35000, seller: "NetGear NG", badge: "SIM Ready" },
    { id: "tracker-lite-gp8", name: "Tracker Lite GP8", price: 18000, seller: "TrackMaster NG", badge: "SIM Ready" },
    { id: "xiaomi-security-camera", name: "Xiaomi Security Camera", price: 28000, seller: "SmartHome NG" },
    { id: "solar-charge-controller", name: "Solar Charge Controller", price: 45000, seller: "SolarPlus Lagos" },
    { id: "starlink-mount-kit", name: "Starlink Mount Kit", price: 12000, seller: "ConnectNG" },
    { id: "iphone-15-128gb", name: "iPhone 15 128GB", price: 1150000, seller: "Simkash Direct" },
    { id: "samsung-galaxy-a55", name: "Samsung Galaxy A55", price: 420000, seller: "PhonesLagos" },
    { id: "smart-doorbell-camera", name: "Smart Doorbell Camera", price: 32000, seller: "SafetyFirst NG", badge: "SIM Ready" },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">Simkash Store</h1>
          <p className="mt-1 text-xs text-[#8C909B]">
            Shop CCTV, GPS, Solar, Phones and accessories
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/marketplace/orders")}
            className="flex items-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
          >
            <ShoppingBag className="size-4" /> My Orders
          </button>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2 pl-9 pr-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>
        </div>
      </div>

      {/* Hero Promo Banners (2 Cards) */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Promo Banner 1 */}
        <div className="flex items-center justify-between rounded-2xl bg-[#0D1B2E] p-6 text-white shadow-md">
          <div className="space-y-3">
            <span className="rounded-md bg-[#2563EB] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
              CCTV CAMERA DEAL
            </span>
            <h3 className="text-xl font-extrabold tracking-tight">Professional 4MP CCTV Systems</h3>
            <button
              type="button"
              onClick={() => navigate("/marketplace/hikvision-ds-2cd2143g2")}
              className="flex items-center gap-1.5 text-xs font-bold text-[#FFCC00] hover:underline"
            >
              Shop Now <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="size-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
            📹
          </div>
        </div>

        {/* Promo Banner 2 */}
        <div className="flex items-center justify-between rounded-2xl bg-[#1E293B] p-6 text-white shadow-md">
          <div className="space-y-3">
            <span className="rounded-md bg-[#F59E0B] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
              NEW TOOL
            </span>
            <h3 className="text-xl font-extrabold tracking-tight">Solar CCTV System Calculator</h3>
            <button
              type="button"
              onClick={() => navigate("/solar-cctv-designer")}
              className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
            >
              Design Your System <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="size-20 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
            ☀️
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                isSelected
                  ? "bg-[#0F152A] text-white shadow-xs"
                  : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Solar CCTV Designer Callout Banner */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-4 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#2563EB] text-white">
            <Sun className="size-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#0F152A]">Solar CCTV Designer</h4>
            <p className="text-[#66738C] text-[11px]">
              Not sure what you need? Select your spec and our wizard recommends the perfect setup
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate("/solar-cctv-designer")}
          className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 shrink-0"
        >
          Design My System →
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Featured Products</h3>
          <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
            View all →
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/marketplace/${p.id}`)}
              className="cursor-pointer flex flex-col justify-between rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB] hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="h-36 w-full rounded-xl bg-[#F8FAFC] flex items-center justify-center text-4xl">
                  🛍️
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-[#8C909B]">{p.seller}</span>
                  <h4 className="text-sm font-bold text-[#0F152A] line-clamp-1">{p.name}</h4>
                  <p className="text-[10px] text-[#10B981] font-bold">★★★★★ (124)</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-[#0F152A]">
                    ₦{p.price.toLocaleString()}
                  </span>
                  {p.oldPrice && (
                    <span className="text-xs text-[#8C909B] line-through">
                      ₦{p.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {p.badge && (
                  <span className="inline-block rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                    {p.badge}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/marketplace/cart");
                }}
                className="mt-4 w-full rounded-xl bg-[#0F152A] py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* All Products Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">All Products</h3>
          <select className="rounded-xl border border-[#E2ECF6] bg-white py-1.5 px-3 text-xs font-bold text-[#0F152A] outline-none">
            <option>Sort: Best Match</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/marketplace/${p.id}`)}
              className="cursor-pointer flex flex-col justify-between rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#2563EB]"
            >
              <div className="space-y-3">
                <div className="h-32 w-full rounded-xl bg-[#F8FAFC] flex items-center justify-center text-3xl">
                  📦
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-[#8C909B]">{p.seller}</span>
                  <h4 className="text-sm font-bold text-[#0F152A]">{p.name}</h4>
                  <p className="text-[10px] text-[#10B981] font-bold">★★★★★ (78)</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#0F152A]">
                    ₦{p.price.toLocaleString()}
                  </span>
                  {p.badge && (
                    <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                      {p.badge}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/marketplace/cart");
                }}
                className="mt-4 w-full rounded-xl bg-[#0F152A] py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="text-center pt-3">
          <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
            Load more products →
          </button>
        </div>
      </div>
    </div>
  );
}
