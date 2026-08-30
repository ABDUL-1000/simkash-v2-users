import { NetworkBreakdownCard, NetworkFilterTabs } from "@/components/common/NetworkOverview";
import { buildNetworkRows } from "@/constants/network";
import { useState } from "react";


export function GpsSimNetworkSection() {
  const [network, setNetwork] = useState("all");
  const gpsRows = buildNetworkRows({ mtn: 31725, airtel: 20910, glo: 14421, t2: 5048 });

  return (
    <div className="space-y-4">
      <NetworkFilterTabs value={network} onChange={setNetwork} />
      <NetworkBreakdownCard rows={gpsRows} />
    </div>
  );
}