export function AuthBrandHeroPanel() {
  return (
    <aside
      className="relative hidden min-h-screen w-[42%] flex-col justify-between overflow-hidden bg-[#0B1528] p-10 select-none md:flex lg:w-[44%] lg:p-14"
      aria-label="Simkash Platform Overview"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-blue-600/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-indigo-600/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Top: Simkash Brand Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB] shadow-lg shadow-blue-600/30">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="white" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="white" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="white" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="white" />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">Simkash</span>
      </div>

      {/* Center: Floating UI Preview Cards */}
      <div className="relative z-10 my-auto py-10">
        {/* Card 1: MTN 5G IoT Card */}
        <div className="w-full max-w-[290px] rounded-2xl border border-white/10 bg-[#121E36]/90 p-5 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              SIM CARD 01
            </span>
            <span className="rounded-full bg-[#10B981]/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#10B981]">
              ACTIVE
            </span>
          </div>
          <h2 className="mt-2 text-xl font-bold text-white">MTN 5G IoT</h2>
          <p className="mt-1 text-xs text-slate-400">
            Unlimited Data · POS Terminal #4920
          </p>
        </div>

        {/* Floating Connector Line & Amber Node */}
        <div className="relative h-14 w-full max-w-[340px]">
          <svg
            className="absolute inset-0 size-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M 145 2 C 160 30, 200 20, 215 48"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          </svg>
          <div
            className="absolute top-1 left-[142px] size-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] ring-2 ring-amber-400/40"
            aria-hidden="true"
          />
        </div>

        {/* Card 2: REVENUE SHARE Card */}
        <div className="relative -mt-2 ml-auto w-full max-w-[270px] rounded-2xl border border-white/10 bg-[#142340]/90 p-5 shadow-2xl backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              REVENUE SHARE
            </span>
            <div
              className="flex size-6 items-center justify-center rounded-lg bg-amber-400/20 text-xs font-bold text-amber-300"
              aria-hidden="true"
            >
              ₦
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">
            ₦842,500
          </div>
          <p className="mt-1 text-xs font-medium text-slate-400">
            +₦42,300 earned today
          </p>
        </div>

        {/* Connected Devices Badge */}
        <div className="mt-6 flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-600/20 px-3.5 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-sm shadow-sm">
            <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
            <span>142K+ DEVICES MANAGED</span>
          </div>
        </div>
      </div>

      {/* Bottom: Value Proposition */}
      <div className="relative z-10 pt-4">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-white lg:text-3xl">
          Secure Your SIM. Own Your Data. Grow Your Wallet.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400 lg:text-base">
          The ultimate platform built specifically for Nigeria&apos;s digital economy,
          managing smart devices, and powering business growth.
        </p>
      </div>
    </aside>
  );
}
