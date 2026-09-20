import type { AccountTimelineEvent } from "../../types/regional-manager.types";

interface ScTimelineCardProps {
  timeline?: AccountTimelineEvent[];
}

export function ScTimelineCard({
  timeline = [
    { title: "Onboarded", date: "10 Jan 2026", completed: true },
    { title: "First stock received", date: "12 Jan 2026", completed: true },
    { title: "First AP onboarded", date: "15 Jan 2026", completed: true },
    { title: "First activation", date: "16 Jan 2026", completed: true },
    { title: "Bonus first hit", date: "1 Feb 2026", completed: true },
  ],
}: ScTimelineCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">Account Timeline</h3>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2ECF6]">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-6 top-1 size-2 rounded-full bg-[#2563EB] ring-4 ring-white" />
            <h4 className="font-bold text-[#0F152A]">{item.title}</h4>
            <p className="text-[10px] text-[#64748B]">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScTimelineCard;
