import { Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
};

const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Chukwuemeka Okonkwo",
    date: "Jan 2026",
    rating: 5,
    comment: "Excellent build quality! Been using for 6 months — works perfectly in all weather conditions. Would highly recommend.",
  },
  {
    id: "2",
    name: "Amina Khalil",
    date: "Mar 2026",
    rating: 5,
    comment: "Great camera, easy installation. Night vision is impressive. Had one minor firmware issue but support resolved it quickly.",
  },
  {
    id: "3",
    name: "David Adeyemi",
    date: "Feb 2026",
    rating: 4,
    comment: "Decent camera for the price. Had initial connectivity issues that were resolved with a firmware update.",
  },
];

export function ReviewsRatingsCard() {
  const breakdown = [
    { stars: 5, count: 612, percent: 72 },
    { stars: 4, count: 182, percent: 21 },
    { stars: 3, count: 41, percent: 5 },
    { stars: 2, count: 9, percent: 1 },
    { stars: 1, count: 3, percent: 1 },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Reviews & Ratings</h3>

      {/* Rating summary */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-extrabold text-[#0F172A]">4.7</span>
        <Star className="size-6 fill-[#F59E0B] text-[#F59E0B]" />
        <div>
          <p className="font-bold text-[#0F172A]">Overall Rating</p>
          <p className="text-xs text-[#64748B]">847 reviews</p>
        </div>
      </div>

      {/* Star breakdown */}
      <div className="space-y-1.5 border-b border-[#F1F5F9] pb-4">
        {breakdown.map((b) => (
          <div key={b.stars} className="flex items-center gap-2">
            <span className="w-4 font-bold text-[#64748B] text-[11px]">{b.stars}★</span>
            <div className="h-2 flex-1 rounded-full bg-[#F1F5F9]">
              <div
                className="h-2 rounded-full bg-[#F59E0B]"
                style={{ width: `${b.percent}%` }}
              />
            </div>
            <span className="w-8 text-right font-medium text-[#94A3B8] text-[11px]">{b.count}</span>
          </div>
        ))}
      </div>

      {/* Recent Reviews */}
      <div>
        <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
          RECENT REVIEWS
        </label>
        <div className="space-y-4 divide-y divide-[#F1F5F9]">
          {REVIEWS.map((rev, idx) => (
            <div key={rev.id} className={`${idx > 0 ? "pt-3.5" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#0F172A]">{rev.name}</p>
                <span className="text-[11px] text-[#94A3B8]">{rev.date}</span>
              </div>

              <div className="my-1 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3 ${
                      i < rev.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"
                    }`}
                  />
                ))}
              </div>

              <p className="text-[#64748B] italic leading-relaxed">"{rev.comment}"</p>

              <div className="mt-1 text-right">
                <button type="button" className="text-[11px] font-bold text-[#DC2626] hover:underline">
                  Flag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
