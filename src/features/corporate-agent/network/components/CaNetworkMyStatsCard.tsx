import { CA_MY_OWN_STATS } from "../data/ca-network.data";

export function CaNetworkMyStatsCard() {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-xs font-extrabold text-[#0F152A]">My Own Stats</h3>

      <div className="space-y-2.5 text-xs pt-1">
        <div className="flex justify-between items-center">
          <span className="text-[#8C909B] font-medium">Best Day This Month</span>
          <span className="font-extrabold text-[#0F152A]">{CA_MY_OWN_STATS.bestDayThisMonth}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#8C909B] font-medium">Avg Per Day</span>
          <span className="font-extrabold text-[#0F152A]">{CA_MY_OWN_STATS.avgPerDay}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#8C909B] font-medium">Most Used Network</span>
          <span className="font-extrabold text-[#0F152A]">{CA_MY_OWN_STATS.mostUsedNetwork}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-[#8C909B] font-medium">Most Activated</span>
          <span className="font-extrabold text-[#0F152A]">{CA_MY_OWN_STATS.mostActivated}</span>
        </div>
      </div>
    </div>
  );
}
