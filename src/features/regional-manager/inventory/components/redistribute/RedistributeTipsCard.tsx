export function RedistributeTipsCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="text-base">💡</span>
        <h4 className="text-xs font-black uppercase tracking-wider text-[#0F152A]">
          Tips
        </h4>
      </div>

      <ul className="space-y-2.5 text-xs text-[#64748B] leading-relaxed">
        <li className="flex items-start gap-2">
          <span className="text-slate-400 mt-1">•</span>
          <span>
            Transfer only what the destination SC can handle — avoid
            overloading new SCs.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-slate-400 mt-1">•</span>
          <span>
            Always notify SCs so they can prepare to receive or hand over stock.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-slate-400 mt-1">•</span>
          <span>
            Redistributing unused stock keeps your network metrics healthy.
          </span>
        </li>
      </ul>
    </div>
  );
}
